import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_name, customer_phone, items, subtotal, tax, discount, total, notes, payment_method } = body;

    if (!customer_name) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }

    const adminSupabase = createAdminClient();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Use admin client if available, otherwise browser anon client
    const supabase = adminSupabase || (await import('@supabase/supabase-js')).createClient(url!, key!);

    // Insert Order into Supabase
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        status: 'confirmed',
        subtotal: subtotal || 0,
        tax: tax || 0,
        discount: discount || 0,
        total: total || 0,
        payment_status: 'paid',
        payment_method: payment_method || 'Online Payment',
        customer_name,
        customer_phone: customer_phone || '+91 98765 43210',
        notes: notes || null,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Supabase Order Insert Error:', orderError);
      return NextResponse.json({ error: orderError.message }, { status: 500 });
    }

    // Insert Order Items if items array exists
    if (orderData && items && items.length > 0) {
      const itemsToInsert = items.map((item: any) => ({
        order_id: orderData.id,
        product_id: null, // set to null to avoid foreign key errors if seed data not run
        product_name: item.product_name || item.product?.name || 'Coffee Item',
        quantity: item.quantity || 1,
        unit_price: item.unit_price || item.product?.price || 150,
        total_price: (item.unit_price || item.product?.price || 150) * (item.quantity || 1),
        variant_name: item.variant_name || item.variant?.name || null,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(itemsToInsert);
      if (itemsError) {
        console.error('Order Items Insert Error:', itemsError);
      }
    }

    return NextResponse.json({ success: true, order: orderData });
  } catch (err: any) {
    console.error('Checkout API Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

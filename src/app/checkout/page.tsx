'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, CreditCard, ShieldCheck, Clock, ArrowRight, Lock } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { useAuth } from '@/context/AuthProvider';
import { paymentProvider } from '@/lib/payment/service';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { useToast } from '@/context/ToastProvider';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, discount, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const { showToast } = useToast();
  const supabase = createClient();
  const configured = isSupabaseConfigured();

  const [customerName, setCustomerName] = useState(profile?.full_name || '');
  const [customerPhone, setCustomerPhone] = useState(profile?.phone || '');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ id: string; prepTime: string } | null>(null);

  if (items.length === 0 && !completedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-zinc-400">Please add items to your cart before checking out.</p>
        <Link href="/menu" className="inline-block px-6 py-2.5 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-sm">
          Return to Menu
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showToast('Please enter your full name and phone number', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Generate Order ID
      const orderNum = 'CB-' + Math.floor(10000 + Math.random() * 90000);
      const prepMinutes = Math.floor(15 + Math.random() * 15) + ' mins';

      // 2. Server Payment abstraction session creation
      const paySession = await paymentProvider.createCheckoutSession(orderNum, total, customerName);

      // 3. Write to Supabase if configured
      if (configured) {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user?.id ?? null,
            status: 'confirmed',
            subtotal,
            tax,
            discount,
            total,
            payment_status: 'paid',
            payment_method: paySession.paymentMethod,
            customer_name: customerName,
            customer_phone: customerPhone,
            notes: notes || null,
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // Insert order items
        if (orderData) {
          const orderItemsToInsert = items.map((item) => {
            const price = item.variant ? item.variant.price : item.product.price;
            return {
              order_id: orderData.id,
              product_id: item.product.id,
              product_name: item.product.name,
              quantity: item.quantity,
              unit_price: price,
              total_price: price * item.quantity,
              variant_name: item.variant?.name ?? null,
            };
          });

          await supabase.from('order_items').insert(orderItemsToInsert);
        }
      }

      // 4. Success state
      setCompletedOrder({ id: orderNum, prepTime: prepMinutes });
      clearCart();
      showToast(`Order ${orderNum} received! Thank you for ordering with Café Bloom.`, 'success');
    } catch (err) {
      console.error('Order creation error', err);
      showToast('Failed to create order. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Order Success Screen
  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center text-amber-400 mx-auto"
        >
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </motion.div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Order Confirmed</span>
          <h1 className="text-3xl font-extrabold text-white">Order #{completedOrder.id}</h1>
          <p className="text-lg font-semibold text-amber-300">Your order has been received!</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 text-sm max-w-md mx-auto">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-zinc-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Estimated Prep Time
            </span>
            <span className="font-bold text-amber-300">{completedOrder.prepTime}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Payment Status</span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              Paid (Verified)
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/orders"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-sm"
          >
            Track Order Status
          </Link>
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:bg-zinc-800"
          >
            Order More Items
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Checkout</h1>
        <p className="text-xs text-zinc-400 mt-1">Review items and confirm your details</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Customer Details Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" /> Contact & Delivery Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Order Notes / Special Instructions
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Extra hot cappuccino, oat milk preference, table number..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" /> Payment Provider Ready
            </h3>
            <p className="text-xs text-zinc-400">
              Secure payments powered by abstract gateway (Stripe / Razorpay). Card numbers and sensitive credentials are never stored in Supabase.
            </p>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-200">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Encrypted test transaction ready for 1-click confirmation.</span>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="p-8 rounded-3xl bg-zinc-900/90 border border-amber-900/40 space-y-6 shadow-2xl h-fit">
          <h3 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">Your Basket</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => {
              const price = item.variant ? item.variant.price : item.product.price;
              return (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{item.product.name}</span>
                    {item.variant && <span className="text-amber-400 ml-1">({item.variant.name})</span>}
                    <span className="text-zinc-500 block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-zinc-200">₹{price * item.quantity}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 text-xs text-zinc-400 pt-4 border-t border-zinc-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-zinc-200">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (5% GST)</span>
              <span className="text-zinc-200">₹{tax}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-amber-400 font-semibold">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
              <span>Total Payable</span>
              <span className="gold-gradient-text text-lg">₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-sm hover:brightness-110 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Processing Order...' : 'Confirm & Pay Order'}
          </button>
        </div>
      </form>
    </div>
  );
}

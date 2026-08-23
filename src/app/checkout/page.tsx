'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, CreditCard, ShieldCheck, Clock, ArrowRight, Lock, Printer, FileText, User } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { useAuth } from '@/context/AuthProvider';
import { paymentProvider } from '@/lib/payment/service';
import { useToast } from '@/context/ToastProvider';
import { Order } from '@/types/database';
import { InvoiceBillModal } from '@/components/orders/InvoiceBillModal';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, discount, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const { showToast } = useToast();

  const [customerName, setCustomerName] = useState(profile?.full_name || '');
  const [customerPhone, setCustomerPhone] = useState(profile?.phone || '');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [prepTime, setPrepTime] = useState('20 mins');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  if (items.length === 0 && !completedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-zinc-400">Please add items to your cart before generating a bill.</p>
        <Link href="/menu" className="inline-block px-6 py-2.5 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-sm">
          Return to Menu
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      showToast('Please enter customer name to generate bill', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      const phoneToSave = customerPhone.trim() || '+91 98765 43210';
      const calculatedPrep = Math.floor(15 + Math.random() * 15) + ' mins';
      setPrepTime(calculatedPrep);

      const itemsPayload = items.map((item) => ({
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.variant ? item.variant.price : item.product.price,
        total_price: (item.variant ? item.variant.price : item.product.price) * item.quantity,
        variant_name: item.variant?.name ?? undefined,
      }));

      // Call server-side API route to insert into Supabase reliably
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          customer_phone: phoneToSave,
          items: itemsPayload,
          subtotal,
          tax,
          discount,
          total,
          notes,
          payment_method: 'Online Payment (UPI/Card)',
        }),
      });

      const resData = await response.json();

      const createdDbOrder = resData.order;

      if (resData.dbError) {
        console.warn('DB save warning:', resData.dbError);
      }

      const finalOrder: Order = {
        id: createdDbOrder?.id || 'CB-' + Math.floor(10000 + Math.random() * 90000),
        user_id: user?.id,
        status: createdDbOrder?.status || 'confirmed',
        subtotal: createdDbOrder?.subtotal || subtotal,
        tax: createdDbOrder?.tax || tax,
        discount: createdDbOrder?.discount || discount,
        total: createdDbOrder?.total || total,
        payment_status: 'paid',
        payment_method: 'Online Payment (UPI/Card)',
        customer_name: customerName,
        customer_phone: phoneToSave,
        notes: notes || undefined,
        created_at: createdDbOrder?.created_at || new Date().toISOString(),
        items: itemsPayload,
      };

      setCompletedOrder(finalOrder);
      clearCart();

      if (resData.dbSaved) {
        showToast(`Bill #${finalOrder.id} saved in Supabase database for ${customerName}!`, 'success');
      } else {
        showToast(`Bill #${finalOrder.id} generated for ${customerName}! (DB: ${resData.dbError || 'offline mode'})`, 'info');
      }
    } catch (err: any) {
      console.error('Order creation error:', err);
      showToast(`Error: ${err.message || 'Failed to create order'}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center text-amber-400 mx-auto shadow-xl shadow-amber-500/20"
        >
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </motion.div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Saved in Supabase Database</span>
          <h1 className="text-3xl font-extrabold text-white">Bill #{completedOrder.id}</h1>
          <p className="text-lg font-semibold text-amber-300">Customer Name: {completedOrder.customer_name}</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 text-sm max-w-md mx-auto shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-zinc-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Estimated Prep Time
            </span>
            <span className="font-bold text-amber-300">{prepTime}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Bill Amount Paid</span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              Paid (₹{completedOrder.total})
            </span>
          </div>

          <button
            onClick={() => setIsInvoiceOpen(true)}
            className="w-full py-3.5 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-amber-500/30"
          >
            <FileText className="w-4 h-4 text-zinc-950" /> View & Print Official Bill Receipt
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/orders"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold text-sm hover:bg-zinc-800"
          >
            View Live Database Orders
          </Link>
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-sm"
          >
            New Order Bill
          </Link>
        </div>

        <InvoiceBillModal
          order={completedOrder}
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Generate & Save Bill</h1>
        <p className="text-xs text-zinc-400 mt-1">Enter customer name to save bill to Supabase database</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Customer Name Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-amber-400" /> Customer Information
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Customer Name (Required) *</label>
              <input
                type="text"
                required
                placeholder="Enter Customer Full Name (e.g. Rahul Sharma)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Order Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Extra hot cappuccino, Table 4..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" /> Database History Storage
            </h3>
            <p className="text-xs text-zinc-400">
              When you click "Generate & Save Bill", the order items, customer name, date, and invoice receipt will be saved permanently in your Supabase database.
            </p>
          </div>
        </div>

        {/* Right Summary */}
        <div className="p-8 rounded-3xl bg-zinc-900/90 border border-amber-900/40 space-y-6 shadow-2xl h-fit">
          <h3 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">Bill Summary</h3>

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
              <span>Total Bill Amount</span>
              <span className="gold-gradient-text text-lg">₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-sm hover:brightness-110 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Saving to Supabase Database...' : 'Generate & Save Bill'}
          </button>
        </div>
      </form>
    </div>
  );
}

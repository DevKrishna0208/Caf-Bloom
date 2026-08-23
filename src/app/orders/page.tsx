'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle2, FileText, Search, User, RefreshCw } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Order, OrderStatus } from '@/types/database';
import { InvoiceBillModal } from '@/components/orders/InvoiceBillModal';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchNameQuery, setSearchNameQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);

  const supabase = createClient();
  const configured = isSupabaseConfigured();

  // Fetch orders directly from Supabase database
  const fetchOrders = async () => {
    setLoading(true);
    if (configured) {
      try {
        const { data: dbOrders, error } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items(*)
          `)
          .order('created_at', { ascending: false });

        if (!error && dbOrders) {
          setOrders(dbOrders as Order[]);
          if (dbOrders.length > 0) {
            setSelectedOrder(dbOrders[0] as Order);
          }
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Error fetching orders:', e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    if (configured) {
      // Subscribe to real-time order changes in Supabase
      const channel = supabase
        .channel('realtime:orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
          fetchOrders();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  // Filter bills by customer name or order ID search
  const filteredOrders = useMemo(() => {
    if (!searchNameQuery.trim()) return orders;
    const q = searchNameQuery.toLowerCase();
    return orders.filter(
      (o) =>
        o.customer_name.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.customer_phone.includes(q)
    );
  }, [orders, searchNameQuery]);

  const statusSteps: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
    { key: 'pending', label: 'Order Placed', icon: '☕' },
    { key: 'confirmed', label: 'Confirmed', icon: '👍' },
    { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
    { key: 'ready', label: 'Ready for Pickup', icon: '📦' },
    { key: 'completed', label: 'Completed', icon: '✅' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    const idx = statusSteps.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Live Supabase Database Orders</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time orders fetched directly from your PostgreSQL database</p>
        </div>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400 hover:text-white text-xs font-semibold flex items-center gap-2 w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Database
        </button>
      </div>

      {/* Customer Name Search Bar */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
          Lookup Bill History by Customer Name
        </label>
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Type customer name (e.g. Ajay Chopade)..."
            value={searchNameQuery}
            onChange={(e) => setSearchNameQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-amber-400">Loading orders from Supabase database...</div>
      ) : orders.length === 0 ? (
        <div className="p-12 rounded-3xl bg-zinc-900/80 border border-zinc-800 text-center space-y-4 max-w-xl mx-auto">
          <ShoppingBag className="w-12 h-12 text-amber-400 mx-auto opacity-80" />
          <h3 className="text-xl font-bold text-white">No Database Orders Found Yet</h3>
          <p className="text-xs text-zinc-400">
            Your Supabase `orders` table is currently empty. Generate your first order bill to see live data here!
          </p>
          <a
            href="/checkout"
            className="inline-block px-6 py-3 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20"
          >
            Create First Order Bill
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Orders History List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Database Bills ({filteredOrders.length})
            </h3>
            {filteredOrders.length === 0 ? (
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center text-xs text-zinc-500">
                No database bills match "{searchNameQuery}"
              </div>
            ) : (
              filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  whileHover={{ x: 4 }}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                    selectedOrder?.id === order.id
                      ? 'bg-amber-500/10 border-amber-500 shadow-lg'
                      : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-white">#{order.id.substring(0, 8)}</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20 capitalize">
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-2 space-y-0.5">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {order.customer_name}
                    </span>
                    <p className="text-[11px] text-zinc-400">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-800/60 text-xs">
                    <span className="text-zinc-300">{order.items?.length || 1} items</span>
                    <span className="font-extrabold gold-gradient-text text-sm">₹{order.total}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Right: Detailed Live Tracking & Invoice Option */}
          <div className="lg:col-span-2 space-y-8">
            {selectedOrder && (
              <div className="p-8 rounded-3xl bg-zinc-900/90 border border-amber-900/40 space-y-8 shadow-2xl">
                {/* Header Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                  <div>
                    <span className="text-xs text-zinc-400">Selected Database Bill</span>
                    <h2 className="text-2xl font-extrabold text-white">Bill #{selectedOrder.id}</h2>
                    <p className="text-xs text-amber-400 mt-0.5">
                      Customer Name: <strong className="text-white">{selectedOrder.customer_name}</strong> ({selectedOrder.customer_phone})
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <button
                      onClick={() => setIsInvoiceOpen(true)}
                      className="px-4 py-2 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-xs hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                    >
                      <FileText className="w-4 h-4" /> View / Print Tax Invoice Bill
                    </button>
                    <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                      Payment Status: {selectedOrder.payment_status}
                    </span>
                  </div>
                </div>

                {/* LIVE ANIMATED TIMELINE TRACKER */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Preparation Status</h3>

                  <div className="grid grid-cols-5 gap-2 relative">
                    {statusSteps.map((step, idx) => {
                      const currentIdx = getStepIndex(selectedOrder.status);
                      const isDone = idx <= currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div key={step.key} className="flex flex-col items-center text-center space-y-2">
                          <motion.div
                            animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                            transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold border transition-all ${
                              isDone
                                ? 'gold-gradient-bg border-amber-400 text-zinc-950 shadow-lg shadow-amber-500/30'
                                : 'bg-zinc-950 border-zinc-800 text-zinc-600'
                            }`}
                          >
                            {step.icon}
                          </motion.div>
                          <span className={`text-[11px] font-semibold leading-tight ${
                            isDone ? 'text-amber-300' : 'text-zinc-600'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items Summary Table */}
                <div className="space-y-3 pt-4 border-t border-zinc-800">
                  <h4 className="text-sm font-bold text-white">Itemized Purchase Summary</h4>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
                        <div>
                          <span className="font-semibold text-white">{item.product_name}</span>
                          {item.variant_name && <span className="text-amber-400 ml-1">({item.variant_name})</span>}
                          <span className="text-zinc-500 block">Qty: {item.quantity} × ₹{item.unit_price}</span>
                        </div>
                        <span className="font-extrabold text-amber-300">₹{item.total_price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <InvoiceBillModal
        order={selectedOrder}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </div>
  );
}

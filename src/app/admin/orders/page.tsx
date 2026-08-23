'use client';

import React, { useState } from 'react';
import { ShoppingBag, ChevronDown, FileText } from 'lucide-react';
import { MOCK_INITIAL_ORDERS } from '@/lib/mockData';
import { Order, OrderStatus } from '@/types/database';
import { useToast } from '@/context/ToastProvider';
import { InvoiceBillModal } from '@/components/orders/InvoiceBillModal';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_INITIAL_ORDERS);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const { showToast } = useToast();

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    showToast(`Order #${id} status updated to ${newStatus}`, 'success');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Live Order Management & Invoices</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Monitor customer database orders, generate tax bills, and update preparation status
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800 pb-3">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Live Status</th>
                <th className="py-3 px-4">Invoice Bill</th>
                <th className="py-3 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-950/50 transition-colors">
                  <td className="py-4 px-4 font-extrabold text-amber-400">#{order.id}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-white block">{order.customer_name}</span>
                    <span className="text-zinc-500 text-[11px]">{order.customer_phone}</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-white text-sm">₹{order.total}</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold uppercase">{order.payment_status}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30 capitalize">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" /> View Bill
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready for Pickup</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceBillModal
        order={selectedInvoiceOrder}
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
}

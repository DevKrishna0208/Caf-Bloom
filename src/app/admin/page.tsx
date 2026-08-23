'use client';

import React from 'react';
import { DollarSign, ShoppingBag, Users, Package, Clock, TrendingUp } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_INITIAL_ORDERS } from '@/lib/mockData';

export default function AdminOverviewPage() {
  const metrics = [
    { label: 'Total Revenue', value: '₹1,24,850', icon: DollarSign, change: '+14.2% vs last week' },
    { label: "Today's Orders", value: '28 Orders', icon: ShoppingBag, change: '8 pending prep' },
    { label: 'Total Customers', value: '1,420 Users', icon: Users, change: '+12 new today' },
    { label: 'Active Menu Items', value: `${MOCK_PRODUCTS.length} Items`, icon: Package, change: '5 categories' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Dashboard Overview</h1>
        <p className="text-xs text-zinc-400 mt-1">Real-time performance analytics & key metrics</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-3 shadow-xl hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-semibold">{metric.label}</span>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white">{metric.value}</h3>
              <p className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {metric.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Live Orders Table */}
      <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl">
        <h3 className="text-xl font-bold text-white">Recent Customer Orders</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800 pb-3">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {MOCK_INITIAL_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-950/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-amber-400">#{order.id}</td>
                  <td className="py-4 px-4 text-white font-medium">{order.customer_name}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20 capitalize">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-white">₹{order.total}</td>
                  <td className="py-4 px-4 text-emerald-400 font-semibold uppercase">{order.payment_status}</td>
                  <td className="py-4 px-4 text-zinc-500">
                    {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

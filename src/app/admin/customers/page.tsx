'use client';

import React from 'react';
import { Users, Mail, Phone, ShoppingBag } from 'lucide-react';

export default function AdminCustomersPage() {
  const mockCustomers = [
    {
      id: 'u1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 98765 43210',
      ordersCount: 8,
      totalSpent: 2840,
      joined: 'Jan 2026',
    },
    {
      id: 'u2',
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91 91234 56789',
      ordersCount: 5,
      totalSpent: 1650,
      joined: 'Feb 2026',
    },
    {
      id: 'u3',
      name: 'Ananya Verma',
      email: 'ananya@example.com',
      phone: '+91 99887 76655',
      ordersCount: 12,
      totalSpent: 4120,
      joined: 'Mar 2026',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Customer Directory</h1>
        <p className="text-xs text-zinc-400 mt-1">View registered customers, order history counts, and total spend</p>
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800 pb-3">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Orders Count</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {mockCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-zinc-950/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-white text-sm">{cust.name}</td>
                  <td className="py-4 px-4 text-zinc-400">{cust.email}</td>
                  <td className="py-4 px-4 text-zinc-400">{cust.phone}</td>
                  <td className="py-4 px-4 font-semibold text-amber-300">{cust.ordersCount} orders</td>
                  <td className="py-4 px-4 font-extrabold gold-gradient-text">₹{cust.totalSpent}</td>
                  <td className="py-4 px-4 text-zinc-500">{cust.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

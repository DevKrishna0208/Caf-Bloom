'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Search, Calendar, FileText, Filter, ArrowUpDown } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { MOCK_INITIAL_ORDERS } from '@/lib/mockData';
import { Order, OrderStatus } from '@/types/database';
import { useToast } from '@/context/ToastProvider';
import { InvoiceBillModal } from '@/components/orders/InvoiceBillModal';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'amount_high' | 'name_az'>('newest');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const { showToast } = useToast();
  const supabase = createClient();
  const configured = isSupabaseConfigured();

  // Fetch orders from Supabase database
  const fetchDatabaseOrders = async () => {
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

        if (!error && dbOrders && dbOrders.length > 0) {
          setOrders(dbOrders as Order[]);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Error fetching database orders:', e);
      }
    }

    // Fallback seed orders
    setOrders(MOCK_INITIAL_ORDERS);
    setLoading(false);
  };

  useEffect(() => {
    fetchDatabaseOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );

    if (configured) {
      try {
        await supabase.from('orders').update({ status: newStatus }).eq('id', id);
      } catch (e) {
        console.error(e);
      }
    }

    showToast(`Order #${id} status updated to ${newStatus}`, 'success');
  };

  // Filter and arrange bills by Date, Customer Name, or ID
  const arrangedOrders = useMemo(() => {
    let result = [...orders];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(query) ||
          o.customer_name.toLowerCase().includes(query) ||
          o.customer_phone.includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((o) => o.status === statusFilter);
    }

    // Sorting arrangements
    result.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortOrder === 'amount_high') {
        return b.total - a.total;
      } else if (sortOrder === 'name_az') {
        return a.customer_name.localeCompare(b.customer_name);
      }
      return 0;
    });

    return result;
  }, [orders, searchQuery, statusFilter, sortOrder]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Database Bills & Live Orders</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Arranged customer bills from Supabase database sorted by date, name & order status
        </p>
      </div>

      {/* Filter and Arrangement Controls Bar */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search by Customer Name or Bill ID */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search customer name or Bill #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
            >
              <option value="all">All Order Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready for Pickup</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Sort / Arrange Order */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
            >
              <option value="newest">Arrange by Date: Newest First</option>
              <option value="oldest">Arrange by Date: Oldest First</option>
              <option value="amount_high">Arrange by Amount: Highest First</option>
              <option value="name_az">Arrange by Customer Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Arranged Bills Table */}
      <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800 pb-3">
              <tr>
                <th className="py-3 px-4">Bill #</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4 text-right">Update Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {arrangedOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-zinc-500">
                    No database bills match your search criteria.
                  </td>
                </tr>
              ) : (
                arrangedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-950/50 transition-colors">
                    <td className="py-4 px-4 font-extrabold text-amber-400">#{order.id}</td>
                    <td className="py-4 px-4 font-bold text-white text-sm">{order.customer_name}</td>
                    <td className="py-4 px-4 text-amber-300 font-mono">{order.customer_phone}</td>
                    <td className="py-4 px-4 text-zinc-400">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-4 px-4 font-extrabold gold-gradient-text text-sm">₹{order.total}</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold uppercase">{order.payment_status}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30 capitalize">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="px-3 py-1.5 rounded-xl gold-gradient-bg text-zinc-950 hover:brightness-110 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
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
                ))
              )}
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

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Printer, Download, X, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import { Order } from '@/types/database';

interface InvoiceBillModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceBillModal: React.FC<InvoiceBillModalProps> = ({ order, isOpen, onClose }) => {
  if (!order || !isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 print:p-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm print:hidden"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-zinc-950 border border-amber-500/40 overflow-hidden shadow-2xl z-10 text-zinc-100 p-6 sm:p-8 space-y-6 print:border-none print:shadow-none print:bg-white print:text-black print:p-0 print:max-w-none print:w-full"
        >
          {/* Header Controls (Hidden on Print) */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4 print:hidden">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
                Official Tax Invoice Receipt
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-xs hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PRINTABLE INVOICE CONTENT */}
          <div className="space-y-6 print:text-black">
            {/* Cafe Brand Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-900/30 print:border-black/20 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-zinc-950 shadow-lg">
                  <Coffee className="w-7 h-7 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black gold-gradient-text tracking-tight print:text-black">
                    Café Bloom
                  </h2>
                  <p className="text-xs text-zinc-400 print:text-gray-600 font-mono">
                    Artisanal Coffee & Bakery • GSTIN: 29AAAAA0000A1Z5
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-zinc-400 print:text-gray-600 space-y-1">
                <p className="font-semibold text-white print:text-black">42 Bloom Street, Indiranagar</p>
                <p>Bengaluru, Karnataka 560038</p>
                <p>Ph: +91 (080) 4567-8900 | hello@cafebloom.com</p>
              </div>
            </div>

            {/* Customer & Order Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 print:bg-gray-50 print:border-gray-300 text-xs">
              <div>
                <span className="text-zinc-500 print:text-gray-500 block text-[10px] uppercase font-bold tracking-wider">
                  Order ID
                </span>
                <span className="font-extrabold text-amber-400 print:text-black text-sm">#{order.id}</span>
              </div>
              <div>
                <span className="text-zinc-500 print:text-gray-500 block text-[10px] uppercase font-bold tracking-wider">
                  Customer Name
                </span>
                <span className="font-bold text-white print:text-black">{order.customer_name}</span>
              </div>
              <div>
                <span className="text-zinc-500 print:text-gray-500 block text-[10px] uppercase font-bold tracking-wider">
                  Customer Phone
                </span>
                <span className="font-semibold text-zinc-200 print:text-black">{order.customer_phone}</span>
              </div>
              <div>
                <span className="text-zinc-500 print:text-gray-500 block text-[10px] uppercase font-bold tracking-wider">
                  Order Date & Time
                </span>
                <span className="font-medium text-zinc-300 print:text-black">
                  {new Date(order.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-black">
                Itemized Order Summary
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 print:border-gray-300 text-zinc-400 print:text-gray-600">
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Unit Price</th>
                      <th className="py-2.5 px-3 text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 print:divide-gray-200">
                    {order.items?.map((item, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/30 print:hover:bg-transparent">
                        <td className="py-3 px-3 font-semibold text-white print:text-black">
                          {item.product_name}
                          {item.variant_name && (
                            <span className="text-amber-400 print:text-gray-600 text-[11px] block font-normal">
                              Size: {item.variant_name}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-zinc-300 print:text-black">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-3 text-right text-zinc-400 print:text-gray-700">
                          ₹{item.unit_price}
                        </td>
                        <td className="py-3 px-3 text-right font-extrabold text-amber-300 print:text-black">
                          ₹{item.total_price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-zinc-800 print:border-gray-300 grid grid-cols-1 sm:grid-cols-2 gap-4 items-end text-xs">
              <div className="space-y-2 text-zinc-400 print:text-gray-600">
                <p>
                  <strong className="text-white print:text-black">Payment Status:</strong>{' '}
                  <span className="text-emerald-400 font-bold uppercase">{order.payment_status}</span> ({order.payment_method})
                </p>
                <p>
                  <strong className="text-white print:text-black">Kitchen Order Status:</strong>{' '}
                  <span className="text-amber-300 font-semibold capitalize">{order.status}</span>
                </p>
                {order.notes && (
                  <p className="italic bg-zinc-900 print:bg-gray-100 p-2.5 rounded-xl border border-zinc-800">
                    "{order.notes}"
                  </p>
                )}
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 print:bg-gray-50 print:border-gray-300 text-xs">
                <div className="flex justify-between text-zinc-400 print:text-gray-700">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-white print:text-black">₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-zinc-400 print:text-gray-700">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-white print:text-black">₹{order.tax}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-amber-400 print:text-gray-800 font-semibold">
                    <span>Promo Discount</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-white print:text-black pt-2 border-t border-zinc-800 print:border-gray-300">
                  <span>Grand Total Paid</span>
                  <span className="gold-gradient-text print:text-black text-lg">₹{order.total}</span>
                </div>
              </div>
            </div>

            {/* Footer Thank you */}
            <div className="text-center pt-4 border-t border-zinc-900 print:border-gray-300 text-[11px] text-zinc-500 print:text-gray-600">
              <p className="font-bold text-amber-400 print:text-black">Thank you for dining at Café Bloom!</p>
              <p>Computer Generated Tax Invoice • No signature required.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

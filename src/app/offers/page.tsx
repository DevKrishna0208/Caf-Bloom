'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Copy, Check, Sparkles } from 'lucide-react';
import { MOCK_OFFERS } from '@/lib/mockData';
import { useToast } from '@/context/ToastProvider';

export default function OffersPage() {
  const { showToast } = useToast();

  const copyCode = (code?: string) => {
    if (code) {
      navigator.clipboard.writeText(code);
      showToast(`Coupon code ${code} copied to clipboard!`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Exclusive Deals</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Special <span className="gold-gradient-text">Café Offers</span>
        </h1>
        <p className="text-zinc-400 text-sm">
          Enjoy handcrafted drinks and bakery treats at special discounted prices. Apply codes at checkout!
        </p>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_OFFERS.map((offer, idx) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-3xl bg-zinc-900/80 border border-amber-900/40 overflow-hidden flex flex-col justify-between shadow-xl hover:border-amber-500/50 transition-all group"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image_url}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full gold-gradient-bg text-zinc-950 text-xs font-extrabold flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-zinc-950" />
                  {offer.discount_type === 'percentage'
                    ? `${offer.discount_value}% OFF`
                    : `₹${offer.discount_value} OFF`}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{offer.description}</p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-zinc-800/60 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs font-bold text-amber-300">
                <Tag className="w-3.5 h-3.5" /> {offer.code}
              </div>

              <button
                onClick={() => copyCode(offer.code)}
                className="px-4 py-2 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-xs hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Code
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

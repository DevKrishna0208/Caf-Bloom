'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartProvider';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    tax,
    discount,
    total,
    appliedOffer,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mx-auto">
          <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h2 className="text-3xl font-bold text-white">Your Cart is Currently Empty</h2>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">
          Explore our handcrafted coffees, artisan teas, breakfasts, and bakery items to start your order.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20"
        >
          Explore Menu <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Your Shopping Cart</h1>
          <p className="text-xs text-zinc-400 mt-1">{items.length} unique items in your basket</p>
        </div>
        <Link href="/menu" className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const price = item.variant ? item.variant.price : item.product.price;
            return (
              <motion.div
                key={item.id}
                layout
                className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-amber-900/30"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.product.name}</h3>
                    {item.variant && (
                      <span className="inline-block text-xs px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20 mt-1">
                        Size: {item.variant.name}
                      </span>
                    )}
                    <p className="text-sm font-extrabold text-amber-400 mt-1">
                      ₹{price} <span className="text-xs font-normal text-zinc-500">each</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                  <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-zinc-400 hover:text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-zinc-200 min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-zinc-400 hover:text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-white">₹{price * item.quantity}</span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-500 hover:text-rose-400 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Order Summary */}
        <div className="p-8 rounded-3xl bg-zinc-900/90 border border-amber-900/40 space-y-6 shadow-2xl h-fit">
          <h3 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">Order Summary</h3>

          {/* Coupon */}
          {appliedOffer ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Tag className="w-4 h-4" /> Code {appliedOffer.code} Applied
              </div>
              <button onClick={removeCoupon} className="text-rose-400 hover:underline text-xs">
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code (BLOOM20)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button type="submit" className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-semibold text-xs rounded-xl">
                Apply
              </button>
            </form>
          )}

          {/* Price breakdown */}
          <div className="space-y-3 text-sm text-zinc-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-white">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated GST (5%)</span>
              <span className="font-semibold text-white">₹{tax}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-amber-400 font-semibold">
                <span>Discount Applied</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-white pt-4 border-t border-zinc-800">
              <span>Grand Total</span>
              <span className="gold-gradient-text text-xl">₹{total}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-center block text-base hover:brightness-110 shadow-xl shadow-amber-500/20"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

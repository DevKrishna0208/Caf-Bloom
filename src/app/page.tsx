'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coffee, ArrowRight, Star, Sparkles, Award, Users, Utensils, Heart } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_REVIEWS } from '@/lib/mockData';
import { useCart } from '@/context/CartProvider';

export default function HomePage() {
  const { addToCart } = useCart();
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.is_featured).slice(0, 4);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Floating Coffee Beans */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[10%] w-12 h-12 rounded-full bg-amber-900/30 border border-amber-500/20 backdrop-blur-md flex items-center justify-center text-amber-500 hidden md:flex"
        >
          ☕
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-24 right-[12%] w-16 h-16 rounded-full bg-amber-950/40 border border-amber-600/30 backdrop-blur-md flex items-center justify-center text-amber-400 text-xl hidden md:flex"
        >
          🫘
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-40 right-[20%] w-10 h-10 rounded-full bg-amber-800/20 border border-amber-400/20 backdrop-blur-md flex items-center justify-center text-amber-300 hidden md:flex"
        >
          ✨
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" /> Artisanal Coffee & Fresh Bakery
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Freshly Brewed. <br />
              <span className="gold-gradient-text">Beautifully Served.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Handcrafted coffee, fresh food, and unforgettable moments — all in one cozy place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-base hover:brightness-110 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-zinc-200 font-semibold text-base hover:bg-zinc-800 hover:border-amber-500/40 transition-all flex items-center justify-center gap-2"
              >
                Explore Menu
              </Link>
            </div>

            {/* Quick stats badges */}
            <div className="pt-8 border-t border-zinc-900 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="text-2xl font-bold gold-gradient-text">100%</span>
                <span className="block text-xs text-zinc-400">Arabica Beans</span>
              </div>
              <div>
                <span className="text-2xl font-bold gold-gradient-text">4.9 ★</span>
                <span className="block text-xs text-zinc-400">Customer Rating</span>
              </div>
              <div>
                <span className="text-2xl font-bold gold-gradient-text">Fresh</span>
                <span className="block text-xs text-zinc-400">Daily Pastries</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-[320px] sm:w-[420px] h-[380px] sm:h-[500px]">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-amber-600/30 to-amber-900/10 rotate-6 border border-amber-500/30 blur-sm" />
              
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-[40px] overflow-hidden border-2 border-amber-500/40 shadow-2xl coffee-shadow bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
                  alt="Artisanal Cappuccino"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Animated Floating Card Overlay */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 p-4 rounded-2xl glass-panel shadow-2xl border border-amber-500/30 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center text-zinc-950 font-bold">
                  ☕
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Signature Cappuccino</h4>
                  <p className="text-xs text-amber-300 font-semibold">Specialty Arabica • ₹160</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Crafted with Love</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Explore Our Categories</h2>
          <p className="text-zinc-400 text-sm">
            From single-origin pour-overs to freshly baked French croissants, discover our full spectrum.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {MOCK_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/menu?category=${cat.slug}`}
                className="group block relative h-64 rounded-3xl overflow-hidden border border-amber-900/40 hover:border-amber-500/60 transition-all shadow-lg hover:shadow-amber-500/20"
              >
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 mt-1 opacity-90">{cat.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Café Favorites</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Popular Bestsellers</h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            View Full Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-zinc-900/80 border border-zinc-800 overflow-hidden flex flex-col justify-between group shadow-xl hover:border-amber-500/50 transition-all"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {product.rating}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-4">
                <span className="text-lg font-extrabold gold-gradient-text">₹{product.price}</span>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="px-4 py-2 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                >
                  <Coffee className="w-4 h-4 stroke-[2.5]" /> Add
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. ABOUT & STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel p-8 sm:p-14 border border-amber-500/30 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Our Heritage</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              More Than Just Coffee.
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed">
              Café Bloom is a cozy destination for handcrafted drinks, fresh artisanal food, working, relaxing, and spending quality time with friends.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-amber-900/40">
              <div>
                <span className="text-3xl font-extrabold gold-gradient-text">10+</span>
                <span className="block text-xs text-zinc-400 mt-1">Years Experience</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold gold-gradient-text">50+</span>
                <span className="block text-xs text-zinc-400 mt-1">Menu Items</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold gold-gradient-text">10K+</span>
                <span className="block text-xs text-zinc-400 mt-1">Happy Customers</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold gold-gradient-text">4.9/5</span>
                <span className="block text-xs text-zinc-400 mt-1">Rating</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl h-80 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
              alt="Café Bloom Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Customer Love</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What Our Guests Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((rev) => (
            <motion.div
              key={rev.id}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/80">
                <img
                  src={rev.profiles?.avatar_url}
                  alt={rev.profiles?.full_name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.profiles?.full_name}</h4>
                  <span className="text-xs text-amber-400">Verified Customer</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

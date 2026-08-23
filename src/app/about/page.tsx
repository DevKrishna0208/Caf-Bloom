'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Award, Users, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Our Story & Passion</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          More Than Just <span className="gold-gradient-text">Coffee</span>
        </h1>
        <p className="text-zinc-300 text-lg leading-relaxed">
          Café Bloom is a cozy destination for handcrafted drinks, fresh food, working, relaxing, and spending unforgettable time with friends.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Craftsmanship in Every Cup</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Founded in 2016, Café Bloom started with a single humble espresso machine and a dream: to bring true third-wave artisanal coffee culture to our neighborhood. We source 100% single-origin Arabica beans directly from sustainable shade-grown estates.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Every morning before sunrise, our master bakers hand-roll croissants, sourdough loaves, and delicate French pastries. We believe coffee is not just a morning routine — it's an experience to be cherished.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Directly traded 100% Arabica coffee beans',
              'Scratch-baked pastries and sourdough breads',
              'Eco-friendly compostable takeaway packaging',
              'Warm community atmosphere with high-speed fiber internet',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-zinc-200">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80"
            alt="Barista brewing coffee"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="rounded-3xl glass-panel p-10 border border-amber-500/30 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-4xl sm:text-5xl font-extrabold gold-gradient-text">10+</span>
          <span className="block text-sm font-semibold text-zinc-300 mt-2">Years Experience</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <span className="text-4xl sm:text-5xl font-extrabold gold-gradient-text">50+</span>
          <span className="block text-sm font-semibold text-zinc-300 mt-2">Menu Items</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <span className="text-4xl sm:text-5xl font-extrabold gold-gradient-text">10K+</span>
          <span className="block text-sm font-semibold text-zinc-300 mt-2">Happy Customers</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <span className="text-4xl sm:text-5xl font-extrabold gold-gradient-text">4.9/5</span>
          <span className="block text-sm font-semibold text-zinc-300 mt-2">Average Rating</span>
        </motion.div>
      </div>
    </div>
  );
}

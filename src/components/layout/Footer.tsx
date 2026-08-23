'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, MapPin, Phone, Mail, Clock, Heart, Globe, Share2, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-amber-900/30 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1: Brand & Tagline */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Coffee className="w-6 h-6 text-zinc-950 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold tracking-tight gold-gradient-text">Café Bloom</span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">
            Handcrafted coffee, fresh food, and unforgettable moments — all in one cozy place.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-base tracking-wide">Quick Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/menu" className="hover:text-amber-400 transition-colors">Our Menu</Link></li>
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">Our Story & Craft</Link></li>
            <li><Link href="/gallery" className="hover:text-amber-400 transition-colors">Café Gallery</Link></li>
            <li><Link href="/offers" className="hover:text-amber-400 transition-colors">Special Offers</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Hours & Timings */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-base tracking-wide">Opening Hours</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-200 block font-medium">Monday - Friday</span>
                <span className="text-xs text-zinc-400">7:00 AM - 10:00 PM</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-200 block font-medium">Saturday - Sunday</span>
                <span className="text-xs text-zinc-400">8:00 AM - 11:00 PM</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Location */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-base tracking-wide">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>42 Bloom Street, Indiranagar, Bengaluru, 560038</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>+91 (080) 4567-8900</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>hello@cafebloom.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400">
        <p>© {new Date().getFullYear()} Café Bloom. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for coffee lovers.
        </p>
      </div>
    </footer>
  );
};

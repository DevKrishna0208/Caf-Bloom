'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { MOCK_GALLERY } from '@/lib/mockData';
import { GalleryItem } from '@/types/database';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedLightbox, setSelectedLightbox] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Interior', 'Coffee', 'Food', 'Desserts', 'Events'];

  const filteredItems = activeCategory === 'All'
    ? MOCK_GALLERY
    : MOCK_GALLERY.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Visual Journey</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Café Bloom <span className="gold-gradient-text">Gallery</span>
        </h1>
        <p className="text-zinc-400 text-sm">
          A glimpse into our ambiance, artisanal drinks, hand-baked treats, and cozy community moments.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'gold-gradient-bg text-zinc-950 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative h-72 rounded-3xl overflow-hidden border border-zinc-800 cursor-pointer shadow-xl"
            onClick={() => setSelectedLightbox(item)}
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {item.category}
              </span>
              <h3 className="text-lg font-bold text-white flex items-center justify-between mt-1">
                {item.title}
                <Maximize2 className="w-4 h-4 text-amber-300" />
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLightbox(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-amber-500/40 z-10 bg-zinc-950"
            >
              <img
                src={selectedLightbox.image_url}
                alt={selectedLightbox.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="p-4 bg-zinc-950 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-400 font-semibold">{selectedLightbox.category}</span>
                  <h4 className="text-base font-bold text-white">{selectedLightbox.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedLightbox(null)}
                  className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

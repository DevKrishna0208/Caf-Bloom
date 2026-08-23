'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Coffee, Plus, Check, Filter, X } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';
import { Product, ProductVariant } from '@/types/database';
import { useCart } from '@/context/CartProvider';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category_id ===
          MOCK_CATEGORIES.find((c) => c.slug === selectedCategory)?.id;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const openProductModal = (product: Product) => {
    setSelectedProductModal(product);
    setSelectedVariant(product.variants ? product.variants[0] : null);
    setQuantity(1);
  };

  const handleAddToCartFromModal = () => {
    if (selectedProductModal) {
      addToCart(selectedProductModal, quantity, selectedVariant || undefined);
      setSelectedProductModal(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Handcrafted Menu
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Discover Our <span className="gold-gradient-text">Café Creations</span>
        </h1>
        <p className="text-zinc-400 text-sm">
          Savor our specialty espresso blends, organic infusions, and freshly baked bakery items.
        </p>
      </div>

      {/* Search Bar & Category Filters */}
      <div className="space-y-6">
        {/* Search input */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search cappuccino, chai, croissant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'gold-gradient-bg text-zinc-950 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/40'
            }`}
          >
            All Items
          </button>
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat.slug
                  ? 'gold-gradient-bg text-zinc-950 shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <Coffee className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-bold text-zinc-300">No items match your search</h3>
          <p className="text-xs text-zinc-500">Try searching for a different item or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-zinc-900/70 border border-zinc-800 overflow-hidden flex flex-col justify-between group shadow-xl hover:border-amber-500/50 transition-all"
            >
              <div>
                <div
                  className="relative h-56 overflow-hidden cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.is_featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full gold-gradient-bg text-zinc-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      Featured
                    </span>
                  )}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {product.rating}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3
                    onClick={() => openProductModal(product)}
                    className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-4">
                <div>
                  <span className="text-xs text-zinc-500 block">Price</span>
                  <span className="text-xl font-extrabold gold-gradient-text">₹{product.price}</span>
                </div>

                <div className="flex gap-2">
                  {product.variants && product.variants.length > 0 && (
                    <button
                      onClick={() => openProductModal(product)}
                      className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold"
                    >
                      Sizes
                    </button>
                  )}
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-4 py-2.5 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-xs hover:brightness-110 shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-amber-500/40 overflow-hidden shadow-2xl z-10 space-y-6"
            >
              <div className="relative h-64">
                <img
                  src={selectedProductModal.image_url}
                  alt={selectedProductModal.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProductModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950/80 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 pt-0 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedProductModal.name}</h3>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    {selectedProductModal.description}
                  </p>
                </div>

                {/* Variants Selection */}
                {selectedProductModal.variants && selectedProductModal.variants.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-zinc-300">Choose Serving Size:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedProductModal.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                            selectedVariant?.id === variant.id
                              ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <span className="block">{variant.name}</span>
                          <span className="text-amber-400 mt-0.5 block">₹{variant.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer & Price */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                  <div>
                    <span className="text-xs text-zinc-500 block">Total Price</span>
                    <span className="text-2xl font-extrabold gold-gradient-text">
                      ₹{(selectedVariant ? selectedVariant.price : selectedProductModal.price) * quantity}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCartFromModal}
                    className="px-6 py-3 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

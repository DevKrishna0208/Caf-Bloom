'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Check, X, Image as ImageIcon } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData';
import { Product } from '@/types/database';
import { useToast } from '@/context/ToastProvider';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { showToast } = useToast();

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: 'p-' + Math.random().toString(36).substring(2, 9),
      name: newProductName,
      slug: newProductName.toLowerCase().replace(/\s+/g, '-'),
      price: parseFloat(newProductPrice) || 150,
      description: newProductDesc,
      image_url: newProductImage,
      rating: 4.8,
      is_available: true,
      is_featured: true,
    };

    setProducts([created, ...products]);
    showToast(`Product "${newProductName}" added successfully!`, 'success');
    setIsAddModalOpen(false);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDesc('');
  };

  const toggleAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: !p.is_available } : p))
    );
    showToast('Product availability toggled', 'info');
  };

  const deleteProduct = (id: string, name: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product "${name}" deleted`, 'error');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Product Management</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage cafe menu items, prices, variants and availability</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-xs hover:brightness-110 flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800 pb-3">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-950/50 transition-colors">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-amber-900/30"
                    />
                    <div>
                      <span className="font-bold text-white block text-sm">{product.name}</span>
                      <span className="text-[11px] text-zinc-500">{product.slug}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-amber-400 text-sm">₹{product.price}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleAvailability(product.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                        product.is_available
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {product.is_available ? 'Available' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    {product.is_featured ? (
                      <span className="inline-flex items-center gap-1 text-amber-300 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> Yes
                      </span>
                    ) : (
                      <span className="text-zinc-600">No</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => deleteProduct(product.id, product.name)}
                        className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-amber-500/40 p-8 space-y-6 z-10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <h3 className="text-xl font-bold text-white">Add New Menu Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vanilla Bean Cold Brew"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Price (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="190"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Rich cold brew coffee infused with Madagascar vanilla..."
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

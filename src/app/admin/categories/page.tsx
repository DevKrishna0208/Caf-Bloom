'use client';

import React, { useState } from 'react';
import { FolderTree, Plus, Trash2 } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/lib/mockData';
import { Category } from '@/types/database';
import { useToast } from '@/context/ToastProvider';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const { showToast } = useToast();

  const toggleActive = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_active: !c.is_active } : c))
    );
    showToast('Category status updated', 'info');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Category Management</h1>
        <p className="text-xs text-zinc-400 mt-1">Organize coffee, bakery, snacks & dessert categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative h-36 rounded-2xl overflow-hidden">
                <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-white">{cat.name}</h3>
              <p className="text-xs text-zinc-400 line-clamp-2">{cat.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                onClick={() => toggleActive(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  cat.is_active
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {cat.is_active ? 'Active' : 'Inactive'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

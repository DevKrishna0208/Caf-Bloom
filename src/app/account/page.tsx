'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { useToast } from '@/context/ToastProvider';
import { User, Mail, Phone, Image, Save, Shield } from 'lucide-react';

export default function AccountPage() {
  const { user, profile, updateProfileState } = useAuth();
  const { showToast } = useToast();
  const supabase = createClient();
  const configured = isSupabaseConfigured();

  const [fullName, setFullName] = useState(profile?.full_name || 'Rahul Sharma');
  const [phone, setPhone] = useState(profile?.phone || '+91 98765 43210');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80');
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (user && configured) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: fullName,
            phone,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        if (error) throw error;
      } catch (err: any) {
        showToast(err.message || 'Failed to update profile', 'error');
        setSaving(false);
        return;
      }
    }

    updateProfileState({ full_name: fullName, phone, avatar_url: avatarUrl });
    showToast('Profile updated successfully!', 'success');
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Customer Account</h1>
        <p className="text-xs text-zinc-400 mt-1">Manage your personal profile and preferences</p>
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-8 shadow-2xl">
        <div className="flex items-center gap-6 pb-6 border-b border-zinc-800">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/50 shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{fullName}</h2>
            <span className="text-xs text-amber-400 font-medium">{profile?.email || user?.email || 'rahul@example.com'}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-bold border border-amber-500/20 uppercase tracking-wider">
                {profile?.role || 'Customer'}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Avatar Image URL</label>
            <div className="relative">
              <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-2xl gold-gradient-bg text-zinc-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

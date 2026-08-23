'use client';

import React, { useState } from 'react';
import { Star, Check, X, Trash2 } from 'lucide-react';
import { MOCK_REVIEWS } from '@/lib/mockData';
import { Review } from '@/types/database';
import { useToast } from '@/context/ToastProvider';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    ...MOCK_REVIEWS,
    {
      id: 'r4',
      rating: 4,
      comment: 'Great cappuccino, but parking was a bit tight during peak hours!',
      is_approved: false,
      created_at: new Date().toISOString(),
      profiles: {
        id: 'u4',
        full_name: 'Karan Mehra',
        email: 'karan@example.com',
        role: 'customer',
      },
    },
  ]);

  const { showToast } = useToast();

  const toggleApproval = (id: string, approved: boolean) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_approved: approved } : r))
    );
    showToast(approved ? 'Review approved for public display!' : 'Review hidden from public', 'info');
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review deleted permanently', 'error');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Review Moderation</h1>
        <p className="text-xs text-zinc-400 mt-1">Approve or reject customer reviews before they appear publicly</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    review.is_approved
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {review.is_approved ? 'Approved' : 'Pending Approval'}
                </span>
              </div>

              <p className="text-xs text-zinc-300 italic leading-relaxed">"{review.comment}"</p>
              <p className="text-xs font-semibold text-amber-300">— {review.profiles?.full_name}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <div className="flex gap-2">
                {!review.is_approved ? (
                  <button
                    onClick={() => toggleApproval(review.id, true)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/40 text-xs font-bold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                ) : (
                  <button
                    onClick={() => toggleApproval(review.id, false)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                  >
                    Unapprove
                  </button>
                )}
              </div>

              <button
                onClick={() => deleteReview(review.id)}
                className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

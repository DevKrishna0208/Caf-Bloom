'use client';

import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { ContactMessage } from '@/types/database';
import { useToast } from '@/context/ToastProvider';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: 'm1',
      name: 'Rohan Gupta',
      email: 'rohan@example.com',
      phone: '+91 98111 22334',
      message: 'Hi, we would like to book the upper lounge area for a private birthday party of 25 guests next Saturday!',
      status: 'new',
      created_at: new Date().toISOString(),
    },
    {
      id: 'm2',
      name: 'Sneha Rao',
      email: 'sneha@example.com',
      phone: '+91 97777 88899',
      message: 'Do you offer vegan milk alternatives for all lattes and matcha drinks?',
      status: 'resolved',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const { showToast } = useToast();

  const toggleStatus = (id: string, newStatus: 'new' | 'read' | 'resolved') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
    showToast(`Message marked as ${newStatus}`, 'info');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Contact Messages Inbox</h1>
        <p className="text-xs text-zinc-400 mt-1">Review customer inquiries, catering requests, and feedback</p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">{msg.name}</h3>
                <span className="text-xs text-amber-400">{msg.email} • {msg.phone}</span>
              </div>
              <select
                value={msg.status}
                onChange={(e) => toggleStatus(msg.id, e.target.value as any)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
              "{msg.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { useToast } from '@/context/ToastProvider';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();
  const supabase = createClient();
  const configured = isSupabaseConfigured();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (configured) {
      try {
        const { error } = await supabase.from('contact_messages').insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
          status: 'new',
        });

        if (error) throw error;
      } catch (err) {
        console.error('Contact submission error:', err);
      }
    }

    setSubmitted(true);
    showToast('Thank you! Your message has been received.', 'success');
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Get in Touch</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Contact <span className="gold-gradient-text">Café Bloom</span>
        </h1>
        <p className="text-zinc-400 text-sm">
          Have a question about our menu, private events, or catering? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 space-y-6 shadow-xl">
          <h3 className="text-2xl font-bold text-white">Send Us a Message</h3>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">Thank you! Your message has been received.</h4>
              <p className="text-xs text-zinc-300">
                Our café team will get back to your email within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-xs"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  {...register('name')}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    {...register('email')}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                  {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register('phone')}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what's on your mind..."
                  {...register('message')}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
                {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-zinc-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Café Details */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Café Bloom Location</h3>
            <div className="space-y-4 text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-white block">Main Café Outlet</span>
                  <span>42 Bloom Street, Indiranagar, Bengaluru, Karnataka 560038</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <span>+91 (080) 4567-8900</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <span>hello@cafebloom.com</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> Opening Hours
            </h3>
            <div className="space-y-2 text-sm text-zinc-300">
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span>Monday - Friday</span>
                <span className="font-semibold text-amber-300">7:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span>Saturday - Sunday</span>
                <span className="font-semibold text-amber-300">8:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

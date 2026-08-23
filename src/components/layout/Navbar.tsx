'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ShoppingBag, User, Shield, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { useAuth } from '@/context/AuthProvider';

export const Navbar = () => {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, profile, isAdmin, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/offers', label: 'Offers' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Coffee className="w-6 h-6 text-zinc-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight gold-gradient-text">Café Bloom</span>
            <span className="block text-[10px] text-amber-300/60 uppercase tracking-widest -mt-1 font-mono">
              Artisanal Coffee
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors py-1 ${
                isActive(link.href) ? 'text-amber-400 font-semibold' : 'text-zinc-300 hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            id="cart-drawer-trigger"
            aria-label="Shopping Cart"
            className="relative p-2.5 rounded-xl bg-zinc-900/80 border border-amber-900/40 text-amber-200 hover:text-white hover:border-amber-500/50 transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-zinc-950 text-xs font-bold flex items-center justify-center shadow-md shadow-amber-500/40"
              >
                {itemCount}
              </motion.span>
            )}
          </button>

          {/* User Account / Admin Badge */}
          {user || profile ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900/80 border border-amber-900/40 hover:border-amber-500/50 transition-all text-sm font-medium"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-600/30 flex items-center justify-center text-amber-300 font-bold border border-amber-500/30">
                  {profile?.full_name ? profile.full_name[0].toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline text-zinc-200 max-w-[100px] truncate">
                  {profile?.full_name || 'Account'}
                </span>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-zinc-950 border border-amber-900/50 shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    <div className="px-3 py-2 border-b border-zinc-800">
                      <p className="text-xs text-zinc-400">Signed in as</p>
                      <p className="text-sm font-semibold text-amber-200 truncate">
                        {profile?.full_name || user?.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/account"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-300 hover:text-amber-300 hover:bg-zinc-900 rounded-xl transition-colors"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>

                      <Link
                        href="/orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-300 hover:text-amber-300 hover:bg-zinc-900 rounded-xl transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" /> Order History
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-amber-400 font-semibold hover:bg-amber-950/40 rounded-xl transition-colors"
                        >
                          <Shield className="w-4 h-4 text-amber-400" /> Admin Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-zinc-800">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl gold-gradient-bg text-zinc-950 font-semibold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all"
            >
              <User className="w-4 h-4 stroke-[2.5]" /> Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950/95 border-b border-amber-900/40 px-4 pt-2 pb-6 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.href) ? 'bg-amber-500/10 text-amber-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!user && (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 rounded-xl gold-gradient-bg text-zinc-950 font-bold"
              >
                Login / Register
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

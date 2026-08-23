'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Product, ProductVariant } from '@/types/database';
import { useToast } from './ToastProvider';
import { useAuth } from './AuthProvider';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export interface CartItemState {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItemState[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedOffer: { code: string; discount_value: number; discount_type: 'percentage' | 'fixed' } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItemState[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedOffer, setAppliedOffer] = useState<{
    code: string;
    discount_value: number;
    discount_type: 'percentage' | 'fixed';
  } | null>(null);

  const { showToast } = useToast();
  const { user } = useAuth();
  const supabase = createClient();
  const configured = isSupabaseConfigured();

  // Load cart from localStorage or Supabase on mount
  useEffect(() => {
    const loadCart = async () => {
      if (user && configured) {
        try {
          const { data, error } = await supabase
            .from('cart_items')
            .select(`
              id,
              quantity,
              product_id,
              variant_id,
              product:products(*),
              variant:product_variants(*)
            `)
            .eq('user_id', user.id);

          if (!error && data) {
            const mapped: CartItemState[] = data.map((ci: any) => ({
              id: ci.id,
              product: ci.product,
              variant: ci.variant ?? undefined,
              quantity: ci.quantity,
            }));
            setItems(mapped);
            return;
          }
        } catch (e) {
          console.error('Failed to load user cart:', e);
        }
      }

      // Local storage fallback
      const local = localStorage.getItem('cafe_bloom_cart');
      if (local) {
        try {
          setItems(JSON.parse(local));
        } catch (e) {
          console.error('Failed parsing local cart', e);
        }
      }
    };

    loadCart();
  }, [user]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cafe_bloom_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (product: Product, quantity = 1, variant?: ProductVariant) => {
    const existingIndex = items.findIndex(
      (item) => item.product.id === product.id && item.variant?.id === variant?.id
    );

    let newItems = [...items];
    if (existingIndex > -1) {
      newItems[existingIndex].quantity += quantity;
    } else {
      const newItemId = 'cart-' + Math.random().toString(36).substring(2, 9);
      newItems.push({
        id: newItemId,
        product,
        variant,
        quantity,
      });
    }

    setItems(newItems);
    const variantLabel = variant ? ` (${variant.name})` : '';
    showToast(`${product.name}${variantLabel} added to your cart!`, 'success');
    setIsCartOpen(true);

    // Sync to Supabase if logged in
    if (user && configured) {
      try {
        await supabase.from('cart_items').upsert({
          user_id: user.id,
          product_id: product.id,
          variant_id: variant?.id ?? null,
          quantity: existingIndex > -1 ? newItems[existingIndex].quantity : quantity,
        });
      } catch (e) {
        console.error('Supabase cart sync error', e);
      }
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    const updated = items.map((item) => (item.id === id ? { ...item, quantity } : item));
    setItems(updated);

    if (user && configured) {
      const target = updated.find((i) => i.id === id);
      if (target) {
        try {
          await supabase.from('cart_items').update({ quantity }).eq('id', id);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const removeFromCart = async (id: string) => {
    const target = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (target) {
      showToast(`${target.product.name} removed from cart`, 'info');
    }

    if (user && configured) {
      try {
        await supabase.from('cart_items').delete().eq('id', id);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearCart = async () => {
    setItems([]);
    setAppliedOffer(null);
    localStorage.removeItem('cafe_bloom_cart');
    if (user && configured) {
      try {
        await supabase.from('cart_items').delete().eq('user_id', user.id);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BLOOM20') {
      setAppliedOffer({ code: 'BLOOM20', discount_value: 20, discount_type: 'percentage' });
      showToast('Coupon BLOOM20 applied: 20% OFF!', 'success');
      return true;
    } else if (cleanCode === 'SWEET50') {
      setAppliedOffer({ code: 'SWEET50', discount_value: 50, discount_type: 'fixed' });
      showToast('Coupon SWEET50 applied: ₹50 OFF!', 'success');
      return true;
    } else if (cleanCode === 'WELCOME15') {
      setAppliedOffer({ code: 'WELCOME15', discount_value: 15, discount_type: 'percentage' });
      showToast('Coupon WELCOME15 applied: 15% OFF!', 'success');
      return true;
    } else {
      showToast('Invalid coupon code. Try BLOOM20 or SWEET50', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedOffer(null);
    showToast('Coupon code removed', 'info');
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.variant ? item.variant.price : item.product.price;
      return sum + price * item.quantity;
    }, 0);
  }, [items]);

  const tax = useMemo(() => Math.round(subtotal * 0.05), [subtotal]); // 5% GST

  const discount = useMemo(() => {
    if (!appliedOffer || subtotal === 0) return 0;
    if (appliedOffer.discount_type === 'percentage') {
      return Math.round((subtotal * appliedOffer.discount_value) / 100);
    }
    return Math.min(appliedOffer.discount_value, subtotal);
  }, [subtotal, appliedOffer]);

  const total = useMemo(() => Math.max(0, subtotal + tax - discount), [subtotal, tax, discount]);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedOffer,
        applyCoupon,
        removeCoupon,
        subtotal,
        tax,
        discount,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

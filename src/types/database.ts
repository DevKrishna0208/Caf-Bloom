export type UserRole = 'customer' | 'admin';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type ContactStatus = 'new' | 'read' | 'resolved';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  created_at?: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price: number;
  created_at?: string;
}

export interface Product {
  id: string;
  category_id?: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  image_url?: string;
  rating?: number;
  is_available: boolean;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
  category?: Category;
  variants?: ProductVariant[];
}

export interface Offer {
  id: string;
  title: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  code?: string;
  image_url?: string;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  created_at?: string;
}

export interface CartItem {
  id: string;
  user_id?: string;
  product_id: string;
  quantity: number;
  variant_id?: string;
  created_at?: string;
  updated_at?: string;
  product?: Product;
  variant?: ProductVariant;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  variant_name?: string;
}

export interface Order {
  id: string;
  user_id?: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  payment_status: PaymentStatus;
  payment_method: string;
  customer_name: string;
  customer_phone: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
  items?: OrderItem[];
}

export interface Review {
  id: string;
  user_id?: string;
  product_id?: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at?: string;
  profiles?: Profile;
  products?: Product;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: ContactStatus;
  created_at?: string;
}

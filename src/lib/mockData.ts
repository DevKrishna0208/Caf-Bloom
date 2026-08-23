import { Category, Product, Offer, GalleryItem, Review, Order } from '@/types/database';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Coffee',
    slug: 'coffee',
    description: 'Artisanal espresso, single-origin cold brews, and signature lattes.',
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    is_active: true,
  },
  {
    id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Tea & Infusions',
    slug: 'tea',
    description: 'Handpicked organic leaf teas, soothing herbal infusions, and masala chai.',
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    is_active: true,
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    name: 'Breakfast',
    slug: 'breakfast',
    description: 'Freshly baked croissants, avocado toast, and warm morning platters.',
    image_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    is_active: true,
  },
  {
    id: 'c1000000-0000-0000-0000-000000000004',
    name: 'Snacks',
    slug: 'snacks',
    description: 'Artisan sourdough sandwiches, gourmet sliders, and cheese boards.',
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    is_active: true,
  },
  {
    id: 'c1000000-0000-0000-0000-000000000005',
    name: 'Desserts',
    slug: 'desserts',
    description: 'Decadent chocolate brownies, berry cheesecakes, and french pastries.',
    image_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    is_active: true,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p2000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Cappuccino',
    slug: 'cappuccino',
    description: 'Rich espresso topped with equal parts steamed milk and dense velvety foam.',
    price: 160,
    image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    is_available: true,
    is_featured: true,
    variants: [
      { id: 'v1', product_id: 'p1', name: 'Regular (8 oz)', price: 160 },
      { id: 'v2', product_id: 'p1', name: 'Medium (12 oz)', price: 190 },
      { id: 'v3', product_id: 'p1', name: 'Large (16 oz)', price: 220 },
    ]
  },
  {
    id: 'p2000000-0000-0000-0000-000000000002',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Café Latte',
    slug: 'cafe-latte',
    description: 'Smooth double espresso combined with silky steamed milk and subtle latte art.',
    price: 180,
    image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    is_available: true,
    is_featured: true,
    variants: [
      { id: 'v4', product_id: 'p2', name: 'Regular (8 oz)', price: 180 },
      { id: 'v5', product_id: 'p2', name: 'Medium (12 oz)', price: 210 },
      { id: 'v6', product_id: 'p2', name: 'Large (16 oz)', price: 240 },
    ]
  },
  {
    id: 'p2000000-0000-0000-0000-000000000003',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Cold Coffee Bloom',
    slug: 'cold-coffee',
    description: 'Signature thick blended iced coffee infused with Madagascar vanilla bean gelato.',
    price: 190,
    image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    is_available: true,
    is_featured: true,
  },
  {
    id: 'p2000000-0000-0000-0000-000000000004',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Dark Chocolate Mocha',
    slug: 'mocha',
    description: 'Espresso layered with Belgian dark chocolate ganache and textured whole milk.',
    price: 200,
    image_url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    is_available: true,
    is_featured: false,
  },
  {
    id: 'p2000000-0000-0000-0000-000000000005',
    category_id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Kulhad Masala Chai',
    slug: 'masala-chai',
    description: 'Slow-brewed Assam CTC black tea simmered with cardamom, ginger, and nutmeg.',
    price: 100,
    image_url: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    is_available: true,
    is_featured: true,
  },
  {
    id: 'p2000000-0000-0000-0000-000000000007',
    category_id: 'c1000000-0000-0000-0000-000000000003',
    name: 'Butter Croissant',
    slug: 'butter-croissant',
    description: 'Flaky, golden 27-layer French butter croissant baked fresh every morning.',
    price: 140,
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    is_available: true,
    is_featured: true,
  },
  {
    id: 'p2000000-0000-0000-0000-000000000009',
    category_id: 'c1000000-0000-0000-0000-000000000004',
    name: 'Grilled Cheese Sandwich',
    slug: 'cheese-sandwich',
    description: 'Aged sharp cheddar, mozzarella, and caramelized onions toasted to golden perfection.',
    price: 180,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    is_available: true,
    is_featured: true,
  },
  {
    id: 'p2000000-0000-0000-0000-000000000010',
    category_id: 'c1000000-0000-0000-0000-000000000005',
    name: 'Warm Fudge Brownie',
    slug: 'chocolate-brownie',
    description: 'Fudge chocolate brownie baked with roasted walnuts, served with vanilla scoop.',
    price: 150,
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    is_available: true,
    is_featured: true,
  },
  {
    id: 'p2000000-0000-0000-0000-000000000011',
    category_id: 'c1000000-0000-0000-0000-000000000005',
    name: 'Blueberry Cheesecake',
    slug: 'blueberry-cheesecake',
    description: 'New York style baked cheesecake topped with fresh wild blueberry compote.',
    price: 220,
    image_url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    is_available: true,
    is_featured: true,
  },
];

export const MOCK_OFFERS: Offer[] = [
  {
    id: 'off-1',
    title: 'Morning Brew Special',
    description: 'Get 20% off on all specialty coffees before 11 AM.',
    discount_type: 'percentage',
    discount_value: 20,
    code: 'BLOOM20',
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    is_active: true,
  },
  {
    id: 'off-2',
    title: 'Weekend Dessert Delight',
    description: 'Flat ₹50 off on dessert combos over ₹300.',
    discount_type: 'fixed',
    discount_value: 50,
    code: 'SWEET50',
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    is_active: true,
  },
  {
    id: 'off-3',
    title: 'First Order Celebration',
    description: 'Enjoy 15% discount on your first order at Café Bloom.',
    discount_type: 'percentage',
    discount_value: 15,
    code: 'WELCOME15',
    image_url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    is_active: true,
  },
];

export const MOCK_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Sunlit Coffee Bar',
    image_url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
    category: 'Interior',
    is_featured: true,
  },
  {
    id: 'g2',
    title: 'Handcrafted Latte Art',
    image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=80',
    category: 'Coffee',
    is_featured: true,
  },
  {
    id: 'g3',
    title: 'Artisanal Croissant Stack',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80',
    category: 'Desserts',
    is_featured: true,
  },
  {
    id: 'g4',
    title: 'Cozy Seating Nook',
    image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    category: 'Interior',
    is_featured: true,
  },
  {
    id: 'g5',
    title: 'Live Barista Pouring',
    image_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80',
    category: 'Events',
    is_featured: true,
  },
  {
    id: 'g6',
    title: 'Gourmet Breakfast Platter',
    image_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
    category: 'Food',
    is_featured: true,
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    rating: 5,
    comment: 'The best cappuccino and the most relaxing atmosphere in town! Loved the velvet foam and aesthetic interior.',
    is_approved: true,
    created_at: new Date().toISOString(),
    profiles: {
      id: 'u1',
      full_name: 'Rahul Sharma',
      email: 'rahul@example.com',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'customer'
    }
  },
  {
    id: 'r2',
    rating: 5,
    comment: 'Their caramel latte and blueberry cheesecake are absolutely amazing. Fast service and super friendly staff.',
    is_approved: true,
    created_at: new Date().toISOString(),
    profiles: {
      id: 'u2',
      full_name: 'Priya Patel',
      email: 'priya@example.com',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      role: 'customer'
    }
  },
  {
    id: 'r3',
    rating: 5,
    comment: 'Café Bloom is my go-to spot for working and meeting friends. High speed WiFi and artisanal chai!',
    is_approved: true,
    created_at: new Date().toISOString(),
    profiles: {
      id: 'u3',
      full_name: 'Ananya Verma',
      email: 'ananya@example.com',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      role: 'customer'
    }
  }
];

export const MOCK_INITIAL_ORDERS: Order[] = [
  {
    id: 'CB-10482',
    user_id: 'u1',
    status: 'preparing',
    subtotal: 340,
    tax: 17,
    discount: 20,
    total: 337,
    payment_status: 'paid',
    payment_method: 'UPI / Online Card',
    customer_name: 'Rahul Sharma',
    customer_phone: '+91 98765 43210',
    notes: 'Extra hot cappuccino, please!',
    created_at: new Date().toISOString(),
    items: [
      { product_name: 'Cappuccino', quantity: 1, unit_price: 160, total_price: 160, variant_name: 'Regular (8 oz)' },
      { product_name: 'Grilled Cheese Sandwich', quantity: 1, unit_price: 180, total_price: 180 }
    ]
  },
  {
    id: 'CB-10481',
    user_id: 'u2',
    status: 'ready',
    subtotal: 220,
    tax: 11,
    discount: 0,
    total: 231,
    payment_status: 'paid',
    payment_method: 'Card at counter',
    customer_name: 'Priya Patel',
    customer_phone: '+91 91234 56789',
    notes: 'Dine-in table 4',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    items: [
      { product_name: 'Blueberry Cheesecake', quantity: 1, unit_price: 220, total_price: 220 }
    ]
  }
];

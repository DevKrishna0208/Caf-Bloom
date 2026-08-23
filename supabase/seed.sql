-- Seed Data for Cafe Bloom

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url, is_active) VALUES
('c1000000-0000-0000-0000-000000000001', 'Coffee', 'coffee', 'Artisanal espresso, single-origin cold brews, and signature lattes.', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', true),
('c1000000-0000-0000-0000-000000000002', 'Tea & Infusions', 'tea', 'Handpicked organic leaf teas, soothing herbal infusions, and masala chai.', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80', true),
('c1000000-0000-0000-0000-000000000003', 'Breakfast', 'breakfast', 'Freshly baked croissants, avocado toast, and warm morning platters.', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80', true),
('c1000000-0000-0000-0000-000000000004', 'Snacks', 'snacks', 'Artisan sourdough sandwiches, gourmet sliders, and cheese boards.', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', true),
('c1000000-0000-0000-0000-000000000005', 'Desserts', 'desserts', 'Decadent chocolate brownies, berry cheesecakes, and french pastries.', 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80', true)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED PRODUCTS
INSERT INTO public.products (id, category_id, name, slug, description, price, image_url, rating, is_available, is_featured) VALUES
('p2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Cappuccino', 'cappuccino', 'Rich espresso topped with equal parts steamed milk and dense velvety foam.', 160.00, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80', 4.9, true, true),
('p2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Café Latte', 'cafe-latte', 'Smooth double espresso combined with silky steamed milk and subtle latte art.', 180.00, 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80', 4.8, true, true),
('p2000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Cold Coffee Bloom', 'cold-coffee', 'Signature thick blended iced coffee infused with Madagascar vanilla bean gelato.', 190.00, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', 4.9, true, true),
('p2000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 'Dark Chocolate Mocha', 'mocha', 'Espresso layered with Belgian dark chocolate ganache and textured whole milk.', 200.00, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80', 4.7, true, false),

('p2000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'Kulhad Masala Chai', 'masala-chai', 'Slow-brewed Assam CTC black tea simmered with cardamom, ginger, and nutmeg.', 100.00, 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80', 4.9, true, true),
('p2000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000002', 'Matcha Green Tea Latte', 'matcha-latte', 'Ceremonial grade Uji matcha whisked with warm oat milk and organic honey.', 210.00, 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80', 4.6, true, false),

('p2000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000003', 'Butter Croissant', 'butter-croissant', 'Flaky, golden 27-layer French butter croissant baked fresh every morning.', 140.00, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80', 4.8, true, true),
('p2000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000003', 'Avocado Sourdough Toast', 'avocado-toast', 'Hass avocado mash, microgreens, cherry tomatoes, and chilli flakes on sourdough.', 240.00, 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80', 4.7, true, false),

('p2000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000004', 'Grilled Cheese Sandwich', 'cheese-sandwich', 'Aged sharp cheddar, mozzarella, and caramelized onions toasted to golden perfection.', 180.00, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', 4.8, true, true),
('p2000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000005', 'Warm Fudge Brownie', 'chocolate-brownie', 'Fudge chocolate brownie baked with roasted walnuts, served with vanilla scoop.', 150.00, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80', 4.9, true, true),
('p2000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000005', 'Blueberry Cheesecake', 'blueberry-cheesecake', 'New York style baked cheesecake topped with fresh wild blueberry compote.', 220.00, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80', 4.9, true, true)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED PRODUCT VARIANTS
INSERT INTO public.product_variants (product_id, name, price) VALUES
('p2000000-0000-0000-0000-000000000001', 'Regular (8 oz)', 160.00),
('p2000000-0000-0000-0000-000000000001', 'Medium (12 oz)', 190.00),
('p2000000-0000-0000-0000-000000000001', 'Large (16 oz)', 220.00),

('p2000000-0000-0000-0000-000000000002', 'Regular (8 oz)', 180.00),
('p2000000-0000-0000-0000-000000000002', 'Medium (12 oz)', 210.00),
('p2000000-0000-0000-0000-000000000002', 'Large (16 oz)', 240.00),

('p2000000-0000-0000-0000-000000000003', 'Medium (12 oz)', 190.00),
('p2000000-0000-0000-0000-000000000003', 'Large (16 oz)', 230.00);

-- 4. SEED OFFERS
INSERT INTO public.offers (title, description, discount_type, discount_value, code, image_url, is_active) VALUES
('Morning Brew Special', 'Get 20% off on all specialty coffees before 11 AM.', 'percentage', 20, 'BLOOM20', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', true),
('Weekend Dessert Delight', 'Flat ₹50 off on dessert combos over ₹300.', 'fixed', 50, 'SWEET50', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', true),
('First Order Celebration', 'Enjoy 15% discount on your first order at Café Bloom.', 'percentage', 15, 'WELCOME15', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80', true);

-- 5. SEED GALLERY
INSERT INTO public.gallery (title, image_url, category, is_featured) VALUES
('Sunlit Coffee Bar', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80', 'Interior', true),
('Handcrafted Latte Art', 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=80', 'Coffee', true),
('Artisanal Croissant Stack', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80', 'Desserts', true),
('Cozy Seating Nook', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80', 'Interior', true),
('Live Barista Pouring', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80', 'Events', true),
('Gourmet Breakfast Platter', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80', 'Food', true);

-- 6. SEED REVIEWS
INSERT INTO public.reviews (rating, comment, is_approved) VALUES
(5, 'The best cappuccino and the most relaxing atmosphere in town! Loved the velvet foam and aesthetic interior.', true),
(5, 'Their caramel latte and blueberry cheesecake are absolutely amazing. Fast service and super friendly staff.', true),
(5, 'Café Bloom is my go-to spot for working and meeting friends. High speed WiFi and artisanal chai!', true);

-- INSTRUCTION TO MAKE A USER ADMIN:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';

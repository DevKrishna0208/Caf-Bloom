import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastProvider';
import { AuthProvider } from '@/context/AuthProvider';
import { CartProvider } from '@/context/CartProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'Café Bloom | Artisanal Coffee & Bakery',
  description: 'Handcrafted coffee, fresh food, and unforgettable moments — all in one cozy place.',
  openGraph: {
    title: 'Café Bloom | Artisanal Coffee & Bakery',
    description: 'Freshly Brewed. Beautifully Served. Order coffee, teas, breakfasts & pastries online.',
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0d0b09] text-zinc-100 min-h-screen flex flex-col antialiased">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

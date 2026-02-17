import type { Metadata } from 'next';
import './globals.css';
import { RecentlyViewedProvider } from '@/components/providers/RecentlyViewedProvider';

export const metadata: Metadata = {
  title: {
    default: 'Rusovan - Tienda Online',
    template: '%s | Rusovan'
  },
  description: 'Descubre ropa deportiva, accesorios y artículos para el hogar y mascotas en Rusovan. Calidad premium y los mejores precios.',
  keywords: ['ropa deportiva', 'accesorios', 'hogar', 'mascotas', 'tienda online', 'Rusovan'],
  authors: [{ name: 'Rusovan' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://rusovan.com',
    siteName: 'Rusovan',
    title: 'Rusovan - Tienda Online de Ropa Deportiva, Accesorios y Artículos para el Hogar',
    description: 'Descubre ropa deportiva, accesorios y artículos para el hogar y mascotas en Rusovan.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <RecentlyViewedProvider>
          {children}
        </RecentlyViewedProvider>
      </body>
    </html>
  );
}

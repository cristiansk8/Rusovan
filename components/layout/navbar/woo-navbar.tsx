import Link from 'next/link';
import { Suspense } from 'react';
import AnnouncementBar from '@/components/custom/AnnouncementBar';
import { WooNavbarClient } from './woo-navbar-client';

/**
 * NAVBAR COMPLETO - WooCommerce
 * Server component que carga datos y pasa al client component
 */

const SITE_NAME = process.env.SITE_NAME || 'Rusovan';

async function getCategories() {
  try {
    const { getCollections } = await import('@/lib/woocommerce');
    const collections = await getCollections();

    return (collections || []).map((collection: any) => ({
      title: collection.name || collection.title,
      path: `/search/${collection.slug || collection.handle}`
    }));
  } catch (error) {
    return [];
  }
}

export async function WooNavbar() {
  const categories = await getCategories();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBar />
      <Suspense fallback={<WooNavbarClient categories={[]} SITE_NAME={SITE_NAME} />}>
        <WooNavbarClient categories={categories} SITE_NAME={SITE_NAME} />
      </Suspense>
    </div>
  );
}

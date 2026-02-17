'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/components/providers/RecentlyViewedProvider';
import { RecentlyViewedProducts } from './RecentlyViewed';

interface ProductViewTrackerProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price?: string;
    image?: string;
  };
}

export function ProductViewTracker({ product }: ProductViewTrackerProps) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    // Agregar producto a vistos recientemente cuando se monta el componente
    addProduct({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image
    });
  }, [product.id, product.slug, product.name, product.price, product.image, addProduct]);

  return (
    <RecentlyViewedProducts
      currentProductId={product.id}
      title="Quizás te guste"
      maxProducts={6}
    />
  );
}

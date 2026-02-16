import Link from 'next/link';
import { WooNavbar } from '@/components/layout/navbar/woo-navbar';
import FooterCustom from '@/components/custom/FooterCustom';

/**
 * PÁGINA INDIVIDUAL DE PRODUCTO - WooCommerce
 * Next.js 15: params es async y debe ser awaitedd
 */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductQuery } = await import('@/lib/woocommerce/queries/product');

    const res = await woocommerceFetch<any>({
      query: getProductQuery,
      variables: { slug }
    });

    const product = res.body.data.product;

    if (!product) {
      return {
        title: 'Producto no encontrado'
      };
    }

    return {
      title: product.name,
      description: product.shortDescription || product.description?.slice(0, 160) || ''
    };
  } catch {
    return {
      title: 'Producto'
    };
  }
}

async function getProduct(slug: string) {
  try {
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductQuery } = await import('@/lib/woocommerce/queries/product');

    const res = await woocommerceFetch<any>({
      query: getProductQuery,
      variables: { slug }
    });

    return res.body.data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const price = product.price || 'Precio no disponible';
  const image = product.image?.sourceUrl || product.image?.url || '/placeholder.jpg';
  const galleryImages = product.galleryImages?.nodes || [];

  // Función simple para limpiar HTML - solo extraer texto
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const shortDescription = product.shortDescription ? stripHtml(product.shortDescription) : '';
  const description = product.description ? stripHtml(product.description) : '';

  return (
    <>
      <WooNavbar />
      <main className="min-h-screen bg-white pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Inicio
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={image}
                alt={product.name || 'Producto'}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img: any, index: number) => (
                  <div
                    key={img.sourceUrl || index}
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:opacity-75"
                  >
                    <img
                      src={img.sourceUrl}
                      alt={`${product.name || 'Producto'} - ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-3xl text-gray-900 font-semibold mb-4">
                {price}
              </p>

              {shortDescription && (
                <div className="text-gray-700 leading-relaxed mb-6">
                  {shortDescription}
                </div>
              )}

              {description && (
                <div className="text-gray-600 leading-relaxed">
                  {description}
                </div>
              )}
            </div>

            {/* Stock status */}
            {product.stockStatus && (
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stockStatus === 'IN_STOCK'
                    ? 'bg-green-100 text-green-800'
                    : product.stockStatus === 'OUT_OF_STOCK'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {product.stockStatus === 'IN_STOCK' && '✓ En stock'}
                  {product.stockStatus === 'OUT_OF_STOCK' && '✗ Agotado'}
                  {product.stockStatus === 'ON_BACKORDER' && '⏳ Bajo pedido'}
                </span>
              </div>
            )}

            {/* Botón de compra - temporal */}
            <div className="space-y-4">
              <button className="w-full bg-green-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-green-800 transition-colors">
                Agregar al carrito
              </button>

              <Link
                href="/"
                className="block text-center text-gray-600 hover:text-gray-900"
              >
                ← Volver a productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <FooterCustom />
    </>
  );
}

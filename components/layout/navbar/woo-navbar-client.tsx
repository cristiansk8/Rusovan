'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { CategoryDropdown } from './category-dropdown';
import { CartIcon } from '@/components/cart/CartIcon';

/**
 * NAVBAR CLIENT COMPONENT - WooCommerce
 * Maneja toda la interactividad: mobile menu, búsqueda, etc.
 */

interface Category {
  title: string;
  path: string;
}

interface WooNavbarClientProps {
  categories: Category[];
  SITE_NAME: string;
}

// Mobile Menu Button
function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open mobile menu"
      className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden"
    >
      <Bars3Icon className="h-6 w-6" />
    </button>
  );
}

// Search Component
function WooSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        name="q"
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-black placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mr-3 flex h-full items-center text-gray-400 hover:text-gray-600"
        aria-label="Buscar"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </button>
    </form>
  );
}

// Mobile Menu
function WooMobileMenu({
  isOpen,
  onClose,
  categories,
  SITE_NAME
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  SITE_NAME: string;
}) {
  const pathname = usePathname();

  // Cerrar menú al cambiar de ruta
  if (isOpen && pathname) {
    // Se mantendrá abierto si el usuario lo quiere
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full animate-in slide-in-from-left max-w-sm flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <span className="text-lg font-semibold">{SITE_NAME}</span>
          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
            aria-label="Cerrar menú"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Search in mobile */}
          <div className="mb-6">
            <WooSearch />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={onClose}
              className="border-b border-gray-100 py-3 text-lg font-medium text-gray-900 hover:text-gray-600"
            >
              Inicio
            </Link>
            <Link
              href="/search"
              onClick={onClose}
              className="border-b border-gray-100 py-3 text-lg font-medium text-gray-900 hover:text-gray-600"
            >
              Ver Productos
            </Link>
            {categories.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className="border-b border-gray-100 py-3 text-lg font-medium text-gray-900 hover:text-gray-600"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// Main Client Component
export function WooNavbarClient({ categories, SITE_NAME }: WooNavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm p-4 lg:px-6 shadow-md">
        {/* Mobile Menu Button */}
        <div className="block flex-none md:hidden">
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
        </div>

        <div className="flex w-full items-center">
          {/* Logo + Categories */}
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-gray-200 bg-white">
                <span className="text-lg font-bold text-gray-900">R</span>
              </div>
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block text-gray-900">
                {SITE_NAME}
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden gap-6 text-sm md:flex md:items-center">
              <Link
                href="/search"
                prefetch={true}
                className="text-gray-600 hover:text-black transition-colors"
              >
                Productos
              </Link>
              <CategoryDropdown categories={categories} />
            </div>
          </div>

          {/* Search */}
          <div className="hidden justify-center md:flex md:w-1/3 px-4">
            <WooSearch />
          </div>

          {/* Cart */}
          <div className="flex justify-end md:w-1/3">
            <CartIcon />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <WooMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
        SITE_NAME={SITE_NAME}
      />
    </>
  );
}

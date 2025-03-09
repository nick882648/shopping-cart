'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from './Providers';

export default function Navbar() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-pink-600">Elegance Essentials</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-pink-600">
              Products
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-pink-600">
              Categories
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-pink-600">
              Cart
            </Link>
            {user ? (
              <Link href="/account" className="text-gray-600 hover:text-pink-600">
                Account
              </Link>
            ) : (
              <Link href="/auth/sign-in" className="text-gray-600 hover:text-pink-600">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-pink-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/products"
              className="block px-3 py-2 text-gray-600 hover:text-pink-600"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 text-gray-600 hover:text-pink-600"
            >
              Categories
            </Link>
            <Link
              href="/cart"
              className="block px-3 py-2 text-gray-600 hover:text-pink-600"
            >
              Cart
            </Link>
            {user ? (
              <Link
                href="/account"
                className="block px-3 py-2 text-gray-600 hover:text-pink-600"
              >
                Account
              </Link>
            ) : (
              <Link
                href="/auth/sign-in"
                className="block px-3 py-2 text-gray-600 hover:text-pink-600"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 
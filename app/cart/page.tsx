'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../components/Providers';
import { useUser } from '../components/Providers';
import { MediaCarousel } from '../components/MediaCarousel';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();
  const { user } = useUser();

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  const promoCarouselItems = [
    {
      type: 'video' as const,
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      title: 'Fresh drops, fast checkout',
      subtitle: 'A smoother cart experience with quick previews.',
    },
    {
      type: 'video' as const,
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Limited-time essentials',
      subtitle: 'Add your favorites before they’re gone.',
    },
    {
      type: 'image' as const,
      src: 'https://picsum.photos/1200/600?grayscale',
      alt: 'Fashion banner',
      title: 'Style that ships',
      subtitle: 'Free returns on eligible items.',
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Home Button */}
          <div className="flex justify-end mb-8">
            <Link
              href="/"
                className="inline-flex items-center px-4 py-2 bg-coral-100 text-gray-800 rounded-md hover:bg-coral-200 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Sign In to Continue</h1>
            <p className="text-lg text-gray-600 mb-8">
              You need to be signed in to access your shopping cart
            </p>
            <div className="space-x-4">
              <Link
                href="/auth/sign-in"
                className="inline-block bg-coral-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-coral-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="inline-block bg-gray-100 text-gray-800 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Home Button */}
          <div className="flex justify-end mb-8">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-coral-100 text-gray-800 rounded-md hover:bg-coral-200 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart is Empty</h1>
            <Link
              href="/products"
              className="inline-block bg-coral-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-coral-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Home Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-coral-100 text-gray-800 rounded-md hover:bg-coral-200 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </Link>
        </div>

        <MediaCarousel items={promoCarouselItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItemQuantity(item.id, parseInt(e.target.value))
                      }
                      className="rounded-md border-gray-300 text-base"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-base text-gray-600">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <p>Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-medium text-gray-900">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-coral-600 text-white mt-6 py-3 px-4 rounded-md font-medium hover:bg-coral-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const products = [
  {
    id: '1',
    name: 'Classic Comfort Bra',
    price: 39.99,
    image: 'https://picsum.photos/seed/bra1/600/600',
    category: 'bras',
    description: 'Everyday comfort with seamless support',
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['Nude', 'Black', 'White'],
  },
  {
    id: '2',
    name: 'Seamless Brief',
    price: 19.99,
    image: 'https://picsum.photos/seed/brief1/600/600',
    category: 'panties',
    description: 'No-show seamless comfort for everyday wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Nude', 'Black', 'White'],
  },
  {
    id: '3',
    name: 'Lace Collection Set',
    price: 59.99,
    image: 'https://picsum.photos/seed/set1/600/600',
    category: 'sets',
    description: 'Elegant lace set for special occasions',
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['Black', 'Red', 'Navy'],
  },
  {
    id: '4',
    name: 'Cotton Essentials Pack',
    price: 29.99,
    image: 'https://picsum.photos/seed/cotton1/600/600',
    category: 'basics',
    description: 'Comfortable cotton basics for everyday wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Grey', 'Black'],
  },
  {
    id: '5',
    name: 'Silk Pajama Set',
    price: 89.99,
    image: 'https://picsum.photos/seed/sleep1/600/600',
    category: 'sleepwear',
    description: 'Luxurious silk pajamas for a comfortable night\'s sleep',
  },
  {
    id: '6',
    name: 'Sports Bra Pro',
    price: 44.99,
    image: 'https://picsum.photos/seed/active1/600/600',
    category: 'activewear',
    description: 'High-impact support for your workouts',
  },
];

const categories = [
  'All',
  'Bras',
  'Panties',
  'Sets',
  'Basics',
  'Sleepwear',
  'Activewear',
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1));
    }
  }, [searchParams]);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Home Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-pink-600 hover:text-pink-700"
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
            Back to Home
          </Link>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
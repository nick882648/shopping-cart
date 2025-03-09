'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 'bras',
    name: 'Bras',
    description: 'Comfortable and supportive bras for everyday wear',
    image: 'https://picsum.photos/seed/bras/600/400',
    itemCount: 12
  },
  {
    id: 'panties',
    name: 'Panties',
    description: 'Seamless and comfortable underwear collection',
    image: 'https://picsum.photos/seed/panties/600/400',
    itemCount: 15
  },
  {
    id: 'sets',
    name: 'Sets',
    description: 'Matching sets for a coordinated look',
    image: 'https://picsum.photos/seed/sets/600/400',
    itemCount: 8
  },
  {
    id: 'basics',
    name: 'Basics',
    description: 'Essential everyday pieces',
    image: 'https://picsum.photos/seed/basics/600/400',
    itemCount: 10
  },
  {
    id: 'sleepwear',
    name: 'Sleepwear',
    description: 'Comfortable sleepwear and loungewear',
    image: 'https://picsum.photos/seed/sleepwear/600/400',
    itemCount: 6
  },
  {
    id: 'activewear',
    name: 'Activewear',
    description: 'Performance wear for active lifestyles',
    image: 'https://picsum.photos/seed/activewear/600/400',
    itemCount: 9
  }
];

export default function CategoriesPage() {
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

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-lg text-gray-600">Explore our collections</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group"
            >
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({category.itemCount} items)
                    </span>
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
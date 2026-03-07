'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const products = [
  {
    id: '1',
    name: 'AAKRITI B CUP',
    price: 320,
    image: 'https://picsum.photos/seed/aakriti-b/600/600',
    category: 'bras',
    description: 'Single piece pack, classic B-cup support.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK'],
  },
  {
    id: '2',
    name: 'NATASHA B CUP',
    price: 280,
    image: 'https://picsum.photos/seed/natasha-b/600/600',
    category: 'bras',
    description: 'Single piece pack with soft everyday support.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'LAVENDER', 'RANI', 'PEACH'],
  },
  {
    id: '3',
    name: 'TANYA B CUP',
    price: 175,
    image: 'https://picsum.photos/seed/tanya-b/600/600',
    category: 'bras',
    description: 'Loose pcs mithai box packing, daily wear comfort.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK'],
  },
  {
    id: '4',
    name: 'SONALI',
    price: 190,
    image: 'https://picsum.photos/seed/sonali/600/600',
    category: 'bras',
    description: 'Loose pcs mithai box packing, multi-color range.',
    sizes: ['32', '34', '36', '38'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'PISTA', 'RED BEAN', 'CARROT'],
  },
  {
    id: '5',
    name: 'COMFORT B CUP',
    price: 335,
    image: 'https://picsum.photos/seed/comfort-b/600/600',
    category: 'bras',
    description: 'Single piece pack, cushioned comfort support.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'MAGENTA', 'PINK', 'CARROT'],
  },
  {
    id: '6',
    name: 'SECRET B CUP',
    price: 260,
    image: 'https://picsum.photos/seed/secret-b/600/600',
    category: 'bras',
    description: 'Single piece pack, premium colors for special days.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'NUDE', 'RED BEAN', 'NAVY GREY', 'LAVENDER', 'PINK', 'BRUNETEE'],
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

const allColors = Array.from(
  new Set(
    products.flatMap((p) => (Array.isArray(p.colors) ? p.colors : []))
  )
);

const allSizes = Array.from(
  new Set(
    products.flatMap((p) => (Array.isArray(p.sizes) ? p.sizes : []))
  )
);

const allPrices = products.map((p) => p.price);
const MIN_PRICE = Math.min(...allPrices);
const MAX_PRICE = Math.max(...allPrices);

function ProductList() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState<string | 'All'>('All');
  const [selectedSize, setSelectedSize] = useState<string | 'All'>('All');
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1));
    }
  }, [searchParams]);

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === 'All'
        ? true
        : product.category === selectedCategory.toLowerCase()
    )
    .filter((product) =>
      selectedColor === 'All'
        ? true
        : Array.isArray(product.colors) && product.colors.includes(selectedColor)
    )
    .filter((product) =>
      selectedSize === 'All'
        ? true
        : Array.isArray(product.sizes) && product.sizes.includes(selectedSize)
    )
    .filter((product) => product.price >= minPrice && product.price <= maxPrice);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Home Button */}
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

        {/* Main Container with Left Sidebar */}
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Filters</h2>

              {/* Category Pills */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Category</p>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium text-left ${
                        selectedCategory === category
                          ? 'bg-coral-600 text-white'
                          : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Price range (₹)</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={MIN_PRICE}
                      max={maxPrice}
                      value={minPrice}
                      onChange={(e) => {
                        const v = Number(e.target.value) || MIN_PRICE;
                        setMinPrice(Math.min(Math.max(MIN_PRICE, v), maxPrice));
                      }}
                      className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                  <span className="text-xs text-gray-500">to</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={minPrice}
                      max={MAX_PRICE}
                      value={maxPrice}
                      onChange={(e) => {
                        const v = Number(e.target.value) || MAX_PRICE;
                        setMaxPrice(Math.max(Math.min(MAX_PRICE, v), minPrice));
                      }}
                      className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  ₹{minPrice} - ₹{maxPrice}
                </p>
              </div>

              {/* Color filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Color</p>
                <select
                  value={selectedColor}
                  onChange={(e) =>
                    setSelectedColor(e.target.value === 'All' ? 'All' : e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="All">All colors</option>
                  {allColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size filter */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Size</p>
                <select
                  value={selectedSize}
                  onChange={(e) =>
                    setSelectedSize(e.target.value === 'All' ? 'All' : e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="All">All sizes</option>
                  {allSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Content - Products Grid */}
          <div className="flex-1">
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
                    ₹{product.price.toFixed(0)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    }>
      <ProductList />
    </Suspense>
  );
} 
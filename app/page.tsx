import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const featuredProducts = [
  {
    id: '1',
    name: 'Classic Comfort Bra',
    price: 39.99,
    image: 'https://picsum.photos/seed/bra1/600/600',
    category: 'Bras',
  },
  {
    id: '2',
    name: 'Seamless Brief',
    price: 19.99,
    image: 'https://picsum.photos/seed/brief1/600/600',
    category: 'Panties',
  },
  {
    id: '3',
    name: 'Lace Collection Set',
    price: 59.99,
    image: 'https://picsum.photos/seed/set1/600/600',
    category: 'Sets',
  },
  {
    id: '4',
    name: 'Cotton Essentials Pack',
    price: 29.99,
    image: 'https://picsum.photos/seed/cotton1/600/600',
    category: 'Basics',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-pink-50">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/90 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Comfort Meets Elegance
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Discover our premium collection of comfortable and stylish undergarments
          </p>
          <Link
            href="/products"
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Crafted with the finest materials for lasting comfort
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Size Inclusive</h3>
              <p className="text-gray-600">
                Designed to fit and flatter every body type
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                30-day hassle-free returns and exchanges
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
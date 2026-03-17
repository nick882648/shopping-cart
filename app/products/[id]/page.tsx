'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../components/Providers';

const products = [
  {
    id: '1',
    name: 'AAKRITI B CUP',
    price: 320,
    image: 'https://picsum.photos/seed/aakriti-b/600/600',
    category: 'Bras',
    description: 'Single piece pack, classic B-cup support.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK'],
  },
  {
    id: '2',
    name: 'NATASHA B CUP',
    price: 280,
    image: 'https://picsum.photos/seed/natasha-b/600/600',
    category: 'Bras',
    description: 'Single piece pack with soft everyday support.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'LAVENDER', 'RANI', 'PEACH'],
  },
  {
    id: '3',
    name: 'TANYA B CUP',
    price: 175,
    image: 'https://picsum.photos/seed/tanya-b/600/600',
    category: 'Bras',
    description: 'Loose pcs mithai box packing, daily wear comfort.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK'],
  },
  {
    id: '4',
    name: 'SONALI',
    price: 190,
    image: 'https://picsum.photos/seed/sonali/600/600',
    category: 'Bras',
    description: 'Loose pcs mithai box packing, multi-color range.',
    sizes: ['32', '34', '36', '38'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'PISTA', 'RED BEAN', 'CARROT'],
  },
  {
    id: '5',
    name: 'COMFORT B CUP',
    price: 335,
    image: 'https://picsum.photos/seed/comfort-b/600/600',
    category: 'Bras',
    description: 'Single piece pack, cushioned comfort support.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'MAGENTA', 'PINK', 'CARROT'],
  },
  {
    id: '6',
    name: 'SECRET B CUP',
    price: 260,
    image: 'https://picsum.photos/seed/secret-b/600/600',
    category: 'Bras',
    description: 'Single piece pack, premium colors for special days.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'NUDE', 'RED BEAN', 'NAVY GREY', 'LAVENDER', 'PINK', 'BRUNETEE'],
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    });

    alert('Product added to cart!');
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-500 mb-4">{product.category}</p>
            <p className="text-2xl font-semibold text-gray-900 mb-6">
              ₹{product.price.toFixed(0)}
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-sm font-medium rounded-md ${
                      selectedSize === size
                        ? 'bg-coral-600 text-white'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Color</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`py-2 text-sm font-medium rounded-md ${
                      selectedColor === color
                        ? 'bg-coral-600 text-white'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-coral-600 text-white py-3 px-4 rounded-md font-medium hover:bg-coral-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../components/Providers';

const products = [
  {
    id: '1',
    name: 'Classic Comfort Bra',
    price: 39.99,
    image: 'https://picsum.photos/seed/bra1/600/600',
    category: 'Bras',
    description: 'Everyday comfort with seamless support',
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['Nude', 'Black', 'White'],
  },
  {
    id: '2',
    name: 'Seamless Brief',
    price: 19.99,
    image: 'https://picsum.photos/seed/brief1/600/600',
    category: 'Panties',
    description: 'No-show seamless comfort for everyday wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Nude', 'Black', 'White'],
  },
  {
    id: '3',
    name: 'Lace Collection Set',
    price: 59.99,
    image: 'https://picsum.photos/seed/set1/600/600',
    category: 'Sets',
    description: 'Elegant lace set for special occasions',
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['Black', 'Red', 'Navy'],
  },
  {
    id: '4',
    name: 'Cotton Essentials Pack',
    price: 29.99,
    image: 'https://picsum.photos/seed/cotton1/600/600',
    category: 'Basics',
    description: 'Comfortable cotton basics for everyday wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Grey', 'Black'],
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
              ${product.price.toFixed(2)}
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
                        ? 'bg-pink-600 text-white'
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
                        ? 'bg-pink-600 text-white'
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
              className="w-full bg-pink-600 text-white py-3 px-4 rounded-md font-medium hover:bg-pink-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
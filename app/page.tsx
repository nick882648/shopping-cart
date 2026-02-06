import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MediaCarousel } from './components/MediaCarousel';

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

const heroCarouselItems = [
  {
    type: 'video' as const,
    src: 'https://videos.pexels.com/video-files/6311592/6311592-hd_1280_720_25fps.mp4',
    title: 'Lingerie lookbook',
    subtitle: 'Soft lace, everyday comfort.',
  },
  {
    type: 'video' as const,
    src: 'https://videos.pexels.com/video-files/6311602/6311602-hd_1280_720_25fps.mp4',
    title: 'Bra essentials',
    subtitle: 'Supportive fits for every day.',
  },
  {
    type: 'video' as const,
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    title: 'Soft focus details',
    subtitle: 'Close-up textures and finishes.',
  },
  {
    type: 'image' as const,
    src: 'https://picsum.photos/1200/600?blur=1',
    alt: 'Lingerie flatlay',
    title: 'Kavya favourites',
    subtitle: 'Mix, match, and feel your best.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero with large video carousel */}
      <section className="relative bg-coral-50 py-10 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-coral-100/80 via-coral-50 to-white" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <MediaCarousel
                items={heroCarouselItems}
                className="shadow-xl"
                heightClass="h-64 sm:h-80 lg:h-[420px]"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-wide text-coral-600 mb-2">
                New at Kavya
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Short try-on videos,
                <span className="block">so you see the fit first.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl mx-auto lg:mx-0">
                Browse quick clips of our lingerie and bra collections, then pick the pieces
                that feel right for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="inline-flex justify-center items-center bg-coral-600 text-white px-8 py-3 rounded-md text-base font-medium hover:bg-coral-700 transition-colors"
                >
                  Shop the collection
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex justify-center items-center px-8 py-3 rounded-md text-base font-medium border border-coral-200 text-coral-700 bg-white/80 hover:bg-white transition-colors"
                >
                  Explore categories
                </Link>
              </div>
            </div>
          </div>
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
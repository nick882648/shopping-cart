import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';

export const dynamic = 'force-dynamic';

const seedProducts = [
  {
    name: 'AAKRITI B CUP',
    price: 320,
    image: 'https://picsum.photos/seed/aakriti-b/600/600',
    category: 'bras',
    description: 'Single piece pack, classic B-cup support.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK'],
    stock: 50,
  },
  {
    name: 'NATASHA B CUP',
    price: 280,
    image: 'https://picsum.photos/seed/natasha-b/600/600',
    category: 'bras',
    description: 'Single piece pack with soft everyday support.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'LAVENDER', 'RANI', 'PEACH'],
    stock: 50,
  },
  {
    name: 'TANYA B CUP',
    price: 175,
    image: 'https://picsum.photos/seed/tanya-b/600/600',
    category: 'bras',
    description: 'Loose pcs mithai box packing, daily wear comfort.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK'],
    stock: 50,
  },
  {
    name: 'SONALI',
    price: 190,
    image: 'https://picsum.photos/seed/sonali/600/600',
    category: 'bras',
    description: 'Loose pcs mithai box packing, multi-color range.',
    sizes: ['32', '34', '36', '38'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'PISTA', 'RED BEAN', 'CARROT'],
    stock: 50,
  },
  {
    name: 'COMFORT B CUP',
    price: 335,
    image: 'https://picsum.photos/seed/comfort-b/600/600',
    category: 'bras',
    description: 'Single piece pack, cushioned comfort support.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'MAGENTA', 'PINK', 'CARROT'],
    stock: 50,
  },
  {
    name: 'SECRET B CUP',
    price: 260,
    image: 'https://picsum.photos/seed/secret-b/600/600',
    category: 'bras',
    description: 'Single piece pack, premium colors for special days.',
    sizes: ['32B', '34B', '36B', '38B'],
    colors: ['WHITE', 'SKIN', 'BLACK', 'NUDE', 'RED BEAN', 'NAVY GREY', 'LAVENDER', 'PINK', 'BRUNETEE'],
    stock: 50,
  },
];

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  await connectToDatabase();

  const existing = await Product.countDocuments();
  if (existing > 0) {
    return NextResponse.json({ ok: true, skipped: true, existing });
  }

  const created = await Product.insertMany(seedProducts);
  return NextResponse.json({ ok: true, created: created.length });
}


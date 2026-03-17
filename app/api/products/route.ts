import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDatabase();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return NextResponse.json({
    products: products.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
      sizes: p.sizes,
      colors: p.colors,
      stock: p.stock,
    })),
  });
}


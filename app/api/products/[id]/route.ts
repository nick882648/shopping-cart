import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }

  const p = await Product.findById(id).lean();
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const product: any = p;
  return NextResponse.json({
    product: {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      sizes: product.sizes,
      colors: product.colors,
      stock: product.stock,
    },
  });
}


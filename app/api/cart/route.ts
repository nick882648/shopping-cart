import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Cart } from '@/models/Cart';

export const dynamic = 'force-dynamic';

function getUserIdFromCookie() {
  const token = cookies().get('auth_token')?.value;
  if (!token) return null;
  try {
    const payload = verifyAuthToken(token);
    return payload.sub;
  } catch {
    return null;
  }
}

export async function GET() {
  const userId = getUserIdFromCookie();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const cart = await Cart.findOne({ userId }).lean();

  return NextResponse.json({
    items: Array.isArray(cart?.items)
      ? cart.items.map((i: any) => ({
          id: i.productId,
          name: i.name,
          price: i.price,
          image: i.image,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
        }))
      : [],
  });
}

export async function PUT(req: Request) {
  const userId = getUserIdFromCookie();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const items = Array.isArray(body?.items) ? body.items : null;
  if (!items) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

  const normalized = items
    .map((i: any) => ({
      productId: typeof i?.id === 'string' ? i.id : '',
      name: typeof i?.name === 'string' ? i.name : '',
      price: typeof i?.price === 'number' ? i.price : NaN,
      image: typeof i?.image === 'string' ? i.image : '',
      quantity: typeof i?.quantity === 'number' ? i.quantity : NaN,
      size: typeof i?.size === 'string' ? i.size : undefined,
      color: typeof i?.color === 'string' ? i.color : undefined,
    }))
    .filter(
      (i: any) =>
        i.productId &&
        i.name &&
        Number.isFinite(i.price) &&
        i.price >= 0 &&
        i.image &&
        Number.isFinite(i.quantity) &&
        i.quantity >= 1
    );

  await connectToDatabase();
  await Cart.updateOne(
    { userId },
    { $set: { userId, items: normalized } },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}


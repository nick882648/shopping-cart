import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json().catch(() => null);
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return NextResponse.json({ error: 'Account already exists. Please sign in.' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const created = await User.create({ name, email, passwordHash });

  return NextResponse.json(
    {
      user: {
        id: created._id.toString(),
        name: created.name,
        email: created.email,
      },
    },
    { status: 201 }
  );
}


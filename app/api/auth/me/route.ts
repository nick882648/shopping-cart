import { NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = (await import('next/headers')).cookies().get('auth_token')?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  try {
    const payload = verifyAuthToken(token);
    return NextResponse.json(
      { user: { id: payload.sub, email: payload.email, name: payload.name } },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}


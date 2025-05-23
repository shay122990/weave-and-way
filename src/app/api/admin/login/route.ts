import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const body = await req.json();
  const password = body.password;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
  const JWT_SECRET = process.env.JWT_SECRET!;
  
  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });

  return NextResponse.json({ token });
}

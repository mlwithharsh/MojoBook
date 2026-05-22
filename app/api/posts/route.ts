import { NextResponse } from 'next/server';
import { posts } from '@/lib/data';

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  // In a real app, we would save this to a database
  return NextResponse.json({ message: 'Post created', data: body }, { status: 201 });
}

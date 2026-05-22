import { NextResponse } from 'next/server';
import { mojos } from '@/lib/data';

export async function GET() {
  return NextResponse.json(mojos);
}

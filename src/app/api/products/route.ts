import { NextResponse } from 'next/server';
import data from '@/data/product.json';

export async function GET() {
  return NextResponse.json(data);
}

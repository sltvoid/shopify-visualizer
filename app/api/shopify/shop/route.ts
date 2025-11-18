import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

export async function GET() {
  try {
    const data = await shopifyFetch('/shop.json');

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching shop info:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch shop information' },
      { status: 500 }
    );
  }
}

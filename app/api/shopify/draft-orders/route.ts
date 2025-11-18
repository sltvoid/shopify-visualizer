import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '250';

    const data = await shopifyFetch(`/draft_orders.json?limit=${limit}`);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching draft orders:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch draft orders' },
      { status: 500 }
    );
  }
}

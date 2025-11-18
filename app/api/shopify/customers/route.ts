import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '250';

    const data = await shopifyFetch(`/customers.json?limit=${limit}`);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

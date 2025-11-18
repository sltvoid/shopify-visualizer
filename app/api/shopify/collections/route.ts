import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '250';

    // Fetch both custom and smart collections
    const [customCollections, smartCollections] = await Promise.all([
      shopifyFetch(`/custom_collections.json?limit=${limit}`),
      shopifyFetch(`/smart_collections.json?limit=${limit}`)
    ]);

    return NextResponse.json({
      custom_collections: customCollections.custom_collections || [],
      smart_collections: smartCollections.smart_collections || [],
      total: (customCollections.custom_collections?.length || 0) + (smartCollections.smart_collections?.length || 0)
    });
  } catch (error: any) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}

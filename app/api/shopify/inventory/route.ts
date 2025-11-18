import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '250';

    // Get locations first
    const locationsData = await shopifyFetch('/locations.json');
    const locations = locationsData.locations || [];

    // Get products with inventory data
    const productsData = await shopifyFetch(`/products.json?limit=${limit}`);
    const products = productsData.products || [];

    // Extract inventory information from products
    const inventoryItems = products.flatMap((product: any) =>
      product.variants.map((variant: any) => ({
        id: variant.id,
        product_id: product.id,
        product_title: product.title,
        variant_title: variant.title,
        sku: variant.sku,
        inventory_quantity: variant.inventory_quantity,
        inventory_item_id: variant.inventory_item_id,
        price: variant.price,
      }))
    );

    return NextResponse.json({
      locations,
      inventory_items: inventoryItems,
      total_items: inventoryItems.length,
    });
  } catch (error: any) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

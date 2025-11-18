import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';
import { format, subDays } from 'date-fns';

export async function GET() {
  try {
    // Fetch all necessary data for analytics
    const [ordersData, productsData, customersData] = await Promise.all([
      shopifyFetch('/orders.json?limit=250&status=any'),
      shopifyFetch('/products.json?limit=250'),
      shopifyFetch('/customers.json?limit=250'),
    ]);

    const orders = ordersData.orders || [];
    const products = productsData.products || [];
    const customers = customersData.customers || [];

    // Calculate total sales
    const totalSales = orders.reduce((sum: number, order: any) => {
      return sum + parseFloat(order.total_price || 0);
    }, 0);

    // Calculate average order value
    const averageOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

    // Sales by day (last 30 days)
    const salesByDay = generateSalesByDay(orders);

    // Top products by revenue
    const productSales = new Map();
    orders.forEach((order: any) => {
      order.line_items?.forEach((item: any) => {
        const key = item.product_id || item.title;
        const current = productSales.get(key) || { name: item.title, sales: 0, quantity: 0 };
        current.sales += parseFloat(item.price) * item.quantity;
        current.quantity += item.quantity;
        productSales.set(key, current);
      });
    });

    const topProducts = Array.from(productSales.values())
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);

    // Orders by financial status
    const ordersByStatus = orders.reduce((acc: any, order: any) => {
      const status = order.financial_status || 'unknown';
      const existing = acc.find((s: any) => s.status === status);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ status, count: 1 });
      }
      return acc;
    }, []);

    // Sales by product type
    const salesByProductType = new Map();
    orders.forEach((order: any) => {
      order.line_items?.forEach((item: any) => {
        // Find the product to get its type
        const product = products.find((p: any) => p.id === item.product_id);
        const type = product?.product_type || 'Uncategorized';
        const current = salesByProductType.get(type) || 0;
        salesByProductType.set(type, current + parseFloat(item.price) * item.quantity);
      });
    });

    const salesByType = Array.from(salesByProductType.entries())
      .map(([type, sales]) => ({ type, sales }))
      .sort((a, b) => b.sales - a.sales);

    const analyticsData = {
      totalSales: Math.round(totalSales * 100) / 100,
      totalOrders: orders.length,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      totalCustomers: customers.length,
      totalProducts: products.length,
      salesByDay,
      topProducts,
      ordersByStatus,
      salesByProductType: salesByType,
    };

    return NextResponse.json(analyticsData);
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

function generateSalesByDay(orders: any[]) {
  const salesMap = new Map();

  // Initialize last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    salesMap.set(date, { date, sales: 0, orders: 0 });
  }

  // Aggregate sales by day
  orders.forEach((order: any) => {
    const date = format(new Date(order.created_at), 'yyyy-MM-dd');
    if (salesMap.has(date)) {
      const day = salesMap.get(date);
      day.sales += parseFloat(order.total_price || 0);
      day.orders += 1;
    }
  });

  return Array.from(salesMap.values());
}

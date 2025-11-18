// Shopify Data Types

export interface Product {
  id: number;
  title: string;
  vendor: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  status: string;
  variants: ProductVariant[];
  images: ProductImage[];
  tags: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  inventory_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  src: string;
  alt: string;
}

export interface Order {
  id: number;
  order_number: number;
  email: string;
  created_at: string;
  updated_at: string;
  total_price: string;
  subtotal_price: string;
  total_tax: string;
  financial_status: string;
  fulfillment_status: string;
  line_items: LineItem[];
  customer: Customer;
  shipping_address: Address;
}

export interface LineItem {
  id: number;
  product_id: number;
  variant_id: number;
  title: string;
  quantity: number;
  price: string;
  total_discount: string;
}

export interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  orders_count: number;
  total_spent: string;
  created_at: string;
  updated_at: string;
  state: string;
  tags: string;
  default_address?: Address;
}

export interface Address {
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

export interface InventoryLevel {
  inventory_item_id: number;
  location_id: number;
  available: number;
  updated_at: string;
}

export interface Collection {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  published_at: string;
  sort_order: string;
  products_count?: number;
}

export interface Discount {
  id: number;
  title: string;
  value: string;
  value_type: string;
  created_at: string;
  updated_at: string;
  starts_at: string;
  ends_at: string;
  usage_count: number;
}

export interface Fulfillment {
  id: number;
  order_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  tracking_company: string;
  tracking_number: string;
  line_items: LineItem[];
}

export interface ShopInfo {
  id: number;
  name: string;
  email: string;
  domain: string;
  currency: string;
  timezone: string;
  plan_name: string;
  created_at: string;
}

export interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
  totalProducts: number;
  salesByDay: Array<{ date: string; sales: number; orders: number }>;
  topProducts: Array<{ name: string; sales: number; quantity: number }>;
  ordersByStatus: Array<{ status: string; count: number }>;
  salesByProductType: Array<{ type: string; sales: number }>;
}

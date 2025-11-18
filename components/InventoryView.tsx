'use client';

import { useEffect, useState } from 'react';

interface InventoryItem {
  id: number;
  product_id: number;
  product_title: string;
  variant_title: string;
  sku: string;
  inventory_quantity: number;
  price: string;
}

export default function InventoryView() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/shopify/inventory');
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setInventory(data.inventory_items || []);
      setLocations(data.locations || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading inventory...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Error loading inventory</h3>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  const totalInventory = inventory.reduce((sum, item) => sum + item.inventory_quantity, 0);
  const lowStockItems = inventory.filter(item => item.inventory_quantity < 10);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <div className="flex gap-4">
          <span className="text-gray-600">Total Items: {inventory.length}</span>
          <span className="text-gray-600">Total Quantity: {totalInventory}</span>
          <span className="text-red-600">Low Stock: {lowStockItems.length}</span>
        </div>
      </div>

      {locations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Locations</h3>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <span key={location.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                {location.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.product_title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.variant_title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.sku || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${parseFloat(item.price).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.inventory_quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.inventory_quantity === 0
                        ? 'bg-red-100 text-red-800'
                        : item.inventory_quantity < 10
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {item.inventory_quantity === 0
                      ? 'Out of Stock'
                      : item.inventory_quantity < 10
                      ? 'Low Stock'
                      : 'In Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

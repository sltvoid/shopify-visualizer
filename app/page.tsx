'use client';

import { useState } from 'react';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import ProductsView from '@/components/ProductsView';
import OrdersView from '@/components/OrdersView';
import CustomersView from '@/components/CustomersView';
import InventoryView from '@/components/InventoryView';
import CollectionsView from '@/components/CollectionsView';

type Tab = 'analytics' | 'products' | 'orders' | 'customers' | 'inventory' | 'collections';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('analytics');

  const tabs: { id: Tab; label: string; description: string }[] = [
    { id: 'analytics', label: 'Analytics', description: 'Sales and business insights' },
    { id: 'products', label: 'Products', description: 'Product catalog and inventory' },
    { id: 'orders', label: 'Orders', description: 'Order history and status' },
    { id: 'customers', label: 'Customers', description: 'Customer information and metrics' },
    { id: 'inventory', label: 'Inventory', description: 'Stock levels and locations' },
    { id: 'collections', label: 'Collections', description: 'Product collections' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopify Data Visualizer
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Comprehensive visualization of your Shopify store data
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex flex-col items-center">
                  <span>{tab.label}</span>
                  <span className="text-xs text-gray-400 mt-1">{tab.description}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'products' && <ProductsView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'customers' && <CustomersView />}
        {activeTab === 'inventory' && <InventoryView />}
        {activeTab === 'collections' && <CollectionsView />}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8 border-t border-gray-200">
        <div className="text-center text-sm text-gray-500">
          <p>Shopify Data Visualizer - Comprehensive store analytics</p>
          <p className="mt-2">
            Visualizing data from: Products, Orders, Customers, Inventory, Collections, and more
          </p>
        </div>
      </footer>
    </div>
  );
}

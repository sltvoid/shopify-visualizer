'use client';

import { useEffect, useState } from 'react';

interface CollectionsData {
  custom_collections: any[];
  smart_collections: any[];
  total: number;
}

export default function CollectionsView() {
  const [data, setData] = useState<CollectionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/shopify/collections');
      if (!response.ok) throw new Error('Failed to fetch collections');
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading collections...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Error loading collections</h3>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const allCollections = [
    ...data.custom_collections.map(c => ({ ...c, type: 'Custom' })),
    ...data.smart_collections.map(c => ({ ...c, type: 'Smart' }))
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Collections</h2>
        <div className="flex gap-4">
          <span className="text-gray-600">Total: {data.total}</span>
          <span className="text-blue-600">Custom: {data.custom_collections.length}</span>
          <span className="text-green-600">Smart: {data.smart_collections.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCollections.map((collection) => (
          <div key={collection.id} className="bg-white rounded-lg shadow p-4">
            {collection.image && (
              <img
                src={collection.image.src}
                alt={collection.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{collection.title}</h3>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  collection.type === 'Custom'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {collection.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{collection.handle}</p>
            {collection.body_html && (
              <div
                className="text-sm text-gray-500 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: collection.body_html }}
              />
            )}
            <div className="mt-4 text-xs text-gray-500">
              Published: {collection.published_at ? new Date(collection.published_at).toLocaleDateString() : 'Not published'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

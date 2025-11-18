import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// Initialize Shopify API client
export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY || '',
  apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
  scopes: [],
  hostName: process.env.SHOPIFY_STORE_DOMAIN || '',
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

// Helper function to make API calls to Shopify Admin API
export async function shopifyFetch(endpoint: string) {
  const store = process.env.SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  if (!store || !accessToken) {
    throw new Error('Missing Shopify credentials. Please check your .env file.');
  }

  const url = `https://${store}/admin/api/${LATEST_API_VERSION}${endpoint}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// GraphQL query helper
export async function shopifyGraphQL(query: string, variables?: any) {
  const store = process.env.SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  if (!store || !accessToken) {
    throw new Error('Missing Shopify credentials. Please check your .env file.');
  }

  const url = `https://${store}/admin/api/${LATEST_API_VERSION}/graphql.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify GraphQL error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

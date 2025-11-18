import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shopify Data Visualizer',
  description: 'Comprehensive visualization dashboard for Shopify store data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

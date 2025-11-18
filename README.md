# Shopify Data Visualizer

A comprehensive, full-featured data visualization dashboard for Shopify stores. This application extracts and visualizes **all available data** from the Shopify Admin API, providing deep insights into your store's performance, inventory, customers, and more.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/shopify-visualizer&env=SHOPIFY_STORE_DOMAIN,SHOPIFY_ACCESS_TOKEN&envDescription=Shopify%20API%20credentials%20required&envLink=https://github.com/yourusername/shopify-visualizer/blob/main/DEPLOYMENT.md)

**One-click deployment!** Just add your Shopify credentials and you're live in minutes.

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Features

### 📊 Analytics Dashboard
- **Key Metrics**: Total sales, orders, average order value, customers, and products
- **Sales Over Time**: 30-day sales and order trends with interactive line charts
- **Top Products**: Revenue breakdown by product with horizontal bar charts
- **Order Status**: Visual distribution of orders by financial status
- **Product Type Analysis**: Sales breakdown by product category

### 🛍️ Product Management
- Complete product catalog with images
- Product variants and inventory tracking
- Vendor and product type filtering
- Status monitoring (active/draft)
- Creation date tracking

### 📦 Order Management
- Comprehensive order history
- Order status tracking (financial and fulfillment)
- Customer information per order
- Line item details
- Total price and tax calculations

### 👥 Customer Insights
- Customer list with contact information
- Order count per customer
- Total spend tracking
- Customer status (enabled/disabled)
- Location information

### 📋 Inventory Management
- Real-time inventory levels
- Location-based inventory tracking
- SKU management
- Low stock alerts
- Out of stock identification
- Price tracking per variant

### 🏷️ Collections
- Custom and Smart collections
- Collection images and descriptions
- Publication status
- Collection metadata

## Additional Data Endpoints

The application includes API routes for even more Shopify data:

- **Price Rules**: Discount and pricing rules
- **Draft Orders**: Unpaid or pending orders
- **Gift Cards**: Gift card management
- **Shop Info**: Store configuration and settings
- **Locations**: Physical and digital store locations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **API Integration**: Shopify Admin API
- **Data Fetching**: Native Fetch API

## Installation

### Prerequisites

- Node.js 18+ installed
- A Shopify store
- Shopify Admin API access token

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopify-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Shopify credentials**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Shopify credentials:
   ```
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_ACCESS_TOKEN=your-admin-api-access-token
   ```

### Getting Your Shopify API Access Token

1. Go to your Shopify Admin Panel
2. Navigate to **Settings** > **Apps and sales channels**
3. Click **Develop apps**
4. Click **Create an app** or select an existing app
5. Configure the following **Admin API access scopes** (read permissions):
   - `read_products`
   - `read_orders`
   - `read_customers`
   - `read_inventory`
   - `read_locations`
   - `read_price_rules`
   - `read_discounts`
   - `read_gift_cards`
   - `read_draft_orders`
   - `read_all_orders`
   - `read_analytics`
6. Install the app to your store
7. Copy the **Admin API access token**
8. Add it to your `.env` file

## Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

This application is optimized for Vercel deployment:

1. **Quick Deploy**: Click the "Deploy to Vercel" button above
2. **Manual Deploy**: Follow the [detailed deployment guide](./DEPLOYMENT.md)
3. **Auto-deploy**: Push to GitHub and connect to Vercel for automatic deployments

**Key Features for Vercel:**
- ✅ Optimized build configuration
- ✅ Image optimization for Shopify CDN
- ✅ Environment variable management
- ✅ Automatic HTTPS and CDN
- ✅ Zero-config deployment

**Environment Variables Required:**
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain (e.g., `mystore.myshopify.com`)
- `SHOPIFY_ACCESS_TOKEN` - Your Shopify Admin API access token

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions, troubleshooting, and advanced configuration.

## Project Structure

```
shopify-visualizer/
├── app/
│   ├── api/
│   │   └── shopify/        # API routes for Shopify data
│   │       ├── products/
│   │       ├── orders/
│   │       ├── customers/
│   │       ├── inventory/
│   │       ├── collections/
│   │       ├── analytics/
│   │       ├── shop/
│   │       ├── price-rules/
│   │       ├── draft-orders/
│   │       └── gift-cards/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── AnalyticsDashboard.tsx
│   ├── ProductsView.tsx
│   ├── OrdersView.tsx
│   ├── CustomersView.tsx
│   ├── InventoryView.tsx
│   └── CollectionsView.tsx
├── lib/
│   └── shopify.ts          # Shopify API client
├── types/
│   └── shopify.ts          # TypeScript type definitions
└── package.json
```

## Available API Routes

All API routes are available at `/api/shopify/`:

- `GET /api/shopify/products` - Fetch all products
- `GET /api/shopify/orders` - Fetch all orders
- `GET /api/shopify/customers` - Fetch all customers
- `GET /api/shopify/inventory` - Fetch inventory levels
- `GET /api/shopify/collections` - Fetch custom and smart collections
- `GET /api/shopify/analytics` - Fetch computed analytics data
- `GET /api/shopify/shop` - Fetch shop information
- `GET /api/shopify/price-rules` - Fetch price rules and discounts
- `GET /api/shopify/draft-orders` - Fetch draft orders
- `GET /api/shopify/gift-cards` - Fetch gift cards

## Data Visualization Features

### Charts and Graphs

1. **Line Charts**: Sales trends over time
2. **Bar Charts**: Top products, revenue comparisons
3. **Pie Charts**: Order status distribution, sales by category
4. **Data Tables**: Sortable, filterable product, order, and customer lists
5. **Metric Cards**: Key performance indicators at a glance

### Real-time Features

- Live data fetching from Shopify API
- Error handling with user-friendly messages
- Loading states for better UX
- Responsive design for mobile and desktop

## Customization

### Adding New Data Types

1. Create a new API route in `app/api/shopify/[endpoint]/route.ts`
2. Add TypeScript types in `types/shopify.ts`
3. Create a visualization component in `components/`
4. Add a new tab in `app/page.tsx`

### Styling

The application uses Tailwind CSS for styling. Customize the theme in `tailwind.config.ts`.

## Troubleshooting

### API Authentication Errors

- Verify your `SHOPIFY_STORE_DOMAIN` is correct
- Ensure your `SHOPIFY_ACCESS_TOKEN` is valid and has the necessary scopes
- Check that your custom app is installed on your store

### No Data Showing

- Verify your store has data (products, orders, etc.)
- Check browser console for API errors
- Ensure API routes are returning data (test in browser: `http://localhost:3000/api/shopify/products`)

### Build Errors

- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Ensure all dependencies are properly installed

## Performance Considerations

- The application fetches up to 250 items per endpoint by default
- For stores with large datasets, consider implementing pagination
- Analytics are computed on-the-fly; consider caching for production use
- Images are loaded on-demand to improve performance

## Security

- Never commit your `.env` file to version control
- Keep your Shopify API access token secure
- Use read-only API scopes when possible
- Consider implementing rate limiting for production deployments

## Future Enhancements

Potential features to add:

- [ ] Real-time data refresh
- [ ] Export data to CSV/Excel
- [ ] Advanced filtering and search
- [ ] Date range selectors for analytics
- [ ] Customer segmentation analysis
- [ ] Product performance predictions
- [ ] Email reports
- [ ] Multi-store support
- [ ] GraphQL API integration for better performance
- [ ] Webhook integration for real-time updates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the Shopify API documentation: https://shopify.dev/api/admin-rest
- Review the Next.js documentation: https://nextjs.org/docs
- Open an issue in this repository

## Acknowledgments

- Built with Next.js and React
- Data visualization powered by Recharts
- Shopify Admin API integration
- Styled with Tailwind CSS

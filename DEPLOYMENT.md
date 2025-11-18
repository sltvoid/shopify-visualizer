# Deploying to Vercel

This guide will help you deploy the Shopify Data Visualizer to Vercel.

## Prerequisites

- A Vercel account (free tier works great!)
- Your Shopify Admin API credentials
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)**
   - Sign in with your GitHub/GitLab/Bitbucket account

3. **Import your repository**
   - Click "Add New Project"
   - Select your repository
   - Click "Import"

4. **Configure the project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Add Environment Variables**
   Click "Environment Variables" and add:

   | Name | Value |
   |------|-------|
   | `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` |
   | `SHOPIFY_ACCESS_TOKEN` | `your-admin-api-access-token` |

   **Important**: Make sure these are available for all environments (Production, Preview, Development)

6. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add SHOPIFY_STORE_DOMAIN
   # Enter: your-store.myshopify.com

   vercel env add SHOPIFY_ACCESS_TOKEN
   # Enter: your-admin-api-access-token
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables Setup

### Getting Your Shopify Credentials

1. **Go to Shopify Admin**
   - Navigate to: Settings → Apps and sales channels → Develop apps

2. **Create or Select Custom App**
   - Click "Create an app" or select existing app

3. **Configure API Scopes**
   Add these **Admin API access scopes**:
   ```
   read_products
   read_orders
   read_customers
   read_inventory
   read_locations
   read_price_rules
   read_discounts
   read_gift_cards
   read_draft_orders
   read_all_orders
   read_analytics
   ```

4. **Install App & Get Token**
   - Install the app to your store
   - Go to "API credentials"
   - Copy the "Admin API access token"

### Adding to Vercel

**Via Dashboard:**
- Go to your project → Settings → Environment Variables
- Add each variable with scope: Production, Preview, Development

**Via CLI:**
```bash
vercel env add SHOPIFY_STORE_DOMAIN production
vercel env add SHOPIFY_ACCESS_TOKEN production
```

## Post-Deployment

### Verify Deployment

1. Visit your Vercel URL
2. Check that the dashboard loads
3. Verify data is fetching from your Shopify store

### Custom Domain (Optional)

1. Go to your Vercel project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Troubleshooting

### Build Failures

**Error: Missing environment variables**
- Solution: Add `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_ACCESS_TOKEN` in Vercel dashboard

**Error: Module not found**
- Solution: Clear cache and redeploy
  ```bash
  vercel --force
  ```

### Runtime Errors

**Error: Failed to fetch products**
- Check that environment variables are set correctly
- Verify Shopify API token is valid
- Ensure API scopes are configured

**Error: CORS issues**
- This shouldn't happen with server-side API routes
- If it does, verify you're using API routes (not client-side fetch to Shopify)

### Performance Issues

**Slow loading times**
- Consider implementing pagination for large datasets
- Add caching layer (Redis, Vercel KV)
- Use Vercel Edge Functions for faster response times

## Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request
- **Development**: Available via `vercel dev` locally

## Monitoring

### View Logs
```bash
vercel logs [deployment-url]
```

### Analytics
- Go to your project → Analytics
- View page views, top pages, and performance metrics

## Scaling

The application is serverless and scales automatically on Vercel:
- **Free Tier**: 100GB bandwidth, unlimited requests
- **Pro Tier**: 1TB bandwidth, better performance
- **Enterprise**: Custom limits, SLA guarantees

## Security Best Practices

1. **Never commit `.env` files**
2. **Use Vercel environment variables** for secrets
3. **Rotate API tokens** regularly
4. **Enable Vercel Authentication** if needed (Settings → Authentication)
5. **Use read-only API scopes** when possible

## Advanced Configuration

### Edge Functions (Optional)

For even faster response times, you can convert API routes to Edge Functions:

```typescript
// app/api/shopify/products/route.ts
export const runtime = 'edge';
```

### Caching Strategy

Add caching headers to API routes:

```typescript
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
  },
});
```

### Environment-Specific Settings

Create different configurations per environment:

```bash
# Production
vercel env add SHOPIFY_STORE_DOMAIN production

# Preview
vercel env add SHOPIFY_STORE_DOMAIN preview

# Development
vercel env add SHOPIFY_STORE_DOMAIN development
```

## Cost Optimization

- **Free Tier** is sufficient for most small-medium stores
- Monitor bandwidth usage in Vercel dashboard
- Implement pagination to reduce data transfer
- Use image optimization (Next.js Image component)

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Next.js Documentation**: https://nextjs.org/docs

## Quick Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]

# View environment variables
vercel env ls
```

---

**Your Shopify Data Visualizer is now live on Vercel!** 🎉

Visit your deployment URL and start analyzing your store data with beautiful visualizations.

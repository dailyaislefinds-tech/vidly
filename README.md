# Vidly — AI Video Creator for Ecommerce Sellers

Turn any product photo into a TikTok-ready video script in 60 seconds. 
Built with Next.js 14, Anthropic API, Stripe, Prisma, and Tailwind CSS.

---

## What's included

- Landing page with pricing, features, testimonials, and FAQ
- Sign up / sign in (email + password)
- AI script generation (powered by Claude)
- Free plan (3 videos/month) + Pro plan ($19/mo)
- Stripe checkout + webhook for automatic plan upgrades
- Postgres database via Prisma (users, videos, subscriptions)
- Deploy-ready for Vercel in ~30 minutes

---

## Step 1 — Get your API keys

You need accounts at 3 services (all free to start):

### Anthropic (AI scripts)
1. Go to https://console.anthropic.com
2. Create an account → API Keys → Create Key
3. Copy your key (starts with `sk-ant-...`)

### Stripe (payments)
1. Go to https://dashboard.stripe.com
2. Create an account (no business required to start)
3. Go to Developers → API Keys → copy Secret Key and Publishable Key
4. Create a Product: Products → Add Product → name it "Vidly Pro" → price $19/month recurring
5. Copy the Price ID (starts with `price_...`)
6. For webhooks (after you deploy): Developers → Webhooks → Add endpoint
   - URL: https://your-vercel-url.vercel.app/api/webhook
   - Events: checkout.session.completed, customer.subscription.deleted
   - Copy the signing secret (starts with `whsec_...`)

### Database (Postgres)
Free options:
- **Neon** (recommended): https://neon.tech → New Project → copy the connection string
- **Supabase**: https://supabase.com → New Project → Settings → Database → copy URI
- **Railway**: https://railway.app → New → PostgreSQL → copy DATABASE_URL

---

## Step 2 — Local setup

```bash
# Clone and install
cd vidly
npm install

# Copy and fill in your env file
cp .env.example .env.local
# Edit .env.local with all your keys

# Set up the database
npx prisma generate
npx prisma db push

# Run locally
npm run dev
```

Open http://localhost:3000 — you should see the landing page.

---

## Step 3 — Deploy to Vercel (free)

1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project → Import your repo
3. In the Environment Variables section, add every variable from your .env.local
4. Click Deploy — takes about 2 minutes
5. Once deployed, go to Stripe → Webhooks → add your Vercel URL + /api/webhook
6. Copy the webhook signing secret and update STRIPE_WEBHOOK_SECRET in Vercel

Your app is live and accepting payments.

---

## File structure

```
vidly/
├── app/
│   ├── page.tsx              ← Landing page
│   ├── auth/page.tsx         ← Sign in / sign up
│   ├── dashboard/page.tsx    ← Main app (generate videos)
│   ├── api/
│   │   ├── auth/             ← NextAuth + register
│   │   ├── generate/         ← AI script generation
│   │   ├── create-checkout/  ← Stripe checkout session
│   │   └── webhook/          ← Stripe webhook (upgrades plans)
│   ├── layout.tsx
│   ├── globals.css
│   └── providers.tsx
├── lib/
│   ├── prisma.ts             ← Database client
│   ├── stripe.ts             ← Stripe client
│   └── auth.ts               ← NextAuth config
├── prisma/
│   └── schema.prisma         ← User, Video, Plan models
├── .env.example              ← Template for your env vars
├── package.json
├── tailwind.config.js
└── vercel.json
```

---

## Customization

**Change the price**: Edit the $19 amount in `app/page.tsx` and update your Stripe Price ID.

**Add video generation**: Integrate Runway ML or Kling AI in `app/api/generate/route.ts` after the script is created.

**Add more video styles**: Edit the `STYLES` array in `app/dashboard/page.tsx`.

**Change the brand name**: Search and replace "vidly" and "Vidly" across the project.

---

## Revenue math

| Members | Monthly revenue |
|---------|----------------|
| 10      | $190/mo        |
| 50      | $950/mo        |
| 100     | $1,900/mo      |
| 500     | $9,500/mo      |

Your main costs are the Anthropic API (~$0.01 per script) and Vercel hosting (free tier covers ~100k requests/month).

---

## Getting your first members

1. Post your own products using Vidly — document the process on TikTok
2. Show before/after: "I made this video in 60 seconds using my own tool"
3. Add a link in bio to vidly.app
4. Post in Facebook groups: Shopify Dropshipping, TikTok Shop Sellers, etc.
5. Reach out to other dropshippers directly — offer free Pro trial for feedback

---

Built by Majidi · Powered by Anthropic Claude

# DotLinQ Landing

Standalone Next.js marketing site for DotLinQ. This app is **separate from the product console** (`frontend/webapp`) and the backend waitlist in Authentication — it stores interest signups on its own so you can market and track demand independently.

## Stack

Next.js 16 (App Router), React 19, Tailwind v4, shadcn-style UI, Plus Jakarta Sans.

## Develop

```bash
cd LandingPage
cp .env.example .env.local
npm install
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Waitlist admin: [http://localhost:3000/aubairadmin](http://localhost:3000/aubairadmin)

## Waitlist

Primary CTAs open a **Join Waitlist** dialog. Submissions go to this app:

`POST /api/waitlist`

Duplicate emails are treated as already joined. A hidden honeypot field (`website`) absorbs basic bots.

## Insights

`/aubairadmin` is username + password protected (`AUBAIR_ADMIN_USERNAME` / `AUBAIR_ADMIN_PASSWORD` in `.env.local`). Use it to:

- See who requested early access
- Filter by name / email / company
- Export CSV
- Track page views, waitlist opens, and signups

`/admin` is not available (returns 404). This dashboard is only for marketing and is not wired to the main product admin portal.

## Production (Vercel)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical host, e.g. `https://www.dotlinq.com` |
| `AUBAIR_ADMIN_USERNAME` | Username for `/aubairadmin` |
| `AUBAIR_ADMIN_PASSWORD` | Password for `/aubairadmin` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |
| `SUPABASE_SECRET_KEY` | Server key for waitlist writes + admin reads |

Point the Vercel project at the `LandingPage` directory.

## SEO

Metadata, Open Graph, JSON-LD, `robots.ts`, and `sitemap.ts` live in the App Router. OG image: `/brand/og-image.png`.

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
- Waitlist admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Waitlist

Primary CTAs open a **Join Waitlist** dialog. Submissions go to this app:

`POST /api/waitlist`

Locally, entries are stored in `data/waitlist.db` (SQLite via libSQL). Duplicate emails are treated as already joined. A hidden honeypot field (`website`) absorbs basic bots.

## Insights

`/admin` is password-protected (`ADMIN_PASSWORD` in `.env.local`). Use it to:

- See who requested early access
- Filter by name / email / company
- Export CSV
- Track page views, waitlist opens, and signups

This dashboard is only for marketing. It is not wired to the main product admin portal.

## Production (Vercel)

SQLite files are not durable on serverless hosts. Create a [Turso](https://turso.tech) database (free tier is enough) and set:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical host, e.g. `https://www.dotlinq.com` |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `TURSO_DATABASE_URL` | `libsql://…` |
| `TURSO_AUTH_TOKEN` | Turso auth token |

Point the Vercel project at the `LandingPage` directory.

## SEO

Metadata, Open Graph, JSON-LD, `robots.ts`, and `sitemap.ts` live in the App Router. OG image: `/brand/og-image.png`.

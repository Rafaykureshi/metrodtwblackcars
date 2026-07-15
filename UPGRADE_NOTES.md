# Metro DTW Black Cars — Upgrade Notes

## Completed

- Consolidated booking creation and email notification into the server-side booking API.
- Disabled direct public access to the old email endpoint.
- Added server-side validation for names, email, phone, service type, UUID, date range, passenger count and luggage count.
- Added active-vehicle lookup and capacity validation before saving a booking.
- Added a hidden honeypot field and lightweight rate limiting.
- Limited input lengths and stopped exposing raw database errors to customers.
- Added Detroit timezone formatting to booking emails.
- Removed Google Fonts as a build-time dependency and added system font fallbacks.
- Added security response headers.
- Added a social preview image and corrected metadata references.
- Added `.env.example` while keeping real secrets out of the clean archive.
- Confirmed ESLint exits successfully (image optimization warnings remain).
- Confirmed `npm run build` completes successfully with Next.js 16.2.9.

## Deployment

1. Copy `.env.example` to `.env.local` for local development and fill in the values.
2. Add the same variables in Vercel Project Settings → Environment Variables.
3. Run `npm install` and `npm run build`.
4. Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code.

## Recommended next upgrades

- Replace remaining `<img>` elements with `next/image` after defining the approved remote image domains.
- Add persistent rate limiting through Upstash Redis or Vercel KV for multi-instance production deployments.
- Add Cloudflare Turnstile to the public booking form.
- Protect admin routes with server-side middleware and audit Supabase RLS policies.
- Add Google Places autocomplete and price estimates.

## Service Area SEO Upgrade
- Added a linked "Cities We Serve" section with 45 Michigan service areas.
- Added static city landing pages under `/service-areas/[slug]`.
- Added city-specific metadata, canonical URLs, and Service schema.
- Added sitemap.xml and robots.txt generation.
- City copy is original Metro DTW content rather than copied competitor text.

## Cities We Serve and GMC Yukon update

- Added 45 clickable Michigan service-area links above the footer.
- Added statically generated `/service-areas/[slug]` pages with original city-specific service copy, metadata, canonical URLs, and service schema.
- Added all service-area URLs to the sitemap.
- Replaced the landing-page GMC/Porsche-style fleet image with a Black 2022 GMC Yukon Denali.
- To replace an existing Porsche/Porche record stored in Supabase, run:
  `supabase/replace-porsche-with-gmc-yukon.sql`

The SQL update is necessary because the booking form and admin fleet read vehicle records from Supabase, while the landing-page fleet is currently static.

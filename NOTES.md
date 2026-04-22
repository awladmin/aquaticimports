# Aquatic Imports — Project Notes

## What this is

A **pitch POC** — a polished demo built to win the rebuild job for
Independent Aquatic Imports Ltd. All content is hardcoded; there is no
backend. The target for phase 2 is a Next.js + Supabase build that
replaces the existing WordPress site.

This repo exists so the client can see a concrete, clickable preview of
what the new site will look and feel like — not a production app.

## The client

Independent Aquatic Imports Ltd (est. 1999) — a specialist UK importer of
ornamental fish, plants and invertebrates. They supply **wholesalers and
consolidated importers only**, not individual retailers. Retail
enquiries are referred out to their trade list.

The old site was a WordPress install that was recently hacked, cleaned,
and is being retired. Screenshots of the old admin UX live in
`old_site_screens/` (gitignored) as the behavioural spec.

## What's in the POC

### Public routes
- `/` — hero (looping reef video), About copy, features, CTA
- `/contact` — CF7-style contact form, toast on submit
- `/privacy` — placeholder privacy copy
- `/login` — trade login form + demo shortcut buttons for trade + admin

### Gated routes (require `ai_demo_session` cookie)
- `/shipment-schedule` — data table of this week's arrivals + stock-list
  download buttons
- `/suppliers` — searchable, filterable supplier directory
- `/suppliers/[slug]` — individual supplier page with stock list CTA
- `/place-order` — how to order (phone/email)

### Admin preview (require `ai_demo_role=admin`)
- `/admin` — dashboard (KPIs, schedule preview, "plan next week" card)
- `/admin/suppliers` — CRUD list (search, filter, status badges)
- `/admin/suppliers/new` — create form with xlsx + image upload drop zones
- `/admin/schedule` — interactive weekly schedule builder (add/remove
  per day, inline deadline edit, availability toggle, publish)
- `/admin/users` — trade user list with approve/reject pending
- `/admin/settings` — company details form

## Stack

- **Next.js 16.2.4** (App Router, Turbopack)
- **React 19.2.4**
- **Tailwind CSS v4** (CSS-first `@theme inline`)
- **shadcn/ui** (nova preset, base-ui primitives)
- **lucide-react** icons
- **Geist** (sans + mono)
- **sonner** for toasts
- Cookie-based fake auth (`src/lib/auth.ts` + `auth-actions.ts`)
- All data in `src/data/` — TypeScript constants

## Brand

- Primary aqua: `#73C9B4` (logo)
- Deep blue: `#3675c2` (logo footer accent, current footer bg)
- Palette generated from aqua: `brand-50` → `brand-900` in `globals.css`
- Real logo SVG lives at `public/logo.svg` (coloured) and
  `public/logo-white.svg` (for dark backgrounds, footer + hero overlay)
- Favicon + manifest at `public/favicon/`

## Hero media

- `public/hero.mp4` — current hero loop (Kling 3.0 generation, ~9.4 MB)
- `public/hero-veo.mp4` — Veo 3.1 Lite alternative kept as backup
- `public/hero.jpg` — nano-banana still (also poster frame)

See "Optimise the hero video" under tasks.

## Running locally

```
npm install
npm run dev
```

Then http://localhost:3000. Use the demo shortcuts on `/login` to enter
as trade or admin.

## Demo walkthrough for the pitch

Best flow when showing the client:

1. **Logged-out home** — hero video plays, About copy lands, "Apply for
   an account" CTA
2. **Hit /login** → click **"Enter admin dashboard"**
3. **Admin dashboard** — the stat cards, upcoming schedule preview,
   "Plan next week" callout
4. **/admin/schedule** — click add on a day, pick a supplier, set
   deadline, tick available, then "Publish schedule"
5. **/admin/suppliers/new** — show how easy a new supplier is: name,
   country, upload stock list xlsx, upload image, categories as chips,
   publish
6. **Click Back to site** → log in as trade customer
7. **/shipment-schedule** — the table they see every week with download
   icons
8. **/suppliers** — search/filter directory, click into a supplier,
   download stock list

## Tasks / follow-ups

### Before phase 2 kickoff
- [ ] **Optimise the hero video.** Current `public/hero.mp4` is
  ~9.4 MB and `hero-veo.mp4` (backup) adds another ~11 MB. Target
  2–4 MB for the live hero. Install ffmpeg
  (`winget install -e --id Gyan.FFmpeg`) then:
  ```
  ffmpeg -i public/hero.mp4 -vf "scale=1920:-2" \
    -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
    -movflags +faststart -an public/hero-optimised.mp4
  ```
  Also produce a WebM:
  ```
  ffmpeg -i public/hero.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 \
    -an public/hero.webm
  ```
  Swap the `<video>` in `src/app/page.tsx` to use both sources. When
  we move to Supabase Storage or Vercel Blob, pull videos from there
  instead of committing to git.
- [ ] **Consider a seamless loop pass** — the current clip has a
  visible cut at the loop boundary. Options: generate a new clip with
  same start/end frame (Veo 3.1 with keyframe lock), or use AI frame
  interpolation (Topaz / RIFE) to synthesise the join.

### Phase 2 (production build)
- [ ] **Real data model** — Supabase tables for `suppliers`,
  `import_schedule_entries`, `categories`, `supplier_categories`,
  `profiles`, `contact_messages`
- [ ] **Supabase Auth + RLS** — replace cookie-based fake auth; all
  gated routes behind a real session
- [ ] **Data migration** — export from WP (XML) + SFTP
  `/wp-content/uploads/` → parse → seed Supabase + Storage
- [ ] **Admin UI wired up** — supplier CRUD, schedule builder, news
  editor all writing to Supabase via server actions
- [ ] **Trade user signup flow** — self-signup with admin approval
  before login works
- [ ] **Stock list handling** — decide: keep as .xlsx download, or parse
  on upload into a `stock_items` table for cross-supplier search
- [ ] **Domain + DNS** — deploy to Vercel on a staging URL first, swap
  DNS at aquaticimports.com when signed off
- [ ] **Email** — `info@` + `orders@` wired to whichever provider
  (Postmark / Resend) for contact form + schedule-published alerts

### Post-launch nice-to-haves
- [ ] Searchable stock items across all suppliers
- [ ] Saved-search email alerts for trade users
- [ ] News / trade bulletins (the version we removed from this POC)
- [ ] Supplier photo galleries

## Out of scope for phase 2
- Anything the client would need to maintain regularly with no admin
  UI (news, promos). Reintroduce only once we know they'll update them
- Individual retailer accounts — they don't sell direct
- E-commerce / checkout — they take orders by phone + email

## Architecture decisions worth remembering

- **Admin + public share one layout** (no separate admin app) — the
  `/admin` route uses its own nested layout with sidebar, but the site
  header stays consistent so admin staff see the same UX trade
  customers do
- **Fake auth via cookies** — two cookies (`ai_demo_session`,
  `ai_demo_role`) set by a server action. `requireSession()` and
  `requireAdmin()` in `src/lib/auth.ts` guard gated pages. This stays
  for the POC only; Supabase Auth replaces it in phase 2
- **Base-UI quirks** — the nova shadcn preset uses base-ui primitives
  (not radix), so `asChild` isn't supported natively on Trigger
  primitives. `site-header.tsx` uses `buttonVariants()` classes
  directly instead. Don't reintroduce `asChild` on `SheetTrigger` /
  `DropdownMenuTrigger` — it causes hydration mismatches
- **Next.js 16 async params** — `page` and `layout` components with
  dynamic segments receive `params` as a Promise and must be awaited

## File map (key paths)

```
src/
  app/
    page.tsx                 # Homepage (hero + about + features)
    layout.tsx               # Root layout, metadata, fonts, toaster
    globals.css              # Tailwind + brand palette + animations
    login/                   # Trade login + demo shortcuts
    admin/                   # Admin preview (dashboard, suppliers,
                             # schedule, users, settings)
    suppliers/               # Supplier directory + detail
    shipment-schedule/       # Weekly arrivals table
    contact/, place-order/, privacy/
  components/
    brand-logo.tsx           # Logo img with variant=default|white
    site-header.tsx          # Top nav + mobile sheet
    site-footer.tsx          # Blue footer with white logo
    download-stock-button.tsx
    ui/                      # shadcn primitives (nova preset)
  data/
    suppliers.ts             # ~25 hardcoded suppliers
    schedule.ts              # Current week's arrivals
  lib/
    auth.ts                  # getSession, requireSession, requireAdmin
    auth-actions.ts          # loginAction, logoutAction
    country.ts               # Country code → flag emoji
    date.ts                  # formatOrdinalDate ("21st April")
    nav.ts                   # Main nav items
    utils.ts                 # cn (tailwind-merge)
public/
  logo.svg, logo-white.svg   # Trimmed real logo + white variant
  hero.mp4                   # Current looping reef video (Kling 3.0)
  hero-veo.mp4               # Backup clip (Veo 3.1 Lite)
  hero.jpg                   # Poster frame / fallback still
  favicon/                   # Icons + site.webmanifest
```

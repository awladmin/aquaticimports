# Aquatic Imports — Project Notes

## Status — 2026-05-26

**Rob has reviewed the POC and is on board, with a much slimmer scope.**
Awaiting his go-ahead after he's chatted it through with Annie. Build has
not started.

### Scope pivot (from Rob's 20 May email)

Out of the POC: supplier directory, schedule builder, admin CRUD, user
approval flows, news, all the supplier-centric data shape. None of it
is wanted.

In scope for the actual build:

- Public marketing site (home + contact + privacy), keeping the existing
  Aquatic Imports logo (retain/enhance, no redesign)
- Drop the reef hero video; use logistics/import imagery (cargo, freight,
  warehouse — Rob may send his own photos)
- Reinstate the Heathrow proximity map graphic at the bottom of the
  homepage (old WP site had one)
- Front-page copy stays close to the existing aquaticimports.com tone
- Secure login, fresh credentials for everyone (clean break from old
  WP accounts)
- One folder behind the login called "Stocklists" (possibly a second
  for shipment reports). Dropbox-style: Rob + Annie drag-and-drop
  upload, customers one-click download
- Admin file management screen: list, upload, individual delete,
  multi-select + bulk delete. That's it.

### Revised quote (sent 21 May, attached on email thread)

- Build: £1,000 + VAT (down from earlier quote — scope is slimmer)
- Care plan: £100/month + VAT, first 3 months free
- File: `Aquatic_Imports_Quote_Robert_Revised_v2.pdf` (Gmail thread
  `19e497b17998bc2e`)

### Assets received from Rob (26 May)

- `AquaticImports.jpg` — high-res JPG of the existing logo (blue
  wordmark with green globe in the "Q"). Currently lives on Desktop;
  pull into the build when scaffolding starts. Resolution is fine for
  screen; consider tracing to SVG for crisp print/retina.
- Two IONOS SiteAnalytics PDFs (Oct 2022 baseline + Feb 2026 current).
  Real human traffic is small; `/wp-login.php` is being brute-forced
  hard (33% of all page hits in Feb 2026); `/import-lists/` is the
  page trade users actually visit.

### Open questions awaiting Rob

Sent in Claudia's 21 May reply, no answer yet:

1. Roughly how many customer logins (20 / 100 / 500)?
2. Self-service password reset, or Rob handles resets manually?
3. Want a per-file/per-user download log?

Defaults if no answer by the time we start: assume ~20 users,
self-service reset, no download log (add later if asked).

### Latest correspondence with Rob

- 20 May 2026 — Rob's reply with the scope changes
- 21 May 2026 — Claudia's reply confirming, revised quote attached,
  three open questions sent
- 26 May 2026 — Rob sent the logo + two analytics PDFs
- 26 May 2026 — Claudia acknowledged the assets; ball is in Rob's
  court to chat with Annie and give the green light to crack on

### What to do when Rob greens it

1. Decide: strip the POC in place, or scaffold a fresh repo? (See the
   "POC is not phase 2" note — leans toward fresh build given how much
   of the POC is now out of scope.)
2. Pick auth + storage stack. Supabase Auth + Storage is still the
   default plan, but the scope is small enough that Clerk + S3, or
   even a single Vercel deployment with NextAuth + Vercel Blob, would
   work too.
3. Set up the file-management admin screen first — it's the actual
   useful surface for Rob and Annie.
4. Marketing site (home, contact, privacy) second, with the new
   logistics imagery + Heathrow map.
5. Stage on a Vercel preview URL; DNS cutover at aquaticimports.com
   only after Rob signs off.

## Status — 2026-04-22 (historical — POC pitch-ready)

**POC pushed to `main`.** Last commit: `f9be433`.

- `npm run dev` → http://localhost:3000
- Demo flow is in the "Demo walkthrough for the pitch" section below
- Non-technical talking points for the client are in chat history
  (wholesale benefits, admin simplicity, why not WordPress, speed)
- Most of the POC's functionality is now out of scope (see 2026-05-26
  status above) — treat the POC as a visual reference for layout,
  brand palette, and shadcn primitives only.

## Security incident — May 2026

**Trigger:** Robert reported Google's "Website With Harmful Software"
warning on Safari/iOS, appearing on first visit per device and then
suppressed by Safari's own UX. Investigation date: 2026-05-11.

**Email report sent to Robert** — awaiting his reply before any
remediation work. **No changes were made to the live site during the
investigation** — all checks were read-only (find/grep/SELECT). The
SFTP password he gave us is in chat history only, not saved anywhere
durable; he plans to rotate it as part of the recommendations.

### Headline findings

- **Site is not currently hacked.** Filesystem, database, served HTML
  and theme/plugin code are clean of the standard injection patterns.
- **Site WAS compromised** — confirmed by access log analysis. Between
  ~20 Mar and 8 Apr 2026 a fake plugin folder
  `/wp-content/plugins/sammerrily/common/m4.php?pass=123` (a PHP web
  shell) returned 200 OK with 5–46 KB payloads to multiple attacker IPs.
  ~30 other backdoor URLs (`/_audit_*.php`, `/_verify_*.php`,
  `/.well-known/admin.php`, `/.well-known/wso.php`, `/adminer.php`,
  `/manager.php`, etc.) also returned 200 OK during the same window.
- **Cleanup happened ~21 Apr 2026** — `sftp.log.17.gz` shows a flurry
  of SFTP logins that day, and from 25 Apr onwards every backdoor URL
  returns 404. Disk inspection on 2026-05-11 confirms none of those
  files exist anymore.
- Google's flag is **most likely** a stale carryover from the active
  compromise window — but see open question below.

### What was verified clean (2026-05-11)

- No PHP/CGI in `wp-content/uploads/`, no `mu-plugins/`, no WP
  drop-ins, no hidden dot-prefixed PHP, no `.well-known/`/`.tmb/`/`.dj/`
  dirs.
- All 4,786 PHP files grep'd for `eval(base64_decode)`, `assert($_*)`,
  obfuscated `preg_replace /e`, `create_function` — zero hits outside
  legitimate stock code.
- Every `.htaccess` on the server — standard rules only.
- Active theme `twentyeleven-child` — every file dated Jan 2013, no
  modifications.
- `wp_users` — 7 admin accounts, all created 2011–2013, no new
  admins; recent users are legitimate Maidenhead Aquatics branch
  subscribers. `users_can_register=0`.
- `wp_posts`/`wp_postmeta`/`wp_options` — no `<script>`, `eval(`,
  `iframe`, foreign-URL injection in any row regardless of status.
- `wp_options.cron` — only standard WP + UpdraftPlus hooks.
- WPCode plugin (formerly insert-headers-and-footers): only 2
  snippets exist, both in **draft** status (inert), both legitimate
  library snippets from July 2023.
- Homepage + spot-checked pages: no foreign scripts, no cloaking
  (Googlebot and Chrome get identical bodies modulo the per-request
  `_login=` nonce).
- WP core is current (6.9.4, refreshed 4 Feb 2026).

### Open question — intermittent behaviour

The "stale Google flag" theory **does not fully explain** Robert's
observation that the warning appears intermittently rather than
consistently per device. Possibilities left to investigate **if Robert
sees the warning again after a credential rotation**:

- Conditional injection (random %, geo, ASN, time-of-day) — would
  require reproducing it
- Stored injection in a less-trafficked URL/path we didn't fetch
- Google's SafeBrowsing cache toggling on/off as their crawler
  rescans
- Per-device Safari UX (warning shown once per device per
  dismissal-TTL — could look intermittent across multiple devices
  even if Google's flag is constant)

Did NOT get as far as: scanning all 19,000 attachments and posts for
embedded JS, fetching the site from multiple geo IPs, or pulling the
full plugin code of the abandoned 2013–2016 plugins.

### Root cause (most plausible)

23 active plugins, ~9 of which had no upstream updates since 2013–2016
and are documented attack surface (especially
`custom-content-type-manager`, `comprehensive-google-map-plugin`,
`platformist-quadendpointer`, `lightbox-plus`, `wordpress-access-control`,
`smart-youtube`, `postmash-*`, `content-slide`).

### Recommendations (sent to Robert; rough effort estimates)

1. **Submit Google Search Console review request** — 10–15 min once
   logged in. Path: Security & Manual Actions → Security Issues →
   Request Review. Robert needs Search Console access first (see
   "Access" below).
2. **Rotate all credentials** — 30–60 min total. SFTP, WP admin
   passwords (×7), DB password, WP salts in `wp-config.php`, IONOS
   control panel.
3. **Disable XML-RPC** — 5 min. Add `RedirectMatch 403 /xmlrpc.php`
   to root `.htaccess` (currently being brute-forced from CN IPs,
   already 403-ing but still wasting cycles).
4. **Remove the 9 abandoned plugins** — 30–60 min. Deactivate via
   wp-admin, regression-test, delete via SFTP.
5. **Lock down `wp-admin`** — 30 min. `.htaccess` + `htpasswd` in
   front of the admin dir (IONOS supports both).
6. **Strategic:** accelerate the Next.js + Supabase rebuild. The
   pitch POC in this repo (`f9be433`) is ready.

### Search Console access

Robert needs to be added as a verified owner/user on the existing
Search Console property for aquaticimports.com. Whoever currently has
ownership goes to: Settings → Users and permissions → Add user →
enter his Google-associated email → role "Owner" or "Full". If nobody
still has access, he can re-verify ownership via a DNS TXT record at
IONOS or by uploading the Google-supplied HTML file to the web root.
The Google account used must be one he can sign into — if
`robert@aquaticimports.com` isn't a Google Workspace address, he'll
need to associate a personal Google account with it or use a different
one.

### Useful artefacts captured during investigation

- Production WordPress runs on IONOS shared hosting, server
  `home451708012.1and1-data.host`, hostname `infong-uk10`, public
  IPv4 `82.165.83.39` (shared with other IONOS customers).
- DB host `db451711348.db.1and1.com`, MariaDB 10.5 with `ANSI_QUOTES`
  on (so use `'value'` not `"value"` in SQL).
- Web root: `/homepages/36/d451708012/htdocs` (SFTP) /
  `/kunden/homepages/36/d451708012/htdocs` ($HOME in shell).
- SFTP CWD is already the web root — upload with relative paths.
- All SFTP logins (legit + suspect) appear as source IP `10.71.56.0`
  because IONOS NATs through their internal gateway. Source IP in
  the SFTP log is therefore not useful for attribution.
- Apr 21 2026 SFTP burst — almost certainly the previous cleanup
  pass, not an intrusion.
- Active plugins list (23): see `wp_options.active_plugins`.
- WP-Cron `wpcode_usage_tracking_cron` is harmless (it's the WPCode
  plugin's own usage telemetry).

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

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: 11 June 2026
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground/90">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Who we are</h2>
          <p>
            Independent Aquatic Imports Ltd (&ldquo;we&rdquo;, &ldquo;our&rdquo;,
            &ldquo;us&rdquo;), registered at Unit 2 Trident Industrial Estate,
            Blackthorne Road, Colnbrook, Slough, Berkshire SL3 0AX. Company
            registration 381 4274. We are the data controller for personal
            data collected through this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            What we collect
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Account details: your business email address, the name on your
              account, and your password (stored hashed, never in plain
              text).
            </li>
            <li>
              An authenticated session cookie that keeps you signed in while
              you use the trade area.
            </li>
            <li>
              Standard server access logs (timestamp, IP address, requested
              URL) kept by our hosting provider for security and operational
              purposes.
            </li>
          </ul>
          <p>
            We do not run analytics or advertising trackers. We do not set
            third-party cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Why we collect it
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>To authenticate you when you log in.</li>
            <li>To deliver the stocklists you choose to download.</li>
            <li>To contact you about your trade account if needed.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Legal basis
          </h2>
          <p>
            We process your data under contract performance (delivering the
            trade service you signed up for) and legitimate business interest
            (running a secure trade portal for our wholesale customers).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Who we share with
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Supabase Inc., our database and authentication processor. Your
              account data is held in their EU region.
            </li>
            <li>
              Vercel Inc., our hosting provider, which serves this site and
              processes routine traffic.
            </li>
            <li>
              Our delivery and freight partners, where directly relevant to
              fulfilling a shipment to your business.
            </li>
          </ul>
          <p>
            We do not sell your data and we do not share it with marketing
            companies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            How long we keep it
          </h2>
          <p>
            We keep account data while your trade account is active. If your
            account is closed or you ask us to delete it, we remove your
            personal data within 30 days. Standard server access logs are
            kept for 30 days then deleted automatically.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Your rights
          </h2>
          <p>Under UK GDPR you have the right to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Ask for a copy of the personal data we hold about you.</li>
            <li>Ask us to correct anything inaccurate.</li>
            <li>Ask us to delete your account and associated data.</li>
            <li>Object to or restrict our processing.</li>
            <li>
              Lodge a complaint with the Information Commissioner&apos;s
              Office at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 underline-offset-4 hover:underline"
              >
                ico.org.uk
              </a>
              .
            </li>
          </ul>
          <p>
            To exercise any of these rights, email{" "}
            <a
              href="mailto:info@aquaticimports.com"
              className="text-brand-700 underline-offset-4 hover:underline"
            >
              info@aquaticimports.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Cookies</h2>
          <p>
            We set one cookie, an authenticated session cookie, used purely
            to keep you signed in to the trade area. It is strictly necessary
            for the site to work and is exempt from consent requirements
            under UK PECR.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Changes to this policy
          </h2>
          <p>
            We may update this policy from time to time. The current version
            is always at this URL and the &ldquo;Last updated&rdquo; date
            above reflects the most recent change. For material changes
            affecting your account, we will tell you directly.
          </p>
        </section>

        <p className="pt-4 text-xs text-muted-foreground">
          See also our{" "}
          <Link
            href="/terms"
            className="text-brand-700 underline-offset-4 hover:underline"
          >
            terms and conditions
          </Link>
          .
        </p>
      </div>
    </article>
  );
}

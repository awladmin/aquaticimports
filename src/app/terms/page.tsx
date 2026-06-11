import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and conditions",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Terms and conditions
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: 11 June 2026
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground/90">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            About these terms
          </h2>
          <p>
            These terms govern your use of aquaticimports.com (the
            &ldquo;site&rdquo;) and the services it provides. By logging in
            to a trade account, you agree to be bound by them.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Who can use this site
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Trade accounts are issued by us to approved wholesale and
              consolidated importer customers.
            </li>
            <li>
              We do not sell directly to retail consumers. If you are a
              retail buyer, please contact us and we will refer you to one of
              our trade customers who can supply you.
            </li>
            <li>
              Your account is for your business only. Do not share your
              login credentials with anyone outside your business.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Stocklists and pricing
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Stocklists are issued weekly and are accurate to the best of
              our knowledge at the time of upload.
            </li>
            <li>
              Stock availability changes throughout the week as orders are
              placed and shipments are confirmed.
            </li>
            <li>
              Prices in our stocklists are subject to our standard terms and
              conditions of sale. Errors and omissions excepted.
            </li>
            <li>
              We reserve the right to amend pricing without prior notice.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Your account
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Keep your login credentials confidential.</li>
            <li>
              Notify us immediately if you suspect your account has been
              accessed by someone else.
            </li>
            <li>
              We may suspend or remove accounts that misuse the service or
              breach these terms.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Service availability
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              We aim to keep the site available but offer no guarantee of
              uninterrupted access.
            </li>
            <li>
              We may carry out maintenance and updates with or without prior
              notice.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Our liability
          </h2>
          <p>
            We are not responsible for losses caused by stocklist accuracy
            issues, delayed or interrupted access to the site, or third-party
            service outages, beyond what is required by law.
          </p>
          <p>
            Nothing in these terms limits our liability for death or personal
            injury caused by our negligence, for fraud, or for anything else
            that cannot lawfully be excluded.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Governing law
          </h2>
          <p>
            These terms are governed by the law of England and Wales. Any
            disputes arising under them will be resolved in the courts of
            England and Wales.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Changes to these terms
          </h2>
          <p>
            We may update these terms from time to time. The current version
            is always at this URL and the &ldquo;Last updated&rdquo; date
            above reflects the most recent change. Continued use of your
            trade account after a change means you accept the updated terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a
              href="mailto:info@aquaticimports.com"
              className="text-brand-700 underline-offset-4 hover:underline"
            >
              info@aquaticimports.com
            </a>{" "}
            or use our{" "}
            <Link
              href="/contact"
              className="text-brand-700 underline-offset-4 hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </section>

        <p className="pt-4 text-xs text-muted-foreground">
          See also our{" "}
          <Link
            href="/privacy"
            className="text-brand-700 underline-offset-4 hover:underline"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>
    </article>
  );
}

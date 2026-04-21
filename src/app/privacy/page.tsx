import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Placeholder copy — final policy to be agreed during handover.
      </p>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          Independent Aquatic Imports Ltd (&ldquo;we&rdquo;) respect your
          privacy and are committed to protecting the personal data you share
          with us. This policy explains what data we collect, how we use it and
          your rights under UK GDPR.
        </p>
        <p>
          We collect only the information necessary to operate your trade
          account: business name, contact details, delivery address and order
          history. We never share your details with third parties except where
          required to fulfil your order (e.g. our delivery partners).
        </p>
        <p>
          You have the right to request a copy of your data, correction of
          inaccurate data, or deletion of your account. To make a request,
          email{" "}
          <a
            href="mailto:info@aquaticimports.com"
            className="text-brand-700 underline-offset-4 hover:underline"
          >
            info@aquaticimports.com
          </a>
          .
        </p>
      </div>
    </article>
  );
}

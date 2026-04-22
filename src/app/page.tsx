import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrandLogo } from "@/components/brand-logo";
import {
  ArrowRight,
  Globe2,
  ShieldCheck,
  Truck,
  Calendar,
  Fish,
  Handshake,
} from "lucide-react";

export default async function HomePage() {
  const session = await getSession();
  const isLoggedIn = !!session;

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Hero background layers (bottom -> top):
            1. Aqua radial gradient fallback (shows while video loads or on error)
            2. Looping hero video (public/hero.mp4), with hero.jpg as poster
            3. Vignette overlays for text legibility */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #73C9B4 0%, transparent 45%), radial-gradient(circle at 80% 10%, #7BC8F7 0%, transparent 40%), radial-gradient(circle at 60% 80%, #A3E0D0 0%, transparent 50%)",
            }}
          />
          <video
            src="/hero.mp4"
            poster="/hero.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ backgroundColor: "#73C9B4" }}
            className="absolute inset-0 h-[102%] w-[102%] -translate-x-[1%] -translate-y-[1%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/15 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/25 via-transparent to-background/25" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Quality aquatic livestock
              <br />
              for the UK wholesale trade.
            </h1>
            <p className="mt-4 text-lg font-medium text-foreground/90 drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] sm:text-xl">
              A specialist importer of ornamental fish, invertebrates and
              aquatic plants, supplying wholesalers and consolidated importers
              across the United Kingdom since 1999.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/shipment-schedule"
                    className="inline-flex h-11 items-center justify-center gap-1 rounded-lg bg-brand-500 px-5 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
                  >
                    This week&apos;s schedule
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="/suppliers"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium hover:bg-muted"
                  >
                    Browse suppliers
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex h-11 items-center justify-center gap-1 rounded-lg bg-brand-500 px-5 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
                  >
                    Trade login
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium hover:bg-muted"
                  >
                    Apply for an account
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value="40+" label="Global suppliers" />
            <Stat value="20+" label="Source countries" />
            <Stat value="1999" label="Established" />
            <Stat value="5" label="Delivery days / week" />
          </div>
        </div>
      </section>

      <AboutSection />

      <PublicPanels isLoggedIn={isLoggedIn} />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Card className="border-white/20 bg-white/10 shadow-none backdrop-blur-sm">
      <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
        <span className="text-2xl font-semibold tracking-tight text-brand-700 sm:text-3xl">
          {value}
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
  );
}

function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            About us
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Specialist importers
            <br />
            since 1999.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            We work exclusively with wholesalers and consolidated importers.
            Retail enquiries are referred to our list of trusted partners.
          </p>
          <div className="mt-8">
            <BrandLogo size="2xl" className="h-24 sm:h-28 lg:h-32 xl:h-40" />
          </div>
        </div>

        <div className="space-y-5 text-base leading-relaxed text-foreground/90 lg:col-span-8">
          <p className="text-lg font-medium text-foreground">
            We are a specialist company, formed to exclusively supply quality
            aquatic livestock to wholesalers and consolidated importers of
            ornamental fish, plants and invertebrates.
          </p>
          <p>
            Independent Aquatic Imports was founded in 1999 and boasts a
            specialist team with a wealth of knowledge in both the aquatic and
            aviation industries.
          </p>
          <p>
            Our philosophy is simple. By supplying reliable, wide-ranging
            imports of high-quality fish, invertebrates and plants, we help our
            customers to increase their business. We believe that by working
            together, we can grow together.
          </p>
          <p>
            We do not supply directly to individual retailers, but will respond
            to all retail enquiries with a list of reliable companies who can
            supply our full range of exciting imports.
          </p>
          <p>
            We have an extensive and enviable portfolio of suppliers worldwide,
            many of whom are exclusive to Independent Aquatic Imports. We make
            a point of visiting and keeping in constant communication with our
            chosen partner suppliers to enable us to provide the best possible
            service for our customers. We currently import from more than 40
            suppliers in over 20 countries. If we do not list the species you
            are looking for, we are confident we can find it for you.
          </p>
          <p className="pt-2 text-sm font-semibold tracking-tight text-brand-700">
            — The Independent Aquatic Imports Team
          </p>
        </div>
      </div>
    </section>
  );
}

function PublicPanels({ isLoggedIn }: { isLoggedIn: boolean }) {
  const features = [
    {
      icon: Globe2,
      title: "Global supply network",
      body: "Vetted partner suppliers across more than 20 countries. Many are exclusive to Independent Aquatic Imports and personally audited by our team.",
    },
    {
      icon: Handshake,
      title: "Wholesale &amp; consolidated only",
      body: "We supply wholesalers and consolidated importers, not individual shops. Retail enquiries are referred to our list of trade customers.",
    },
    {
      icon: ShieldCheck,
      title: "CITES &amp; compliance",
      body: "Full documentation with every shipment: health certificates, CITES permits where applicable, and Border Force compliance handled on your behalf.",
    },
    {
      icon: Fish,
      title: "Freshwater, marine &amp; plants",
      body: "A full range from wild-caught Amazonian species and West African oddballs through to farmed discus, hard corals and aquatic plants.",
    },
    {
      icon: Truck,
      title: "Weekly UK delivery",
      body: "Arrivals Tuesday through Friday, consolidated at our Slough facility and delivered direct to your holding.",
    },
    {
      icon: Calendar,
      title: "Transparent schedule",
      body: "Shipment schedule and stock lists updated daily as suppliers confirm. Trade accounts see everything live.",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Why the trade works with us
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          25 years sourcing and consolidating quality aquatic livestock for the
          UK wholesale trade.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="group border-border/60">
            <CardContent className="p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3
                className="mt-4 text-base font-semibold tracking-tight"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p
                className="mt-2 text-sm leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoggedIn && (
        <Card className="mt-10 overflow-hidden border-brand-200 bg-gradient-to-br from-brand-50 to-background">
          <CardContent className="flex flex-col items-start gap-6 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Trade account needed to see stock lists
              </h3>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Full stock lists and the weekly shipment schedule are visible
                to approved wholesale accounts only. Apply for an account and
                we&apos;ll be in touch within 48 hours.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                asChild
                className="bg-brand-500 text-white hover:bg-brand-600"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Apply</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

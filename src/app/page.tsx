import Link from "next/link";
import { getSession } from "@/lib/auth";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrandLogo } from "@/components/brand-logo";
import {
  ArrowRight,
  Globe2,
  ShieldCheck,
  Truck,
  Award,
  Fish,
  Handshake,
} from "lucide-react";

// Hero rotation. Aquatic Imports plane sits at the end pending Rob's call
// on whether to drop it.
const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/heros/ba-plane.jpg",
    alt: "British Airways Boeing 747 on the Heathrow apron, viewed from the wing of another aircraft",
  },
  { src: "/heros/tetra.jpg", alt: "Lush planted freshwater aquarium with neon tetras" },
  {
    src: "/heros/goldfish.jpg",
    alt: "Fancy orange goldfish in clear deep-blue water",
    objectPosition: "center top",
  },
  { src: "/heros/koi.jpg", alt: "Top-down view of koi swimming in a clear turquoise pond" },
  {
    src: "/heros/anthias.jpg",
    alt: "School of orange lyretail anthias swimming around vivid pink soft coral on a tropical reef",
  },
  { src: "/hero.jpg", alt: "Aquatic Imports cargo aircraft at Heathrow" },
];

export default async function HomePage() {
  const session = await getSession();
  const isLoggedIn = !!session;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <HeroCarousel slides={HERO_SLIDES} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/5 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/15 via-transparent to-background/15" />
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
                <Link
                  href="/stocklists"
                  className="inline-flex h-11 items-center justify-center gap-1 rounded-lg bg-gradient-to-b from-brand-400 to-brand-600 px-5 text-sm font-medium text-white transition-colors hover:from-brand-500 hover:to-brand-700"
                >
                  Open Stocklists
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex h-11 items-center justify-center gap-1 rounded-lg bg-gradient-to-b from-brand-400 to-brand-600 px-5 text-sm font-medium text-white transition-colors hover:from-brand-500 hover:to-brand-700"
                  >
                    Trade login
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium hover:bg-muted"
                  >
                    Request access
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4">
            <Stat value="1999" label="Established" />
            <Stat value="100%" label="Trade only" />
            <Stat value="20+" label="Source countries" />
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
    <Card className="border-white/15 bg-white/5 shadow-none backdrop-blur-[2px]">
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

        <div className="space-y-5 text-base leading-relaxed text-foreground/90 lg:col-span-8 lg:text-justify">
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
            The Independent Aquatic Imports Team
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
      body: "Partner suppliers across more than 20 countries, many exclusive to Independent Aquatic Imports and personally audited by our team.",
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
      title: "Tropical Freshwater, Coldwater, Marine &amp; Aquatic Plants",
      body: "A comprehensive range of livestock and plants for every kind of pond and aquarium.",
    },
    {
      icon: Truck,
      title: "Weekly UK delivery",
      body: "Weekly imports with most shipments arriving to our Heathrow premises on a Tuesday, where routings allow. Same day delivery on our fleet of dedicated vehicles throughout mainland Great Britain.",
    },
    {
      icon: Award,
      title: "Established 1999",
      body: "Over 25 years supplying some of the UK's largest wholesalers and consolidated importers. A name the trade knows and trusts.",
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
          <Card key={title} className="group min-h-[260px] border-border/60">
            <CardContent className="p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3
                className="mt-4 text-base font-semibold tracking-tight"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p
                className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-justify"
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
                An approved Trade Account is required to access stocklists
              </h3>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Full stock lists and the weekly shipment schedule are visible
                to approved wholesale accounts only. Apply for an account and
                we&apos;ll be in touch within 48 hours.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="brand">
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

import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SUPPLIERS, ALL_COUNTRIES } from "@/data/suppliers";
import { CURRENT_SCHEDULE, CURRENT_WEEK_COMMENCING } from "@/data/schedule";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Truck,
  Calendar,
  Fish,
} from "lucide-react";

export default async function HomePage() {
  const session = await getSession();
  const isLoggedIn = !!session;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #73C9B4 0%, transparent 45%), radial-gradient(circle at 80% 10%, #7BC8F7 0%, transparent 40%), radial-gradient(circle at 60% 80%, #A3E0D0 0%, transparent 50%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Direct importers &middot; Established 1999
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Aquatic livestock &amp; plants,
              <br />
              shipped direct to the UK trade.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Independent Aquatic Imports source, quality-check and distribute
              freshwater and marine livestock from vetted suppliers across four
              continents — delivered to independent aquatic retailers every
              week.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {isLoggedIn ? (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-500 text-white hover:bg-brand-600"
                  >
                    <Link href="/shipment-schedule">
                      This week&apos;s schedule
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/suppliers">Browse suppliers</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-500 text-white hover:bg-brand-600"
                  >
                    <Link href="/login">
                      Trade login
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">Apply for an account</Link>
                  </Button>
                </>
              )}
            </div>
            {!isLoggedIn && (
              <p className="mt-4 text-xs text-muted-foreground">
                Stock lists and prices are visible to logged-in trade accounts
                only.
              </p>
            )}
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={SUPPLIERS.length.toString()} label="Active suppliers" />
            <Stat
              value={ALL_COUNTRIES.length.toString()}
              label="Source countries"
            />
            <Stat value="5" label="Delivery days per week" />
            <Stat value="25+" label="Years in the trade" />
          </div>
        </div>
      </section>

      {!isLoggedIn ? (
        <PublicPanels />
      ) : (
        <MemberPanels
          scheduleCount={CURRENT_SCHEDULE.length}
          weekCommencing={CURRENT_WEEK_COMMENCING}
        />
      )}
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Card className="border-brand-100/60 bg-background/60 shadow-none backdrop-blur">
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

function PublicPanels() {
  const features = [
    {
      icon: Globe2,
      title: "Global supply network",
      body: "Vetted suppliers in Indonesia, Singapore, Sri Lanka, Brazil, Peru, Colombia, Japan, Malaysia and more — each audited and rotated regularly.",
    },
    {
      icon: ShieldCheck,
      title: "CITES & compliance",
      body: "Full documentation with every shipment: health certs, CITES permits where applicable, and Border Force compliance handled on your behalf.",
    },
    {
      icon: Truck,
      title: "Weekly UK delivery",
      body: "Arrivals from Tuesday through Friday. Pre-order via our weekly stock lists and we'll consolidate and deliver to your door.",
    },
    {
      icon: Fish,
      title: "Freshwater, marine & plants",
      body: "A full range from L-number plecos and wild Amazon tetras through to SPS coral colonies and show-grade discus.",
    },
    {
      icon: Calendar,
      title: "Transparent schedule",
      body: "Our shipment schedule and stock lists are updated daily as suppliers confirm — trade accounts see everything live.",
    },
    {
      icon: CheckCircle2,
      title: "Quality acclimatised",
      body: "All livestock is quarantined and acclimatised at our Slough facility before onward shipment to retailers.",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Why independent retailers work with us
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          25 years sourcing, handling and delivering livestock for UK aquatic
          shops — without the wholesaler markup.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="group border-border/60">
            <CardContent className="p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10 overflow-hidden border-brand-200 bg-gradient-to-br from-brand-50 to-background">
        <CardContent className="flex flex-col items-start gap-6 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              Trade account needed to see stock lists
            </h3>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Wholesale pricing, full stock lists and the weekly shipment
              schedule are visible to approved retailers only. Apply for an
              account and we&apos;ll be in touch within 48 hours.
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
    </section>
  );
}

function MemberPanels({
  scheduleCount,
  weekCommencing,
}: {
  scheduleCount: number;
  weekCommencing: string;
}) {
  const weekDate = new Date(weekCommencing).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden border-brand-200 bg-gradient-to-br from-brand-50 to-background lg:col-span-2">
          <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                Week commencing {weekDate}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                {scheduleCount} supplier arrivals confirmed this week
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Full list with detail, deadlines and downloadable stock lists
                on the shipment schedule page.
              </p>
            </div>
            <Button
              asChild
              className="bg-brand-500 text-white hover:bg-brand-600"
            >
              <Link href="/shipment-schedule">
                View schedule
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="flex h-full flex-col justify-between p-6">
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Need to order?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pre-orders by phone or email during opening hours. All order
                deadlines are listed on each supplier row in the schedule.
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/place-order">How to order</Link>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

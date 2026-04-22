import Link from "next/link";
import { SUPPLIERS } from "@/data/suppliers";
import { CURRENT_SCHEDULE, CURRENT_WEEK_COMMENCING } from "@/data/schedule";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Boxes,
  CalendarDays,
  Globe2,
  Users,
  Plus,
  ArrowRight,
  Package,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const scheduled = CURRENT_SCHEDULE.length;
  const available = CURRENT_SCHEDULE.filter((e) => e.available).length;
  const featured = SUPPLIERS.filter((s) => s.featured).length;
  const weekDate = new Date(CURRENT_WEEK_COMMENCING).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long" }
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Good afternoon, Robert 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening on your site today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/admin/schedule">
              <CalendarDays className="mr-1 h-4 w-4" />
              Edit this week
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-brand-500 text-white hover:bg-brand-600"
          >
            <Link href="/admin/suppliers/new">
              <Plus className="mr-1 h-4 w-4" />
              Add supplier
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Boxes}
          label="Active suppliers"
          value={SUPPLIERS.length.toString()}
          hint={`${featured} featured`}
        />
        <StatCard
          icon={CalendarDays}
          label="Arrivals this week"
          value={`${available}/${scheduled}`}
          hint={`w/c ${weekDate}`}
        />
        <StatCard
          icon={Users}
          label="Trade accounts"
          value="52"
          hint="2 pending approval"
          alert
        />
        <StatCard
          icon={Globe2}
          label="Source countries"
          value="20+"
          hint="40+ partner suppliers"
        />
      </div>

      <div>
        <Card className="border-border/70">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b border-border/60 p-5">
              <div>
                <h2 className="text-base font-semibold">
                  Schedule, week commencing {weekDate}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {scheduled} supplier rows · {available} available · drag to
                  reorder on the schedule page
                </p>
              </div>
              <Button asChild size="sm" variant="ghost">
                <Link href="/admin/schedule">
                  Manage
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <ul className="divide-y divide-border/60">
              {CURRENT_SCHEDULE.slice(0, 8).map((e) => {
                const s = SUPPLIERS.find((x) => x.slug === e.supplierSlug);
                if (!s) return null;
                return (
                  <li
                    key={e.supplierSlug}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                        <Package className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.country} · {e.detail.slice(0, 50)}…
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline">{e.arrives}</Badge>
                      {!e.available && (
                        <Badge variant="secondary">Pre-order</Badge>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-dashed border-brand-300/60 bg-brand-50/40">
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold">
                Weekly schedule goes live Monday at 9am
              </h3>
              <p className="text-sm text-muted-foreground">
                You can lock next week&apos;s arrivals now and they&apos;ll
                publish automatically, trade users will get an email alert.
              </p>
            </div>
          </div>
          <Button asChild className="bg-brand-500 text-white hover:bg-brand-600">
            <Link href="/admin/schedule">Plan next week</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  alert,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
  alert?: boolean;
}) {
  return (
    <Card className="border-border/70">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
            <Icon className="h-4 w-4" />
          </span>
          {alert && (
            <Badge
              variant="outline"
              className="border-amber-200 bg-amber-50 text-amber-800"
            >
              <AlertCircle className="mr-1 h-3 w-3" />
              Action
            </Badge>
          )}
        </div>
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
        {hint && (
          <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
        )}
      </CardContent>
    </Card>
  );
}


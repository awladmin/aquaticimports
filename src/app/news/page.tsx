import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { NEWS } from "@/data/news";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
};

const TAG_COLOR: Record<string, string> = {
  Announcement: "bg-brand-100 text-brand-800 border-brand-200",
  Supplier: "bg-sky-100 text-sky-800 border-sky-200",
  Trade: "bg-amber-100 text-amber-800 border-amber-200",
  Logistics: "bg-indigo-100 text-indigo-800 border-indigo-200",
};

export default async function NewsPage() {
  await requireSession();
  const [latest, ...rest] = NEWS;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
          Trade news
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          News &amp; trade updates
        </h1>
        <p className="mt-3 text-muted-foreground">
          Supplier announcements, shipping schedule changes, trade updates and
          the occasional Amazon water-level bulletin.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <Link
          href={`/news/${latest.slug}`}
          className="group lg:col-span-3"
        >
          <Card className="h-full overflow-hidden border-border/70 transition-all group-hover:-translate-y-0.5 group-hover:border-brand-300 group-hover:shadow-md group-hover:shadow-brand-500/10">
            <div
              className="h-48 w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, #73C9B4 0%, transparent 55%), radial-gradient(circle at 80% 70%, #7BC8F7 0%, transparent 60%)",
              }}
            />
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge
                  variant="outline"
                  className={TAG_COLOR[latest.tag] ?? ""}
                >
                  {latest.tag}
                </Badge>
                <span>·</span>
                <Calendar className="h-3 w-3" />
                {new Date(latest.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight group-hover:text-brand-700">
                {latest.title}
              </h2>
              <p className="mt-2 text-muted-foreground">{latest.excerpt}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                Read more
                <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <div className="space-y-4 lg:col-span-2">
          {rest.map((post) => (
            <Link key={post.slug} href={`/news/${post.slug}`} className="group block">
              <Card className="border-border/70 transition-all group-hover:-translate-y-0.5 group-hover:border-brand-300 group-hover:shadow-sm group-hover:shadow-brand-500/10">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge
                      variant="outline"
                      className={TAG_COLOR[post.tag] ?? ""}
                    >
                      {post.tag}
                    </Badge>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold tracking-tight group-hover:text-brand-700">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

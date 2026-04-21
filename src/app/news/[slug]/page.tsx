import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { NEWS, getNewsPost } from "@/data/news";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getNewsPost(slug);
  return { title: p ? p.title : "News" };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireSession();
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="mb-6 text-muted-foreground"
      >
        <Link href="/news">
          <ArrowLeft className="mr-1 h-4 w-4" />
          All news
        </Link>
      </Button>

      <Badge variant="outline" className="border-brand-200 bg-brand-50/60 text-brand-800">
        {post.tag}
      </Badge>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {date}
        </span>
        <span className="inline-flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          {post.author}
        </span>
      </div>

      <div className="mt-8 text-lg font-medium text-foreground">
        {post.excerpt}
      </div>

      <div className="mt-6 text-base leading-relaxed text-muted-foreground">
        <p>{post.body}</p>
      </div>
    </article>
  );
}

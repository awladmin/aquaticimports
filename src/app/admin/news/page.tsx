import Link from "next/link";
import { NEWS } from "@/data/news";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Eye } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · News",
};

export default function AdminNewsPage() {
  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">News</h1>
          <p className="text-sm text-muted-foreground">
            {NEWS.length} posts · write supplier updates, trade announcements
            and schedule changes.
          </p>
        </div>
        <Button className="bg-brand-500 text-white hover:bg-brand-600">
          <Plus className="mr-1 h-4 w-4" />
          Write post
        </Button>
      </header>

      <div className="grid gap-3">
        {NEWS.map((post) => (
          <Card key={post.slug} className="border-border/70">
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{post.tag}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="mt-1 truncate text-sm font-semibold">
                  {post.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button asChild variant="ghost" size="icon">
                  <Link href={`/news/${post.slug}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Check, Reply } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Messages",
};

const MESSAGES = [
  {
    name: "Jamie Roberts",
    company: "The Reef Shop",
    email: "jamie@thereefshop.co.uk",
    subject: "Trade application — new shop opening",
    body: "Hi, we're opening a new aquatic shop in Bristol in May and would like to apply for a trade account. We're particularly interested in your marine and coral suppliers. Can we have a chat about volumes and delivery?",
    time: "2h ago",
    tag: "Application",
    unread: true,
  },
  {
    name: "Sarah Woolf",
    company: "Aquatic Dreams Ltd",
    email: "sarah@aquaticdreams.co.uk",
    subject: "Follow-up on discus pre-order",
    body: "Hi Colin — just wanted to check whether the Malaysian discus order for this Friday has been confirmed. We need to clear some tanks if it's coming.",
    time: "5h ago",
    tag: "Order",
    unread: true,
  },
  {
    name: "Chris Patel",
    company: "Coral Cove Aquatics",
    email: "chris@coralcove.co.uk",
    subject: "Invoice query — 14 April shipment",
    body: "One of the coral frags on our last delivery was damaged in transit. Could you please credit the invoice for that item? Photo attached.",
    time: "Yesterday",
    tag: "Accounts",
    unread: true,
  },
  {
    name: "Tony Hirsch",
    company: "Seahaven Pets",
    email: "tony@seahavenpets.co.uk",
    subject: "Thanks — arrived safely",
    body: "Everything arrived in great condition this morning. The Peruvian Corydoras are stunning. Thanks as always.",
    time: "2 days ago",
    tag: "Feedback",
    unread: false,
  },
];

export default function AdminMessagesPage() {
  const unread = MESSAGES.filter((m) => m.unread).length;

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
          <p className="text-sm text-muted-foreground">
            {MESSAGES.length} messages · {unread} unread
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Check className="mr-1 h-4 w-4" />
          Mark all read
        </Button>
      </header>

      <div className="grid gap-3">
        {MESSAGES.map((m) => (
          <Card key={m.email + m.subject} className="border-border/70">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
              <div className="flex shrink-0 flex-row items-center gap-3 sm:w-48 sm:flex-col sm:items-start">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
                  {m.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {m.company}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {m.time}
                  </p>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {m.unread && (
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                  )}
                  <h3 className="truncate text-sm font-semibold">
                    {m.subject}
                  </h3>
                  <Badge variant="outline" className="ml-auto">
                    {m.tag}
                  </Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {m.body}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Reply className="mr-1 h-3 w-3" />
                    Reply
                  </Button>
                  <Button size="sm" variant="ghost">
                    Mark read
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

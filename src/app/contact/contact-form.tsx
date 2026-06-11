"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Message sent", {
      description: "Thanks, we&apos;ll come back to you within one working day.",
    });
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Telephone</Label>
          <Input id="phone" name="phone" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Business name</Label>
          <Input id="company" name="company" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea id="message" name="message" rows={6} required />
      </div>
      <Button
        type="submit"
        variant="brand"
        disabled={submitting}
      >
        <Send className="mr-1.5 h-4 w-4" />
        {submitting ? "Sending…" : "Send your message"}
      </Button>
    </form>
  );
}

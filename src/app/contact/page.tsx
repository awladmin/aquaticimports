import { ContactForm } from "./contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-3 text-muted-foreground">
          Questions about your account, a supplier, or applying for trade?
          Leave your details and we&apos;ll come back to you within one working
          day.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-5">
        <Card className="border-border/70 lg:col-span-3">
          <CardContent className="p-6 sm:p-8">
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <Card className="border-border/70">
            <CardContent className="space-y-4 p-6">
              <InfoRow
                icon={MapPin}
                title="Warehouse &amp; offices"
                body={
                  <>
                    Unit 2, Trident Industrial Estate
                    <br />
                    Blackthorne Road, Colnbrook
                    <br />
                    Slough SL3 0AX
                  </>
                }
              />
              <InfoRow
                icon={Phone}
                title="Telephone"
                body="+44 (0)1753 687050"
              />
              <InfoRow
                icon={Mail}
                title="Email"
                body="info@aquaticimports.com"
              />
              <InfoRow
                icon={Clock}
                title="Opening hours"
                body={
                  <>
                    Mon-Fri 8am, 5pm
                    <br />
                    Saturday &amp; Sunday closed
                  </>
                }
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/70">
            <div
              className="aspect-[4/3] w-full bg-gradient-to-br from-brand-200 via-brand-100 to-background"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(115,201,180,0.08) 0 10px, transparent 10px 20px)",
              }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="rounded-lg bg-background/80 px-4 py-3 text-center shadow-sm backdrop-blur">
                  <MapPin className="mx-auto h-5 w-5 text-brand-600" />
                  <p className="mt-1 text-sm font-medium">Colnbrook, Slough</p>
                  <p className="text-xs text-muted-foreground">
                    10 mins from Heathrow (LHR)
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="text-sm">
        <p
          className="font-medium text-foreground"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="mt-0.5 text-muted-foreground">{body}</div>
      </div>
    </div>
  );
}

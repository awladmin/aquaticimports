import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/hero-4.jpg"
            alt="Spotted koi swimming in clear water"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/25 via-transparent to-background/25" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Get in touch
            </h1>
            <p className="mt-3 text-base font-medium text-foreground/90 drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] sm:text-lg">
              Questions about your account, applying for trade, or anything
              else? Give us a call or drop us an email and we&apos;ll come back
              to you within one working day.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto -mt-8 max-w-2xl">
          <Card className="border-border/70">
            <CardContent className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
              <InfoRow
                icon={Phone}
                title="Telephone"
                body={
                  <a
                    href="tel:+441753687050"
                    className="hover:text-foreground"
                  >
                    +44 (0)1753 687050
                  </a>
                }
              />
              <InfoRow
                icon={Mail}
                title="Email"
                body={
                  <a
                    href="mailto:info@aquaticimports.com"
                    className="hover:text-foreground"
                  >
                    info@aquaticimports.com
                  </a>
                }
              />
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
        </div>
      </div>
    </>
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

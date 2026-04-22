import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { MapPin, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 text-white" style={{ backgroundColor: "#3675c2" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <BrandLogo variant="white" size="lg" />
          <p className="text-sm text-white/80">
            Direct importers and distributors of quality aquatic livestock and
            plants to the UK trade. Established 1999.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">
            Site links
          </h4>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/suppliers">Supplier info</FooterLink>
            <FooterLink href="/shipment-schedule">Shipment schedule</FooterLink>
            <FooterLink href="/contact">Contact us</FooterLink>
            <FooterLink href="/privacy">Privacy policy</FooterLink>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">
            Our address
          </h4>
          <address className="space-y-1.5 text-sm not-italic text-white/80">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/90" />
              <div>
                Independent Aquatic Imports Ltd
                <br />
                Unit 2, Trident Industrial Estate
                <br />
                Blackthorne Road, Colnbrook
                <br />
                Slough, Berkshire SL3 0AX
                <br />
                United Kingdom
              </div>
            </div>
          </address>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">
            Email &amp; phone
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-white/90" />
              <a href="tel:+441753687050" className="hover:text-white">
                +44 (0)1753 687050
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-white/90" />
              <a
                href="mailto:info@aquaticimports.com"
                className="hover:text-white"
              >
                info@aquaticimports.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/70 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Independent Aquatic Imports Ltd.
            Company Reg. 381 4274. All prices E&amp;OE.
          </p>
          <p>
            Prices subject to our standard terms &amp; conditions. A copy can
            be supplied by request.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-white/80 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

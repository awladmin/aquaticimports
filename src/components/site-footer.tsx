import Image from "next/image";
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
            Our location
          </h4>
          <a
            href="https://www.google.com/maps/place/51%C2%B028'22.2%22N+0%C2%B030'53.3%22W/@51.4728392,-0.5148013,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg ring-1 ring-white/15 transition-opacity hover:opacity-90"
          >
            <Image
              src="/footer-map.png"
              alt="Map showing Aquatic Imports at Colnbrook, just west of Heathrow Airport"
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 50vw, 100vw"
              className="block h-auto w-full"
            />
          </a>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">
            Contact details
          </h4>
          <address className="space-y-4 text-sm not-italic text-white/80">
            <ul className="space-y-2">
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
            Site links
          </h4>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/contact">Contact us</FooterLink>
            <FooterLink href="/privacy">Privacy policy</FooterLink>
            <FooterLink href="/terms">Terms &amp; conditions</FooterLink>
          </ul>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Members of
          </span>
          <div className="grid w-full grid-cols-3 place-items-center gap-4 sm:contents sm:w-auto">
            <a
              href="https://ornamentalfish.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="OATA - Ornamental Aquatic Trade Association"
              className="block transition-opacity hover:opacity-80"
            >
              <Image
                src="/affiliations/oata.png"
                alt="OATA - Ornamental Aquatic Trade Association"
                width={1050}
                height={400}
                className="h-8 w-auto sm:h-10"
              />
            </a>
            <a
              href="https://ofish.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="OFI - Ornamental Fish International"
              className="block transition-opacity hover:opacity-80"
            >
              <Image
                src="/affiliations/ofi.png"
                alt="OFI - Ornamental Fish International"
                width={680}
                height={251}
                className="h-8 w-auto sm:h-10"
              />
            </a>
            <a
              href="https://www.gov.uk/guidance/authorised-economic-operator-certification"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UK Authorised Economic Operator"
              className="block transition-opacity hover:opacity-80"
            >
              <Image
                src="/affiliations/aeo.jpg"
                alt="UK Authorised Economic Operator"
                width={739}
                height={324}
                className="h-8 w-auto sm:h-10"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/70 sm:flex-row sm:px-6 lg:px-8">
          <p>
            {`© ${new Date().getFullYear()} Independent Aquatic Imports Ltd. Company Reg. 381 4274. All prices E&OE.`}
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

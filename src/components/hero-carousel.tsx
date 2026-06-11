"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export type HeroSlide = {
  src: string;
  alt: string;
};

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [
      Autoplay({
        delay: 6000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  // With a single slide there's nothing to rotate. Render it directly so we
  // skip carousel overhead.
  if (slides.length <= 1) {
    const s = slides[0];
    return (
      <Image
        src={s.src}
        alt={s.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    );
  }

  return (
    <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
      <div className="flex h-full">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="relative h-full min-w-0 flex-[0_0_100%]"
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

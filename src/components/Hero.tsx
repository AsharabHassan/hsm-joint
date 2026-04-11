"use client";

import { Button } from "@/components/ui/Button";
import type { BodyArea } from "@/data/bodyAreas";

interface HeroProps {
  bodyArea: BodyArea;
}

export function Hero({ bodyArea }: HeroProps) {
  return (
    <section className="bg-cream py-12 md:py-20">
      <div className="max-w-page mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-gold mb-3">
            Free Educational Assessment
          </p>
          <h1 className="font-serif text-h1-mobile lg:text-h1-desktop font-bold text-charcoal mb-4">
            {bodyArea.headline}
          </h1>
          <p className="text-base md:text-lg text-charcoal/70 mb-8 leading-relaxed">
            {bodyArea.subheadline}
          </p>
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              document
                .getElementById("quiz")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Your Free Joint Health Score →
          </Button>
          <p className="mt-3 text-[11px] text-muted">
            Takes 2 minutes · No obligation · Educational only
          </p>
        </div>
      </div>
    </section>
  );
}

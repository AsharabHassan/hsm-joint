"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function BottomCTA() {
  return (
    <section className="py-20 md:py-24 bg-charcoal text-center relative overflow-hidden">
      {/* Clinic background image — subtle dark overlay effect */}
      <img
        src="/images/clinic/harley-street.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
      />

      {/* Noise overlay — same as ComparisonTable */}
      <div className="noise-overlay" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,110,0.04),transparent_60%)]" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/[0.15]"
        style={{ animation: "pulseRing 4s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gold/[0.20]"
        style={{ animation: "pulseRing 4s ease-in-out infinite 1s" }}
      />

      <div className="relative z-10">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-white mb-3">
            Ready to Explore Your Options?
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="text-sm text-white/60 mb-8">
            Take the free 2-minute assessment and see your personalised score
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <Button
            size="lg"
            onClick={() => {
              const quiz = document.getElementById("quiz");
              const form = document.getElementById("assessment-form");
              (quiz || form)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Free Assessment
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12H19" /><path d="M14 7L19 12L14 17" />
            </svg>
          </Button>
        </FadeIn>

        {/* Trust badges */}
        <FadeIn delay={300}>
          <p className="mt-6 text-xs text-white/40 tracking-wide">
            GMC Registered&nbsp;&nbsp;·&nbsp;&nbsp;Harley Street W1G&nbsp;&nbsp;·&nbsp;&nbsp;No Obligation&nbsp;&nbsp;·&nbsp;&nbsp;⭐ 4.9 on Google
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

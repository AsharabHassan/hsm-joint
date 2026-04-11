"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function BottomCTA() {
  return (
    <section className="py-20 md:py-24 bg-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,110,0.04),transparent_60%)]" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/[0.06]"
        style={{ animation: "pulseRing 4s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gold/[0.08]"
        style={{ animation: "pulseRing 4s ease-in-out infinite 1s" }}
      />

      <div className="relative z-10">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-3">
            Ready to Explore Your Options?
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="text-sm text-slate mb-8">
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
      </div>
    </section>
  );
}

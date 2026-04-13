"use client";

import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { StarIcon, ClockIcon } from "@/components/ui/Icons";
import type { BodyArea } from "@/data/bodyAreas";

const heroImages: Record<string, string> = {
  "knee-pain": "/images/hero/hero-knee-pain.jpg",
  "hip-pain": "/images/hero/hero-hip-pain.jpg",
  "shoulder-pain": "/images/hero/hero-shoulder-pain.jpg",
  "back-pain": "/images/hero/hero-back-pain.jpg",
  "elbow-pain": "/images/hero/hero-elbow-pain.jpg",
  "hand-wrist-foot-ankle": "/images/hero/hero-hand-wrist-foot-ankle.jpg",
};

interface HeroProps {
  bodyArea: BodyArea;
}

export function Hero({ bodyArea }: HeroProps) {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px)",
        }}
      />

      {/* Radial gradient orbs */}
      <div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
          animation: "pulse 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-32 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,107,74,0.06) 0%, transparent 70%)",
          animation: "pulse 8s ease-in-out infinite 2s",
        }}
      />

      {/* Small floating dots */}
      <div
        className="absolute top-[20%] right-[15%] w-[6px] h-[6px] rounded-full bg-gold/20"
        style={{ animation: "float 4s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[60%] left-[10%] w-[5px] h-[5px] rounded-full bg-trust-green/15"
        style={{ animation: "float 5s ease-in-out infinite 1s" }}
      />
      <div
        className="absolute bottom-[25%] right-[40%] w-[8px] h-[8px] rounded-full bg-gold/15"
        style={{ animation: "float 6s ease-in-out infinite 2s" }}
      />

      <div className="max-w-page mx-auto px-4 py-16 md:py-24 lg:py-28 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            {/* Trust pill badge */}
            <div className="inline-flex items-center gap-2.5 bg-white border border-black/[0.06] rounded-full px-4 py-2 mb-6 hover-scale">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full bg-trust-green"
                  style={{ animation: "pulse 2s ease-in-out infinite" }}
                />
                <span className="text-[12px] font-semibold text-trust-green">
                  GMC Registered
                </span>
              </div>
              <span className="text-muted/40">&#xB7;</span>
              <span className="text-[12px] text-muted">
                Harley Street, London
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-h1-mobile lg:text-[62px] lg:leading-[1.06] font-bold text-charcoal mb-5 leading-tight">
              <span className="relative inline">
                <span
                  style={{
                    background: "linear-gradient(135deg, #B8912E, #C8A96E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Tired of
                </span>
                <span
                  className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm"
                  style={{
                    transformOrigin: "left",
                    animation: "revealLine 0.8s ease-out 0.5s both",
                  }}
                />
              </span>{" "}
              {bodyArea.headline.replace("Tired of ", "")}
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-slate mb-8 leading-relaxed max-w-xl font-sans">
              {bodyArea.subheadline}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => {
                  document
                    .getElementById("quiz")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Your Free Assessment
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12H19" />
                  <path d="M14 7L19 12L14 17" />
                </svg>
              </Button>
              <span className="text-[13px] text-muted">No obligation</span>
            </div>

            {/* NHS wait-time callout */}
            <div className="inline-flex items-center gap-2 bg-trust-green-light border border-trust-green/20 rounded-full px-4 py-2 mt-6">
              <ClockIcon size={14} className="text-trust-green" />
              <span className="text-[12px] font-semibold text-trust-green">
                Skip the 28-week NHS wait
              </span>
            </div>

            {/* Stats row */}
            <div className="border-t border-black/[0.06] mt-8 pt-8">
              <div className="flex items-center gap-6 md:gap-8">
                {/* Stat 1 */}
                <div>
                  <p className="font-serif text-2xl font-extrabold text-charcoal tracking-tight">
                    <CountUp end="6,000+" />
                  </p>
                  <p className="text-[11px] text-muted mt-1 font-medium">
                    patients assessed
                  </p>
                </div>
                <div className="w-px h-10 bg-gradient-to-b from-transparent via-black/[0.06] to-transparent" />
                {/* Stat 2 */}
                <div>
                  <p className="font-serif text-2xl font-extrabold text-charcoal tracking-tight">
                    <CountUp end="4.9" />
                    <span className="text-gold text-base font-bold">/5</span>
                  </p>
                  <p className="text-[11px] text-muted mt-1 font-medium">
                    patient rating
                  </p>
                </div>
                <div className="w-px h-10 bg-gradient-to-b from-transparent via-black/[0.06] to-transparent" />
                {/* Stat 3 */}
                <div>
                  <p className="font-serif text-2xl font-extrabold text-charcoal tracking-tight">
                    <CountUp end="10" />
                    <span className="text-gold text-base font-bold">yr</span>
                  </p>
                  <p className="text-[11px] text-muted mt-1 font-medium">
                    of experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — desktop only */}
          <div className="hidden lg:block relative">
            {/* Image showcase container */}
            <div
              className="relative rounded-[22px] overflow-hidden h-[480px]"
              style={{
                boxShadow:
                  "0 24px 72px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
                animation: "gentleGlow 4s ease-in-out infinite",
              }}
            >
              {heroImages[bodyArea.slug] ? (
                <>
                  {/* Hero image */}
                  <img
                    src={heroImages[bodyArea.slug]}
                    alt={bodyArea.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay for badge readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.20) 100%)",
                    }}
                  />
                </>
              ) : (
                /* Placeholder when no image exists yet */
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3"
                  style={{
                    background: "linear-gradient(135deg, #2D5F5D, #1B3A4B)",
                  }}
                >
                  <p className="text-white/60 text-lg font-semibold tracking-wide">
                    Image Coming Soon
                  </p>
                </div>
              )}

              {/* Star rating badge — bottom-left overlay */}
              <div
                className="absolute left-5 bottom-5 bg-white rounded-[14px] px-4 py-2.5 flex items-center gap-2"
                style={{
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={14} className="text-gold" />
                  ))}
                </div>
                <span className="font-bold text-sm text-charcoal">4.9</span>
                <span className="text-[11px] text-muted">Verified</span>
              </div>

              {/* Online now indicator — top overlay */}
              <div
                className="absolute top-4 right-4 bg-white rounded-full px-3.5 py-1.5 flex items-center gap-2"
                style={{
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  animation: "float 5s ease-in-out infinite 1s",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full bg-green-bright"
                  style={{ animation: "pulse 2s ease-in-out infinite" }}
                />
                <span className="text-[12px] font-bold text-charcoal">
                  Online now
                </span>
              </div>
            </div>

            {/* Floating testimonial card — bottom-right */}
            <div
              className="absolute -bottom-4 -right-4 bg-white rounded-[16px] p-4 max-w-[230px]"
              style={{
                boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
                animation: "floatSlow 6s ease-in-out infinite",
              }}
            >
              <p className="text-[13px] text-slate italic leading-relaxed mb-3">
                &ldquo;Excellent care from start to finish. Highly recommend.&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                  style={{
                    background: "linear-gradient(135deg, #C8A96E, #B8912E)",
                  }}
                >
                  JP
                </div>
                <span className="text-[11px] text-muted font-medium">
                  Verified Patient
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

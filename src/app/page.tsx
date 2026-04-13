import Link from "next/link";
import { bodyAreas } from "@/data/bodyAreas";
import { Card } from "@/components/ui/Card";
import { SocialProof } from "@/components/SocialProof";
import { FinancingBar } from "@/components/FinancingBar";
import { VideoSection } from "@/components/VideoSection";
// ComparisonTable removed — contains PRP/exosome/stem-cell terms, not ad-safe
import { TreatmentCards } from "@/components/TreatmentCards";
import { Testimonials } from "@/components/Testimonials";
import { LocationTrust } from "@/components/LocationTrust";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { BodyAreaIcon } from "@/components/ui/BodyAreaIcon";
import { ArrowRightIcon, ShieldCheckIcon, ClockIcon, HeartPulseIcon } from "@/components/ui/Icons";
import { generateMedicalClinicSchema } from "@/lib/schema";

export default function HomePage() {
  const clinicSchema = generateMedicalClinicSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />

      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px)",
          }}
        />

        {/* Decorative radial orbs */}
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

        <div className="max-w-page mx-auto px-4 py-20 md:py-28 lg:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Trust pill — same style as Hero.tsx */}
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
              <span className="text-[12px] text-muted">Harley Street, London</span>
            </div>

            <h1 className="font-serif text-h1-mobile lg:text-[62px] lg:leading-[1.06] font-bold text-charcoal mb-5 leading-tight">
              Non-Surgical Solutions for{" "}
              <span className="relative inline">
                <span
                  style={{
                    background: "linear-gradient(135deg, #B8912E, #C8A96E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Joint Pain
                </span>
                <span
                  className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm"
                  style={{
                    transformOrigin: "left",
                    animation: "revealLine 0.8s ease-out 0.5s both",
                  }}
                />
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate max-w-2xl mx-auto mb-10 leading-relaxed">
              Explore regenerative approaches backed by published research.
              Take a free assessment for your specific condition with our
              GMC-registered specialists.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {[
                { icon: ShieldCheckIcon, label: "GMC Registered" },
                { icon: ClockIcon, label: "2-Min Assessment" },
                { icon: HeartPulseIcon, label: "6,000+ Assessed" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs text-slate font-medium"
                >
                  <item.icon size={16} className="text-gold" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinancingBar />

      {/* ─── Lead Capture Form (right after hero) ───────────────── */}
      <LeadCaptureForm />

      {/* ─── Social Proof ────────────────────────────────────���──── */}
      <SocialProof />

      {/* ─── Body Area Grid ─────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="section-header-label justify-center">
                <div className="gold-line" />
                <span>Your Joints</span>
                <div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
                Select Your Area of Concern
              </h2>
              <p className="text-sm text-slate max-w-lg mx-auto">
                Choose the area that best describes your condition to explore
                tailored information and treatment options.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bodyAreas.map((area, i) => (
              <FadeIn key={area.slug} delay={i * 80}>
                <Link href={`/${area.slug}`} className="block group">
                  <Card className="h-full group-hover:border-gold/40 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center text-gold">
                        <BodyAreaIcon slug={area.slug} size={24} />
                      </div>
                      <ArrowRightIcon
                        size={18}
                        className="text-muted/30 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 mt-1"
                      />
                    </div>
                    <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-2">
                      {area.name}
                    </h3>
                    <p className="text-sm text-slate/70 leading-relaxed mb-4">
                      {area.conditions.map((c) => c.name).join(" / ")}
                    </p>
                    <span className="text-[13px] text-gold font-semibold inline-flex items-center gap-1.5">
                      Take Assessment
                      <ArrowRightIcon size={14} />
                    </span>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <TreatmentCards bodyAreaName="Joint Pain" />
      <VideoSection
        title="Non-Surgical Joint Pain Treatment: The Research"
        subtitle="Watch our Harley Street specialists explain how modern injection therapies are helping patients avoid or delay surgery."
        topic="homepage"
      />
      <Testimonials />
      <LocationTrust />
    </>
  );
}

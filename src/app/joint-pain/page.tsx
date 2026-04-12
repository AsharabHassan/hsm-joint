import type { Metadata } from "next";
import { Quiz } from "@/components/Quiz";
import { SocialProof } from "@/components/SocialProof";
import { PatientJourney } from "@/components/PatientJourney";
import { TreatmentCards } from "@/components/TreatmentCards";
import { DoctorProfiles } from "@/components/DoctorProfiles";
import { Testimonials } from "@/components/Testimonials";
import { LocationTrust } from "@/components/LocationTrust";
import { BottomCTA } from "@/components/BottomCTA";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircleIcon, ClockIcon, ShieldCheckIcon, StarIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Joint Pain Treatment London | Non-Surgical Options | Harley Street Wellness",
  description:
    "Suffering from joint pain? Our Harley Street specialists offer non-surgical injection treatments for knee, hip, shoulder, and back joint pain. Free assessment. GMC-registered doctors.",
  openGraph: {
    title: "Joint Pain Treatment London | Harley Street Wellness",
    description: "Non-surgical injection treatments for joint pain. Free assessment by GMC-registered specialists at Harley Street.",
    type: "website",
  },
};

export default function JointPainPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px)" }} />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)", animation: "pulse 6s ease-in-out infinite" }} />

        <div className="max-w-page mx-auto px-4 py-16 md:py-24 relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 bg-white border border-black/[0.06] rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-trust-green" style={{ animation: "pulse 2s ease-in-out infinite" }} />
              <span className="text-[12px] font-semibold text-trust-green">GMC Registered</span>
              <span className="text-muted/40">·</span>
              <span className="text-[12px] text-muted">Harley Street, London</span>
            </div>

            <h1 className="font-serif text-h1-mobile lg:text-[52px] lg:leading-[1.06] font-bold text-charcoal mb-5 leading-tight">
              <span className="relative inline">
                <span style={{ background: "linear-gradient(135deg, #B8912E, #C8A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Living with Joint Pain?
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm" style={{ transformOrigin: "left", animation: "revealLine 0.8s ease-out 0.5s both" }} />
              </span>{" "}
              Find Out What&apos;s Right For You
            </h1>

            <p className="text-[17px] text-slate mb-8 leading-relaxed max-w-xl font-sans">
              Take our free 3-minute assessment to discover which non-surgical injection treatments may help your joint pain — reviewed by a GMC-registered specialist within 24 hours.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Button size="lg" onClick={() => {}}>
                Start Free Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12H19" /><path d="M14 7L19 12L14 17" /></svg>
              </Button>
              <span className="text-[13px] text-muted">No obligation · 3 minutes</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-trust-green-light border border-trust-green/20 rounded-full px-4 py-2">
              <ClockIcon size={14} className="text-trust-green" />
              <span className="text-[12px] font-semibold text-trust-green">Skip the 28-week NHS wait</span>
            </div>
          </div>
        </div>
      </section>

      {/* Which joint? */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="section-header-label justify-center flex">
                <div className="gold-line" /><span>We Treat All Joints</span><div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
                Where Is Your Joint Pain?
              </h2>
              <p className="text-sm text-slate max-w-lg mx-auto">Select your area for a personalised assessment</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { name: "Knee Pain", href: "/knee-pain" },
              { name: "Hip Pain", href: "/hip-pain" },
              { name: "Shoulder Pain", href: "/shoulder-pain" },
              { name: "Back Pain", href: "/back-pain" },
              { name: "Elbow Pain", href: "/elbow-pain" },
              { name: "Hand, Wrist, Foot & Ankle", href: "/hand-wrist-foot-ankle" },
            ].map((area, i) => (
              <FadeIn key={area.href} delay={i * 60}>
                <a href={area.href} className="block">
                  <Card className="text-center hover-lift cursor-pointer">
                    <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold">{area.name}</h3>
                    <p className="text-[12px] text-gold font-semibold mt-1">Take Assessment →</p>
                  </Card>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Quiz bodyAreaSlug="knee-pain" />
      <SocialProof />
      <PatientJourney />
      <TreatmentCards bodyAreaName="Joint Pain" />
      <DoctorProfiles />
      <Testimonials />
      <LocationTrust />
      <BottomCTA />
    </>
  );
}

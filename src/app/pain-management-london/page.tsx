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
import { CheckCircleIcon, ClockIcon, ShieldCheckIcon, StarIcon, LocationPinIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Pain Management London | Harley Street Specialists | Harley Street Wellness",
  description:
    "Expert pain management in Central London. Non-surgical injection treatments for chronic joint and muscle pain. GMC-registered specialists on Harley Street. Free assessment available.",
  openGraph: {
    title: "Pain Management London | Harley Street Wellness",
    description: "Expert pain management in Central London. Non-surgical injection treatments by GMC-registered specialists.",
    type: "website",
  },
};

export default function PainManagementLondonPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px)" }} />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)", animation: "pulse 6s ease-in-out infinite" }} />

        <div className="max-w-page mx-auto px-4 py-16 md:py-24 relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 bg-white border border-black/[0.06] rounded-full px-4 py-2 mb-6">
              <LocationPinIcon size={14} className="text-gold" />
              <span className="text-[12px] font-semibold text-charcoal">Harley Street, London W1G</span>
            </div>

            <h1 className="font-serif text-h1-mobile lg:text-[52px] lg:leading-[1.06] font-bold text-charcoal mb-5 leading-tight">
              <span className="relative inline">
                <span style={{ background: "linear-gradient(135deg, #B8912E, #C8A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Expert Pain Management
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm" style={{ transformOrigin: "left", animation: "revealLine 0.8s ease-out 0.5s both" }} />
              </span>{" "}
              in Central London
            </h1>

            <p className="text-[17px] text-slate mb-8 leading-relaxed max-w-xl font-sans">
              Struggling with chronic pain? Our Harley Street specialists use evidence-based injection therapies to help you get back to living without constant discomfort.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Button size="lg" onClick={() => {}}>
                Get Your Free Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12H19" /><path d="M14 7L19 12L14 17" /></svg>
              </Button>
              <span className="text-[13px] text-muted">No obligation</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 bg-trust-green-light border border-trust-green/20 rounded-full px-4 py-2">
                <ClockIcon size={14} className="text-trust-green" />
                <span className="text-[12px] font-semibold text-trust-green">Skip the 28-week NHS wait</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-2">
                <StarIcon size={14} className="text-gold" />
                <span className="text-[12px] font-semibold text-charcoal">4.9/5 Patient Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="section-header-label justify-center flex">
                <div className="gold-line" /><span>Why Harley Street Wellness</span><div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
                Pain Management That Works
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: ShieldCheckIcon, title: "GMC-Registered Specialists", desc: "Every consultation is with a qualified, registered specialist — not a general practitioner. Our team includes doctors with up to 23 years of clinical experience." },
              { icon: CheckCircleIcon, title: "Evidence-Based Approach", desc: "We use only treatments supported by published clinical research. Your treatment plan is personalised based on validated assessment tools used in orthopaedic practice worldwide." },
              { icon: ClockIcon, title: "Fast Access, No Waiting Lists", desc: "Assessment within 24 hours of enquiry. Consultation within days, not months. The average NHS orthopaedic wait is 28 weeks — we see you this week." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <Card variant="shimmer" className="h-full">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                    <item.icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{item.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Quiz bodyAreaSlug="knee-pain" />
      <SocialProof />
      <PatientJourney />
      <TreatmentCards bodyAreaName="Chronic Pain" />
      <DoctorProfiles />
      <Testimonials />
      <LocationTrust />
      <BottomCTA />
    </>
  );
}

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
  title: "Cortisone & Steroid Injections London | Harley Street Wellness",
  description:
    "Ultrasound-guided cortisone and steroid injections at our Harley Street clinic. Fast-acting relief for joint pain, arthritis, and inflammation. GMC-registered specialists. Book today.",
  openGraph: {
    title: "Cortisone & Steroid Injections London | Harley Street Wellness",
    description:
      "Ultrasound-guided cortisone and steroid injections at our Harley Street clinic. Fast-acting relief for joint pain, arthritis, and inflammation.",
    type: "website",
  },
};

export default function CortisoneInjectionsPage() {
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
                  Fast-Acting Relief
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm" style={{ transformOrigin: "left", animation: "revealLine 0.8s ease-out 0.5s both" }} />
              </span>{" "}
              with Cortisone & Steroid Injections
            </h1>

            <p className="text-[17px] text-slate mb-8 leading-relaxed max-w-xl font-sans">
              Ultrasound-guided cortisone injections delivered by GMC-registered specialists at our Harley Street clinic. Relief typically begins within 48-72 hours.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Button size="lg" onClick={() => {}}>
                Get Your Free Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12H19" /><path d="M14 7L19 12L14 17" /></svg>
              </Button>
              <span className="text-[13px] text-muted">No obligation</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-trust-green-light border border-trust-green/20 rounded-full px-4 py-2">
              <ClockIcon size={14} className="text-trust-green" />
              <span className="text-[12px] font-semibold text-trust-green">Skip the 28-week NHS wait</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-page mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { icon: ClockIcon, title: "Same-Day Relief", desc: "15-30 minute procedure, resume normal activities immediately" },
              { icon: ShieldCheckIcon, title: "Ultrasound-Guided", desc: "Precise needle placement for maximum effectiveness" },
              { icon: StarIcon, title: "NHS & NICE Recognised", desc: "Established treatment used across the NHS for decades" },
              { icon: CheckCircleIcon, title: "From £250", desc: "Transparent pricing, no hidden fees. Assessment included" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <Card className="text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate">{item.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What is Cortisone - Educational SEO Content */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="section-header-label justify-center flex mb-6">
                <div className="gold-line" /><span>Understanding the Treatment</span><div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-6 text-center">
                What Are Cortisone Injections?
              </h2>
              <div className="space-y-4 text-sm text-slate leading-relaxed">
                <p>
                  Cortisone (corticosteroid) injections are one of the most established and widely-used treatments for joint inflammation and pain in the UK. The injection delivers a powerful anti-inflammatory medication directly into the affected joint, providing targeted relief where oral painkillers cannot reach.
                </p>
                <p>
                  At Harley Street Wellness, all cortisone injections are performed under ultrasound guidance by GMC-registered specialists. This ensures precise needle placement into the affected area, maximising the effectiveness of the treatment and minimising discomfort.
                </p>
                <p>
                  Cortisone works by suppressing the immune response that causes inflammation, reducing swelling, pain, and stiffness. Relief typically begins within 48-72 hours and can last from several weeks to several months depending on the severity of the condition.
                </p>
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold text-charcoal pt-4">Conditions We Treat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {["Knee osteoarthritis", "Hip bursitis", "Frozen shoulder", "Tennis elbow", "Plantar fasciitis", "Carpal tunnel syndrome", "Rotator cuff tendinitis", "Spinal stenosis"].map((condition) => (
                    <div key={condition} className="flex items-center gap-2">
                      <CheckCircleIcon size={16} className="text-trust-green shrink-0" />
                      <span className="text-sm text-charcoal">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
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

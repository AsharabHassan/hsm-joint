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
import { Card } from "@/components/ui/Card";
import { ScrollToQuizButton } from "@/components/ui/ScrollToQuizButton";
import { CheckCircleIcon, ClockIcon, ShieldCheckIcon, StarIcon } from "@/components/ui/Icons";
import { FinancingBar } from "@/components/FinancingBar";
import { VideoSection } from "@/components/VideoSection";

export const metadata: Metadata = {
  title: "PRP Therapy London | Platelet-Rich Plasma Injections | Harley Street Wellness",
  description:
    "PRP (platelet-rich plasma) therapy at our Harley Street clinic. Harness your body's own healing power for joint pain, tendon injuries, and osteoarthritis. GMC-registered specialists. Book today.",
  openGraph: {
    title: "PRP Therapy London | Platelet-Rich Plasma Injections | Harley Street Wellness",
    description:
      "PRP (platelet-rich plasma) therapy at our Harley Street clinic. Expert injections using your body's own growth factors for lasting joint pain relief.",
    type: "website",
  },
};

export default function PRPPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px)" }} />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)", animation: "pulse 6s ease-in-out infinite" }} />

        <div className="max-w-page mx-auto px-4 py-16 md:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-white border border-black/[0.06] rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-trust-green" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                <span className="text-[12px] font-semibold text-trust-green">GMC Registered</span>
                <span className="text-muted/40">·</span>
                <span className="text-[12px] text-muted">Harley Street, London</span>
              </div>

              <h1 className="font-serif text-h1-mobile lg:text-[62px] lg:leading-[1.06] font-bold text-charcoal mb-5 leading-tight">
                <span className="relative inline">
                  <span style={{ background: "linear-gradient(135deg, #B8912E, #C8A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Harness Your Body's Own
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm" style={{ transformOrigin: "left", animation: "revealLine 0.8s ease-out 0.5s both" }} />
                </span>{" "}
                Healing Power with PRP Therapy
              </h1>

              <p className="text-lg text-slate mb-8 leading-relaxed max-w-xl font-sans">
                Platelet-rich plasma (PRP) injections use concentrated growth factors from your own blood to stimulate natural tissue repair. Delivered by GMC-registered specialists at our Harley Street clinic.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <ScrollToQuizButton />
                <span className="text-[13px] text-muted">No obligation</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-trust-green-light border border-trust-green/20 rounded-full px-4 py-2">
                <ClockIcon size={14} className="text-trust-green" />
                <span className="text-[12px] font-semibold text-trust-green">Skip the 28-week NHS wait</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block relative">
              <div
                className="relative rounded-[22px] overflow-hidden h-[480px]"
                style={{
                  boxShadow: "0 24px 72px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
                }}
              >
                <img
                  src="/images/hero/hero-prp.jpg"
                  alt="PRP therapy preparation with centrifuge"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.15) 100%)" }}
                />
                {/* Rating badge */}
                <div
                  className="absolute left-5 bottom-5 bg-white rounded-[14px] px-4 py-2.5 flex items-center gap-2"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={14} className="text-gold" />
                    ))}
                  </div>
                  <span className="font-bold text-sm text-charcoal">4.9</span>
                  <span className="text-[11px] text-muted">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-page mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { icon: ShieldCheckIcon, title: "Your Own Blood", desc: "Autologous treatment using your body's own platelets — minimal rejection risk, no synthetic substances" },
              { icon: CheckCircleIcon, title: "Precision Injections", desc: "Expert injection placement by experienced specialists for targeted, effective treatment" },
              { icon: StarIcon, title: "Evidence-Based", desc: "Published research in peer-reviewed journals supports PRP for multiple joint conditions" },
              { icon: ClockIcon, title: "From £399", desc: "Transparent pricing, no hidden fees. Full assessment included in your appointment" },
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

      {/* What Is PRP - Educational SEO Content */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="section-header-label justify-center flex mb-6">
                <div className="gold-line" /><span>Understanding the Treatment</span><div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-6 text-center">
                What Is PRP Therapy?
              </h2>
              <div className="space-y-4 text-sm text-slate leading-relaxed">
                <p>
                  Platelet-rich plasma (PRP) therapy is a regenerative treatment that uses your own blood to promote natural tissue healing. A small blood sample is drawn from your arm and processed in a centrifuge to concentrate the platelets — the component of blood responsible for clotting and releasing growth factors — to levels three to five times higher than normal.
                </p>
                <p>
                  This concentrated PRP is then injected directly into the damaged or painful area by our experienced specialists. The high concentration of growth factors — including platelet-derived growth factor (PDGF), transforming growth factor (TGF), vascular endothelial growth factor (VEGF), and epidermal growth factor (EGF) — activates the body's natural repair mechanisms, stimulating new tissue formation and reducing chronic inflammation.
                </p>
                <p>
                  Because PRP is derived entirely from your own blood, there is no risk of allergic reaction or rejection. Published studies in peer-reviewed orthopaedic and sports medicine journals have demonstrated PRP's efficacy across a range of musculoskeletal conditions, particularly knee osteoarthritis, tendinopathy, and ligament injuries. At Harley Street Wellness, all PRP treatments are delivered by GMC-registered specialists who have undergone advanced training in image-guided injection techniques.
                </p>
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold text-charcoal pt-4">Conditions We Treat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {[
                    "Knee osteoarthritis",
                    "Hip joint degeneration",
                    "Rotator cuff tears",
                    "Tennis & golfer's elbow",
                    "Achilles tendinopathy",
                    "Plantar fasciitis",
                    "Ligament injuries",
                    "Chronic joint pain",
                  ].map((condition) => (
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

      {/* How PRP Works */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="section-header-label justify-center flex mb-6">
                <div className="gold-line" /><span>The Process</span><div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-10 text-center">
                How PRP Treatment Works
              </h2>
              <div className="space-y-8">
                {[
                  {
                    step: "1",
                    title: "Blood Draw",
                    desc: "A small sample of 30–60ml is drawn from a vein in your arm — similar to a routine blood test. The entire preparation process takes around 20–30 minutes.",
                  },
                  {
                    step: "2",
                    title: "Centrifuge Processing",
                    desc: "Your blood sample is placed into a medical centrifuge that spins at high speed to separate and concentrate the platelets. The resulting PRP contains 3–5 times the normal platelet concentration, packed with growth factors that drive tissue repair.",
                  },
                  {
                    step: "3",
                    title: "Guided Injection",
                    desc: "Your specialist injects the PRP precisely into the affected joint, tendon, or soft tissue. Expert placement ensures accurate delivery for the most effective treatment outcome.",
                  },
                ].map((item) => (
                  <FadeIn key={item.step}>
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shrink-0">
                        <span className="font-serif font-bold text-white text-lg">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold text-charcoal mb-2">{item.title}</h3>
                        <p className="text-sm text-slate leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <FinancingBar />

      <Quiz bodyAreaSlug="general" pageSource="prp" />
      <SocialProof />
      <PatientJourney />
      <TreatmentCards bodyAreaName="Joint Pain" adSafe={false} />
      <VideoSection
        title="PRP Therapy: The Science Behind Platelet-Rich Plasma"
        subtitle="How PRP works, what the clinical trials show, and which conditions respond best — explained by our regenerative medicine specialists."
        topic="prp"
      />
      <DoctorProfiles />
      <Testimonials />
      <LocationTrust />
      <BottomCTA />
    </>
  );
}

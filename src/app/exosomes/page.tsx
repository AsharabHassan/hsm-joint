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
  title: "Exosome Therapy London | Joint Treatment | Harley Street Wellness",
  description:
    "Exosome therapy for joint pain at our Harley Street clinic. Nanoscale vesicles derived from mesenchymal stem cells carrying growth factors and microRNAs to support tissue repair. GMC-registered specialists. Learn more today.",
  openGraph: {
    title: "Exosome Therapy London | Joint Treatment | Harley Street Wellness",
    description:
      "Exosome therapy for joint pain at our Harley Street clinic. Nanoscale vesicles carrying growth factors and microRNAs to support tissue repair. GMC-registered specialists.",
    type: "website",
  },
};

export default function ExosomesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px)",
          }}
        />
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
            animation: "pulse 6s ease-in-out infinite",
          }}
        />

        <div className="max-w-page mx-auto px-4 py-16 md:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-white border border-black/[0.06] rounded-full px-4 py-2 mb-6">
                <div
                  className="w-2 h-2 rounded-full bg-trust-green"
                  style={{ animation: "pulse 2s ease-in-out infinite" }}
                />
                <span className="text-[12px] font-semibold text-trust-green">GMC Registered</span>
                <span className="text-muted/40">·</span>
                <span className="text-[12px] text-muted">Harley Street, London</span>
              </div>

              <h1 className="font-serif text-h1-mobile lg:text-[62px] lg:leading-[1.06] font-bold text-charcoal mb-5 leading-tight">
                <span className="relative inline">
                  <span
                    style={{
                      background: "linear-gradient(135deg, #B8912E, #C8A96E)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Next-Generation
                  </span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm"
                    style={{ transformOrigin: "left", animation: "revealLine 0.8s ease-out 0.5s both" }}
                  />
                </span>{" "}
                Joint Treatment with Exosome Therapy
              </h1>

              <p className="text-lg text-slate mb-8 leading-relaxed max-w-xl font-sans">
                Exosome therapy harnesses nanoscale vesicles to support cellular communication and tissue repair. Administered by GMC-registered specialists at our Harley Street clinic, this emerging approach draws on cutting-edge regenerative science.
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
                  src="/images/hero/hero-exosomes.jpg"
                  alt="Exosome therapy laboratory"
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
              {
                icon: StarIcon,
                title: "Cutting-Edge Science",
                desc: "Nanoscale vesicles (30–150 nm) carrying growth factors and microRNAs that facilitate cellular communication",
              },
              {
                icon: ClockIcon,
                title: "Minimally Invasive",
                desc: "30–60 minute outpatient procedure with minimal downtime, performed by specialist practitioners",
              },
              {
                icon: ShieldCheckIcon,
                title: "Research-Backed",
                desc: "Published studies in Frontiers in Bioengineering and Biotechnology (2024) and reviewed in NIH meta-analyses",
              },
              {
                icon: CheckCircleIcon,
                title: "From £599",
                desc: "Transparent pricing, no hidden fees. Full consultation included with your specialist",
              },
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

      {/* What Is Exosome Therapy - Educational SEO Content */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="section-header-label justify-center flex mb-6">
                <div className="gold-line" />
                <span>Understanding the Treatment</span>
                <div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-6 text-center">
                What Is Exosome Therapy?
              </h2>
              <div className="space-y-4 text-sm text-slate leading-relaxed">
                <p>
                  Exosomes are nanoscale extracellular vesicles — typically 30 to 150 nanometres in diameter — naturally secreted by cells throughout the body. The exosomes used in regenerative medicine are derived from mesenchymal stem cells (MSCs), which are harvested and processed under strict laboratory conditions.
                </p>
                <p>
                  These tiny vesicles carry a biological payload including microRNAs, proteins, and growth factors such as TGF-β, VEGF, and IGF-1. Once introduced into damaged tissue, they act as intercellular messengers — modulating gene expression in recipient cells, promoting anti-inflammatory macrophage activity, and potentially reducing the production of pro-inflammatory cytokines such as IL-1β and TNF-α.
                </p>
                <p>
                  Unlike whole-cell therapies, exosomes do not replicate and are considered acellular, which contributes to their favourable safety profile. A meta-analysis indexed on the NIH&apos;s PubMed database reported a serious adverse event rate of approximately 0.7% across reviewed studies, comparable to other minimally invasive joint procedures.
                </p>
                <p className="bg-white border border-gold/20 rounded-lg px-4 py-3 text-[13px] text-slate italic">
                  <strong className="text-charcoal not-italic">Important note:</strong> Exosome therapy for joint conditions is an area of active and rapidly evolving research. It does not currently hold MHRA (UK) or FDA (US) approval as a licensed treatment for musculoskeletal conditions. Our specialists will discuss the evidence base and your suitability candidly during your consultation.
                </p>
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold text-charcoal pt-4">
                  Conditions Being Studied
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {[
                    "Knee osteoarthritis",
                    "Cartilage degeneration",
                    "Tendon injuries",
                    "Chronic joint inflammation",
                    "Ligament damage",
                    "Soft tissue repair",
                    "Hip joint conditions",
                    "Shoulder injuries",
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

      {/* How It Works */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="section-header-label justify-center flex mb-6">
                <div className="gold-line" />
                <span>The Process</span>
                <div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-10 text-center">
                How Exosome Therapy Works
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Consultation & Assessment",
                    desc: "Your GMC-registered specialist conducts a comprehensive review of your condition, medical history, and imaging. This ensures exosome therapy is appropriate for your situation and that you understand the current state of the evidence.",
                  },
                  {
                    step: "02",
                    title: "Preparation",
                    desc: "The exosome solution — derived from rigorously screened mesenchymal stem cell sources — is prepared under strict laboratory protocols, including quality and sterility testing, before use in clinic.",
                  },
                  {
                    step: "03",
                    title: "Targeted Delivery",
                    desc: "The exosome preparation is administered via precise injection directly into the affected joint or soft tissue by our experienced practitioners, maximising accuracy and minimising discomfort.",
                  },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <Card className="flex gap-5 items-start">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                        <span className="font-serif font-bold text-gold text-sm">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold text-charcoal mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate leading-relaxed">{item.desc}</p>
                      </div>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Research Section */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="section-header-label justify-center flex mb-6">
                <div className="gold-line" />
                <span>The Evidence</span>
                <div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-6 text-center">
                What Does the Research Say?
              </h2>
              <div className="space-y-4 text-sm text-slate leading-relaxed">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircleIcon size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>
                      A 2024 review published in <em>Frontiers in Bioengineering and Biotechnology</em> found that MSC-derived exosomes demonstrated chondroprotective effects in preclinical models of knee osteoarthritis, reducing cartilage degradation markers and promoting synovial anti-inflammatory responses.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircleIcon size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>
                      A NIH-indexed meta-analysis of exosome and extracellular vesicle therapies in musculoskeletal applications reported a serious adverse event rate of approximately 0.7% — a favourable safety profile relative to many interventional procedures.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircleIcon size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>
                      Early-phase clinical studies have reported patient-reported outcome improvements in pain and function scores at 3–6 months, though larger randomised controlled trials are still underway.
                    </span>
                  </li>
                </ul>
                <p className="bg-white border border-gold/20 rounded-lg px-4 py-3 text-[13px] text-slate italic mt-4">
                  <strong className="text-charcoal not-italic">Honest assessment:</strong> The evidence base for exosome therapy is promising but still developing. It is less established than treatments such as PRP or cortisone injections, which have decades of clinical use and larger trial datasets. Our specialists will present the evidence transparently so you can make an informed decision.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <FinancingBar />

      <Quiz bodyAreaSlug="general" pageSource="exosomes" />
      <SocialProof />
      <PatientJourney />
      <TreatmentCards bodyAreaName="Joint Pain" adSafe={false} />
      <VideoSection
        title="Exosome Therapy: Next-Generation Joint Treatment"
        subtitle="What are exosomes, how do they work, and what does the latest research say? Our specialists explain this cutting-edge approach."
        topic="exosomes"
      />
      <DoctorProfiles />
      <Testimonials />
      <LocationTrust />
      <BottomCTA />
    </>
  );
}

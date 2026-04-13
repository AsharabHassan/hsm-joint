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
  title: "Stem Cell Therapy London | Regenerative Cell Treatment | Harley Street Wellness",
  description:
    "Mesenchymal stem cell (MSC) therapy and BMAC treatment at our Harley Street clinic. Regenerative medicine using your own cells for joint pain, osteoarthritis, and cartilage repair. GMC-registered specialists. Book your assessment today.",
  openGraph: {
    title: "Stem Cell Therapy London | Regenerative Cell Treatment | Harley Street Wellness",
    description:
      "Mesenchymal stem cell (MSC) therapy and BMAC treatment at our Harley Street clinic. Regenerative medicine using your own cells for joint pain, osteoarthritis, and cartilage repair.",
    type: "website",
  },
};

export default function StemCellsPage() {
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
                    Advanced Regenerative
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm" style={{ transformOrigin: "left", animation: "revealLine 0.8s ease-out 0.5s both" }} />
                </span>{" "}
                Medicine with Stem Cell Therapy
              </h1>

              <p className="text-lg text-slate mb-8 leading-relaxed max-w-xl font-sans">
                Mesenchymal stem cells (MSCs) harvested from your own bone marrow or adipose tissue, processed and injected by GMC-registered specialists at our Harley Street clinic. Harnessing your body&apos;s own regenerative potential to address joint pain and cartilage damage at the source.
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
                  src="/images/hero/hero-stem-cells.jpg"
                  alt="Stem cell therapy procedure"
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
              { icon: CheckCircleIcon, title: "Your Own Cells", desc: "Autologous MSCs harvested from your own bone marrow or adipose tissue — no donor cells required" },
              { icon: StarIcon, title: "Differentiation Potential", desc: "MSCs can differentiate into chondrocytes, osteoblasts, and other tissue types to support repair" },
              { icon: ShieldCheckIcon, title: "Research-Supported", desc: "Positive results in 12 out of 15 RCTs reviewed in Cellular & Molecular Immunology (2023)" },
              { icon: ClockIcon, title: "From £5,000", desc: "Comprehensive treatment including harvesting, laboratory processing, and specialist-administered injection" },
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

      {/* What Is Stem Cell Therapy - Educational SEO Content */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="section-header-label justify-center flex mb-6">
                <div className="gold-line" /><span>Understanding the Treatment</span><div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-6 text-center">
                What Is Stem Cell Therapy?
              </h2>
              <div className="space-y-4 text-sm text-slate leading-relaxed">
                <p>
                  Stem cell therapy uses mesenchymal stem cells (MSCs) — a type of multipotent adult stem cell found in bone marrow, adipose (fat) tissue, and other tissues throughout the body. In the context of joint treatment, MSCs are harvested from the patient&apos;s own body, concentrated in a laboratory setting, and then injected into the affected joint or tissue.
                </p>
                <p>
                  The most commonly used source for orthopaedic applications is bone marrow aspirate concentrate (BMAC), where cells are drawn from the iliac crest (the back of the pelvis) under local anaesthetic. Adipose-derived MSCs are an alternative, harvested from a small sample of fat tissue. Both approaches use autologous cells — meaning they come from you — which eliminates concerns about immune rejection.
                </p>
                <p>
                  Once introduced into the joint environment, MSCs may exert their effects through two primary mechanisms. First, <strong className="text-charcoal font-semibold">differentiation</strong>: MSCs have the capacity to develop into chondrocytes (cartilage cells), osteoblasts (bone cells), and other specialised cell types, potentially contributing to structural tissue repair. Second, <strong className="text-charcoal font-semibold">paracrine signalling</strong>: MSCs secrete a range of anti-inflammatory cytokines and growth factors — including TGF-β, IGF-1, and VEGF — that modulate the local immune response, reduce inflammation, and create a more favourable environment for healing.
                </p>
                <p>
                  It is important to note that stem cell therapy for musculoskeletal conditions remains an active area of research. The biological mechanisms are increasingly well understood, but clinical outcomes vary between patients. A thorough assessment by one of our specialists is essential to determine whether stem cell treatment is appropriate for your specific condition.
                </p>

                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold text-charcoal pt-4">What Does the Research Show?</h3>
                <p>
                  A systematic review published in <em>Cellular &amp; Molecular Immunology</em> (2023) analysed 15 randomised controlled trials of MSC therapy for joint conditions and found that 12 of those trials reported statistically significant improvements in pain scores and symptom outcomes. A further analysis in <em>Frontiers in Medicine</em> (2024) compared long-term outcomes of BMAC, corticosteroid injections, hyaluronic acid (HA), and PRP at four-year follow-up, finding that BMAC demonstrated the most durable pain reduction and functional improvement of the four modalities studied.
                </p>
                <p>
                  These findings are encouraging, though the field continues to evolve. Individual results depend on factors including the severity of joint degeneration, the patient&apos;s age and general health, and the specific joint being treated. Our clinicians will review all relevant imaging and medical history during your assessment.
                </p>

                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold text-charcoal pt-4">Conditions We Treat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {[
                    "Advanced knee osteoarthritis",
                    "Hip joint degeneration",
                    "Cartilage defects",
                    "Complex rotator cuff injuries",
                    "Avascular necrosis",
                    "Degenerative disc disease",
                    "Chronic tendon injuries",
                    "Failed previous treatments",
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

      {/* How Stem Cell Therapy Works */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="section-header-label justify-center flex mb-6">
                <div className="gold-line" /><span>The Process</span><div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-10 text-center">
                How Stem Cell Therapy Works
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Comprehensive Assessment",
                    desc: "Your specialist reviews your full medical history, analyses recent imaging (X-ray, MRI), and evaluates your suitability for stem cell treatment. Not every patient is a candidate — this assessment ensures stem cell therapy is the right choice for your specific condition and goals.",
                  },
                  {
                    step: "02",
                    title: "Cell Harvesting",
                    desc: "Mesenchymal stem cells are extracted from your bone marrow (BMAC) or adipose tissue under local anaesthetic. The procedure is minimally invasive and typically takes 20–40 minutes. Most patients report mild discomfort at most.",
                  },
                  {
                    step: "03",
                    title: "Processing",
                    desc: "The harvested material is processed in laboratory conditions to concentrate the MSC population. This step isolates the cells most relevant to tissue repair, maximising the potency of the final preparation before injection.",
                  },
                  {
                    step: "04",
                    title: "Targeted Injection",
                    desc: "The concentrated stem cell preparation is injected directly into the affected joint or tissue by our experienced specialists. This ensures precise delivery to the target area, improving both safety and efficacy.",
                  },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 80}>
                    <Card className="flex gap-5 items-start">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                        <span className="text-gold font-serif font-bold text-sm">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold text-charcoal mb-2">{item.title}</h3>
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

      {/* Research Evidence */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="section-header-label justify-center flex mb-6">
                <div className="gold-line" /><span>Clinical Evidence</span><div className="gold-line" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-8 text-center">
                What Does the Research Say?
              </h2>
              <div className="space-y-5">
                <FadeIn delay={0}>
                  <Card>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheckIcon size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">Cellular &amp; Molecular Immunology — 2023</p>
                        <p className="text-sm text-charcoal font-semibold mb-1">12 out of 15 RCTs reported positive outcomes</p>
                        <p className="text-sm text-slate leading-relaxed">
                          A systematic review of randomised controlled trials examining mesenchymal stem cell therapy for musculoskeletal conditions found that 80% of trials reported statistically significant improvements in pain and symptom scores compared to control groups.
                        </p>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
                <FadeIn delay={80}>
                  <Card>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <StarIcon size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">Frontiers in Medicine — 2024</p>
                        <p className="text-sm text-charcoal font-semibold mb-1">BMAC showed best long-term outcomes at 4-year follow-up</p>
                        <p className="text-sm text-slate leading-relaxed">
                          A comparative study tracking patients treated with BMAC, corticosteroid injections, hyaluronic acid, and PRP found that the BMAC group demonstrated the most sustained pain relief and functional improvement at the four-year mark — outperforming all other modalities studied.
                        </p>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
                <FadeIn delay={160}>
                  <div className="bg-white border border-black/[0.06] rounded-xl px-5 py-4">
                    <p className="text-sm text-slate leading-relaxed">
                      <strong className="text-charcoal font-semibold">Please note:</strong> Stem cell therapy for musculoskeletal conditions is an evolving field. While evidence is increasingly positive, individual outcomes depend on patient-specific factors. Your suitability will be assessed thoroughly before any treatment is recommended.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <FinancingBar />

      <Quiz bodyAreaSlug="general" pageSource="stem-cells" />
      <SocialProof />
      <PatientJourney />
      <TreatmentCards bodyAreaName="Joint Pain" adSafe={false} />
      <VideoSection
        title="Stem Cell Therapy: Advanced Regenerative Medicine"
        subtitle="How mesenchymal stem cells support joint repair, the published evidence, and who may benefit — explained by our regenerative medicine team."
        topic="stem-cells"
      />
      <DoctorProfiles />
      <Testimonials />
      <LocationTrust />
      <BottomCTA />
    </>
  );
}

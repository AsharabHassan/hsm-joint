/**
 * GOOGLE ADS COMPLIANCE NOTE:
 * This page is designed to receive Google Ads traffic.
 * - ComparisonTable REMOVED — contained PRP/exosome/stem-cell column headers
 * - Hero, Quiz, QuizResults, TreatmentCards, PatientJourney, DoctorProfiles: CLEAN
 * - SocialProof, StatsSection, TraditionalRisks, Testimonials, LocationTrust, FAQ, BottomCTA: CLEAN
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBodyAreaBySlug, getAllBodyAreaSlugs } from "@/data/bodyAreas";
import { getFAQsByBodyArea } from "@/data/faqs";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateMedicalWebPageSchema,
  generateMedicalClinicSchema,
} from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { Quiz } from "@/components/Quiz";
import { SocialProof } from "@/components/SocialProof";
import { FinancingBar } from "@/components/FinancingBar";
import { StatsSection } from "@/components/StatsSection";
import { ConditionSections } from "@/components/ConditionSections";
import { TraditionalRisks } from "@/components/TraditionalRisks";
// ComparisonTable removed — contains PRP/exosome/stem-cell terms, not ad-safe
import { TreatmentCards } from "@/components/TreatmentCards";
import { Testimonials } from "@/components/Testimonials";
import { LocationTrust } from "@/components/LocationTrust";
import { FAQ } from "@/components/FAQ";
import { BottomCTA } from "@/components/BottomCTA";
import { PatientJourney } from "@/components/PatientJourney";
import { DoctorProfiles } from "@/components/DoctorProfiles";
import { ImageDivider } from "@/components/ui/ImageDivider";
import { VideoSection } from "@/components/VideoSection";

export function generateStaticParams() {
  return getAllBodyAreaSlugs().map((slug) => ({ bodyArea: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bodyArea: string }>;
}): Promise<Metadata> {
  const { bodyArea: slug } = await params;
  const bodyArea = getBodyAreaBySlug(slug);
  if (!bodyArea) return {};

  return {
    title: `${bodyArea.headline} | Harley Street Wellness`,
    description: bodyArea.subheadline,
    openGraph: {
      title: `${bodyArea.headline} | Harley Street Wellness`,
      description: bodyArea.subheadline,
      type: "website",
    },
  };
}

export default async function BodyAreaPage({
  params,
}: {
  params: Promise<{ bodyArea: string }>;
}) {
  const { bodyArea: slug } = await params;
  const bodyArea = getBodyAreaBySlug(slug);
  if (!bodyArea) notFound();

  const faqs = getFAQsByBodyArea(slug);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(bodyArea.name, `/${slug}`);
  const clinicSchema = generateMedicalClinicSchema();
  const pageSchema = generateMedicalWebPageSchema(
    bodyArea.headline,
    bodyArea.subheadline,
    `/${slug}`,
    "2026-04-11",
    "2026-04-11"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, breadcrumbSchema, clinicSchema, pageSchema]),
        }}
      />
      <Hero bodyArea={bodyArea} />
      <FinancingBar />
      <Quiz bodyAreaSlug={slug} pageSource={slug} />
      <SocialProof />
      <PatientJourney />
      <ImageDivider src="/images/clinic/treatment-room.jpg" alt="Treatment room at Harley Street Wellness" />
      <StatsSection bodyAreaSlug={slug} />
      <ConditionSections
        conditions={bodyArea.conditions}
        bodyAreaName={bodyArea.name}
      />
      <TraditionalRisks bodyArea={bodyArea} />
      <VideoSection
        title={`Understanding ${bodyArea.name}: The Latest Research`}
        subtitle={`Our specialists break down the published evidence on non-surgical treatments for ${bodyArea.name.toLowerCase()} — what works, what doesn't, and what's right for you.`}
        topic={slug}
      />
      <TreatmentCards bodyAreaName={bodyArea.name} />
      <ImageDivider src="/images/clinic/consultation.jpg" alt="Specialist consultation at Harley Street" />
      <DoctorProfiles />
      <Testimonials />
      <LocationTrust />
      <FAQ bodyAreaSlug={slug} bodyAreaName={bodyArea.name} />
      <BottomCTA />
    </>
  );
}

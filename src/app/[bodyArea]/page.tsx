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
import { StatsSection } from "@/components/StatsSection";
import { ConditionCards } from "@/components/ConditionCards";
import { TraditionalRisks } from "@/components/TraditionalRisks";
import { ComparisonTable } from "@/components/ComparisonTable";
import { TreatmentCards } from "@/components/TreatmentCards";
import { Testimonials } from "@/components/Testimonials";
import { LocationTrust } from "@/components/LocationTrust";
import { FAQ } from "@/components/FAQ";
import { BottomCTA } from "@/components/BottomCTA";
import { PatientJourney } from "@/components/PatientJourney";
import { DoctorProfiles } from "@/components/DoctorProfiles";

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
      <Quiz bodyAreaSlug={slug} />
      <SocialProof />
      <PatientJourney />
      <StatsSection bodyAreaSlug={slug} />
      <ConditionCards
        conditions={bodyArea.conditions}
        bodyAreaName={bodyArea.name}
      />
      <TraditionalRisks bodyArea={bodyArea} />
      <ComparisonTable />
      <TreatmentCards bodyAreaName={bodyArea.name} />
      <DoctorProfiles />
      <Testimonials />
      <LocationTrust />
      <FAQ bodyAreaSlug={slug} bodyAreaName={bodyArea.name} />
      <BottomCTA />
    </>
  );
}

import type { FAQ } from "@/data/faqs";
import { getLocation, type LocationSlug } from "@/data/locations";

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage" as const,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  };
}

export function generateMedicalClinicSchema(location: LocationSlug = "london") {
  const loc = getLocation(location);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic" as const,
    name: loc.brandName,
    url: loc.baseUrl,
    telephone: loc.telephoneE164,
    email: loc.email,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: loc.schemaAddress.streetAddress,
      addressLocality: loc.schemaAddress.addressLocality,
      postalCode: loc.schemaAddress.postalCode,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: loc.geo.latitude,
      longitude: loc.geo.longitude,
    },
    medicalSpecialty: "Musculoskeletal Medicine",
    availableService: [
      {
        "@type": "MedicalTherapy" as const,
        name: "Cortisone Injections",
        description:
          "Anti-inflammatory corticosteroid injections for acute joint pain and inflammation",
      },
      {
        "@type": "MedicalTherapy" as const,
        name: "Hyaluronic Acid Injections",
        description:
          "Joint lubrication therapy to improve cushioning and reduce pain in arthritic joints",
      },
      {
        "@type": "MedicalTherapy" as const,
        name: "Non-Surgical Joint Treatment",
        description:
          "Evidence-based injection therapies for musculoskeletal conditions as alternatives to surgery",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating" as const,
      ratingValue: loc.reviewRating,
      reviewCount: loc.reviewCount,
      bestRating: "5",
    },
  };
}

export function generateBreadcrumbSchema(
  pageName: string,
  pagePath: string,
  location: LocationSlug = "london"
) {
  const base = getLocation(location).baseUrl;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: base },
      {
        "@type": "ListItem" as const,
        position: 2,
        name: pageName,
        item: `${base}${pagePath}`,
      },
    ],
  };
}

export function generateMedicalWebPageSchema(
  title: string,
  description: string,
  path: string,
  datePublished: string,
  dateModified: string,
  location: LocationSlug = "london"
) {
  const loc = getLocation(location);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage" as const,
    name: title,
    description,
    url: `${loc.baseUrl}${path}`,
    datePublished,
    dateModified,
    publisher: {
      "@type": "MedicalOrganization" as const,
      name: loc.brandName,
      url: loc.baseUrl,
    },
    about: { "@type": "MedicalCondition" as const, name: title },
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    medicalAudience: { "@type": "PatientAudience" as const },
  };
}

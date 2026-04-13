import type { FAQ } from "@/data/faqs";

const BASE_URL = "https://harleystreetwellness.co.uk";

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

export function generateMedicalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic" as const,
    name: "Harley Street Wellness",
    url: BASE_URL,
    telephone: "+44-20-4628-3137",
    email: "hello@harleystreetwellness.co.uk",
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: "10 Harley Street",
      addressLocality: "London",
      postalCode: "W1G 9PF",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: 51.5155,
      longitude: -0.1484,
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
      ratingValue: "4.9",
      reviewCount: "200",
      bestRating: "5",
    },
  };
}

export function generateBreadcrumbSchema(pageName: string, pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      {
        "@type": "ListItem" as const,
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem" as const,
        position: 2,
        name: pageName,
        item: `${BASE_URL}${pagePath}`,
      },
    ],
  };
}

export function generateMedicalWebPageSchema(
  title: string,
  description: string,
  path: string,
  datePublished: string,
  dateModified: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage" as const,
    name: title,
    description,
    url: `${BASE_URL}${path}`,
    datePublished,
    dateModified,
    publisher: {
      "@type": "MedicalOrganization" as const,
      name: "Harley Street Wellness",
      url: BASE_URL,
    },
    about: {
      "@type": "MedicalCondition" as const,
      name: title,
    },
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    medicalAudience: {
      "@type": "PatientAudience" as const,
    },
  };
}

import type { FAQ } from "@/data/faqs";

const BASE_URL = "https://harleystreetmedicalwellness.co.uk";

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
    telephone: "+44-20-XXXX-XXXX",
    email: "info@harleystreetmedicalwellness.co.uk",
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
        name: "PRP Therapy",
        description:
          "Platelet-rich plasma therapy using concentrated platelets from the patient's own blood",
      },
      {
        "@type": "MedicalTherapy" as const,
        name: "Exosome Therapy",
        description:
          "Regenerative approach using nanoscale vesicles derived from mesenchymal stem cells",
      },
      {
        "@type": "MedicalTherapy" as const,
        name: "Regenerative Cell Therapy",
        description:
          "Advanced regenerative approach using mesenchymal stem cells from bone marrow or adipose tissue",
      },
    ],
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

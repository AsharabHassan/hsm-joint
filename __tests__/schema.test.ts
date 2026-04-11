import { describe, it, expect } from "vitest";
import { generateFAQSchema, generateMedicalClinicSchema, generateBreadcrumbSchema } from "../src/lib/schema";

describe("generateFAQSchema", () => {
  it("produces valid FAQPage JSON-LD", () => {
    const schema = generateFAQSchema([
      { question: "What is PRP?", answer: "PRP is a therapy." },
      { question: "Is it safe?", answer: "Yes, generally." },
    ]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]["@type"]).toBe("Question");
    expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
  });
});

describe("generateMedicalClinicSchema", () => {
  it("includes required NAP fields", () => {
    const schema = generateMedicalClinicSchema();
    expect(schema["@type"]).toBe("MedicalClinic");
    expect(schema.name).toBe("Harley Street Wellness");
    expect(schema.address.streetAddress).toBe("10 Harley Street");
    expect(schema.address.addressLocality).toBe("London");
  });
});

describe("generateBreadcrumbSchema", () => {
  it("generates correct breadcrumb list", () => {
    const schema = generateBreadcrumbSchema("Knee Pain", "/knee-pain");
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[1].item).toContain("/knee-pain");
  });
});

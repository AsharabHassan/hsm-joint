import Link from "next/link";
import { bodyAreas } from "@/data/bodyAreas";
import { Card } from "@/components/ui/Card";
import { SocialProof } from "@/components/SocialProof";
import { ComparisonTable } from "@/components/ComparisonTable";
import { TreatmentCards } from "@/components/TreatmentCards";
import { Testimonials } from "@/components/Testimonials";
import { LocationTrust } from "@/components/LocationTrust";
import { FadeIn } from "@/components/ui/FadeIn";
import { generateMedicalClinicSchema } from "@/lib/schema";

export default function HomePage() {
  const clinicSchema = generateMedicalClinicSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />

      {/* Hero */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-page mx-auto px-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-gold mb-3">
            Harley Street Wellness — London
          </p>
          <h1 className="font-serif text-h1-mobile lg:text-h1-desktop font-bold text-charcoal mb-4 max-w-3xl mx-auto">
            Understanding Non-Surgical Options for Joint Pain
          </h1>
          <p className="text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto mb-8">
            Educational resources about regenerative approaches to joint and
            musculoskeletal pain. Take a free assessment for your specific
            condition.
          </p>
        </div>
      </section>

      <SocialProof />

      {/* Body Area Grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
              Select Your Area of Concern
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bodyAreas.map((area, i) => (
              <FadeIn key={area.slug} delay={i * 100}>
                <Link href={`/${area.slug}`}>
                  <Card className="hover:border-gold transition-colors cursor-pointer h-full">
                    <div className="w-12 h-12 bg-ivory rounded-[10px] flex items-center justify-center mb-4 text-2xl">
                      {area.icon}
                    </div>
                    <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-2">
                      {area.name}
                    </h3>
                    <p className="text-sm text-charcoal/70 leading-relaxed mb-3">
                      {area.conditions.map((c) => c.name).join(" · ")}
                    </p>
                    <p className="text-sm text-gold font-semibold">
                      Take Assessment →
                    </p>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ComparisonTable />
      <TreatmentCards bodyAreaName="Joint Pain" />
      <Testimonials />
      <LocationTrust />
    </>
  );
}

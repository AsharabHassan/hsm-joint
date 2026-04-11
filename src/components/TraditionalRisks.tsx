import type { BodyArea } from "@/data/bodyAreas";
import { FadeIn } from "@/components/ui/FadeIn";

interface TraditionalRisksProps {
  bodyArea: BodyArea;
}

export function TraditionalRisks({ bodyArea }: TraditionalRisksProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            What Are the Risks of Traditional Approaches?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeIn delay={100}>
            <div className="bg-cream rounded-card p-6 border border-ivory">
              <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-semibold mb-4">
                Surgery Considerations
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                {bodyArea.surgeryRisks}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="bg-cream rounded-card p-6 border border-ivory">
              <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-semibold mb-4">
                Steroid Injection Considerations
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                {bodyArea.steroidRisks}
              </p>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={300}>
          <div className="mt-8 max-w-3xl mx-auto bg-trust-green/5 border border-trust-green/20 rounded-card p-5">
            <p className="text-sm text-charcoal/70 leading-relaxed text-center">
              {bodyArea.comparisonNote}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

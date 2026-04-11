import type { BodyArea } from "@/data/bodyAreas";
import { FadeIn } from "@/components/ui/FadeIn";
import { AlertIcon, ShieldCheckIcon } from "@/components/ui/Icons";

interface TraditionalRisksProps {
  bodyArea: BodyArea;
}

export function TraditionalRisks({ bodyArea }: TraditionalRisksProps) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label">
              <div className="gold-line" />
              <span>Traditional Approaches</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Risks of Traditional Approaches
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Understanding the full picture helps you make informed decisions
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FadeIn delay={100}>
            <div className="bg-cream rounded-card p-7 border border-ivory h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-charcoal/[0.05] flex items-center justify-center">
                  <AlertIcon size={20} className="text-charcoal/60" />
                </div>
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold">
                  Surgery Considerations
                </h3>
              </div>
              <p className="text-sm text-slate leading-relaxed">
                {bodyArea.surgeryRisks}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-cream rounded-card p-7 border border-ivory h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-charcoal/[0.05] flex items-center justify-center">
                  <AlertIcon size={20} className="text-charcoal/60" />
                </div>
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold">
                  Steroid Injection Considerations
                </h3>
              </div>
              <p className="text-sm text-slate leading-relaxed">
                {bodyArea.steroidRisks}
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={300}>
          <div className="mt-8 max-w-3xl mx-auto bg-trust-green-light border border-trust-green/15 rounded-card p-6 flex gap-4 items-start">
            <ShieldCheckIcon
              size={22}
              className="text-trust-green shrink-0 mt-0.5"
            />
            <p className="text-sm text-slate leading-relaxed">
              {bodyArea.comparisonNote}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

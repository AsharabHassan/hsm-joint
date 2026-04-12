import { treatments } from "@/data/treatments";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckCircleIcon } from "@/components/ui/Icons";

interface TreatmentCardsProps {
  bodyAreaName: string;
}

export function TreatmentCards({ bodyAreaName }: TreatmentCardsProps) {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label">
              <div className="gold-line" />
              <span>Regenerative Medicine</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Non-Surgical Options for {bodyAreaName}
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Explore evidence-based regenerative approaches available at our Harley Street clinic
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {treatments.map((treatment, i) => (
            <FadeIn key={treatment.slug} delay={i * 100}>
              <Card variant="shimmer" className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold">
                    {treatment.name}
                  </h3>
                  <span className="font-serif font-bold text-gold text-base whitespace-nowrap ml-3">
                    {treatment.price}
                  </span>
                </div>

                <p className="text-sm text-slate leading-relaxed mb-5 flex-1">
                  {treatment.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {treatment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 bg-trust-green-light text-trust-green px-3 py-1.5 rounded-pill text-[11px] font-semibold"
                    >
                      <CheckCircleIcon size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-muted italic leading-relaxed">
                  {treatment.priceNote}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

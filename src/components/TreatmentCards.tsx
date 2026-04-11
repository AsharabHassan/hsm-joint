import { treatments } from "@/data/treatments";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

interface TreatmentCardsProps {
  bodyAreaName: string;
}

export function TreatmentCards({ bodyAreaName }: TreatmentCardsProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            What Non-Surgical Options Exist for {bodyAreaName}?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {treatments.map((treatment, i) => (
            <FadeIn key={treatment.slug} delay={i * 100}>
              <Card className="border-t-4 border-t-gold">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold">
                    {treatment.name}
                  </h3>
                  <span className="text-gold font-bold text-sm whitespace-nowrap ml-2">
                    {treatment.price}
                  </span>
                </div>
                <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                  {treatment.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {treatment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-trust-green/10 text-trust-green px-3 py-1 rounded-pill text-[11px] font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-muted italic">
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

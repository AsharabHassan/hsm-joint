import { getAdSafeTreatments, getAllTreatments } from "@/data/treatments";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckCircleIcon, ClockIcon } from "@/components/ui/Icons";

interface TreatmentCardsProps {
  bodyAreaName: string;
  adSafe?: boolean;
}

export function TreatmentCards({ bodyAreaName, adSafe = true }: TreatmentCardsProps) {
  const treatmentList = adSafe ? getAdSafeTreatments() : getAllTreatments();

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex">
              <div className="gold-line" /><span>Treatment Options</span><div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Non-Surgical Options for {bodyAreaName}
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Evidence-based approaches available at our Harley Street clinic
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatmentList.map((treatment, i) => (
            <FadeIn key={treatment.slug} delay={i * 100}>
              <div className="group card-tilt h-full">
                <Card variant="shimmer" className="h-full flex flex-col">
                  {/* Price badge - top right */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold">
                      {treatment.name}
                    </h3>
                    <span
                      className="font-serif font-bold text-sm whitespace-nowrap ml-3 px-3 py-1 rounded-pill"
                      style={{
                        background: "linear-gradient(135deg, rgba(200,169,110,0.15), rgba(200,169,110,0.05))",
                        color: "#B8912E",
                      }}
                    >
                      {treatment.price}
                    </span>
                  </div>

                  {/* Short mechanism description — NOT the full 167-word description */}
                  <p className="text-sm text-slate leading-relaxed mb-5">
                    {treatment.mechanism}
                  </p>

                  {/* Quick info pills */}
                  <div className="flex-1" />
                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-center gap-2.5">
                      <ClockIcon size={14} className="text-gold shrink-0" />
                      <span className="text-[13px] text-charcoal">{treatment.duration}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircleIcon size={14} className="text-trust-green shrink-0" />
                      <span className="text-[13px] text-charcoal">{treatment.setting}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircleIcon size={14} className="text-trust-green shrink-0" />
                      <span className="text-[13px] text-charcoal">{treatment.downtime}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-ivory">
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
                </Card>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

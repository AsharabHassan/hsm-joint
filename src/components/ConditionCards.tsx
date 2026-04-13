import type { Condition } from "@/data/bodyAreas";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { ConditionIcon } from "@/components/ui/ConditionIcon";
import { CheckCircleIcon } from "@/components/ui/Icons";

interface ConditionCardsProps {
  conditions: Condition[];
  bodyAreaName: string;
}

export function ConditionCards({ conditions, bodyAreaName }: ConditionCardsProps) {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex">
              <div className="gold-line" /><span>Conditions</span><div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              What Causes {bodyAreaName}?
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Identify your condition — each responds differently to treatment
            </p>
          </div>
        </FadeIn>

        <div className={`grid grid-cols-1 gap-5 ${
          conditions.length === 2
            ? "md:grid-cols-2 max-w-4xl mx-auto"
            : conditions.length === 4
            ? "md:grid-cols-2 lg:grid-cols-4"
            : "md:grid-cols-2 lg:grid-cols-3"
        }`}>
          {conditions.map((condition, i) => (
            <FadeIn key={condition.slug} delay={i * 100}>
              <div className="group card-tilt h-full">
                <Card variant="shimmer" className="h-full flex flex-col p-6">
                  {/* Top row: icon + name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(200,169,110,0.15) 0%, rgba(200,169,110,0.05) 100%)",
                      }}
                    >
                      <div className="icon-bounce">
                        <ConditionIcon iconKey={condition.icon} size={26} className="text-gold" />
                      </div>
                    </div>
                    <h3 className="font-serif font-bold text-lg leading-tight">
                      {condition.name}
                    </h3>
                  </div>

                  {/* Short description — first sentence only */}
                  <p className="text-sm text-slate leading-relaxed mb-5 line-clamp-2">
                    {condition.description.split('. ')[0]}.
                  </p>

                  {/* Visual symptom indicators */}
                  <div className="flex-1" />
                  <div className="space-y-2">
                    {condition.symptoms.slice(0, 3).map((symptom) => (
                      <div key={symptom} className="flex items-center gap-2.5">
                        <CheckCircleIcon size={14} className="text-trust-green shrink-0" />
                        <span className="text-[13px] text-charcoal">{symptom}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover reveal: "Could respond to treatment" */}
                  <div className="mt-5 pt-4 border-t border-ivory">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-trust-green uppercase tracking-wider">
                        Non-surgical options available
                      </span>
                      <svg
                        className="w-4 h-4 text-gold transform transition-transform duration-300 group-hover:translate-x-1"
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path d="M5 12H19" /><path d="M14 7L19 12L14 17" />
                      </svg>
                    </div>
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

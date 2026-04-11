import type { Condition } from "@/data/bodyAreas";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { ConditionIcon } from "@/components/ui/ConditionIcon";

interface ConditionCardsProps {
  conditions: Condition[];
  bodyAreaName: string;
}

export function ConditionCards({
  conditions,
  bodyAreaName,
}: ConditionCardsProps) {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label">
              <div className="gold-line" />
              <span>Conditions</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              What Causes {bodyAreaName}?
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Understanding your condition is the first step toward the right treatment
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {conditions.map((condition, i) => (
            <FadeIn key={condition.slug} delay={i * 100}>
              <Card variant="shimmer" hover className="h-full flex flex-col">
                {/* Icon */}
                <div
                  className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center mb-5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(200,169,110,0.04) 100%)",
                  }}
                >
                  <ConditionIcon
                    iconKey={condition.icon}
                    size={22}
                    className="text-gold"
                  />
                </div>

                {/* Heading */}
                <h3
                  className="font-serif font-bold mb-3"
                  style={{ fontSize: "19px", lineHeight: 1.3 }}
                >
                  {condition.name}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-slate leading-relaxed mb-4 flex-1">
                  {condition.description}
                </p>

                {/* Symptom pills */}
                <div className="border-t border-ivory pt-4 mt-4">
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2.5">
                    Common symptoms
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {condition.symptoms.slice(0, 4).map((symptom) => (
                      <span
                        key={symptom}
                        className="text-[10px] px-3 py-1.5 bg-[#F6F1E7] rounded-pill text-muted font-medium"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

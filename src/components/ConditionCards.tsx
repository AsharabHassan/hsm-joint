import type { Condition } from "@/data/bodyAreas";
import { Card } from "@/components/ui/Card";
import { AccordionItem } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";

interface ConditionCardsProps {
  conditions: Condition[];
  bodyAreaName: string;
}

export function ConditionCards({
  conditions,
  bodyAreaName,
}: ConditionCardsProps) {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            What Causes {bodyAreaName}?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions.map((condition, i) => (
            <FadeIn key={condition.slug} delay={i * 100}>
              <Card>
                <div className="w-10 h-10 bg-ivory rounded-[10px] flex items-center justify-center mb-4 text-xl">
                  {condition.icon}
                </div>
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-3">
                  {condition.name}
                </h3>
                <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                  {condition.description}
                </p>
                <div className="border-t border-ivory pt-4">
                  <AccordionItem
                    question="Common symptoms"
                    answer={condition.symptoms.join(" • ")}
                  />
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

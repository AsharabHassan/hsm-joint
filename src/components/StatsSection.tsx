import { ukStats } from "@/data/stats";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

interface StatsSectionProps {
  bodyAreaSlug: string;
}

export function StatsSection({ bodyAreaSlug }: StatsSectionProps) {
  const relevantStats = ukStats.filter(
    (s) => s.useOn === "all" || s.useOn.includes(bodyAreaSlug)
  );

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            Why Joint Pain in the UK Is a Growing Challenge
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relevantStats.map((stat, i) => (
            <FadeIn key={stat.value} delay={i * 100}>
              <Card className="text-center">
                <p className="font-serif text-3xl font-extrabold text-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-charcoal/70 mb-3">{stat.label}</p>
                <p className="text-[11px] text-muted">{stat.source}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

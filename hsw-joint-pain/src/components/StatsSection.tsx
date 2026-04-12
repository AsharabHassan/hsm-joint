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
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label">
              <div className="gold-line" />
              <span>The UK Picture</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Why Joint Pain in the UK Is a Growing Challenge
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              The scale of the problem and what it means for your treatment options
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relevantStats.map((stat, i) => (
            <FadeIn key={stat.value} delay={i * 100}>
              <Card variant="default" className="text-center relative overflow-hidden">
                {/* Animated gold gradient top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background:
                      "linear-gradient(90deg, #C8A96E, #E8D5A0, #C8A96E)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s ease infinite",
                  }}
                />

                <p className="font-serif text-3xl font-extrabold text-gold mb-2 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-slate mb-3 leading-relaxed">
                  {stat.label}
                </p>
                <p className="text-[11px] text-muted italic">{stat.source}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { socialProofStats } from "@/data/stats";

export function SocialProof() {
  return (
    <section className="bg-cream pb-12">
      <div className="max-w-page mx-auto px-4">
        <Card className="!p-4 md:!p-6">
          <div className="flex justify-around items-center text-center">
            {socialProofStats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-10 bg-ivory" />}
                <div>
                  <p className="font-serif text-2xl font-extrabold text-gold">
                    <CountUp end={stat.value} />
                  </p>
                  <p className="text-[11px] text-muted mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

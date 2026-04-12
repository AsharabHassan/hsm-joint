import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";
import { socialProofStats } from "@/data/stats";

export function SocialProof() {
  return (
    <section className="bg-cream py-10 md:py-14">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="bg-white rounded-card border border-ivory/80 shadow-card px-6 py-5 md:px-8 md:py-6">
            <div className="flex justify-around items-center text-center">
              {socialProofStats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  {i > 0 && (
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-ivory to-transparent" />
                  )}
                  <div>
                    <p className="font-serif text-2xl md:text-3xl font-extrabold text-gold tracking-tight">
                      <CountUp end={stat.value} />
                    </p>
                    <p className="text-[10px] text-slate mt-1.5 font-medium uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import type { BodyArea } from "@/data/bodyAreas";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckCircleIcon } from "@/components/ui/Icons";

interface TraditionalRisksProps {
  bodyArea: BodyArea;
}

const comparisons = [
  { factor: "Procedure", surgery: "1-4 hours under general anaesthesia", nonSurgical: "30-60 min, walk-in walk-out" },
  { factor: "Recovery", surgery: "3-12 months rehabilitation", nonSurgical: "Resume activities in 1-3 days" },
  { factor: "Hospital", surgery: "1-5 day inpatient stay", nonSurgical: "No hospital stay required" },
  { factor: "Risk", surgery: "1-10% infection, blood clots, nerve damage", nonSurgical: "Minimal — uses your body's own biology" },
  { factor: "Reversibility", surgery: "Irreversible — can't undo", nonSurgical: "Non-invasive, can be repeated" },
  { factor: "Time off work", surgery: "2-12 weeks minimum", nonSurgical: "Most return next day" },
];

export function TraditionalRisks({ bodyArea }: TraditionalRisksProps) {
  return (
    <section className="relative bg-charcoal py-20 md:py-28 noise-overlay overflow-hidden">
      {/* Decorative orbs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,107,74,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex">
              <div className="gold-line" style={{ opacity: 0.5 }} />
              <span style={{ color: "#C8A96E" }}>Compare Your Options</span>
              <div className="gold-line" style={{ opacity: 0.5 }} />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-white mb-3">
              Why Patients Choose Non-Surgical
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              See how non-surgical approaches compare — at a glance
            </p>
          </div>
        </FadeIn>

        {/* Comparison rows */}
        <div className="max-w-4xl mx-auto">
          {/* Column headers */}
          <FadeIn>
            <div className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[140px_1fr_1fr] gap-4 mb-3 px-2">
              <div />
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-white/25">Surgery</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-gold">Non-Surgical</span>
              </div>
            </div>
          </FadeIn>

          {comparisons.map((row, i) => (
            <FadeIn key={row.factor} delay={i * 60}>
              <div
                className={`grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[140px_1fr_1fr] gap-4 py-4 px-2 ${
                  i < comparisons.length - 1 ? "border-b border-white/[0.06]" : ""
                }`}
              >
                {/* Factor label */}
                <div className="flex items-center">
                  <span className="text-xs font-bold text-gold uppercase tracking-wider">{row.factor}</span>
                </div>

                {/* Surgery — dimmed, struck-through feel */}
                <div className="flex items-center justify-center">
                  <div className="bg-white/[0.03] rounded-xl px-4 py-3 w-full text-center">
                    <span className="text-[13px] text-white/30">{row.surgery}</span>
                  </div>
                </div>

                {/* Non-surgical — highlighted */}
                <div className="flex items-center justify-center">
                  <div className="bg-trust-green/10 border border-trust-green/20 rounded-xl px-4 py-3 w-full text-center">
                    <span className="text-[13px] text-green-bright font-medium flex items-center justify-center gap-2">
                      <CheckCircleIcon size={14} className="shrink-0" />
                      {row.nonSurgical}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom note */}
        <FadeIn delay={400}>
          <p className="text-center text-xs text-white/30 mt-10 max-w-md mx-auto">
            Surgery remains the best option for some conditions. Your specialist will advise.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

import type { Condition } from "@/data/bodyAreas";
import { FadeIn } from "@/components/ui/FadeIn";
import { ConditionIcon } from "@/components/ui/ConditionIcon";
import { CheckCircleIcon, ShieldCheckIcon } from "@/components/ui/Icons";

interface ConditionSectionsProps {
  conditions: Condition[];
  bodyAreaName: string;
}

export function ConditionSections({
  conditions,
  bodyAreaName,
}: ConditionSectionsProps) {
  return (
    <>
      {/* Section header */}
      <section className="bg-cream pt-20 md:pt-28 pb-4">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold/60" />
                <span className="text-[10px] font-bold uppercase tracking-[3px] text-gold">
                  Understanding Your Condition
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold/60" />
              </div>
              <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
                What Causes {bodyAreaName}?
              </h2>
              <p className="text-sm text-slate max-w-lg mx-auto leading-relaxed">
                Each condition responds differently to treatment. Understanding
                yours is the first step toward the right approach.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Individual condition sections */}
      {conditions.map((condition, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven ? "bg-cream" : "bg-white";

        // Split description into sentences for better readability
        const sentences = condition.description
          .split(". ")
          .filter((s) => s.trim().length > 0);
        const leadSentence = sentences[0] + ".";
        const remainingSentences = sentences
          .slice(1)
          .map((s) => (s.endsWith(".") ? s : s + "."))
          .join(" ");

        return (
          <section
            key={condition.slug}
            className={`${bgClass} py-16 md:py-24 overflow-hidden`}
          >
            <div className="max-w-page mx-auto px-4">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start ${
                  isEven ? "" : "lg:direction-rtl"
                }`}
              >
                {/* Content side */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <FadeIn delay={100}>
                    {/* Condition number + icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(200,169,110,0.15) 0%, rgba(200,169,110,0.05) 100%)",
                          boxShadow:
                            "0 0 30px rgba(200,169,110,0.08)",
                        }}
                      >
                        <ConditionIcon
                          iconKey={condition.icon}
                          size={30}
                          className="text-gold"
                        />
                        {/* Number badge */}
                        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-charcoal text-white text-[11px] font-bold flex items-center justify-center shadow-lg">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-charcoal leading-tight">
                          {condition.name}
                        </h3>
                      </div>
                    </div>

                    {/* Lead sentence — large */}
                    <p className="text-[17px] md:text-[18px] text-charcoal font-medium leading-relaxed mb-4">
                      {leadSentence}
                    </p>

                    {/* Remaining description */}
                    <p className="text-[14px] text-slate leading-[1.8] mb-8">
                      {remainingSentences}
                    </p>

                    {/* CTA hint */}
                    <div className="inline-flex items-center gap-2 bg-trust-green-light border border-trust-green/15 rounded-full px-4 py-2">
                      <ShieldCheckIcon
                        size={14}
                        className="text-trust-green"
                      />
                      <span className="text-[12px] font-semibold text-trust-green">
                        Non-surgical treatment options available
                      </span>
                    </div>
                  </FadeIn>
                </div>

                {/* Info panel side */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <FadeIn delay={250}>
                    <div className="space-y-5">
                      {/* Symptoms card */}
                      <div
                        className="rounded-[20px] p-6 relative overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(160deg, #1A1A1A 0%, #252118 100%)",
                        }}
                      >
                        <div className="noise-overlay" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-2.5 mb-5">
                            <div
                              className="w-2 h-2 rounded-full bg-gold"
                              style={{
                                animation: "pulse 2s ease-in-out infinite",
                              }}
                            />
                            <h4 className="text-[11px] font-bold uppercase tracking-[2.5px] text-gold">
                              Common Symptoms
                            </h4>
                          </div>
                          <div className="space-y-3">
                            {condition.symptoms.map((symptom, si) => (
                              <div
                                key={symptom}
                                className="flex items-start gap-3 group/symptom"
                                style={{
                                  animation: `fadeInUp 0.4s ease-out ${
                                    si * 0.08
                                  }s both`,
                                }}
                              >
                                <div className="w-5 h-5 rounded-full bg-trust-green/15 flex items-center justify-center shrink-0 mt-0.5">
                                  <CheckCircleIcon
                                    size={12}
                                    className="text-trust-green"
                                  />
                                </div>
                                <span className="text-[13px] text-white/70 leading-relaxed">
                                  {symptom}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Progression warning card */}
                      <div
                        className="rounded-[20px] p-6 border"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(220,53,69,0.04) 0%, rgba(220,53,69,0.01) 100%)",
                          borderColor: "rgba(220,53,69,0.12)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(220,53,69,0.12) 0%, rgba(220,53,69,0.04) 100%)",
                            }}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#DC3545"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                              <line x1="12" y1="9" x2="12" y2="13" />
                              <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-[12px] font-bold text-[#DC3545] uppercase tracking-wider mb-1.5">
                              If Left Untreated
                            </h4>
                            <p className="text-[13px] text-slate leading-relaxed">
                              {condition.progression}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>

              {/* Divider between conditions */}
              {index < conditions.length - 1 && (
                <div className="mt-16 md:mt-20 flex items-center justify-center gap-3">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold/20" />
                  <div className="w-2 h-2 rounded-full bg-gold/15" />
                  <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold/20" />
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}

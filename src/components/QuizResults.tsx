"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { treatments } from "@/data/treatments";
import { getScoreLabel, getTreatmentMatchLabels } from "@/lib/scoring";

interface QuizResultsProps {
  score: number;
}

export function QuizResults({ score }: QuizResultsProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const scoreLabel = getScoreLabel(score);
  const matchLabels = getTreatmentMatchLabels(score);

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(score * eased));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [score]);

  const matchLabelStyles: Record<string, { bg: string; text: string; label: string }> = {
    best: { bg: "bg-gold", text: "text-white", label: "Best Match" },
    good: { bg: "bg-trust-green/10", text: "text-trust-green", label: "Good Match" },
    explore: { bg: "bg-ivory", text: "text-muted", label: "Worth Exploring" },
  };

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-gold mb-4">
            Your Joint Health Improvement Score
          </p>

          {/* Score gauge */}
          <div className="relative w-36 h-36 mx-auto mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#F5F0E8"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#1A6B4A"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(displayScore / 100) * 327} 327`}
                className="transition-all duration-100"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-4xl font-extrabold text-trust-green">
                {displayScore}
              </span>
              <span className="text-[11px] text-muted">out of 100</span>
            </div>
          </div>

          <p className="text-lg font-semibold text-trust-green">{scoreLabel}</p>
          <p className="text-sm text-charcoal/70 max-w-lg mx-auto mt-2">
            Based on your responses, your condition profile suggests potential
            for improvement through non-surgical regenerative approaches.
            Individual outcomes vary.
          </p>
        </div>

        {/* Treatment recommendations */}
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-gold text-center mb-6">
          Educational Treatment Options For Your Profile
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {treatments.map((treatment) => {
            const matchType = matchLabels[treatment.slug] || "explore";
            const style = matchLabelStyles[matchType];
            const isBest = matchType === "best";

            return (
              <Card
                key={treatment.slug}
                variant={isBest ? "highlighted" : "default"}
                className={`text-center relative ${isBest ? "md:-mt-2 md:mb-2" : ""}`}
              >
                {isBest && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white px-4 py-1 rounded-pill text-[11px] font-bold">
                    BEST MATCH
                  </div>
                )}
                <p className="text-[11px] text-muted uppercase tracking-wider">
                  {treatment.name}
                </p>
                <p className="text-gold font-bold text-xl font-serif mt-1 mb-2">
                  {treatment.price}
                </p>
                <p className="text-xs text-charcoal/70 mb-4">
                  {treatment.mechanism}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-pill text-[11px] font-semibold ${style.bg} ${style.text}`}
                >
                  {style.label}
                </span>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button size="lg">Book Your Free Strategy Consultation →</Button>
          <p className="text-xs text-muted mt-2">
            Discuss your score with a specialist — no obligation
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 max-w-3xl mx-auto bg-white rounded-card p-5 border border-ivory">
          <p className="text-[11px] text-muted text-center leading-relaxed">
            This assessment is for educational purposes only and does not
            constitute medical advice. Your score is based on general research
            and may not reflect your individual health profile. A qualified
            medical professional should evaluate your specific condition before
            recommending any treatment approach. Results from regenerative
            therapies vary based on individual health profiles.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getAdSafeTreatments } from "@/data/treatments";
import {
  getScoreLabel,
  getScoreDescription,
  getTreatmentMatchLabels,
  getMatchLabelDisplay,
  type MatchLevel,
} from "@/lib/scoring";
import { CheckCircleIcon, ShieldCheckIcon } from "@/components/ui/Icons";

interface QuizResultsProps {
  score: number;
}

export function QuizResults({ score }: QuizResultsProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const scoreLabel = getScoreLabel(score);
  const scoreDescription = getScoreDescription(score);
  const matchLabels = getTreatmentMatchLabels(score);
  const adSafeTreatments = getAdSafeTreatments();

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

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="section-header-label justify-center flex">
            <div className="gold-line" />
            <span>Your Results</span>
            <div className="gold-line" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-gold mb-6">
            Your Joint Health Improvement Score
          </p>

          {/* Score gauge */}
          <div className="relative w-40 h-40 mx-auto mb-5">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#F3EDE0"
                strokeWidth="7"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${(displayScore / 100) * 327} 327`}
                className="transition-all duration-100"
              />
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1A6B4A" />
                  <stop offset="100%" stopColor="#C8A96E" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-4xl font-extrabold text-trust-green tracking-tight">
                {displayScore}
              </span>
              <span className="text-[11px] text-muted font-medium">
                out of 100
              </span>
            </div>
          </div>

          <p className="text-lg font-bold text-trust-green">{scoreLabel}</p>
          <p className="text-sm text-slate max-w-lg mx-auto mt-2 leading-relaxed">
            {scoreDescription} Individual outcomes vary.
          </p>
        </div>

        {/* Treatment recommendations */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-gold">
            Treatment Options For Your Profile
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {adSafeTreatments.map((treatment) => {
            const matchLevel =
              matchLabels[
                treatment.slug as keyof typeof matchLabels
              ] as MatchLevel;
            const style = getMatchLabelDisplay(matchLevel);
            const isRecommended =
              matchLevel === "best" || matchLevel === "recommended";

            return (
              <Card
                key={treatment.slug}
                variant={isRecommended ? "shimmer" : "default"}
                className={`text-center relative overflow-hidden ${
                  isRecommended ? "md:-mt-2 md:mb-2" : ""
                }`}
              >
                {isRecommended && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-2 px-4 py-1 rounded-b-lg text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #C8A96E, #B8912E)",
                    }}
                  >
                    {style.label}
                  </div>
                )}
                <div className={isRecommended ? "pt-5" : ""}>
                  <p className="text-[11px] text-muted uppercase tracking-wider font-medium">
                    {treatment.name}
                  </p>
                  <p className="text-gold font-extrabold text-2xl font-serif mt-1 mb-3">
                    {treatment.price}
                  </p>
                  <p className="text-xs text-slate leading-relaxed mb-5">
                    {treatment.mechanism}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-pill text-[11px] font-semibold ${style.bg} ${style.text}`}
                  >
                    <CheckCircleIcon size={13} />
                    {style.label}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg">
            Book Your Free Consultation
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12H19" />
              <path d="M14 7L19 12L14 17" />
            </svg>
          </Button>
          <p className="text-xs text-muted mt-3">
            Discuss your score with a specialist — no obligation
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-card p-6 border border-ivory flex gap-4 items-start">
          <ShieldCheckIcon
            size={20}
            className="text-muted/40 shrink-0 mt-0.5"
          />
          <p className="text-[11px] text-muted leading-relaxed">
            This assessment is for educational purposes only and does not
            constitute medical advice. Your score is based on general research
            and may not reflect your individual health profile. A qualified
            medical professional should evaluate your specific condition before
            recommending any treatment approach.
          </p>
        </div>
      </div>
    </section>
  );
}

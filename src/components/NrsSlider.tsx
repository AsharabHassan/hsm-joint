"use client";

import type { NrsConfig } from "@/data/quizQuestions";

interface NrsSliderProps {
  config: NrsConfig;
  value: number | null;
  onChange: (value: number) => void;
}

export function NrsSlider({ config, value, onChange }: NrsSliderProps) {
  const numbers = Array.from(
    { length: config.max - config.min + 1 },
    (_, i) => config.min + i
  );

  function getColor(n: number): string {
    if (n <= 2) return "#1A6B4A";
    if (n <= 4) return "#7B8A2E";
    if (n <= 6) return "#C8A96E";
    if (n <= 8) return "#C06030";
    return "#B03030";
  }

  return (
    <div>
      {/* Number row */}
      <div className="flex justify-between gap-1.5 sm:gap-2">
        {numbers.map((n) => {
          const isSelected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`
                w-full aspect-square max-w-[44px] rounded-xl text-sm font-bold
                transition-all duration-200 cursor-pointer
                flex items-center justify-center
                ${
                  isSelected
                    ? "text-white shadow-lg scale-110"
                    : "bg-white border border-black/[0.06] text-charcoal hover:border-gold/40 hover:-translate-y-0.5"
                }
              `}
              style={
                isSelected
                  ? {
                      backgroundColor: getColor(n),
                      animation: "scaleIn 0.2s ease-out",
                    }
                  : undefined
              }
            >
              {n}
            </button>
          );
        })}
      </div>

      {/* Labels row */}
      <div className="relative h-5 mt-3">
        {Object.entries(config.labels).map(([num, label]) => {
          const position =
            ((Number(num) - config.min) / (config.max - config.min)) * 100;
          return (
            <span
              key={num}
              className="absolute text-[10px] text-muted whitespace-nowrap"
              style={{
                left: `${position}%`,
                transform: "translateX(-50%)",
              }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

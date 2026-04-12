"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { HeartPulseIcon } from "@/components/ui/Icons";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const heroBottom = window.innerHeight;
      const quiz = document.getElementById("quiz");
      const form = document.getElementById("assessment-form");
      const quizTop = quiz?.getBoundingClientRect().top ?? Infinity;
      const quizBottom = quiz?.getBoundingClientRect().bottom ?? Infinity;
      const formTop = form?.getBoundingClientRect().top ?? Infinity;
      const formBottom = form?.getBoundingClientRect().bottom ?? Infinity;

      const pastHero = window.scrollY > heroBottom;
      const quizVisible = quizTop < window.innerHeight && quizBottom > 0;
      const formVisible = formTop < window.innerHeight && formBottom > 0;

      setVisible(pastHero && !quizVisible && !formVisible);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-400 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-xl border-t border-ivory shadow-sticky px-4 py-3">
        <div className="flex items-center gap-3 max-w-page mx-auto">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <HeartPulseIcon size={14} className="text-gold" />
              <p className="text-[11px] text-muted font-medium">Free Assessment</p>
            </div>
            <p className="font-bold text-sm text-charcoal truncate">
              2-Min Joint Health Score
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              const quiz = document.getElementById("quiz");
              const form = document.getElementById("assessment-form");
              (quiz || form)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}

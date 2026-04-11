"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const heroBottom = window.innerHeight;
      const quiz = document.getElementById("quiz");
      const quizTop = quiz?.getBoundingClientRect().top ?? Infinity;
      const quizBottom = quiz?.getBoundingClientRect().bottom ?? Infinity;

      const pastHero = window.scrollY > heroBottom;
      const quizVisible = quizTop < window.innerHeight && quizBottom > 0;

      setVisible(pastHero && !quizVisible);
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
      <div className="bg-white/90 backdrop-blur-xl border-t border-ivory shadow-sticky px-4 py-3">
        <div className="flex items-center gap-3 max-w-page mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-muted">Free Assessment</p>
            <p className="font-bold text-sm text-charcoal truncate">
              2-min Joint Health Score
            </p>
          </div>
          <Button
            size="sm"
            onClick={() =>
              document
                .getElementById("quiz")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Now →
          </Button>
        </div>
      </div>
    </div>
  );
}

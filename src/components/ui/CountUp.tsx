"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: string;
  duration?: number;
}

export function CountUp({ end, duration = 1500 }: CountUpProps) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  });

  function animateCount() {
    const numericPart = parseFloat(end.replace(/[^0-9.]/g, ""));
    const suffix = end.replace(/[0-9.]/g, "");
    const isDecimal = end.includes(".");
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = numericPart * eased;

      if (isDecimal) {
        setDisplay(current.toFixed(1) + suffix);
      } else {
        setDisplay(Math.floor(current) + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplay(end);
      }
    }

    requestAnimationFrame(update);
  }

  return <span ref={ref}>{display}</span>;
}

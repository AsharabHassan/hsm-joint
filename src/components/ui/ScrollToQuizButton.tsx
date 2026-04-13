"use client";

import { Button } from "@/components/ui/Button";

export function ScrollToQuizButton() {
  return (
    <Button
      size="lg"
      onClick={() => {
        document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Get Your Free Assessment
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
  );
}

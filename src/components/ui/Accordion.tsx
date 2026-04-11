"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-ivory last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-semibold pr-4">
          {question}
        </h3>
        <svg
          className={`w-5 h-5 text-gold shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[500px] pb-5" : "max-h-0"
        }`}
      >
        <p className="text-charcoal/80 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

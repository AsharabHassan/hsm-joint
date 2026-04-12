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
        className="flex w-full items-center justify-between py-5 text-left group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-semibold pr-4 group-hover:text-gold transition-colors duration-200">
          {question}
        </h3>
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? "bg-gold border-gold rotate-180" : "bg-warm-white border-ivory"
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 ${isOpen ? "text-white" : "text-gold"}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-[500px] pb-5" : "max-h-0"}`}>
        <p className="text-slate leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  );
}

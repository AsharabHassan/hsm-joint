"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheckIcon,
  ClockIcon,
  UserCheckIcon,
} from "@/components/ui/Icons";

export function LeadCaptureForm() {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          bodyArea: "homepage",
          pageSource: "homepage",
        }),
      });
    } catch {
      // Still show success
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="relative bg-charcoal py-16 md:py-20 noise-overlay">
        <div className="relative z-10 max-w-quiz mx-auto px-4 text-center">
          <div className="bg-white rounded-card p-8 md:p-10 shadow-quiz">
            <div className="w-16 h-16 bg-trust-green-light rounded-full flex items-center justify-center mx-auto mb-5">
              <ShieldCheckIcon size={28} className="text-trust-green" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
              Thank You, {contact.name.split(" ")[0]}
            </h3>
            <p className="text-sm text-slate leading-relaxed">
              A member of our team will be in touch within 24 hours to discuss
              your options. No obligation whatsoever.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="assessment-form" className="relative bg-charcoal py-16 md:py-20 noise-overlay">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-trust-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-page mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Value proposition */}
          <div className="text-white">
            <div className="gold-line mb-5" />
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-4 text-white">
              Get Your Free Joint<br className="hidden md:block" /> Health Assessment
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
              Speak with a GMC-registered specialist about your condition.
              No obligation, no pressure -- just honest, evidence-based guidance.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: ClockIcon,
                  title: "Quick & Confidential",
                  desc: "2-minute form, response within 24 hours",
                },
                {
                  icon: UserCheckIcon,
                  title: "GMC-Registered Specialists",
                  desc: "Harley Street practitioners with 10+ years experience",
                },
                {
                  icon: ShieldCheckIcon,
                  title: "Zero Obligation",
                  desc: "Educational consultation, no treatment pressure",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-card p-7 md:p-9 shadow-quiz"
            >
              <div className="text-center mb-6">
                <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-gold mb-2">
                  Free Assessment
                </p>
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  Request Your Consultation
                </h3>
              </div>

              <div className="flex flex-col gap-3.5">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                  className="premium-input"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  className="premium-input"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                  className="premium-input"
                />

                <Button type="submit" size="lg" disabled={submitting} className="w-full mt-1">
                  {submitting
                    ? "Submitting..."
                    : "Get My Free Assessment"}
                </Button>
              </div>

              <p className="text-[11px] text-muted text-center mt-4 leading-relaxed">
                By submitting, you agree to receive your educational assessment.
                No obligation. Your data is handled in accordance with GDPR.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

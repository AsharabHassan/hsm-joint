"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { QuizResults } from "@/components/QuizResults";
import { getQuizConfig, type QuizOption } from "@/data/quizQuestions";
import {
  calculateScore,
  getScoreLabel,
  getMatchedTreatment,
  type QuizAnswers,
  type AnswerWeight,
} from "@/lib/scoring";

interface QuizProps {
  bodyAreaSlug: string;
}

type QuizState = "questions" | "contact" | "results";

export function Quiz({ bodyAreaSlug }: QuizProps) {
  const config = getQuizConfig(bodyAreaSlug);
  const questions = config?.questions ?? [];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerWeight | AnswerWeight[]>>({});
  const [state, setState] = useState<QuizState>("questions");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  if (questions.length === 0) return null;

  const totalSteps = questions.length + 1; // +1 for contact form
  const progress =
    state === "results"
      ? 100
      : Math.round(
          ((state === "contact" ? questions.length : currentStep) / totalSteps) *
            100
        );

  function selectOption(option: QuizOption) {
    const question = questions[currentStep];
    if (question.multiSelect) {
      const existing = (answers[question.id] as AnswerWeight[]) || [];
      const isSelected = existing.some((a) => a.value === option.value);
      setAnswers({
        ...answers,
        [question.id]: isSelected
          ? existing.filter((a) => a.value !== option.value)
          : [...existing, { value: option.value, weight: option.weight }],
      });
    } else {
      setAnswers({
        ...answers,
        [question.id]: { value: option.value, weight: option.weight },
      });
      // Auto-advance after 300ms
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setState("contact");
        }
      }, 300);
    }
  }

  function goNext() {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setState("contact");
    }
  }

  function goBack() {
    if (state === "contact") {
      setState("questions");
      setCurrentStep(questions.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const quizAnswers: QuizAnswers = {
      painLocation: answers["pain-location"] as AnswerWeight,
      duration: answers["duration"] as AnswerWeight,
      dailyImpact: answers["daily-impact"] as AnswerWeight,
      previousTreatments: (answers["previous-treatments"] as AnswerWeight[]) || [],
      primaryGoal: answers["primary-goal"] as AnswerWeight,
    };

    const calculatedScore = calculateScore(quizAnswers);
    setScore(calculatedScore);

    try {
      await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          bodyArea: bodyAreaSlug,
          answers: {
            painLocation: (answers["pain-location"] as AnswerWeight)?.value,
            duration: (answers["duration"] as AnswerWeight)?.value,
            dailyImpact: (answers["daily-impact"] as AnswerWeight)?.value,
            previousTreatments: ((answers["previous-treatments"] as AnswerWeight[]) || []).map(
              (a) => a.value
            ),
            primaryGoal: (answers["primary-goal"] as AnswerWeight)?.value,
          },
          score: calculatedScore,
          scoreLabel: getScoreLabel(calculatedScore),
          matchedTreatment: getMatchedTreatment(calculatedScore),
        }),
      });
    } catch {
      // Still show results even if API call fails
    }

    setSubmitting(false);
    setState("results");
  }

  if (state === "results") {
    return <QuizResults score={score} />;
  }

  return (
    <section
      id="quiz"
      className="bg-gradient-to-br from-gold to-gold-dark py-16 md:py-24"
    >
      <div className="max-w-page mx-auto px-4">
        <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center text-white mb-2">
          Discover Your Joint Health Improvement Score
        </h2>
        <p className="text-center text-white/80 mb-8 text-sm">
          Answer 5 quick questions to explore which approaches may be relevant
          to your situation
        </p>

        <div className="max-w-quiz mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-quiz">
            {/* Progress bar */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-[11px] text-muted">
                {state === "contact"
                  ? "Almost done"
                  : `Question ${currentStep + 1} of ${questions.length}`}
              </p>
              <p className="text-[11px] text-gold font-semibold">{progress}%</p>
            </div>
            <div className="h-1 bg-ivory rounded-full mb-6">
              <div
                className="h-1 bg-gold rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {state === "questions" && (
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-5">
                  {questions[currentStep].question}
                </h3>
                <div className="flex flex-col gap-2">
                  {questions[currentStep].options.map((option) => {
                    const currentAnswer = answers[questions[currentStep].id];
                    const isSelected = questions[currentStep].multiSelect
                      ? (currentAnswer as AnswerWeight[])?.some(
                          (a) => a.value === option.value
                        )
                      : (currentAnswer as AnswerWeight)?.value === option.value;

                    return (
                      <button
                        key={option.value}
                        onClick={() => selectOption(option)}
                        className={`flex items-center gap-3 p-3.5 rounded-[10px] border transition-all duration-200 text-left ${
                          isSelected
                            ? "bg-gold border-gold text-white"
                            : "bg-cream border-ivory hover:border-gold/50"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                            isSelected ? "border-white" : "border-gold"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex gap-3 mt-6">
                  {currentStep > 0 && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={goBack}
                      className="flex-1"
                    >
                      ← Back
                    </Button>
                  )}
                  {questions[currentStep].multiSelect && (
                    <Button onClick={goNext} size="sm" className="flex-[2]">
                      Next →
                    </Button>
                  )}
                </div>
              </div>
            )}

            {state === "contact" && (
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[2px] text-gold mb-2">
                    Your assessment is ready
                  </p>
                  <h3 className="font-serif text-xl font-bold text-charcoal">
                    Where should we send your
                    <br />
                    Joint Health Improvement Score?
                  </h3>
                  <p className="text-[13px] text-muted mt-2">
                    Your personalised report will appear on the next screen
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={contact.name}
                    onChange={(e) =>
                      setContact({ ...contact, name: e.target.value })
                    }
                    className="bg-cream border border-ivory rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    className="bg-cream border border-ivory rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    className="bg-cream border border-ivory rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting
                      ? "Processing..."
                      : "View My Improvement Score →"}
                  </Button>
                </div>
                <p className="text-[11px] text-muted text-center mt-3">
                  By submitting, you agree to receive your educational
                  assessment. No obligation.
                </p>
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={goBack}
                    className="w-full"
                  >
                    ← Back
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

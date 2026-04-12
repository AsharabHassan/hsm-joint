"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { NrsSlider } from "@/components/NrsSlider";
import { QuizResults } from "@/components/QuizResults";
import { getQuizConfig, type QuizOption } from "@/data/quizQuestions";
import {
  calculateScore,
  getScoreLabel,
  getTreatmentMatchLabels,
  type QuizAnswers,
  type AnswerWeight,
} from "@/lib/scoring";
import {
  ShieldCheckIcon,
  ClockIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/Icons";

interface QuizProps {
  bodyAreaSlug: string;
}

type QuizState = "questions" | "contact" | "results";

export function Quiz({ bodyAreaSlug }: QuizProps) {
  const config = getQuizConfig(bodyAreaSlug);
  const questions = config?.questions ?? [];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, AnswerWeight | AnswerWeight[] | number>
  >({});
  const [state, setState] = useState<QuizState>("questions");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  if (questions.length === 0) return null;

  const totalSteps = questions.length + 1;
  const progress =
    state === "results"
      ? 100
      : Math.round(
          ((state === "contact" ? questions.length : currentStep) /
            totalSteps) *
            100
        );

  function selectOption(option: QuizOption) {
    const question = questions[currentStep];
    if (question.type === "multi") {
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
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setState("contact");
        }
      }, 300);
    }
  }

  function handleNrsChange(value: number) {
    const question = questions[currentStep];
    setAnswers({ ...answers, [question.id]: value });
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setState("contact");
      }
    }, 400);
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

  function canProceed(): boolean {
    const question = questions[currentStep];
    const answer = answers[question.id];
    if (question.type === "nrs") return typeof answer === "number";
    if (question.type === "multi")
      return Array.isArray(answer) && answer.length > 0;
    return answer !== undefined;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const quizAnswers: QuizAnswers = {
      painLocation: answers["pain-location"] as AnswerWeight,
      painIntensity: answers["pain-intensity"] as number,
      stiffness: answers["stiffness"] as AnswerWeight,
      functionalImpact:
        (answers["functional-impact"] as AnswerWeight[]) || [],
      duration: answers["duration"] as AnswerWeight,
      previousTreatments:
        (answers["previous-treatments"] as AnswerWeight[]) || [],
      ageRange: answers["age-range"] as AnswerWeight,
      primaryGoal: answers["primary-goal"] as AnswerWeight,
    };

    const calculatedScore = calculateScore(quizAnswers);
    setScore(calculatedScore);

    const matchLabels = getTreatmentMatchLabels(calculatedScore);

    try {
      await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          bodyArea: bodyAreaSlug,
          answers: {
            painLocation: (answers["pain-location"] as AnswerWeight)?.value,
            painIntensity: answers["pain-intensity"] as number,
            stiffness: (answers["stiffness"] as AnswerWeight)?.value,
            functionalImpact: (
              (answers["functional-impact"] as AnswerWeight[]) || []
            ).map((a) => a.value),
            duration: (answers["duration"] as AnswerWeight)?.value,
            previousTreatments: (
              (answers["previous-treatments"] as AnswerWeight[]) || []
            ).map((a) => a.value),
            ageRange: (answers["age-range"] as AnswerWeight)?.value,
            primaryGoal: (answers["primary-goal"] as AnswerWeight)?.value,
          },
          score: calculatedScore,
          scoreLabel: getScoreLabel(calculatedScore),
          matchedTreatments: {
            cortisone: matchLabels["cortisone"],
            hyaluronicAcid: matchLabels["hyaluronic-acid"],
            advancedOptions: matchLabels["advanced-options"],
          },
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

  const totalDots = questions.length;
  const filledDots = state === "contact" ? totalDots : currentStep + 1;
  const currentQuestion = questions[currentStep];

  return (
    <section
      id="quiz"
      className="relative bg-white py-16 md:py-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-page mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="section-header-label justify-center flex">
            <div className="gold-line" />
            <span>Free Assessment</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-2">
            Discover Your Improvement Score
          </h2>
          <p className="text-slate text-sm max-w-md mx-auto">
            Answer 8 quick questions to explore which approaches may be relevant
          </p>
        </div>

        <div className="max-w-quiz mx-auto">
          {/* Quiz card */}
          <div
            className="bg-[#FDFAF5] rounded-[22px] p-7 md:p-10 shadow-quiz"
            style={{ animation: "gentleGlow 5s ease-in-out infinite" }}
          >
            {/* Step indicator dots */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {Array.from({ length: totalDots }).map((_, i) => (
                <div
                  key={i}
                  className={`w-7 h-[5px] rounded-[3px] transition-colors duration-300 ${
                    i < filledDots ? "bg-charcoal" : "bg-ivory"
                  }`}
                />
              ))}
            </div>

            {/* Progress row */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-[12px] text-slate font-medium">
                {state === "contact"
                  ? "Almost done"
                  : `Question ${currentStep + 1} of ${questions.length}`}
              </p>
              <p className="text-[12px] text-gold font-bold">{progress}%</p>
            </div>

            {state === "questions" && (
              <div>
                <h3 className="font-serif text-[22px] font-bold text-charcoal mb-6">
                  {currentQuestion.question}
                </h3>

                {/* NRS slider for pain intensity */}
                {currentQuestion.type === "nrs" && currentQuestion.nrsConfig && (
                  <NrsSlider
                    config={currentQuestion.nrsConfig}
                    value={
                      typeof answers[currentQuestion.id] === "number"
                        ? (answers[currentQuestion.id] as number)
                        : null
                    }
                    onChange={handleNrsChange}
                  />
                )}

                {/* Standard options for single/multi */}
                {currentQuestion.type !== "nrs" &&
                  currentQuestion.options && (
                    <div className="flex flex-col gap-2.5">
                      {currentQuestion.options.map((option) => {
                        const currentAnswer = answers[currentQuestion.id];
                        const isSelected =
                          currentQuestion.type === "multi"
                            ? (currentAnswer as AnswerWeight[])?.some(
                                (a) => a.value === option.value
                              )
                            : (currentAnswer as AnswerWeight)?.value ===
                              option.value;

                        return (
                          <button
                            key={option.value}
                            onClick={() => selectOption(option)}
                            className={`quiz-option ${isSelected ? "selected" : ""}`}
                          >
                            <div
                              className={`w-[22px] h-[22px] rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "border-charcoal bg-white"
                                  : "border-muted/30 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <div
                                  className="w-[10px] h-[10px] rounded-full bg-charcoal"
                                  style={{
                                    animation: "scaleIn 0.2s ease-out",
                                  }}
                                />
                              )}
                            </div>
                            <span className="text-sm">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                <div className="flex gap-3 mt-7">
                  {currentStep > 0 && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={goBack}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  {(currentQuestion.type === "multi" ||
                    (currentQuestion.type === "nrs" &&
                      typeof answers[currentQuestion.id] === "number")) && (
                    <Button
                      onClick={goNext}
                      size="sm"
                      className="flex-[2]"
                      disabled={!canProceed()}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}

            {state === "contact" && (
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-7">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheckIcon size={24} className="text-gold" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-gold mb-2">
                    Your assessment is ready
                  </p>
                  <h3 className="font-serif text-xl font-bold text-charcoal">
                    Where should we send your
                    <br />
                    Improvement Score?
                  </h3>
                  <p className="text-[13px] text-slate mt-2">
                    Your personalised report will appear on the next screen
                  </p>
                </div>
                <div className="flex flex-col gap-3.5">
                  <div className="relative">
                    <UserIcon
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/40"
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={contact.name}
                      onChange={(e) =>
                        setContact({ ...contact, name: e.target.value })
                      }
                      className="premium-input w-full pl-11"
                    />
                  </div>
                  <div className="relative">
                    <MailIcon
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/40"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      className="premium-input w-full pl-11"
                    />
                  </div>
                  <div className="relative">
                    <PhoneIcon
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/40"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={contact.phone}
                      onChange={(e) =>
                        setContact({ ...contact, phone: e.target.value })
                      }
                      className="premium-input w-full pl-11"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full mt-1"
                  >
                    {submitting ? "Processing..." : "View My Improvement Score"}
                  </Button>
                </div>
                <p className="text-[11px] text-muted text-center mt-4 leading-relaxed">
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
                    Back
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Trust line below quiz card */}
          <div className="flex items-center justify-center gap-6 mt-5 text-[12px] text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon size={14} className="text-trust-green/60" />
              GDPR compliant
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon size={14} className="text-trust-green/60" />
              Takes 3 minutes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

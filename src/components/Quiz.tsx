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
  CheckCircleIcon,
  StarIcon,
} from "@/components/ui/Icons";

interface QuizProps {
  bodyAreaSlug: string;
  pageSource: string;
}

type QuizState = "questions" | "contact" | "results";

export function Quiz({ bodyAreaSlug, pageSource }: QuizProps) {
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
          pageSource,
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
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(170deg, #1A1A1A 0%, #2A2420 40%, #1A1A1A 100%)",
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 noise-overlay" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 60%)",
          animation: "pulse 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,107,74,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-page mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-[10px] font-bold uppercase tracking-[3px] text-gold">
              {bodyAreaSlug === "cortisone"
                ? "Cortisone Suitability Check"
                : "Free Clinical Assessment"}
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-white mb-4">
            {bodyAreaSlug === "cortisone" ? (
              <>
                Is a Cortisone Injection{" "}
                <span className="gradient-text-animated">Right For You?</span>
              </>
            ) : (
              <>
                Find Out If Non-Surgical Treatment{" "}
                <span className="gradient-text-animated">Could Work For You</span>
              </>
            )}
          </h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
            {bodyAreaSlug === "cortisone"
              ? "Answer 8 quick questions about your pain, inflammation, and injection history — our specialists will review your suitability within 24 hours."
              : "Our assessment is built on the same validated clinical tools used by orthopaedic specialists — adapted into a 3-minute questionnaire you can complete from home."}
          </p>
        </div>

        {/* What you'll get — premium glass cards */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: <CheckCircleIcon size={20} className="text-gold" />,
                title: "Improvement Score",
                desc: "A 0-100 score based on your pain level, mobility, and treatment history",
                number: "01",
              },
              {
                icon: <StarIcon size={20} className="text-gold" />,
                title: "Treatment Match",
                desc: "See which injection therapies are most suited to your specific profile",
                number: "02",
              },
              {
                icon: <ShieldCheckIcon size={20} className="text-gold" />,
                title: "Specialist Review",
                desc: "A GMC-registered specialist reviews your results within 24 hours",
                number: "03",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group relative rounded-[18px] p-5 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(200,169,110,0.15)",
                  backdropFilter: "blur(10px)",
                  animationDelay: `${i * 150}ms`,
                }}
              >
                {/* Number badge */}
                <div className="absolute top-3 right-3 text-[10px] font-bold text-gold/20">
                  {item.number}
                </div>
                {/* Icon with glow */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(200,169,110,0.15) 0%, rgba(200,169,110,0.05) 100%)",
                    boxShadow: "0 0 20px rgba(200,169,110,0.08)",
                  }}
                >
                  {item.icon}
                </div>
                <p className="text-[13px] font-bold text-white mb-1">
                  {item.title}
                </p>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Research citations — dark glass card */}
          <div
            className="rounded-[18px] p-5 md:p-6"
            style={{
              background: "linear-gradient(135deg, rgba(26,107,74,0.08) 0%, rgba(200,169,110,0.04) 100%)",
              border: "1px solid rgba(26,107,74,0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-2 h-2 rounded-full bg-trust-green"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-trust-green">
                Based on Published Clinical Research
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { title: "WOMAC Index", desc: "Gold-standard assessment used in 10,000+ clinical trials for joint pain" },
                { title: "NRS Pain Scale", desc: "Validated 0-10 pain rating used by the NHS and WHO" },
                { title: "Frontiers in Medicine (2024)", desc: "Compared injection therapies across 4-year follow-up" },
                { title: "Cellular & Molecular Immunology (2023)", desc: "12 of 15 RCTs showed positive outcomes" },
              ].map((cite) => (
                <div key={cite.title} className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-trust-green shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                  </svg>
                  <p className="text-[12px] text-white/50 leading-relaxed">
                    <span className="font-semibold text-white/80">{cite.title}</span> — {cite.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-quiz mx-auto">
          {/* Quiz card */}
          <div
            className="bg-white rounded-[22px] p-7 md:p-10 relative overflow-hidden"
            style={{
              boxShadow: "0 25px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(200,169,110,0.1)",
            }}
          >
            {/* Gold shimmer top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[4px]"
              style={{
                background: "linear-gradient(90deg, #C8A96E, #E8D5A0, #C8A96E)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s ease infinite",
              }}
            />
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
          <div className="flex items-center justify-center gap-6 mt-6 text-[12px] text-white/30">
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon size={14} className="text-trust-green/50" />
              GDPR compliant
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon size={14} className="text-trust-green/50" />
              Takes 3 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircleIcon size={14} className="text-trust-green/50" />
              No obligation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

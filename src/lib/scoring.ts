export interface AnswerWeight {
  value: string;
  weight: number;
}

export interface QuizAnswers {
  painLocation: AnswerWeight;
  painIntensity: number; // 0-10 NRS value
  stiffness: AnswerWeight;
  functionalImpact: AnswerWeight[]; // multi-select
  duration: AnswerWeight;
  previousTreatments: AnswerWeight[]; // multi-select
  ageRange: AnswerWeight;
  primaryGoal: AnswerWeight;
}

const WEIGHTS = {
  painLocation: 0.05,
  painIntensity: 0.20,
  stiffness: 0.15,
  functionalImpact: 0.20,
  duration: 0.10,
  previousTreatments: 0.15,
  ageRange: 0.05,
  primaryGoal: 0.10,
};

const MAX_SINGLE_WEIGHT = 5;
const MAX_NRS = 10;
const MAX_FUNCTIONAL_IMPACT_SUM = 17; // 2+3+3+3+2+4

export function calculateScore(answers: QuizAnswers): number {
  const painLocationScore = answers.painLocation.weight / MAX_SINGLE_WEIGHT;
  const painIntensityScore = answers.painIntensity / MAX_NRS;
  const stiffnessScore = answers.stiffness.weight / MAX_SINGLE_WEIGHT;

  // Multi-select Q4: sum of weights / max possible, capped at 1.0
  const functionalImpactSum = answers.functionalImpact.reduce(
    (sum, a) => sum + a.weight,
    0
  );
  const functionalImpactScore = Math.min(
    functionalImpactSum / MAX_FUNCTIONAL_IMPACT_SUM,
    1.0
  );

  const durationScore = answers.duration.weight / MAX_SINGLE_WEIGHT;

  // Multi-select Q6: max weight among selected / 5
  const prevTreatmentsMax =
    answers.previousTreatments.length > 0
      ? Math.max(...answers.previousTreatments.map((a) => a.weight))
      : 1;
  const previousTreatmentsScore = prevTreatmentsMax / MAX_SINGLE_WEIGHT;

  const ageRangeScore = answers.ageRange.weight / MAX_SINGLE_WEIGHT;
  const goalScore = answers.primaryGoal.weight / MAX_SINGLE_WEIGHT;

  const weightedScore =
    painLocationScore * WEIGHTS.painLocation +
    painIntensityScore * WEIGHTS.painIntensity +
    stiffnessScore * WEIGHTS.stiffness +
    functionalImpactScore * WEIGHTS.functionalImpact +
    durationScore * WEIGHTS.duration +
    previousTreatmentsScore * WEIGHTS.previousTreatments +
    ageRangeScore * WEIGHTS.ageRange +
    goalScore * WEIGHTS.primaryGoal;

  return Math.round(weightedScore * 100);
}

export function getScoreLabel(score: number): string {
  if (score >= 71) return "High Improvement Potential";
  if (score >= 41) return "Good Improvement Potential";
  return "Moderate Potential";
}

export function getScoreDescription(score: number): string {
  if (score >= 71)
    return "Your profile suggests strong potential for improvement through non-surgical injection therapies.";
  if (score >= 41)
    return "Your profile suggests good potential for improvement with targeted injection therapy.";
  return "Your profile suggests several options worth exploring with a specialist.";
}

export type MatchLevel = "best" | "good" | "recommended" | "worth-exploring" | "ask-specialist";

export interface TreatmentMatchLabels {
  cortisone: MatchLevel;
  "hyaluronic-acid": MatchLevel;
  "advanced-options": MatchLevel;
}

export function getTreatmentMatchLabels(score: number): TreatmentMatchLabels {
  if (score >= 71) {
    return {
      cortisone: "good",
      "hyaluronic-acid": "good",
      "advanced-options": "recommended",
    };
  }
  if (score >= 41) {
    return {
      cortisone: "best",
      "hyaluronic-acid": "best",
      "advanced-options": "worth-exploring",
    };
  }
  return {
    cortisone: "best",
    "hyaluronic-acid": "good",
    "advanced-options": "ask-specialist",
  };
}

export function getMatchLabelDisplay(level: MatchLevel): { bg: string; text: string; label: string } {
  switch (level) {
    case "best":
      return { bg: "bg-gold", text: "text-white", label: "Best Match" };
    case "good":
      return { bg: "bg-trust-green-light", text: "text-trust-green", label: "Good Match" };
    case "recommended":
      return { bg: "bg-gold", text: "text-white", label: "Recommended — Discuss with Specialist" };
    case "worth-exploring":
      return { bg: "bg-ivory", text: "text-slate", label: "Worth Exploring" };
    case "ask-specialist":
      return { bg: "bg-ivory", text: "text-slate", label: "Ask Your Specialist" };
  }
}

export interface AnswerWeight {
  value: string;
  weight: number;
}

export interface QuizAnswers {
  painLocation: AnswerWeight;
  duration: AnswerWeight;
  dailyImpact: AnswerWeight;
  previousTreatments: AnswerWeight[];
  primaryGoal: AnswerWeight;
}

const WEIGHTS = {
  painLocation: 0.1,
  duration: 0.25,
  dailyImpact: 0.3,
  previousTreatments: 0.25,
  primaryGoal: 0.1,
};

const MAX_WEIGHT = 5;

export function calculateScore(answers: QuizAnswers): number {
  const painLocationScore = answers.painLocation.weight / MAX_WEIGHT;
  const durationScore = answers.duration.weight / MAX_WEIGHT;
  const dailyImpactScore = answers.dailyImpact.weight / MAX_WEIGHT;

  // For multi-select, take the average weight, capped at MAX_WEIGHT
  const prevTreatmentsAvg =
    answers.previousTreatments.length > 0
      ? Math.min(
          answers.previousTreatments.reduce((sum, t) => sum + t.weight, 0) /
            answers.previousTreatments.length,
          MAX_WEIGHT
        )
      : 1;
  const previousTreatmentsScore = prevTreatmentsAvg / MAX_WEIGHT;

  const goalScore = answers.primaryGoal.weight / MAX_WEIGHT;

  const weightedScore =
    painLocationScore * WEIGHTS.painLocation +
    durationScore * WEIGHTS.duration +
    dailyImpactScore * WEIGHTS.dailyImpact +
    previousTreatmentsScore * WEIGHTS.previousTreatments +
    goalScore * WEIGHTS.primaryGoal;

  return Math.round(weightedScore * 100);
}

export function getScoreLabel(score: number): string {
  if (score >= 71) return "High Recovery Potential";
  if (score >= 41) return "Good Potential";
  return "Moderate Potential";
}

export function getMatchedTreatment(score: number): string {
  if (score >= 71) return "stem-cells";
  if (score >= 41) return "exosomes";
  return "prp";
}

export function getTreatmentMatchLabels(
  score: number
): Record<string, string> {
  const matched = getMatchedTreatment(score);
  return {
    prp: matched === "prp" ? "best" : score >= 41 ? "good" : "best",
    exosomes:
      matched === "exosomes" ? "best" : score >= 71 ? "good" : "explore",
    "stem-cells":
      matched === "stem-cells" ? "best" : score >= 41 ? "explore" : "explore",
  };
}

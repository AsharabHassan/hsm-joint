import { describe, it, expect } from "vitest";
import {
  calculateScore,
  getScoreLabel,
  getTreatmentMatchLabels,
  getMatchLabelDisplay,
  type QuizAnswers,
  type MatchLevel,
} from "../src/lib/scoring";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

/** All 8 fields at maximum weights — should score ~98. */
const severeAnswers: QuizAnswers = {
  painLocation: { value: "general", weight: 5 },
  painIntensity: 9, // NRS 0-10
  stiffness: { value: "severe", weight: 5 },
  functionalImpact: [
    { value: "stairs", weight: 2 },
    { value: "walking", weight: 3 },
    { value: "sitting", weight: 3 },
    { value: "standing", weight: 3 },
    { value: "sleep", weight: 2 },
    { value: "work", weight: 4 },
  ], // sum = 17 = MAX_FUNCTIONAL_IMPACT_SUM → capped at 1.0
  duration: { value: "3y-plus", weight: 5 },
  previousTreatments: [
    { value: "physio", weight: 2 },
    { value: "surgery-rec", weight: 5 },
  ], // max = 5
  ageRange: { value: "65-plus", weight: 5 },
  primaryGoal: { value: "avoid-surgery", weight: 5 },
};

/** All 8 fields at minimum weights — should score ~15. */
const mildAnswers: QuizAnswers = {
  painLocation: { value: "inner", weight: 1 },
  painIntensity: 2, // NRS low
  stiffness: { value: "mild", weight: 1 },
  functionalImpact: [{ value: "stairs", weight: 1 }], // sum = 1
  duration: { value: "lt-1m", weight: 1 },
  previousTreatments: [{ value: "none", weight: 1 }], // max = 1
  ageRange: { value: "under-40", weight: 1 },
  primaryGoal: { value: "manage", weight: 1 },
};

// ---------------------------------------------------------------------------
// calculateScore
// ---------------------------------------------------------------------------

describe("calculateScore", () => {
  it("returns a value in [0, 100] for a valid full 8-field answer set", () => {
    const score = calculateScore(severeAnswers);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("returns a higher score for a severe/long-duration/high-impact profile than a mild one", () => {
    const severeScore = calculateScore(severeAnswers);
    const mildScore = calculateScore(mildAnswers);
    expect(severeScore).toBeGreaterThan(mildScore);
  });

  it("caps the functionalImpact contribution so the result never exceeds 100", () => {
    // Pass more than the max possible functional-impact weights
    const overloaded: QuizAnswers = {
      ...severeAnswers,
      functionalImpact: [
        { value: "a", weight: 10 },
        { value: "b", weight: 10 },
        { value: "c", weight: 10 },
      ], // sum = 30, well above MAX_FUNCTIONAL_IMPACT_SUM=17
    };
    const score = calculateScore(overloaded);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("uses max-of-selected strategy for previousTreatments (not sum)", () => {
    // Adding extra low-weight previous treatments must NOT raise the score
    // above what a single high-weight entry would produce.
    const singleHigh: QuizAnswers = {
      ...mildAnswers,
      previousTreatments: [{ value: "surgery-rec", weight: 5 }],
    };
    const manyLow: QuizAnswers = {
      ...mildAnswers,
      previousTreatments: [
        { value: "physio", weight: 1 },
        { value: "meds", weight: 1 },
        { value: "ice", weight: 1 },
        { value: "rest", weight: 1 },
      ],
    };
    expect(calculateScore(singleHigh)).toBeGreaterThan(calculateScore(manyLow));
  });
});

// ---------------------------------------------------------------------------
// getScoreLabel
// ---------------------------------------------------------------------------

describe("getScoreLabel", () => {
  it('returns "High Improvement Potential" for score 80 (>= 71)', () => {
    expect(getScoreLabel(80)).toBe("High Improvement Potential");
  });

  it('returns "High Improvement Potential" at the boundary score of 71', () => {
    expect(getScoreLabel(71)).toBe("High Improvement Potential");
  });

  it('returns "Good Improvement Potential" for score 50 (>= 41, < 71)', () => {
    expect(getScoreLabel(50)).toBe("Good Improvement Potential");
  });

  it('returns "Good Improvement Potential" at the boundary score of 41', () => {
    expect(getScoreLabel(41)).toBe("Good Improvement Potential");
  });

  it('returns "Moderate Potential" for score 20 (< 41)', () => {
    expect(getScoreLabel(20)).toBe("Moderate Potential");
  });

  it('returns "Moderate Potential" for score 0', () => {
    expect(getScoreLabel(0)).toBe("Moderate Potential");
  });
});

// ---------------------------------------------------------------------------
// getTreatmentMatchLabels
// ---------------------------------------------------------------------------

describe("getTreatmentMatchLabels", () => {
  it("returns an object with the three expected keys", () => {
    const labels = getTreatmentMatchLabels(50);
    expect(labels).toHaveProperty("cortisone");
    expect(labels).toHaveProperty("hyaluronic-acid");
    expect(labels).toHaveProperty("advanced-options");
  });

  it('score 80 (>= 71): advanced-options is "recommended"', () => {
    const labels = getTreatmentMatchLabels(80);
    expect(labels["advanced-options"]).toBe("recommended");
  });

  it('score 80 (>= 71): cortisone and hyaluronic-acid are both "good"', () => {
    const labels = getTreatmentMatchLabels(80);
    expect(labels.cortisone).toBe("good");
    expect(labels["hyaluronic-acid"]).toBe("good");
  });

  it('score 50 (>= 41): advanced-options is "worth-exploring"', () => {
    const labels = getTreatmentMatchLabels(50);
    expect(labels["advanced-options"]).toBe("worth-exploring");
  });

  it('score 50 (>= 41): cortisone and hyaluronic-acid are both "best"', () => {
    const labels = getTreatmentMatchLabels(50);
    expect(labels.cortisone).toBe("best");
    expect(labels["hyaluronic-acid"]).toBe("best");
  });

  it('score 20 (< 41): advanced-options is "ask-specialist"', () => {
    const labels = getTreatmentMatchLabels(20);
    expect(labels["advanced-options"]).toBe("ask-specialist");
  });

  it('score 20 (< 41): cortisone is "best", hyaluronic-acid is "good"', () => {
    const labels = getTreatmentMatchLabels(20);
    expect(labels.cortisone).toBe("best");
    expect(labels["hyaluronic-acid"]).toBe("good");
  });
});

// ---------------------------------------------------------------------------
// getMatchLabelDisplay
// ---------------------------------------------------------------------------

describe("getMatchLabelDisplay", () => {
  const cases: Array<[MatchLevel, { bg: string; text: string; label: string }]> = [
    ["best", { bg: "bg-gold", text: "text-white", label: "Best Match" }],
    [
      "good",
      { bg: "bg-trust-green-light", text: "text-trust-green", label: "Good Match" },
    ],
    [
      "recommended",
      { bg: "bg-gold", text: "text-white", label: "Recommended — Discuss with Specialist" },
    ],
    ["worth-exploring", { bg: "bg-ivory", text: "text-slate", label: "Worth Exploring" }],
    ["ask-specialist", { bg: "bg-ivory", text: "text-slate", label: "Ask Your Specialist" }],
  ];

  it.each(cases)(
    'getMatchLabelDisplay("%s") returns the correct bg, text, and label',
    (level, expected) => {
      expect(getMatchLabelDisplay(level)).toEqual(expected);
    }
  );
});

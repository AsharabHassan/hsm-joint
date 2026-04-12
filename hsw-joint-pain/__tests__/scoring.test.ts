import { describe, it, expect } from "vitest";
import { calculateScore, getMatchedTreatment, type QuizAnswers } from "../src/lib/scoring";

describe("calculateScore", () => {
  it("returns a score between 0 and 100", () => {
    const answers: QuizAnswers = {
      painLocation: { value: "inner", weight: 3 },
      duration: { value: "1-6m", weight: 2 },
      dailyImpact: { value: "moderate", weight: 2 },
      previousTreatments: [{ value: "physio", weight: 2 }],
      primaryGoal: { value: "walk", weight: 3 },
    };
    const score = calculateScore(answers);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("returns higher score for severe, long-duration pain", () => {
    const mild: QuizAnswers = {
      painLocation: { value: "inner", weight: 2 },
      duration: { value: "lt-1m", weight: 1 },
      dailyImpact: { value: "mild", weight: 1 },
      previousTreatments: [{ value: "none", weight: 1 }],
      primaryGoal: { value: "long-term", weight: 2 },
    };
    const severe: QuizAnswers = {
      painLocation: { value: "general", weight: 4 },
      duration: { value: "3y-plus", weight: 5 },
      dailyImpact: { value: "severe", weight: 5 },
      previousTreatments: [
        { value: "physio", weight: 2 },
        { value: "steroids", weight: 3 },
        { value: "surgery-rec", weight: 5 },
      ],
      primaryGoal: { value: "avoid-surgery", weight: 4 },
    };
    expect(calculateScore(severe)).toBeGreaterThan(calculateScore(mild));
  });

  it("caps multi-select previous treatments weight at 5", () => {
    const answers: QuizAnswers = {
      painLocation: { value: "general", weight: 4 },
      duration: { value: "3y-plus", weight: 5 },
      dailyImpact: { value: "severe", weight: 5 },
      previousTreatments: [
        { value: "physio", weight: 2 },
        { value: "steroids", weight: 3 },
        { value: "medication", weight: 2 },
        { value: "surgery-rec", weight: 5 },
      ],
      primaryGoal: { value: "avoid-surgery", weight: 4 },
    };
    const score = calculateScore(answers);
    expect(score).toBeLessThanOrEqual(100);
  });
});

describe("getMatchedTreatment", () => {
  it("returns PRP for low scores", () => {
    expect(getMatchedTreatment(30)).toBe("prp");
  });

  it("returns exosomes for medium scores", () => {
    expect(getMatchedTreatment(55)).toBe("exosomes");
  });

  it("returns stem-cells for high scores", () => {
    expect(getMatchedTreatment(80)).toBe("stem-cells");
  });
});

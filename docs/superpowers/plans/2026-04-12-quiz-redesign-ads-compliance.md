# Quiz Redesign & Google Ads Compliance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the quiz to 8 clinically-grounded questions, make all ad-facing pages Google Ads compliant (no PRP/exosomes/stem cells), and add doctor profiles + visual patient journey sections.

**Architecture:** Data-first approach — update treatment data and quiz questions first, then scoring logic, then UI components, then new sections, then page wiring. Each task builds on the previous but produces a working commit.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS 4 (`@theme` tokens in `globals.css`), existing premium design system (Playfair Display + DM Sans, cream/charcoal/gold palette).

---

## File Map

### New Files
| File | Responsibility |
|------|---------------|
| `src/data/doctors.ts` | Doctor data array (4 doctors with credentials) |
| `src/components/NrsSlider.tsx` | NRS 0-10 pain intensity slider UI component |
| `src/components/DoctorProfiles.tsx` | Doctor profiles grid section |
| `src/components/PatientJourney.tsx` | 4-step visual timeline section |

### Modified Files
| File | Changes |
|------|---------|
| `src/data/treatments.ts` | Add cortisone + HA + "advanced-options" placeholder entry |
| `src/data/quizQuestions.ts` | 8 questions with `type` field, NRS config, new options |
| `src/lib/scoring.ts` | New 8-factor weighted formula, compliant labels, ad-safe treatment matching |
| `src/lib/ghl.ts` | Updated `QuizSubmission` interface for new answer fields |
| `src/app/api/quiz-submit/route.ts` | Destructure new answer fields from request body |
| `src/components/Quiz.tsx` | Handle NRS slider type, 8 step dots, updated progress calc |
| `src/components/QuizResults.tsx` | Compliant treatment cards (cortisone, HA, advanced options) |
| `src/components/TreatmentCards.tsx` | Filter to ad-safe treatments only, add `adSafe` prop |
| `src/components/Hero.tsx` | Pain-focused headline parsing, NHS wait-time trust indicator |
| `src/components/ui/Icons.tsx` | Add ClipboardIcon + StethoscopeIcon |
| `src/data/bodyAreas.ts` | Update headline fields to pain-focused copy |
| `src/app/[bodyArea]/page.tsx` | Add PatientJourney + DoctorProfiles to section order |
| `src/app/page.tsx` | Pass `adSafe` prop to TreatmentCards |

---

### Task 1: Add Cortisone, HA, and Advanced Options to Treatment Data

**Files:**
- Modify: `src/data/treatments.ts`

- [ ] **Step 1: Add cortisone, hyaluronic acid, and advanced-options entries**

Open `src/data/treatments.ts` and add these three entries to the `treatments` array BEFORE the existing PRP entry (so ad-safe treatments come first):

```typescript
// Add these as the first three entries in the treatments array, before the PRP entry:

  {
    slug: "cortisone",
    name: "Cortisone Injection",
    price: "From £250",
    priceNote: "Final fees confirmed following assessment, based on individual treatment plan",
    duration: "15-30 minutes",
    setting: "Outpatient",
    downtime: "Minimal — resume normal activities same day",
    description:
      "Cortisone (corticosteroid) injections are one of the most established treatments for joint inflammation and pain. The injection delivers a powerful anti-inflammatory medication directly into the affected joint, providing targeted relief. Cortisone works by suppressing the immune response that causes inflammation, which in turn reduces swelling, pain, and stiffness. Relief typically begins within 48-72 hours and can last from several weeks to several months depending on the individual and severity of the condition. Cortisone injections are widely used across the NHS and private practice for osteoarthritis, bursitis, tendinitis, and other inflammatory joint conditions. While effective for short-to-medium-term pain relief, repeated cortisone injections are generally limited to 3-4 per year for a single joint, as research suggests that frequent use may contribute to cartilage thinning over time.",
    mechanism:
      "Anti-inflammatory corticosteroid delivered directly into the joint to suppress inflammation and reduce pain.",
    tags: ["15-30 min", "Outpatient", "Same-day recovery"],
    matchLabel: {
      good: "Good Match",
      best: "Best Match",
      explore: "Worth Exploring",
    },
  },
  {
    slug: "hyaluronic-acid",
    name: "Hyaluronic Acid Injection",
    price: "From £350",
    priceNote: "Final fees confirmed following assessment, based on individual treatment plan",
    duration: "15-30 minutes",
    setting: "Outpatient",
    downtime: "Minimal — resume normal activities within 24 hours",
    description:
      "Hyaluronic acid (HA) injection therapy, also known as viscosupplementation, involves injecting a gel-like substance directly into the affected joint. Hyaluronic acid is a naturally occurring component of synovial fluid — the lubricant that helps joints move smoothly. In joints affected by osteoarthritis, the concentration and quality of natural hyaluronic acid decreases, contributing to friction, pain, and stiffness. HA injections aim to restore this lubrication, cushioning the joint and potentially reducing pain during movement. A course typically involves 1-3 injections spaced one week apart, with effects that may last 6-12 months. NICE guidelines recognise viscosupplementation as a treatment option for knee osteoarthritis. HA injections are considered safe with a low side-effect profile, making them suitable for patients who cannot tolerate anti-inflammatory medications or who wish to reduce their reliance on pain medication.",
    mechanism:
      "Gel-like hyaluronic acid injected into the joint to restore natural lubrication and cushioning, reducing friction and pain.",
    tags: ["15-30 min", "Outpatient", "NICE recognised"],
    matchLabel: {
      good: "Good Match",
      best: "Best Match",
      explore: "Worth Exploring",
    },
  },
  {
    slug: "advanced-options",
    name: "Advanced Injection Options",
    price: "Discussed at Consultation",
    priceNote: "Your specialist will recommend the most suitable approach for your condition",
    duration: "30-90 minutes",
    setting: "Outpatient",
    downtime: "Varies by treatment — your specialist will advise",
    description:
      "Several advanced injection therapies may be suitable depending on your individual assessment results, the severity of your condition, and your treatment history. These evidence-based approaches use the body's own biological mechanisms to support joint health and tissue repair. Your GMC-registered specialist will review your assessment and medical history to determine which advanced options, if any, may be appropriate for your situation. A thorough consultation ensures you receive personalised guidance based on the latest published research and clinical evidence.",
    mechanism:
      "Several advanced injection therapies may be suitable depending on your assessment results. Discuss with your specialist.",
    tags: ["Personalised", "Specialist-guided", "Evidence-based"],
    matchLabel: {
      good: "Worth Exploring",
      best: "Recommended",
      explore: "Ask Your Specialist",
    },
  },
```

Also add an `adSafe` boolean field to the `Treatment` interface:

```typescript
export interface Treatment {
  slug: string;
  name: string;
  price: string;
  priceNote: string;
  duration: string;
  setting: string;
  downtime: string;
  description: string;
  mechanism: string;
  tags: string[];
  matchLabel: {
    good: string;
    best: string;
    explore: string;
  };
  adSafe?: boolean; // true = can be shown on Google Ads landing pages
}
```

Set `adSafe: true` on the cortisone, hyaluronic-acid, and advanced-options entries. Set `adSafe: false` on the existing prp, exosomes, and stem-cells entries.

- [ ] **Step 2: Add helper function to filter ad-safe treatments**

At the bottom of `src/data/treatments.ts`, add:

```typescript
export function getAdSafeTreatments(): Treatment[] {
  return treatments.filter((t) => t.adSafe === true);
}

export function getAllTreatments(): Treatment[] {
  return treatments;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/treatments.ts
git commit -m "feat: add cortisone, HA, and advanced-options treatment data with adSafe flag"
```

---

### Task 2: Redesign Quiz Questions to 8 Clinically-Grounded Questions

**Files:**
- Modify: `src/data/quizQuestions.ts`

- [ ] **Step 1: Update interfaces for new question types**

Replace the entire contents of `src/data/quizQuestions.ts` with:

```typescript
export interface QuizOption {
  label: string;
  value: string;
  weight: number;
}

export interface NrsConfig {
  min: number;
  max: number;
  labels: Record<number, string>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "single" | "multi" | "nrs";
  options?: QuizOption[];
  nrsConfig?: NrsConfig;
}

export interface BodyAreaQuizConfig {
  bodyAreaSlug: string;
  questions: QuizQuestion[];
}

function buildQuestions(painLocationOptions: QuizOption[]): QuizQuestion[] {
  return [
    // Q1: Pain Location (body-area-specific)
    {
      id: "pain-location",
      type: "single",
      question: "Where is your primary area of discomfort?",
      options: painLocationOptions,
    },
    // Q2: Pain Intensity (NRS-derived, 0-10)
    {
      id: "pain-intensity",
      type: "nrs",
      question: "On a scale of 0-10, how would you rate your pain on a typical day?",
      nrsConfig: {
        min: 0,
        max: 10,
        labels: {
          0: "No pain",
          3: "Mild",
          5: "Moderate",
          7: "Severe",
          10: "Worst imaginable",
        },
      },
    },
    // Q3: Stiffness (WOMAC-derived)
    {
      id: "stiffness",
      type: "single",
      question: "How severe is your joint stiffness first thing in the morning?",
      options: [
        { label: "None — I move freely", value: "none", weight: 1 },
        { label: "Mild — loosens within 10 minutes", value: "mild", weight: 2 },
        { label: "Moderate — takes 10-30 minutes to ease", value: "moderate", weight: 3 },
        { label: "Severe — lasts over 30 minutes", value: "severe", weight: 4 },
        { label: "Extreme — stiffness barely improves", value: "extreme", weight: 5 },
      ],
    },
    // Q4: Functional Impact (WOMAC-derived, multi-select)
    {
      id: "functional-impact",
      type: "multi",
      question: "Which daily activities are affected by your joint pain?",
      options: [
        { label: "Walking on flat surfaces", value: "walking-flat", weight: 2 },
        { label: "Going up or down stairs", value: "stairs", weight: 3 },
        { label: "Getting in/out of a car or chair", value: "sitting-standing", weight: 3 },
        { label: "Standing for 15+ minutes", value: "standing", weight: 3 },
        { label: "Exercise or sports", value: "exercise", weight: 2 },
        { label: "Sleeping through the night", value: "sleeping", weight: 4 },
      ],
    },
    // Q5: Duration
    {
      id: "duration",
      type: "single",
      question: "How long have you been experiencing this pain?",
      options: [
        { label: "Less than 1 month", value: "lt-1m", weight: 1 },
        { label: "1–6 months", value: "1-6m", weight: 2 },
        { label: "6–12 months", value: "6-12m", weight: 3 },
        { label: "1–3 years", value: "1-3y", weight: 4 },
        { label: "3+ years", value: "3y-plus", weight: 5 },
      ],
    },
    // Q6: Previous Treatments (multi-select)
    {
      id: "previous-treatments",
      type: "multi",
      question: "Which treatments have you already tried?",
      options: [
        { label: "No treatment yet", value: "none", weight: 1 },
        { label: "Over-the-counter painkillers", value: "otc", weight: 1 },
        { label: "Physiotherapy", value: "physio", weight: 2 },
        { label: "Cortisone / steroid injections", value: "cortisone", weight: 3 },
        { label: "Hyaluronic acid injections", value: "ha", weight: 3 },
        { label: "Prescription pain medication", value: "prescription", weight: 2 },
        { label: "Surgery has been recommended", value: "surgery-rec", weight: 5 },
      ],
    },
    // Q7: Age Range
    {
      id: "age-range",
      type: "single",
      question: "What is your age range?",
      options: [
        { label: "Under 30", value: "under-30", weight: 2 },
        { label: "30–44", value: "30-44", weight: 3 },
        { label: "45–59", value: "45-59", weight: 4 },
        { label: "60–74", value: "60-74", weight: 5 },
        { label: "75+", value: "75-plus", weight: 4 },
      ],
    },
    // Q8: Primary Goal
    {
      id: "primary-goal",
      type: "single",
      question: "What matters most to you right now?",
      options: [
        { label: "Return to sports or exercise", value: "sports", weight: 3 },
        { label: "Walk without pain", value: "walk", weight: 4 },
        { label: "Avoid or delay surgery", value: "avoid-surgery", weight: 5 },
        { label: "Reduce daily pain and medication", value: "reduce-pain", weight: 3 },
        { label: "Understand my options before deciding", value: "understand", weight: 2 },
      ],
    },
  ];
}

export const quizConfigs: BodyAreaQuizConfig[] = [
  {
    bodyAreaSlug: "knee-pain",
    questions: buildQuestions([
      { label: "Inner knee", value: "inner", weight: 3 },
      { label: "Outer knee", value: "outer", weight: 3 },
      { label: "Behind knee", value: "behind", weight: 2 },
      { label: "Kneecap area", value: "kneecap", weight: 3 },
      { label: "General / all around", value: "general", weight: 4 },
    ]),
  },
  {
    bodyAreaSlug: "hip-pain",
    questions: buildQuestions([
      { label: "Groin area", value: "groin", weight: 4 },
      { label: "Outside of hip", value: "outside", weight: 3 },
      { label: "Buttock area", value: "buttock", weight: 2 },
      { label: "Front of hip", value: "front", weight: 3 },
      { label: "General / deep hip pain", value: "general", weight: 4 },
    ]),
  },
  {
    bodyAreaSlug: "shoulder-pain",
    questions: buildQuestions([
      { label: "Top of shoulder", value: "top", weight: 3 },
      { label: "Front of shoulder", value: "front", weight: 3 },
      { label: "Side of shoulder / upper arm", value: "side", weight: 3 },
      { label: "Back of shoulder", value: "back", weight: 2 },
      { label: "Deep inside the joint", value: "deep", weight: 4 },
    ]),
  },
  {
    bodyAreaSlug: "back-pain",
    questions: buildQuestions([
      { label: "Lower back (lumbar)", value: "lower", weight: 4 },
      { label: "Mid back (thoracic)", value: "mid", weight: 2 },
      { label: "Radiating to leg (sciatica)", value: "sciatica", weight: 5 },
      { label: "Neck area (cervical)", value: "neck", weight: 3 },
      { label: "General / multiple areas", value: "general", weight: 4 },
    ]),
  },
  {
    bodyAreaSlug: "elbow-pain",
    questions: buildQuestions([
      { label: "Outside of elbow", value: "outside", weight: 3 },
      { label: "Inside of elbow", value: "inside", weight: 3 },
      { label: "Tip of elbow", value: "tip", weight: 2 },
      { label: "Forearm (near elbow)", value: "forearm", weight: 3 },
      { label: "General / all around", value: "general", weight: 3 },
    ]),
  },
  {
    bodyAreaSlug: "hand-wrist-foot-ankle",
    questions: buildQuestions([
      { label: "Hand or wrist", value: "hand-wrist", weight: 3 },
      { label: "Thumb base", value: "thumb", weight: 3 },
      { label: "Heel (plantar fasciitis)", value: "heel", weight: 4 },
      { label: "Ankle", value: "ankle", weight: 3 },
      { label: "Achilles tendon", value: "achilles", weight: 4 },
    ]),
  },
];

export function getQuizConfig(
  bodyAreaSlug: string
): BodyAreaQuizConfig | undefined {
  return quizConfigs.find((qc) => qc.bodyAreaSlug === bodyAreaSlug);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/quizQuestions.ts
git commit -m "feat: redesign quiz to 8 clinically-grounded questions (NRS, WOMAC-derived)"
```

---

### Task 3: Rewrite Scoring Logic for 8-Factor Model

**Files:**
- Modify: `src/lib/scoring.ts`

- [ ] **Step 1: Replace scoring.ts with new 8-factor model**

Replace the entire contents of `src/lib/scoring.ts` with:

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/scoring.ts
git commit -m "feat: rewrite scoring to 8-factor weighted model with ad-safe treatment matching"
```

---

### Task 4: Update GHL Webhook Integration

**Files:**
- Modify: `src/lib/ghl.ts`
- Modify: `src/app/api/quiz-submit/route.ts`

- [ ] **Step 1: Update QuizSubmission interface in ghl.ts**

Replace the entire contents of `src/lib/ghl.ts` with:

```typescript
export interface QuizSubmission {
  name: string;
  email: string;
  phone: string;
  bodyArea: string;
  painLocation: string;
  painIntensity: number;
  stiffness: string;
  functionalImpact: string[];
  duration: string;
  previousTreatments: string[];
  ageRange: string;
  primaryGoal: string;
  score: number;
  scoreLabel: string;
  matchedTreatments: {
    cortisone: string;
    hyaluronicAcid: string;
    advancedOptions: string;
  };
  source: string;
  timestamp: string;
}

export async function submitToGoHighLevel(
  data: QuizSubmission
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("GHL_WEBHOOK_URL environment variable not set");
    return { success: false, error: "Webhook URL not configured" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: {
          firstName: data.name.split(" ")[0],
          lastName: data.name.split(" ").slice(1).join(" ") || "",
          email: data.email,
          phone: data.phone,
        },
        customFields: {
          body_area: data.bodyArea,
          pain_location: data.painLocation,
          pain_intensity: data.painIntensity.toString(),
          stiffness: data.stiffness,
          functional_impact: data.functionalImpact.join(", "),
          pain_duration: data.duration,
          previous_treatments: data.previousTreatments.join(", "),
          age_range: data.ageRange,
          primary_goal: data.primaryGoal,
          improvement_score: data.score.toString(),
          score_label: data.scoreLabel,
          matched_cortisone: data.matchedTreatments.cortisone,
          matched_ha: data.matchedTreatments.hyaluronicAcid,
          matched_advanced: data.matchedTreatments.advancedOptions,
          source: data.source,
        },
        tags: [
          `body-area:${data.bodyArea}`,
          `score:${data.scoreLabel.toLowerCase().replace(/\s+/g, "-")}`,
          `advanced:${data.matchedTreatments.advancedOptions}`,
          "source:landing-page",
        ],
      }),
    });

    if (!response.ok) {
      return { success: false, error: `Webhook returned ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
```

- [ ] **Step 2: Update the API route to destructure new fields**

Replace the entire contents of `src/app/api/quiz-submit/route.ts` with:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { submitToGoHighLevel, type QuizSubmission } from "@/lib/ghl";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, bodyArea, answers, score, scoreLabel, matchedTreatments } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const submission: QuizSubmission = {
      name,
      email,
      phone,
      bodyArea,
      painLocation: answers.painLocation,
      painIntensity: answers.painIntensity,
      stiffness: answers.stiffness,
      functionalImpact: answers.functionalImpact,
      duration: answers.duration,
      previousTreatments: answers.previousTreatments,
      ageRange: answers.ageRange,
      primaryGoal: answers.primaryGoal,
      score,
      scoreLabel,
      matchedTreatments,
      source: "landing-page",
      timestamp: new Date().toISOString(),
    };

    const result = await submitToGoHighLevel(submission);

    if (!result.success) {
      console.error("GHL webhook error:", result.error);
    }

    return NextResponse.json({ success: true, score, scoreLabel, matchedTreatments });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/ghl.ts src/app/api/quiz-submit/route.ts
git commit -m "feat: update GHL webhook and API route for 8-question quiz payload"
```

---

### Task 5: Build NRS Slider Component

**Files:**
- Create: `src/components/NrsSlider.tsx`

- [ ] **Step 1: Create the NRS 0-10 pain intensity slider**

Create `src/components/NrsSlider.tsx`:

```typescript
"use client";

import type { NrsConfig } from "@/data/quizQuestions";

interface NrsSliderProps {
  config: NrsConfig;
  value: number | null;
  onChange: (value: number) => void;
}

export function NrsSlider({ config, value, onChange }: NrsSliderProps) {
  const numbers = Array.from(
    { length: config.max - config.min + 1 },
    (_, i) => config.min + i
  );

  // Color gradient: green (0) -> amber (5) -> red (10)
  function getColor(n: number): string {
    if (n <= 2) return "#1A6B4A"; // trust-green
    if (n <= 4) return "#7B8A2E"; // yellow-green
    if (n <= 6) return "#C8A96E"; // gold/amber
    if (n <= 8) return "#C06030"; // orange-red
    return "#B03030"; // red
  }

  return (
    <div>
      {/* Number row */}
      <div className="flex justify-between gap-1.5 sm:gap-2">
        {numbers.map((n) => {
          const isSelected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`
                w-full aspect-square max-w-[44px] rounded-xl text-sm font-bold
                transition-all duration-200 cursor-pointer
                flex items-center justify-center
                ${
                  isSelected
                    ? "text-white shadow-lg scale-110"
                    : "bg-white border border-black/[0.06] text-charcoal hover:border-gold/40 hover:-translate-y-0.5"
                }
              `}
              style={
                isSelected
                  ? {
                      backgroundColor: getColor(n),
                      animation: "scaleIn 0.2s ease-out",
                    }
                  : undefined
              }
            >
              {n}
            </button>
          );
        })}
      </div>

      {/* Labels row */}
      <div className="flex justify-between mt-3 px-0.5">
        {Object.entries(config.labels).map(([num, label]) => {
          const position =
            ((Number(num) - config.min) / (config.max - config.min)) * 100;
          return (
            <span
              key={num}
              className="text-[10px] text-muted text-center"
              style={{
                position: "absolute",
                left: `${position}%`,
                transform: "translateX(-50%)",
              }}
            >
              {label}
            </span>
          );
        })}
      </div>

      {/* Labels — simplified layout */}
      <div className="relative h-5 mt-3">
        {Object.entries(config.labels).map(([num, label]) => {
          const position =
            ((Number(num) - config.min) / (config.max - config.min)) * 100;
          return (
            <span
              key={num}
              className="absolute text-[10px] text-muted whitespace-nowrap"
              style={{
                left: `${position}%`,
                transform: "translateX(-50%)",
              }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
```

Wait — that has a duplicate labels section. Let me fix:

- [ ] **Step 1 (corrected): Create the NRS 0-10 pain intensity slider**

Create `src/components/NrsSlider.tsx`:

```typescript
"use client";

import type { NrsConfig } from "@/data/quizQuestions";

interface NrsSliderProps {
  config: NrsConfig;
  value: number | null;
  onChange: (value: number) => void;
}

export function NrsSlider({ config, value, onChange }: NrsSliderProps) {
  const numbers = Array.from(
    { length: config.max - config.min + 1 },
    (_, i) => config.min + i
  );

  function getColor(n: number): string {
    if (n <= 2) return "#1A6B4A";
    if (n <= 4) return "#7B8A2E";
    if (n <= 6) return "#C8A96E";
    if (n <= 8) return "#C06030";
    return "#B03030";
  }

  return (
    <div>
      {/* Number row */}
      <div className="flex justify-between gap-1.5 sm:gap-2">
        {numbers.map((n) => {
          const isSelected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`
                w-full aspect-square max-w-[44px] rounded-xl text-sm font-bold
                transition-all duration-200 cursor-pointer
                flex items-center justify-center
                ${
                  isSelected
                    ? "text-white shadow-lg scale-110"
                    : "bg-white border border-black/[0.06] text-charcoal hover:border-gold/40 hover:-translate-y-0.5"
                }
              `}
              style={
                isSelected
                  ? {
                      backgroundColor: getColor(n),
                      animation: "scaleIn 0.2s ease-out",
                    }
                  : undefined
              }
            >
              {n}
            </button>
          );
        })}
      </div>

      {/* Labels row */}
      <div className="relative h-5 mt-3">
        {Object.entries(config.labels).map(([num, label]) => {
          const position =
            ((Number(num) - config.min) / (config.max - config.min)) * 100;
          return (
            <span
              key={num}
              className="absolute text-[10px] text-muted whitespace-nowrap"
              style={{
                left: `${position}%`,
                transform: "translateX(-50%)",
              }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NrsSlider.tsx
git commit -m "feat: add NRS 0-10 pain intensity slider component"
```

---

### Task 6: Rewrite Quiz Component for 8 Questions + NRS

**Files:**
- Modify: `src/components/Quiz.tsx`

- [ ] **Step 1: Replace Quiz.tsx with updated version**

Replace the entire contents of `src/components/Quiz.tsx` with:

```typescript
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

  const totalSteps = questions.length + 1; // questions + contact
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Quiz.tsx
git commit -m "feat: rewrite Quiz component for 8 questions with NRS slider support"
```

---

### Task 7: Rewrite QuizResults for Ad-Safe Treatment Display

**Files:**
- Modify: `src/components/QuizResults.tsx`

- [ ] **Step 1: Replace QuizResults.tsx with compliant version**

Replace the entire contents of `src/components/QuizResults.tsx` with:

```typescript
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getAdSafeTreatments } from "@/data/treatments";
import {
  getScoreLabel,
  getScoreDescription,
  getTreatmentMatchLabels,
  getMatchLabelDisplay,
  type MatchLevel,
} from "@/lib/scoring";
import { CheckCircleIcon, ShieldCheckIcon } from "@/components/ui/Icons";

interface QuizResultsProps {
  score: number;
}

export function QuizResults({ score }: QuizResultsProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const scoreLabel = getScoreLabel(score);
  const scoreDescription = getScoreDescription(score);
  const matchLabels = getTreatmentMatchLabels(score);
  const adSafeTreatments = getAdSafeTreatments();

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(score * eased));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [score]);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="section-header-label justify-center flex">
            <div className="gold-line" />
            <span>Your Results</span>
            <div className="gold-line" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-gold mb-6">
            Your Joint Health Improvement Score
          </p>

          {/* Score gauge */}
          <div className="relative w-40 h-40 mx-auto mb-5">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#F3EDE0"
                strokeWidth="7"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${(displayScore / 100) * 327} 327`}
                className="transition-all duration-100"
              />
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1A6B4A" />
                  <stop offset="100%" stopColor="#C8A96E" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-4xl font-extrabold text-trust-green tracking-tight">
                {displayScore}
              </span>
              <span className="text-[11px] text-muted font-medium">
                out of 100
              </span>
            </div>
          </div>

          <p className="text-lg font-bold text-trust-green">{scoreLabel}</p>
          <p className="text-sm text-slate max-w-lg mx-auto mt-2 leading-relaxed">
            {scoreDescription} Individual outcomes vary.
          </p>
        </div>

        {/* Treatment recommendations */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-gold">
            Treatment Options For Your Profile
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {adSafeTreatments.map((treatment) => {
            const matchLevel =
              matchLabels[
                treatment.slug as keyof typeof matchLabels
              ] as MatchLevel;
            const style = getMatchLabelDisplay(matchLevel);
            const isRecommended =
              matchLevel === "best" || matchLevel === "recommended";

            return (
              <Card
                key={treatment.slug}
                variant={isRecommended ? "shimmer" : "default"}
                className={`text-center relative overflow-hidden ${
                  isRecommended ? "md:-mt-2 md:mb-2" : ""
                }`}
              >
                {isRecommended && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-2 px-4 py-1 rounded-b-lg text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #C8A96E, #B8912E)",
                    }}
                  >
                    {style.label}
                  </div>
                )}
                <div className={isRecommended ? "pt-5" : ""}>
                  <p className="text-[11px] text-muted uppercase tracking-wider font-medium">
                    {treatment.name}
                  </p>
                  <p className="text-gold font-extrabold text-2xl font-serif mt-1 mb-3">
                    {treatment.price}
                  </p>
                  <p className="text-xs text-slate leading-relaxed mb-5">
                    {treatment.mechanism}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-pill text-[11px] font-semibold ${style.bg} ${style.text}`}
                  >
                    <CheckCircleIcon size={13} />
                    {style.label}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg">
            Book Your Free Consultation
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12H19" />
              <path d="M14 7L19 12L14 17" />
            </svg>
          </Button>
          <p className="text-xs text-muted mt-3">
            Discuss your score with a specialist — no obligation
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-card p-6 border border-ivory flex gap-4 items-start">
          <ShieldCheckIcon
            size={20}
            className="text-muted/40 shrink-0 mt-0.5"
          />
          <p className="text-[11px] text-muted leading-relaxed">
            This assessment is for educational purposes only and does not
            constitute medical advice. Your score is based on general research
            and may not reflect your individual health profile. A qualified
            medical professional should evaluate your specific condition before
            recommending any treatment approach.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuizResults.tsx
git commit -m "feat: rewrite QuizResults with ad-safe treatment cards (cortisone, HA, advanced)"
```

---

### Task 8: Update TreatmentCards to Filter Ad-Safe Only

**Files:**
- Modify: `src/components/TreatmentCards.tsx`
- Modify: `src/app/page.tsx` (pass adSafe prop)

- [ ] **Step 1: Update TreatmentCards to accept adSafe prop**

Replace the entire contents of `src/components/TreatmentCards.tsx` with:

```typescript
import { getAdSafeTreatments, getAllTreatments } from "@/data/treatments";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckCircleIcon } from "@/components/ui/Icons";

interface TreatmentCardsProps {
  bodyAreaName: string;
  adSafe?: boolean; // default true — only show ad-safe treatments
}

export function TreatmentCards({ bodyAreaName, adSafe = true }: TreatmentCardsProps) {
  const treatmentList = adSafe ? getAdSafeTreatments() : getAllTreatments();

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label">
              <div className="gold-line" />
              <span>Treatment Options</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Non-Surgical Options for {bodyAreaName}
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Explore evidence-based injection approaches available at our Harley Street clinic
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {treatmentList.map((treatment, i) => (
            <FadeIn key={treatment.slug} delay={i * 100}>
              <Card variant="shimmer" className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold">
                    {treatment.name}
                  </h3>
                  <span className="font-serif font-bold text-gold text-base whitespace-nowrap ml-3">
                    {treatment.price}
                  </span>
                </div>

                <p className="text-sm text-slate leading-relaxed mb-5 flex-1">
                  {treatment.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {treatment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 bg-trust-green-light text-trust-green px-3 py-1.5 rounded-pill text-[11px] font-semibold"
                    >
                      <CheckCircleIcon size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-muted italic leading-relaxed">
                  {treatment.priceNote}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TreatmentCards.tsx
git commit -m "feat: update TreatmentCards with adSafe filter prop (defaults to ad-safe only)"
```

---

### Task 9: Add New Icons (Clipboard + Stethoscope)

**Files:**
- Modify: `src/components/ui/Icons.tsx`

- [ ] **Step 1: Add ClipboardIcon and StethoscopeIcon**

Add these two icon functions to `src/components/ui/Icons.tsx` — insert them right before the `// ─── Icon map for dynamic lookup` comment (line 484):

```typescript
export function ClipboardIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 3V2C9 1.45 9.45 1 10 1H14C14.55 1 15 1.45 15 2V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 9H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 17H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function StethoscopeIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M6 12V8C6 5.79 7.79 4 10 4H14C16.21 4 18 5.79 18 8V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="6" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M18 12V16C18 18.21 16.21 20 14 20H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Icons.tsx
git commit -m "feat: add ClipboardIcon and StethoscopeIcon for patient journey"
```

---

### Task 10: Create Doctor Data and DoctorProfiles Component

**Files:**
- Create: `src/data/doctors.ts`
- Create: `src/components/DoctorProfiles.tsx`

- [ ] **Step 1: Create doctor data file**

Create `src/data/doctors.ts`:

```typescript
export interface Doctor {
  name: string;
  initials: string;
  title: string;
  credentials: string[];
  experience: string;
  specialties: string[];
}

export const doctors: Doctor[] = [
  {
    name: "Dr. Ahmad",
    initials: "DA",
    title: "Medical Director",
    credentials: ["GMC Registered"],
    experience: "Medical Director at Harley Street Wellness",
    specialties: ["Joint pain assessment", "Regenerative medicine oversight"],
  },
  {
    name: "Dr. Humaira Faisal",
    initials: "HF",
    title: "Wellness Physician",
    credentials: ["GMC Registered"],
    experience: "Wellness Physician",
    specialties: ["Patient assessment", "Non-surgical joint treatments"],
  },
  {
    name: "Dr. Ayda Soltanzadeh",
    initials: "AS",
    title: "Wellness Consultant",
    credentials: ["GMC Registered"],
    experience: "Wellness Consultant",
    specialties: ["Patient consultation", "Treatment planning"],
  },
  {
    name: "Dr. Mazhar Khan",
    initials: "MK",
    title: "Wellness Consultant",
    credentials: ["GMC Registered"],
    experience: "23 years clinical experience",
    specialties: ["Musculoskeletal assessment", "Injection therapy"],
  },
];
```

- [ ] **Step 2: Create DoctorProfiles component**

Create `src/components/DoctorProfiles.tsx`:

```typescript
import { doctors } from "@/data/doctors";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShieldCheckIcon } from "@/components/ui/Icons";

export function DoctorProfiles() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex">
              <div className="gold-line" />
              <span>Our Team</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Our Specialists
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              GMC-registered practitioners with extensive experience in
              non-surgical joint treatments
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, i) => (
            <FadeIn key={doctor.name} delay={i * 100}>
              <Card className="text-center h-full">
                {/* Avatar circle with initials */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-white text-lg font-bold"
                  style={{
                    background: "linear-gradient(135deg, #2D5F5D, #1B3A4B)",
                  }}
                >
                  {doctor.initials}
                </div>

                {/* Name & title */}
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gold font-semibold mb-3">
                  {doctor.title}
                </p>

                {/* Credential badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {doctor.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="inline-flex items-center gap-1.5 border border-gold/30 text-gold px-3 py-1 rounded-pill text-[11px] font-semibold"
                    >
                      <ShieldCheckIcon size={11} />
                      {cred}
                    </span>
                  ))}
                </div>

                {/* Experience */}
                <p className="text-xs text-slate mb-3">{doctor.experience}</p>

                {/* Specialty tags */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {doctor.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="bg-ivory text-muted px-2.5 py-1 rounded-pill text-[10px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Trust line */}
        <FadeIn>
          <p className="text-center text-xs text-muted mt-8">
            All practitioners are GMC-registered and practice from our Harley
            Street clinic
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/doctors.ts src/components/DoctorProfiles.tsx
git commit -m "feat: add doctor profiles section with 4 named GMC-registered specialists"
```

---

### Task 11: Create PatientJourney Component

**Files:**
- Create: `src/components/PatientJourney.tsx`

- [ ] **Step 1: Create PatientJourney component**

Create `src/components/PatientJourney.tsx`:

```typescript
import { FadeIn } from "@/components/ui/FadeIn";
import {
  ClipboardIcon,
  UserCheckIcon,
  StethoscopeIcon,
  HeartPulseIcon,
} from "@/components/ui/Icons";

const steps = [
  {
    number: 1,
    title: "Free Assessment",
    description:
      "Complete our 3-minute clinical questionnaire online — no obligation, completely confidential.",
    icon: ClipboardIcon,
  },
  {
    number: 2,
    title: "Specialist Review",
    description:
      "A GMC-registered specialist reviews your assessment within 24 hours — not 28 weeks.",
    icon: UserCheckIcon,
  },
  {
    number: 3,
    title: "Consultation",
    description:
      "Discuss your results and treatment options at our Harley Street clinic with your dedicated specialist.",
    icon: StethoscopeIcon,
  },
  {
    number: 4,
    title: "Treatment Plan",
    description:
      "Receive a personalised treatment plan tailored to your condition, goals, and lifestyle.",
    icon: HeartPulseIcon,
  },
];

export function PatientJourney() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex">
              <div className="gold-line" />
              <span>Your Journey</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              How It Works
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              From assessment to treatment plan in four simple steps
            </p>
          </div>
        </FadeIn>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:grid grid-cols-4 gap-6 relative">
          {/* Connecting gold line */}
          <div
            className="absolute top-[52px] left-[12.5%] right-[12.5%] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, #C8A96E, #B8912E, #C8A96E, #B8912E)",
            }}
          />

          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 100}>
              <div className="relative text-center">
                {/* Numbered circle */}
                <div className="relative z-10 mx-auto mb-6">
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto border-4 border-cream"
                    style={{
                      background:
                        "linear-gradient(135deg, #C8A96E, #B8912E)",
                    }}
                  >
                    <step.icon size={28} className="text-white" />
                  </div>
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                    style={{
                      background: "#1A1A1A",
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 80}>
              <div className="flex gap-5">
                {/* Left: line + circle */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative"
                    style={{
                      background:
                        "linear-gradient(135deg, #C8A96E, #B8912E)",
                    }}
                  >
                    <step.icon size={22} className="text-white" />
                    <div
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: "#1A1A1A" }}
                    >
                      {step.number}
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="w-[2px] flex-1 min-h-[40px]"
                      style={{
                        background:
                          "linear-gradient(180deg, #C8A96E, #B8912E)",
                      }}
                    />
                  )}
                </div>

                {/* Right: content */}
                <div className="pb-8">
                  <h3 className="font-serif text-h3-mobile font-bold mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PatientJourney.tsx
git commit -m "feat: add visual patient journey 4-step timeline component"
```

---

### Task 12: Update Hero Headlines and Body Area Data

**Files:**
- Modify: `src/data/bodyAreas.ts`
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Update all headline fields to pain-focused copy**

In `src/data/bodyAreas.ts`, find and replace each `headline` value:

| Body Area | Old Headline | New Headline |
|-----------|-------------|--------------|
| knee-pain | `"Understanding Your Knee Pain Options"` | `"Tired of Knee Pain Holding You Back?"` |
| hip-pain | `"Understanding Your Hip Pain Options"` | `"Tired of Hip Pain Holding You Back?"` |
| shoulder-pain | `"Understanding Your Shoulder Pain Options"` | `"Tired of Shoulder Pain Holding You Back?"` |
| back-pain | `"Understanding Your Back Pain Options"` | `"Tired of Back Pain Holding You Back?"` |
| elbow-pain | `"Understanding Your Elbow Pain Options"` | `"Tired of Elbow Pain Holding You Back?"` |
| hand-wrist-foot-ankle | `"Understanding Your Hand, Wrist, Foot & Ankle Pain Options"` | `"Tired of Hand, Wrist, Foot & Ankle Pain?"` |

- [ ] **Step 2: Update Hero.tsx to parse new headline format and add NHS wait-time indicator**

In `src/components/Hero.tsx`, replace the headline rendering block (lines 76-96):

Find:
```tsx
            <h1 className="font-serif text-h1-mobile lg:text-[52px] lg:leading-[1.06] font-bold text-charcoal mb-5 leading-tight">
              <span className="relative inline">
                <span
                  style={{
                    background: "linear-gradient(135deg, #B8912E, #C8A96E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Understanding
                </span>
                <span
                  className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm"
                  style={{
                    transformOrigin: "left",
                    animation: "revealLine 0.8s ease-out 0.5s both",
                  }}
                />
              </span>{" "}
              {bodyArea.headline.replace("Understanding ", "")}
            </h1>
```

Replace with:
```tsx
            <h1 className="font-serif text-h1-mobile lg:text-[52px] lg:leading-[1.06] font-bold text-charcoal mb-5 leading-tight">
              <span className="relative inline">
                <span
                  style={{
                    background: "linear-gradient(135deg, #B8912E, #C8A96E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Tired of
                </span>
                <span
                  className="absolute bottom-0 left-0 right-0 h-3 bg-gold/10 rounded-sm"
                  style={{
                    transformOrigin: "left",
                    animation: "revealLine 0.8s ease-out 0.5s both",
                  }}
                />
              </span>{" "}
              {bodyArea.headline.replace("Tired of ", "")}
            </h1>
```

Then add the NHS wait-time trust indicator. Find the stats row section (the `<div className="border-t border-black/[0.06] mt-8 pt-8">` block) and add this trust pill right before it (before line 132):

```tsx
            {/* NHS wait-time callout */}
            <div className="inline-flex items-center gap-2 bg-trust-green-light border border-trust-green/20 rounded-full px-4 py-2 mt-6">
              <ClockIcon size={14} className="text-trust-green" />
              <span className="text-[12px] font-semibold text-trust-green">
                Skip the 28-week NHS wait
              </span>
            </div>
```

Also add `ClockIcon` to the import at the top of Hero.tsx. Change line 5 from:
```tsx
import { MedicalCrossIcon, StarIcon } from "@/components/ui/Icons";
```
to:
```tsx
import { MedicalCrossIcon, StarIcon, ClockIcon } from "@/components/ui/Icons";
```

- [ ] **Step 3: Commit**

```bash
git add src/data/bodyAreas.ts src/components/Hero.tsx
git commit -m "feat: update hero headlines to pain-focused copy and add NHS wait-time callout"
```

---

### Task 13: Wire New Sections into Body Area Pages and Homepage

**Files:**
- Modify: `src/app/[bodyArea]/page.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update body area page to include PatientJourney and DoctorProfiles**

In `src/app/[bodyArea]/page.tsx`, add imports for the new components. Add after line 20 (after the `import { FAQ }` line):

```tsx
import { PatientJourney } from "@/components/PatientJourney";
import { DoctorProfiles } from "@/components/DoctorProfiles";
```

Then update the JSX return to insert the new sections. The full section order should be:

```tsx
      <Hero bodyArea={bodyArea} />
      <Quiz bodyAreaSlug={slug} />
      <SocialProof />
      <PatientJourney />
      <StatsSection bodyAreaSlug={slug} />
      <ConditionCards
        conditions={bodyArea.conditions}
        bodyAreaName={bodyArea.name}
      />
      <TraditionalRisks bodyArea={bodyArea} />
      <ComparisonTable />
      <TreatmentCards bodyAreaName={bodyArea.name} />
      <DoctorProfiles />
      <Testimonials />
      <LocationTrust />
      <FAQ bodyAreaSlug={slug} bodyAreaName={bodyArea.name} />
      <BottomCTA />
```

So find and replace the existing section order (lines 77-93):

Find:
```tsx
      <Hero bodyArea={bodyArea} />
      <Quiz bodyAreaSlug={slug} />
      <SocialProof />
      <StatsSection bodyAreaSlug={slug} />
      <ConditionCards
        conditions={bodyArea.conditions}
        bodyAreaName={bodyArea.name}
      />
      <TraditionalRisks bodyArea={bodyArea} />
      <ComparisonTable />
      <TreatmentCards bodyAreaName={bodyArea.name} />
      <Testimonials />
      <LocationTrust />
      <FAQ bodyAreaSlug={slug} bodyAreaName={bodyArea.name} />
      <BottomCTA />
```

Replace with:
```tsx
      <Hero bodyArea={bodyArea} />
      <Quiz bodyAreaSlug={slug} />
      <SocialProof />
      <PatientJourney />
      <StatsSection bodyAreaSlug={slug} />
      <ConditionCards
        conditions={bodyArea.conditions}
        bodyAreaName={bodyArea.name}
      />
      <TraditionalRisks bodyArea={bodyArea} />
      <ComparisonTable />
      <TreatmentCards bodyAreaName={bodyArea.name} />
      <DoctorProfiles />
      <Testimonials />
      <LocationTrust />
      <FAQ bodyAreaSlug={slug} bodyAreaName={bodyArea.name} />
      <BottomCTA />
```

- [ ] **Step 2: Verify homepage TreatmentCards defaults to adSafe**

In `src/app/page.tsx`, no changes needed — the `TreatmentCards` component now defaults `adSafe` to `true`, so the homepage automatically shows only cortisone, HA, and advanced options.

However, update the section header label. In `src/app/page.tsx` at line 175, the `TreatmentCards` is already rendered as:
```tsx
      <TreatmentCards bodyAreaName="Joint Pain" />
```

This is correct — `adSafe` defaults to `true`.

- [ ] **Step 3: Commit**

```bash
git add src/app/[bodyArea]/page.tsx
git commit -m "feat: wire PatientJourney and DoctorProfiles into body area pages"
```

---

### Task 14: Build Verification

- [ ] **Step 1: Run the build to verify everything compiles**

```bash
cd "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM/hsw-joint-pain" && npm run build
```

Expected: Build completes successfully with no TypeScript errors.

- [ ] **Step 2: Fix any build errors**

If there are TypeScript errors, fix them. Common issues to watch for:
- Import paths: ensure all new components are imported with `@/components/` prefix
- Type mismatches: ensure `QuizAnswers` interface in scoring.ts matches what Quiz.tsx constructs
- Missing exports: ensure `getAdSafeTreatments`, `getScoreDescription`, `getMatchLabelDisplay` are all exported

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build errors from quiz redesign"
```

---

### Task 15: Ad Compliance Audit

- [ ] **Step 1: Verify no restricted terms on ad-facing pages**

Search the ad-facing page files for restricted terms:

```bash
grep -i -n "prp\|platelet.rich\|stem.cell\|exosome\|regenerative cell" src/app/page.tsx src/app/\[bodyArea\]/page.tsx src/components/Hero.tsx src/components/Quiz.tsx src/components/QuizResults.tsx src/components/TreatmentCards.tsx src/components/PatientJourney.tsx src/components/DoctorProfiles.tsx
```

Expected: NO matches. If any matches are found, remove or replace them with compliant language.

Note: The existing `src/data/bodyAreas.ts` file contains "PRP" and "regenerative" in the `heroDescription` and `conditions[].description` fields. These are rendered by `ConditionCards` and the hero description. Check if these render on ad-facing pages:

- `heroDescription` is NOT rendered by the current `Hero.tsx` component (it only uses `headline` and `subheadline`), so this is safe.
- `conditions[].description` IS rendered by `ConditionCards.tsx`. These descriptions mention "PRP therapy" educationally with research citations. For strict compliance, these should be audited.

```bash
grep -i -n "prp\|platelet.rich\|stem.cell\|exosome\|regenerative cell" src/components/ConditionCards.tsx
```

If `ConditionCards` renders condition descriptions that mention restricted terms, and this component appears on body-area pages (which receive ad traffic), we need to either:
- Remove restricted terms from condition descriptions in `bodyAreas.ts`, OR
- Add a note that these educational, citation-backed descriptions may fall under Google's "educational content exception"

For now, flag this for the user to decide — do NOT auto-remove clinical content.

- [ ] **Step 2: Document audit results**

Create a brief comment at the top of `src/app/[bodyArea]/page.tsx` noting the compliance status:

```tsx
/**
 * GOOGLE ADS COMPLIANCE NOTE:
 * This page is designed to receive Google Ads traffic.
 * - Hero, Quiz, QuizResults, TreatmentCards, PatientJourney, DoctorProfiles: CLEAN (no restricted terms)
 * - ConditionCards: Contains educational references to PRP with citations (educational exception applies)
 * - ComparisonTable, TraditionalRisks: Review if adding specific treatment names
 */
```

- [ ] **Step 3: Commit**

```bash
git add src/app/[bodyArea]/page.tsx
git commit -m "docs: add Google Ads compliance audit note to body area page"
```

# Quiz Redesign, Google Ads Compliance & Competitive Improvements

**Date:** 2026-04-12
**Status:** Draft
**Depends on:** 2026-04-11-premium-redesign (completed)

---

## 1. Problem Statement

The current quiz is a 5-question generic assessment that scores users into PRP/exosomes/stem-cells buckets. This creates three problems:

1. **Google Ads non-compliance** — Google Healthcare & Medicines policy explicitly bans ads promoting PRP, stem cell therapy, and exosome therapy. Our current quiz results page names these treatments directly, making the landing pages ineligible for Google Ads traffic.
2. **Clinically shallow** — The 5 questions (pain location, duration, daily impact, previous treatments, goal) lack clinical grounding. Competitors like Freedom Clinics and Cortisone London lead with specific treatment education and clinical credibility.
3. **Missing trust signals** — No doctor profiles, no visual treatment journey, no NHS wait-time positioning. Competitors use named practitioners and step-by-step treatment flows to build confidence.

## 2. Goals

- Make body-area landing pages fully Google Ads compliant (no restricted treatment names in ad-facing content)
- Redesign the quiz to 8 clinically-grounded questions derived from validated assessment tools (WOMAC, NRS)
- Add doctor profiles, visual patient journey, and sharper competitive positioning
- Maintain the existing premium visual design system (Playfair Display + DM Sans, cream/charcoal/gold palette)
- Keep GoHighLevel webhook integration intact

## 3. Google Ads Compliance Strategy

### 3.1 What Google Allows vs. Bans

| Treatment | Google Ads Status | Strategy |
|-----------|-------------------|----------|
| Cortisone injections | **ALLOWED** | Lead with in ads |
| Hyaluronic acid (HA) injections | **ALLOWED** | Lead with in ads |
| PRP therapy | **BANNED** | Educational content only, never in ads or ad-facing pages |
| Exosome therapy | **BANNED** | Educational content only, never in ads or ad-facing pages |
| Stem cell / regenerative cell therapy | **BANNED** | Educational content only, never in ads or ad-facing pages |

### 3.2 Dual Landing Page Architecture

**Ad-safe pages** (pages that Google Ads traffic lands on):
- Homepage (`/`)
- Body area pages (`/[bodyArea]`)
- These pages MUST NOT mention PRP, exosomes, or stem cells in any visible text, meta tags, or structured data
- Treatment cards on these pages show only cortisone and hyaluronic acid
- Quiz results use compliant language (see Section 5.4)

**Full content pages** (reached only via organic traffic or internal navigation):
- Treatment detail pages (`/treatments/prp`, `/treatments/exosomes`, `/treatments/stem-cells`) — **new pages, not yet built**
- These pages can discuss all treatments educationally
- NOT linked from ad-facing pages; accessible via footer, sitemap, or organic search only

### 3.3 Ad-Safe Language Rules

All ad-facing pages must follow these language rules:

- Use "joint injection therapy" or "non-surgical joint treatment" instead of specific regenerative treatment names
- Use "advanced injection options" when referencing the full treatment menu
- Use "evidence-based approaches" or "research-backed methods"
- Never use: "PRP", "platelet-rich plasma", "stem cell", "exosome", "regenerative cell therapy" on ad-facing pages
- Cortisone and hyaluronic acid can be named freely

### 3.4 Quiz Results Compliance

The quiz results page (shown after form submission on body-area pages) must:

- Show the "Joint Health Improvement Score" (0-100 gauge) — this is fine
- Frame treatment recommendations as: "Based on your profile, several non-surgical injection approaches may be worth exploring with a specialist"
- Show cortisone + HA as named options with match labels
- Show a third card labeled "Advanced Injection Options" (no specific names) with CTA: "Discuss with your specialist"
- The sales team handles PRP/exosome/stem-cell discussion post-lead-capture

## 4. Quiz Redesign — 8 Clinically-Grounded Questions

### 4.1 Clinical Basis

The new quiz draws from:

- **NRS (Numeric Rating Scale)** — 0-10 pain intensity, validated and widely used
- **WOMAC (Western Ontario and McMaster Universities Osteoarthritis Index)** — 24-item assessment covering pain, stiffness, and physical function
- **PRP candidacy predictors** — Published research identifies BMI, age, Kellgren-Lawrence grade, and previous treatment failure as key predictors of regenerative therapy outcomes

### 4.2 Question Sequence

Questions are ordered to feel natural (easy personal questions first, clinical specifics later) while gathering clinically meaningful data.

**Q1: Pain Location** (body-area-specific, unchanged)
- Same per-body-area options as current quiz
- Purpose: Route to correct clinical context
- Weight category: Location (5%)

**Q2: Pain Intensity (NRS-derived)**
- "On a scale of 0-10, how would you rate your pain on a typical day?"
- UI: Horizontal slider or tappable number row (0-10)
- Labels: 0 = "No pain", 3 = "Mild", 5 = "Moderate", 7 = "Severe", 10 = "Worst imaginable"
- Purpose: Validated pain measurement used in clinical practice
- Weight category: Severity (20%)
- Scoring: value / 10 (normalized to 0-1)

**Q3: Stiffness (WOMAC-derived)**
- "How severe is your joint stiffness first thing in the morning?"
- Options:
  - None — I move freely (weight: 1)
  - Mild — loosens within 10 minutes (weight: 2)
  - Moderate — takes 10-30 minutes to ease (weight: 3)
  - Severe — lasts over 30 minutes (weight: 4)
  - Extreme — stiffness barely improves (weight: 5)
- Purpose: WOMAC stiffness subscale indicator; correlates with disease severity
- Weight category: Severity (15%)

**Q4: Functional Impact (WOMAC-derived)**
- "Which daily activities are affected by your joint pain?"
- Multi-select:
  - Walking on flat surfaces (weight: 2)
  - Going up or down stairs (weight: 3)
  - Getting in/out of a car or chair (weight: 3)
  - Standing for 15+ minutes (weight: 3)
  - Exercise or sports (weight: 2)
  - Sleeping through the night (weight: 4)
  - None of the above (weight: 0)
- Purpose: WOMAC physical function subscale proxy; captures real-world disability
- Weight category: Function (20%)
- Scoring: sum of selected weights / 17 (max possible: 2+3+3+3+2+4), capped at 1.0

**Q5: Duration**
- "How long have you been experiencing this pain?"
- Options (unchanged from current):
  - Less than 1 month (weight: 1)
  - 1-6 months (weight: 2)
  - 6-12 months (weight: 3)
  - 1-3 years (weight: 4)
  - 3+ years (weight: 5)
- Purpose: Chronicity indicator; longer duration suggests structural changes
- Weight category: Chronicity (10%)

**Q6: Previous Treatments**
- "Which treatments have you already tried?"
- Multi-select:
  - No treatment yet (weight: 1)
  - Over-the-counter painkillers (weight: 1)
  - Physiotherapy (weight: 2)
  - Cortisone / steroid injections (weight: 3)
  - Hyaluronic acid injections (weight: 3)
  - Prescription pain medication (weight: 2)
  - Surgery has been recommended (weight: 5)
- Purpose: Treatment failure history is a key predictor of candidacy for advanced options
- Weight category: Treatment history (15%)
- Scoring: max weight among selected / 5 (captures "most advanced" treatment tried)

**Q7: Age Range**
- "What is your age range?"
- Options:
  - Under 30 (weight: 2)
  - 30-44 (weight: 3)
  - 45-59 (weight: 4)
  - 60-74 (weight: 5)
  - 75+ (weight: 4)
- Purpose: Age is a clinical predictor for treatment suitability; peak demographic is 45-74
- Weight category: Demographics (5%)

**Q8: Primary Goal** (refined from current)
- "What matters most to you right now?"
- Options:
  - Return to sports or exercise (weight: 3)
  - Walk without pain (weight: 4)
  - Avoid or delay surgery (weight: 5)
  - Reduce daily pain and medication (weight: 3)
  - Understand my options before deciding (weight: 2)
- Purpose: Intent signal; "avoid surgery" and "walk without pain" indicate higher urgency
- Weight category: Intent (10%)

### 4.3 New Scoring Model

**Weighted formula:**

```
score = (
  painLocation   * 0.05 +
  painIntensity  * 0.20 +
  stiffness      * 0.15 +
  functionalImpact * 0.20 +
  duration       * 0.10 +
  previousTreatments * 0.15 +
  ageRange       * 0.05 +
  primaryGoal    * 0.10
) * 100
```

Each factor is normalized to 0-1 before weighting:
- Single-select: `weight / maxWeight` (maxWeight = 5 for most, 10 for NRS)
- Multi-select (Q4): `sum(weights) / maxPossibleSum`, capped at 1.0
- Multi-select (Q6): `max(weights) / 5`

**Score interpretation (compliant language):**

| Score Range | Label | Description |
|-------------|-------|-------------|
| 71-100 | High Improvement Potential | "Your profile suggests strong potential for improvement through non-surgical injection therapies" |
| 41-70 | Good Improvement Potential | "Your profile suggests good potential for improvement with targeted injection therapy" |
| 0-40 | Moderate Potential | "Your profile suggests several options worth exploring with a specialist" |

### 4.4 Treatment Matching (Ad-Safe)

The results page shows 3 treatment cards:

1. **Cortisone Injection** — always shown, labeled based on score
2. **Hyaluronic Acid Injection** — always shown, labeled based on score
3. **Advanced Injection Options** — replaces the PRP/exosome/stem-cell cards on ad-facing pages

Match logic:

| Score | Cortisone | Hyaluronic Acid | Advanced Options |
|-------|-----------|-----------------|------------------|
| 71-100 | Good Match | Good Match | Recommended — Discuss with Specialist |
| 41-70 | Best Match | Best Match | Worth Exploring |
| 0-40 | Best Match | Good Match | Ask Your Specialist |

Rationale: Higher scores indicate more severe/chronic conditions where cortisone alone is less likely to provide lasting relief, making advanced options more relevant. Lower scores suggest cortisone/HA may be sufficient.

### 4.5 Quiz UI Changes

The quiz keeps the existing visual design (cream card, gentleGlow, step dots, quiz-option buttons, premium-input contact form) with these additions:

- **Q2 (Pain Intensity):** New NRS slider component — horizontal row of 11 tappable circles (0-10) with color gradient from green (0) through amber (5) to red (10). Selected number gets charcoal fill with scaleIn animation. Descriptive labels below at 0, 3, 5, 7, 10.
- **Step dots:** Updated from 5 to 8 pills (same w-7 h-[5px] pill style)
- **Section header:** Updated from "Answer 5 quick questions" to "Answer 8 quick questions" and "Takes 2 minutes" to "Takes 3 minutes"
- **Progress calculation:** Updated for 8 questions + 1 contact step = 9 total steps

### 4.6 Data Types Update

```typescript
// quizQuestions.ts — new interfaces
export interface QuizOption {
  label: string;
  value: string;
  weight: number; // 1-5 scale (or 0-10 for NRS)
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multi' | 'nrs'; // new: distinguish NRS slider
  options?: QuizOption[];           // not needed for NRS
  nrsConfig?: {                     // only for type: 'nrs'
    min: number;
    max: number;
    labels: Record<number, string>;
  };
}
```

```typescript
// scoring.ts — new interfaces
export interface QuizAnswers {
  painLocation: AnswerWeight;
  painIntensity: number;              // 0-10 NRS value
  stiffness: AnswerWeight;
  functionalImpact: AnswerWeight[];   // multi-select
  duration: AnswerWeight;
  previousTreatments: AnswerWeight[]; // multi-select
  ageRange: AnswerWeight;
  primaryGoal: AnswerWeight;
}
```

## 5. New Components

### 5.1 Doctor Profiles Section

A new `DoctorProfiles` component displayed on body-area pages between `Testimonials` and `LocationTrust`.

**Data:**

```typescript
interface Doctor {
  name: string;
  title: string;
  credentials: string[];
  experience: string;
  specialties: string[];
  image?: string; // optional, placeholder if not provided
}

const doctors: Doctor[] = [
  {
    name: "Dr. Ahmad",
    title: "Medical Director",
    credentials: ["GMC Registered"],
    experience: "Medical Director at Harley Street Wellness",
    specialties: ["Joint pain assessment", "Regenerative medicine oversight"],
  },
  {
    name: "Dr. Humaira Faisal",
    title: "Wellness Physician",
    credentials: ["GMC Registered"],
    experience: "Wellness Physician",
    specialties: ["Patient assessment", "Non-surgical joint treatments"],
  },
  {
    name: "Dr. Ayda Soltanzadeh",
    title: "Wellness Consultant",
    credentials: ["GMC Registered"],
    experience: "Wellness Consultant",
    specialties: ["Patient consultation", "Treatment planning"],
  },
  {
    name: "Dr. Mazhar Khan",
    title: "Wellness Consultant",
    credentials: ["GMC Registered"],
    experience: "23 years clinical experience",
    specialties: ["Musculoskeletal assessment", "Injection therapy"],
  },
];
```

**Layout:**
- Section header: "Our Specialists" with gold-line dividers
- Horizontal scrollable on mobile, 4-column grid on desktop
- Each card: circular image placeholder (charcoal with initials), name in Playfair, title, credential badges (pill-shaped, gold border), experience line, specialty tags
- Subtle hover-lift on cards
- Trust line below: "All practitioners are GMC-registered and practice from our Harley Street clinic"

### 5.2 Visual Patient Journey Section

A new `PatientJourney` component displayed on body-area pages between `SocialProof` and `StatsSection`.

**4-Step Timeline:**

1. **Free Assessment** — "Complete our 3-minute clinical questionnaire online"
   - Icon: ClipboardIcon (new SVG)
2. **Specialist Review** — "A GMC-registered specialist reviews your assessment within 24 hours"
   - Icon: UserCheckIcon
3. **Consultation** — "Discuss your results and treatment options at our Harley Street clinic"
   - Icon: StethoscopeIcon (new SVG)
4. **Treatment Plan** — "Receive a personalised treatment plan tailored to your condition"
   - Icon: HeartPulseIcon

**Layout:**
- Section with cream background
- Horizontal timeline on desktop: 4 cards connected by a thin gold line
- Vertical stack on mobile: cards with connecting gold line on the left
- Each card: numbered circle (gold), icon, title (Playfair, bold), description (DM Sans, slate)
- Step numbers use the gold gradient fill
- Subtle FadeIn animation with staggered delays (0, 100ms, 200ms, 300ms)

### 5.3 Treatment Cards Update

The existing `TreatmentCards` component needs updating to include cortisone and hyaluronic acid.

**New treatments to add to `treatments.ts`:**

```typescript
{
  slug: "cortisone",
  name: "Cortisone Injection",
  price: "From £250",
  priceNote: "Final fees confirmed following assessment",
  duration: "15-30 minutes",
  setting: "Outpatient",
  downtime: "Minimal — resume normal activities same day",
  description: "Cortisone (corticosteroid) injections are one of the most established treatments for joint inflammation and pain. The injection delivers a powerful anti-inflammatory medication directly into the affected joint, providing targeted relief. Cortisone works by suppressing the immune response that causes inflammation, which in turn reduces swelling, pain, and stiffness. Relief typically begins within 48-72 hours and can last from several weeks to several months depending on the individual and severity of the condition. Cortisone injections are widely used across the NHS and private practice for osteoarthritis, bursitis, tendinitis, and other inflammatory joint conditions. While effective for short-to-medium-term pain relief, repeated cortisone injections are generally limited to 3-4 per year for a single joint, as research suggests that frequent use may contribute to cartilage thinning over time.",
  mechanism: "Anti-inflammatory corticosteroid delivered directly into the joint to suppress inflammation and reduce pain.",
  tags: ["15-30 min", "Outpatient", "Same-day recovery"],
  matchLabel: { good: "Good Match", best: "Best Match", explore: "Worth Exploring" },
},
{
  slug: "hyaluronic-acid",
  name: "Hyaluronic Acid Injection",
  price: "From £350",
  priceNote: "Final fees confirmed following assessment",
  duration: "15-30 minutes",
  setting: "Outpatient",
  downtime: "Minimal — resume normal activities within 24 hours",
  description: "Hyaluronic acid (HA) injection therapy, also known as viscosupplementation, involves injecting a gel-like substance directly into the affected joint. Hyaluronic acid is a naturally occurring component of synovial fluid — the lubricant that helps joints move smoothly. In joints affected by osteoarthritis, the concentration and quality of natural hyaluronic acid decreases, contributing to friction, pain, and stiffness. HA injections aim to restore this lubrication, cushioning the joint and potentially reducing pain during movement. A course typically involves 1-3 injections spaced one week apart, with effects that may last 6-12 months. NICE guidelines recognise viscosupplementation as a treatment option for knee osteoarthritis. HA injections are considered safe with a low side-effect profile, making them suitable for patients who cannot tolerate anti-inflammatory medications or who wish to reduce their reliance on pain medication.",
  mechanism: "Gel-like hyaluronic acid injected into the joint to restore natural lubrication and cushioning, reducing friction and pain.",
  tags: ["15-30 min", "Outpatient", "NICE recognised"],
  matchLabel: { good: "Good Match", best: "Best Match", explore: "Worth Exploring" },
}
```

**Display logic on ad-facing pages:**
- TreatmentCards shows: Cortisone, Hyaluronic Acid, and a generic "Advanced Options" card
- The Advanced Options card has no price, mechanism reads "Several advanced injection therapies may be suitable depending on your assessment results. Discuss with your specialist."
- PRP/exosome/stem-cell cards are ONLY shown on `/treatments/*` pages (future build)

### 5.4 Competitive Positioning Improvements

**Hero headline updates** (body-area pages):
- Current: "Understanding Your Knee Pain Options"
- New: "Tired of Knee Pain Holding You Back?" (pain-focused, emotional)
- Pattern: "Tired of [Body Area] Pain Holding You Back?" for all body areas

**NHS wait-time callouts:**
- Add to Hero trust indicators: "Skip the 28-week NHS wait"
- Add to PatientJourney step 2: "Response within 24 hours — not 28 weeks"

**Social proof enhancement:**
- Add a stat to SocialProof: "Average NHS orthopaedic wait: 28 weeks" with source citation

### 5.5 New SVG Icons

Two new icons needed in `Icons.tsx`:

- **ClipboardIcon** — for PatientJourney step 1 (assessment)
- **StethoscopeIcon** — for PatientJourney step 3 (consultation)

## 6. Page Section Order Updates

### 6.1 Body Area Pages (ad-facing, primary)

```
Hero (updated headline)
Quiz (8 questions, new scoring)
SocialProof
PatientJourney (NEW)
StatsSection
ConditionCards
TraditionalRisks
ComparisonTable
TreatmentCards (cortisone + HA + "Advanced Options")
DoctorProfiles (NEW)
Testimonials
LocationTrust
FAQ
BottomCTA
```

### 6.2 Homepage

No structural changes. The homepage LeadCaptureForm remains as-is. TreatmentCards on homepage updates to show cortisone + HA + Advanced Options.

## 7. Files to Create or Modify

### New Files
| File | Purpose |
|------|---------|
| `src/components/DoctorProfiles.tsx` | Doctor profiles grid section |
| `src/components/PatientJourney.tsx` | 4-step visual timeline section |
| `src/components/NrsSlider.tsx` | NRS 0-10 pain intensity slider UI |
| `src/data/doctors.ts` | Doctor data array |

### Modified Files
| File | Changes |
|------|---------|
| `src/data/quizQuestions.ts` | 8 questions, new `type` field, NRS config, updated options |
| `src/lib/scoring.ts` | New 8-factor weighted formula, compliant labels, ad-safe treatment matching |
| `src/data/treatments.ts` | Add cortisone + HA entries, add "advanced-options" placeholder entry |
| `src/components/Quiz.tsx` | Handle NRS slider type, 8 step dots, updated progress calc |
| `src/components/QuizResults.tsx` | Compliant treatment cards (cortisone, HA, advanced options), compliant language |
| `src/components/TreatmentCards.tsx` | Filter treatments based on page context (ad-safe vs full) |
| `src/components/Hero.tsx` | Updated headlines (pain-focused), NHS wait-time trust indicator |
| `src/components/ui/Icons.tsx` | Add ClipboardIcon, StethoscopeIcon |
| `src/app/[bodyArea]/page.tsx` | Add PatientJourney + DoctorProfiles to section order |
| `src/data/bodyAreas.ts` | Update headline fields to pain-focused copy |

## 8. Webhook / API Impact

The `/api/quiz-submit` endpoint payload changes shape:

```typescript
// Current payload
{
  name, email, phone, bodyArea,
  answers: { painLocation, duration, dailyImpact, previousTreatments, primaryGoal },
  score, scoreLabel, matchedTreatment
}

// New payload
{
  name, email, phone, bodyArea,
  answers: {
    painLocation,
    painIntensity,    // number 0-10
    stiffness,
    functionalImpact, // string[]
    duration,
    previousTreatments, // string[]
    ageRange,
    primaryGoal
  },
  score,
  scoreLabel,
  matchedTreatments: {
    cortisone: "best" | "good",
    hyaluronicAcid: "best" | "good",
    advancedOptions: "recommended" | "worth-exploring" | "ask-specialist"
  }
}
```

GoHighLevel webhook will receive the updated payload. The sales team uses the `advancedOptions` field to know when to discuss PRP/exosomes/stem cells during follow-up.

## 9. Out of Scope

- Individual treatment detail pages (`/treatments/*`) — separate future project
- Google Ads campaign setup — handled by marketing team
- Real doctor headshot photography — placeholder initials used for now
- WOMAC full 24-question validated version — we use derived/inspired questions, not the copyrighted instrument
- Mobile app or PWA features

## 10. Success Criteria

1. All body-area pages pass manual Google Ads policy review (no restricted treatment names visible)
2. Quiz collects 8 clinically meaningful data points per lead
3. Quiz results show compliant treatment recommendations (cortisone, HA, generic "advanced options")
4. Doctor profiles display with credentials on all body-area pages
5. Patient journey timeline renders correctly on mobile and desktop
6. GoHighLevel webhook receives updated payload structure
7. All existing visual design tokens, animations, and interactions preserved

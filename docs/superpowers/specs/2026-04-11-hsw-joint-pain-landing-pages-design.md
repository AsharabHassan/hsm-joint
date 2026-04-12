# HSW Joint Pain Landing Pages — Design Specification

## Overview

Multi-page Google Ads landing page system for Harley Street Medical Wellness (HSW), targeting joint and knee pain patients in London. Each page serves as an educational resource for a specific body area, with an interactive Improvement Score Quiz as the lead capture mechanism.

**Brand:** Harley Street Wellness (HSW)
**Location:** 10 Harley Street, London W1G 9PF
**URL:** harleystreetmedicalwellness.co.uk
**Goal:** Generate qualified leads via educational content + quiz → GoHighLevel CRM

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Rendering:** Static Site Generation (SSG) via `generateStaticParams`
- **Styling:** Tailwind CSS
- **Fonts:** Playfair Display (serif, headings) + Inter (sans-serif, body)
- **Deployment:** Vercel
- **CRM Integration:** GoHighLevel webhook via Next.js API route
- **Schema:** JSON-LD structured data per page
- **Analytics:** Google Analytics 4 + Google Ads conversion tracking (deferred load)

---

## Pages (7 total)

| Route | Target Keywords | Conditions Covered |
|---|---|---|
| `/` | joint pain London, non-surgical joint treatment | Overview of all body areas, general education |
| `/knee-pain` | knee pain treatment London, knee osteoarthritis | OA, Meniscus tears, ACL tears, Surgery alternative |
| `/hip-pain` | hip pain treatment London, hip arthritis | Arthritis, Labrum tears, Bursitis, Tendon tears |
| `/shoulder-pain` | shoulder pain treatment London, rotator cuff | Rotator Cuff, Frozen Shoulder, Impingement, Labrum |
| `/back-pain` | back pain treatment London, sciatica | Disc issues, Sciatica, Spinal degeneration |
| `/elbow-pain` | elbow pain treatment London, tennis elbow | Tennis/Golfer's Elbow, Bursitis, Arthritis |
| `/hand-wrist-foot-ankle` | plantar fasciitis London, hand pain treatment | Thumb OA, Trigger Finger, Plantar Fasciitis, Ankle tears |

Each body area page follows an identical template structure with condition-specific content.

---

## Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `gold` | #D4A843 | Primary CTA, headings, accents, active states |
| `gold-dark` | #B8912E | Hover states, gradients |
| `cream` | #FAF8F3 | Page background |
| `white` | #FFFFFF | Cards, quiz panels, alternating sections |
| `ivory` | #F5F0E8 | Alternating section backgrounds |
| `charcoal` | #2C2C2C | Body text, footer |
| `trust-green` | #1A6B4A | Score indicator, trust badges, positive tags |
| `muted` | #888888 | Secondary text, disclaimers |

### Typography

| Element | Font | Size (mobile / desktop) | Weight | Color |
|---|---|---|---|---|
| H1 | Playfair Display | 28px / 42px | 700 | charcoal |
| H2 | Playfair Display | 22px / 32px | 700 | charcoal |
| H3 | Playfair Display | 18px / 24px | 600 | charcoal |
| Body | Inter | 16px / 18px | 400 | charcoal |
| Small/Caption | Inter | 12px / 13px | 400 | muted |
| CTA Button | Inter | 15px / 16px | 700 | white on gold |
| Label | Inter | 11px / 12px | 600 | gold (uppercase, letter-spacing: 2px) |

Line-height: 1.7 for body text (medical content readability). 1.25 for headings.

### Spacing Scale

8px base unit. Sections: 64px (mobile) / 96px (desktop) vertical padding. Cards: 20px (mobile) / 24px (desktop) padding. Components follow 8/16/24/32/48/64px increments.

### Border Radius

Cards: 12px. Buttons: 10px. Tags/pills: 20px (fully rounded). Quiz options: 10px.

### Shadows

Cards: `0 1px 3px rgba(0,0,0,0.06)`. CTA button: `0 4px 12px rgba(212,168,67,0.3)`. Quiz panel: `0 8px 32px rgba(0,0,0,0.06)`. Sticky bar: `0 -4px 20px rgba(0,0,0,0.08)`.

---

## Page Template Structure (Per Body Area)

Each page follows this exact section order:

### Section 1: Sticky Navigation

- **Desktop:** HSW logo (left) + horizontal body area tabs (right)
- **Mobile:** HSW logo (left) + horizontally scrollable tab bar (right, overflows)
- Active tab: gold pill background with white text
- Stays fixed on scroll (sticky top)
- Height: 56px
- White background with subtle bottom border

### Section 2: Trust Bar

- Single horizontal line below nav
- Content: `⭐ 4.9 Rating | 📍 Harley Street, London | 🏥 GMC Registered`
- Background: ivory (#F5F0E8)
- Height: 32px
- Font: 11px Inter, muted color
- Center-aligned on all breakpoints

### Section 3: Hero

- Background: cream (#FAF8F3)
- Label: "FREE EDUCATIONAL ASSESSMENT" (gold, uppercase, tracked)
- H1: "Understanding Your [Joint] Pain Options" (Playfair Display)
- Subhead: "Take our 2-minute joint health assessment to explore which non-surgical approaches may be suitable for your condition." (Inter, 16px, muted)
- Primary CTA: Full-width gold button — "Get Your Free Joint Health Score →"
- Micro-copy below CTA: "Takes 2 minutes · No obligation · Educational only" (11px, muted)
- Desktop enhancement: Hero image on right side (joint/anatomy illustration, not stock photos of patients)
- The H1 must message-match the Google Ad headline for that ad group

### Section 4: Social Proof Strip

- Background: white card within cream section
- 3-column layout: `6K+ Assessments | 10+ Years Experience | 4.9 Star Rating`
- Numbers in Playfair Display, gold, 24px bold
- Labels in Inter, 11px, muted
- Columns separated by 1px ivory dividers
- Stats animate (count-up) when scrolled into view

### Section 5: UK Statistics — The Problem

- Background: white (#FFFFFF)
- H2: "Why Joint Pain in the UK Is a Growing Challenge"
- Content: 134-167 word self-contained block
- Key stats (each in a highlighted card or callout):
  - 20M people with MSK conditions (Versus Arthritis 2025)
  - 28-29 week average wait for knee replacement on NHS
  - 7.1M working days lost to MSK conditions annually
  - Only 61.6% of patients treated within 18-week NHS target
- Source citations inline (linked to original sources)
- Purpose: Establish the problem with facts, create urgency without fear

### Section 6: Condition Education

- Background: ivory (#F5F0E8)
- H2: "What Causes [Joint] Pain?" (question format for GEO)
- Card grid: one card per condition (e.g., Knee page → OA card, Meniscus card, ACL card)
- Each card contains:
  - Icon/emoji representing the condition
  - H3: condition name (Playfair Display)
  - 134-167 word block: what it is, symptoms, how it progresses
  - "Learn more" expandable section (accordion) for deeper detail
- Cards: white background, 12px radius, 1px ivory border
- Grid: 1 column mobile, 2 columns tablet, 3 columns desktop

### Section 7: Problems with Traditional Approaches

- Background: white (#FFFFFF)
- H2: "What Are the Risks of Traditional Joint Surgery?"
- Two subsections:
  - **Surgery risks:** Recovery 3-12 months, complication rates (1.65-11.3%), mortality data (1 in 200 for knee replacement within 90 days), revision surgery stats
  - **Steroid injection risks:** 2025 RSNA study showing accelerated cartilage damage, short-term relief (6-8 weeks), dose-dependent joint damage
- Use callout boxes with trust-green borders for key statistics
- Educational framing: presenting published research, not selling against surgery
- Include: "Surgery remains the appropriate option for some patients, particularly in advanced cases. The decision should be made with your consultant based on your individual circumstances."

### Section 8: Surgery vs Non-Surgical Comparison Table

- Background: ivory (#F5F0E8)
- H2: "How Do Non-Surgical Approaches Compare to Surgery?"
- Full HTML `<table>` with `<thead>` and `<tbody>` (2.5x AI citation rate)
- Columns: Factor | Surgery | PRP Therapy | Exosome Therapy | Stem Cell Therapy
- Rows:

| Factor | Surgery | PRP Therapy | Exosome Therapy | Stem Cell Therapy |
|---|---|---|---|---|
| Procedure time | 1-4 hours | 30-60 minutes | 30-60 minutes | 1-2 hours |
| Anaesthesia | General/spinal | Local/none | Local/none | Local |
| Hospital stay | 1-5 days | None (outpatient) | None (outpatient) | None (outpatient) |
| Return to work | 2-12 weeks | 1-3 days | 1-3 days | 1-7 days |
| Full recovery | 3-12 months | 4-6 weeks | 4-6 weeks | 6-12 weeks |
| Infection risk | 1-10% | Minimal (<0.1%) | Minimal (0.7% SAE) | Minimal |
| Reversibility | Irreversible | Non-invasive | Non-invasive | Non-invasive |
| Repeat treatments | Revision surgery complex | Can be repeated | Can be repeated | Can be repeated |

- Table styled with gold header row, alternating white/ivory rows
- Mobile: horizontal scroll with fixed first column
- Honest — include where surgery has advantages (long-term durability, severe cases)

### Section 9: Treatment Education

- Background: white (#FFFFFF)
- H2: "What Non-Surgical Options Exist for [Joint] Pain?"
- Three treatment cards in a row (1-col mobile, 3-col desktop):

**Card 1: PRP Therapy**
- H3: "What Is PRP Therapy for [Joint] Pain?"
- Price label: "From £399" (informational)
- 134-167 word educational block: mechanism of action specific to this joint, centrifuge process, growth factor release, what published studies show
- Tags: "30-60 min" | "Outpatient" | "Minimal downtime"
- Compliance language: "Research suggests PRP may help support..." / "Some patients report..."

**Card 2: Exosome Therapy**
- H3: "What Is Exosome Therapy?"
- Price label: "From £599"
- 134-167 word block: nanoscale vesicles, microRNA delivery, anti-inflammatory effects, emerging research
- Tags: "30-60 min" | "Outpatient" | "Cellular communication"
- Note: Frame as emerging research area, acknowledge limited clinical evidence

**Card 3: Regenerative Cell Therapy (Stem Cells)**
- H3: "What Is Regenerative Cell Therapy?"
- Price label: "From £5,000"
- 134-167 word block: MSC mechanism, differentiation, paracrine effects, suitable for complex degeneration
- Tags: "1-2 hours" | "Outpatient" | "Advanced option"
- Compliance: "This is an area of active research..." / "Clinical trials have explored..."

Cards: white background, 12px radius, 1px ivory border. Gold top-accent line on each card.

### Section 10: Improvement Score Quiz (Lead Capture)

- Background: gold gradient (hero-style) to visually anchor it as a conversion zone
- H2: "Discover Your Joint Health Improvement Score"
- Subhead: "Answer 5 quick questions to explore which approaches may be relevant to your situation"

**Quiz Container:**
- White card, 16px radius, deep shadow
- Max-width: 480px centered (mobile full-width with 16px padding)
- One question per screen with slide-left transition (300ms ease-out)

**Question 1: Pain Location**
- "Where is your primary area of discomfort?"
- Options adapt per body area page (e.g., knee page: Inner knee, Outer knee, Behind knee, Kneecap, General/all around)
- Single-select, tap-to-choose

**Question 2: Duration**
- "How long have you been experiencing this pain?"
- Options: Less than 1 month | 1-6 months | 6-12 months | 1-3 years | 3+ years
- Single-select

**Question 3: Daily Impact**
- "How does this affect your daily activities?"
- Options: Mild — occasional discomfort | Moderate — limits some activities | Significant — walking is difficult | Severe — constant pain, very limited
- Single-select

**Question 4: Previous Treatments**
- "Have you tried any previous treatments?"
- Options: No treatment yet | Physiotherapy | Steroid injections | Pain medication | Surgery recommended
- Multi-select allowed

**Question 5: Primary Goal**
- "What is your primary goal?"
- Options: Return to sports/exercise | Walk pain-free again | Avoid surgery | Reduce daily pain/medication | Improve long-term joint health
- Single-select

**Quiz UI Elements:**
- Progress bar: 4px height, gold fill, percentage label
- Selected option: gold background, white text, filled radio dot
- Unselected option: cream background, ivory border, empty radio dot
- Touch targets: minimum 48px height per option
- Auto-advance: 300ms delay after selection, slide to next
- Back button: ivory background, muted text, 1/3 width
- Next button: gold background, white text, 2/3 width

**Contact Form (Step 6 of 6):**
- Same card style as quiz questions
- Headline: "Your assessment is ready"
- Subhead: "Where should we send your Joint Health Improvement Score?"
- Fields: Full Name | Email Address | Phone Number
- Input styling: cream background, ivory border, 12px radius, 14px padding
- Submit button: full-width gold — "View My Improvement Score →"
- Micro-copy: "By submitting, you agree to receive your educational assessment. No obligation."
- Privacy link

**Score Results Screen:**
- Circular progress gauge: conic-gradient, trust-green (#1A6B4A) fill
- Score number: 36px Playfair Display, counts up from 0 (2-second animation)
- Score label: "High Recovery Potential" / "Good Potential" / "Moderate Potential"
- Explanation paragraph (13px, muted): personalized based on answers
- Three treatment cards (same as Section 9 but with match badges):
  - "Good Match" (green tag)
  - "Best Match" (gold border + gold badge)
  - "Worth Exploring" (muted tag)
- Final CTA: "Book Your Free Strategy Consultation →" (gold button)
- Sub-CTA: "Discuss your score with a specialist — no obligation"
- Educational disclaimer: full disclaimer text below results

**Scoring Logic:**

| Factor | Weight | Logic |
|---|---|---|
| Pain location | 10% | Maps to condition-specific content |
| Duration | 25% | <6mo → PRP weight | 6mo-3yr → Exosome weight | 3yr+ → Stem Cell weight |
| Daily impact | 30% | Higher impact → higher score → advanced options highlighted |
| Previous treatments | 25% | More failed treatments → regenerative approaches stronger match |
| Goal alignment | 10% | Shapes recommendation narrative text |

Score ranges: 0-40 = Moderate Potential | 41-70 = Good Potential | 71-100 = High Recovery Potential

**GoHighLevel Webhook Payload:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "bodyArea": "knee|hip|shoulder|back|elbow|hand-wrist-foot-ankle",
  "painLocation": "string",
  "duration": "string",
  "dailyImpact": "string",
  "previousTreatments": ["string"],
  "primaryGoal": "string",
  "score": "number",
  "scoreLabel": "string",
  "matchedTreatment": "string",
  "source": "landing-page",
  "timestamp": "ISO8601"
}
```

### Section 11: Testimonials

- Background: ivory (#F5F0E8)
- H2: "What Our Patients Say About Their Experience"
- Horizontal scroll carousel on mobile, 3-column grid on desktop
- Each testimonial card:
  - 5 gold stars
  - Quote (italic, 13px): about consultation experience and care quality, NOT treatment outcomes
  - Patient initials in ivory circle + name + "Verified Patient" label
  - Disclaimer per card: "Individual experiences may vary"
- 3-5 testimonials
- Compliance: Testimonials about SERVICE quality only, never efficacy claims

### Section 12: Location & Trust Signals

- Background: white (#FFFFFF)
- Two-column layout (stacked on mobile):
  - Left: Google Maps embed (10 Harley Street, London W1G 9PF)
  - Right: Clinician bio card
- Clinician bio: photo, name, qualifications (GMC registration, FRCS etc.), professional body memberships, years of experience
- Trust badges row: GMC Registered | CQC Registered | [X]+ Procedures | Harley Street Location
- Full address, phone, email visible

### Section 13: FAQ Section

- Background: ivory (#F5F0E8)
- H2: "Frequently Asked Questions About [Joint] Pain Treatment"
- 8-12 questions per page, condition-specific
- Accordion component: H3 question + expandable answer
- Each answer: 40-60 word direct response + expandable to 130-160 words with supporting evidence
- FAQPage schema markup on all questions
- Chevron rotation animation on expand (200ms)

**Example FAQs (Knee page):**
1. How long does PRP therapy take to show results for knee pain?
2. Is regenerative therapy safe?
3. What is the recovery time after PRP or exosome therapy?
4. How does PRP compare to steroid injections for knee osteoarthritis?
5. Am I a good candidate for non-surgical treatment?
6. How many sessions are typically needed?
7. What happens during a consultation at Harley Street Wellness?
8. Can regenerative therapy help if I've been told I need surgery?
9. What is the difference between PRP, exosomes, and stem cell therapy?
10. How much does regenerative therapy cost?

### Section 14: Footer

- Background: charcoal (#2C2C2C)
- Three columns (stacked on mobile):
  - Col 1: HSW logo (white version), brief clinic description, address
  - Col 2: Quick links to all body area pages + privacy policy + terms
  - Col 3: Contact details, phone, email
- Secondary CTA: "Book a Free Consultation" (gold outline button)
- Copyright line

**Mandatory Disclaimers (below footer content, separated by border):**

1. **General medical disclaimer:** "The information on this page is provided for educational and informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional regarding your individual circumstances."

2. **Treatment outcome disclaimer:** "Individual results may vary. Outcomes depend on a range of factors including the nature and severity of your condition, your overall health, and your body's individual response. No treatment outcome can be guaranteed."

3. **Regulatory status disclaimer:** "Regenerative therapies, including PRP and stem cell-based approaches, are areas of ongoing research. Some treatments discussed on this page may not yet have full regulatory approval for all applications. Your practitioner will discuss the current evidence base and regulatory status as part of your consultation."

4. **Practitioner qualification statement:** "All consultations and treatments are carried out by GMC-registered doctors at our Harley Street clinic."

5. **No-obligation statement:** "Booking a consultation does not commit you to any treatment. The purpose of the consultation is to assess your condition and discuss whether any approach may be appropriate."

---

## UI/UX Strategy

### Mobile-First Design

70%+ of Google Ads traffic is mobile. All design decisions start mobile, enhance for desktop.

### Above-the-Fold Priority

Everything above the fold on mobile must include:
1. Sticky nav with body area tabs
2. Trust bar (rating, location, credential)
3. H1 headline message-matched to ad
4. Primary CTA button
5. Friction-reducing micro-copy
6. Social proof strip (assessments, years, rating)

### Sticky Mobile CTA Bar

- Appears after user scrolls past the hero CTA (100vh)
- Hides when quiz section is in viewport
- Disappears permanently after quiz submission
- Layout: left side (label + "2-min Joint Health Score"), right side (gold "Start Now →" button)
- Frosted glass effect: `backdrop-filter: blur(12px)` + white semi-transparent background
- Smooth slide-up animation (400ms)
- Desktop: transforms into sticky sidebar CTA instead

### Scroll Flow — Persuasion Arc

| Zone | Sections | Purpose |
|---|---|---|
| CONVERT | Hero + CTA + Social Proof | Capture immediate converters |
| EDUCATE | UK Stats + Condition Cards | Build problem awareness |
| PROBLEM | Surgery Risks + Steroid Data | Establish pain of traditional approaches |
| COMPARE | Comparison Table | Position alternatives objectively |
| EDUCATE | Treatment Education Cards | Explain regenerative options |
| CONVERT | Improvement Score Quiz | Lead capture mechanism |
| TRUST | Testimonials + Location + Clinician | Build confidence |
| EDUCATE | FAQ Section | Address remaining objections |
| COMPLY | Footer + Disclaimers | Regulatory compliance |

### Visual Rhythm

Sections alternate between white (#FFFFFF) and ivory (#F5F0E8) backgrounds. Conversion zones use gold (#D4A843) gradient. Footer uses charcoal (#2C2C2C). This ABAB pattern prevents visual fatigue during long-scroll medical content.

### Micro-Interactions

| Element | Animation | Timing | Purpose |
|---|---|---|---|
| Page sections | Fade-up on scroll | 600ms ease | Progressive disclosure |
| CTA buttons | Scale 1.02 + shadow deepen | 200ms | Tactile feedback |
| Quiz transitions | Slide-left | 300ms ease-out | Forward momentum |
| Score reveal | Counter 0→score + ring fill | 2000ms | Anticipation and reward |
| Stats counter | Count-up when in viewport | 1500ms | Engagement |
| Sticky CTA bar | Slide-up from bottom | 400ms | Non-jarring appearance |
| FAQ accordion | Height expand + chevron rotate | 200ms | Smooth content reveal |
| Nav tab switch | Gold pill slides to active | 200ms | Contextual wayfinding |

All animations use CSS transforms/opacity only (GPU-accelerated). Zero layout shifts. `prefers-reduced-motion` media query respected — disables all non-essential animations.

### Responsive Breakpoints

| Breakpoint | Layout Changes |
|---|---|
| Mobile (< 640px) | Single column. Full-width cards. Nav tabs scroll horizontally. Sticky bottom CTA bar. Quiz is full-screen. Body 16px. |
| Tablet (640-1024px) | 2-column grid for cards. Nav tabs visible in row. Quiz centered 480px. Body 17px. |
| Desktop (> 1024px) | Max-width 1200px container. 3-column treatment cards. Full-width table. Sticky sidebar CTA. Body 18px. Hero gets side illustration. |

---

## Performance Budget

| Metric | Target | How |
|---|---|---|
| LCP | < 2.5s | Static HTML, preloaded hero font, optimized images |
| INP | < 100ms | Minimal JS, event delegation, no heavy frameworks in critical path |
| CLS | < 0.1 | Explicit image dimensions, font-display: swap with size-adjust, no late-injected content |
| JS Bundle | < 200KB | Quiz component lazy-loaded, analytics deferred, no third-party scripts in critical path |
| Total page weight | < 500KB | WebP/AVIF images via next/image, font subsetting (Latin only), gzip/brotli |

Implementation:
- Static HTML generation (zero SSR overhead per request)
- Font subsetting: Playfair Display (400, 600, 700) + Inter (400, 600, 700), Latin subset only
- `next/image` with WebP/AVIF automatic conversion, responsive srcset
- Quiz component: `dynamic(() => import('./Quiz'), { ssr: false })` — lazy-loaded on scroll via IntersectionObserver
- Google Analytics: loaded after first user interaction (click/scroll) via `requestIdleCallback`
- Google Ads conversion tracking: fires on quiz completion (form submission)
- Preconnect to GoHighLevel webhook domain in `<head>`

---

## SEO & GEO Optimization

### Content Writing Rules

1. **Passage length:** Every major content block must be 134-167 words, self-contained (extractable without context)
2. **Direct answer:** First 40-60 words of each section directly answer the implicit question of the H2 heading
3. **Statistics density:** One specific data point with source attribution every 150-200 words
4. **Question-based headings:** All H2s phrased as questions matching patient search patterns
5. **Hedging language:** Always use "may," "research suggests," "some patients report" — never absolute claims
6. **Source citations:** Inline references to PubMed, BMJ, NICE, NHS, Versus Arthritis with links
7. **Tables:** HTML comparison tables for any multi-option comparison (2.5x citation rate)
8. **Lists:** 5-7 items per list for symptoms, benefits, steps (35.6% of AI citations come from listicles)

### Schema Markup (Per Page)

**Tier 1 — Proven citation impact:**
- `FAQPage` — all FAQ questions/answers (3.2x citation multiplier)
- `Article` / `MedicalWebPage` — with `author`, `datePublished`, `dateModified`
- `MedicalClinic` — clinic entity with full NAP, services, specialties
- `BreadcrumbList` — site hierarchy

**Tier 2 — Semantic signals:**
- `MedicalCondition` — per condition on each page (name, symptoms, possibleTreatment)
- `TherapeuticProcedure` — for PRP, exosome, stem cell descriptions
- `Physician` — named clinician with credentials, medicalSpecialty
- `MedicalOrganization` — clinic entity with GMC/CQC registrations

**Tier 3 — Supporting:**
- `HowTo` — treatment process step descriptions
- `AggregateRating` — if clinic has verified review aggregation
- `VideoObject` — if procedure videos are added
- `SameAs` — entity linking to social profiles, directory listings

### GEO-Specific Files

**`/llms.txt`** — structured content guide for AI crawlers listing all pages with descriptions
**`/llms-full.txt`** — concatenated markdown of all key page content
**`/robots.txt`** — allow GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot; block CCBot

### E-E-A-T Signals

- Named clinician authorship on every page with link to bio page
- "Medically reviewed by [Name], [Credentials] on [Date]" byline
- Publication date and "Last reviewed" date visible + in schema
- GMC registration number, professional body memberships
- Inline citations to peer-reviewed studies with PubMed/journal links
- Harley Street address as geographic authority signal

---

## Google Ads Compliance Framework

### Triple-Layer Compliance

1. **Google Ads Policy (Speculative Medicine):**
   - All content is educational/informational, never promotional for specific treatments
   - Ad copy targets the consultation and educational assessment, not treatment purchase
   - No mention of "stem cell," "PRP," or "exosome" in ad headlines — use "non-surgical approaches" and "joint health assessment"
   - Landing pages read as genuine educational resources, not sales pages

2. **ASA/CAP Code (UK Advertising Standards):**
   - No absolute efficacy claims
   - Testimonials about consultation experience only, never treatment outcomes
   - Pricing presented as transparent informational context with qualification
   - No urgency tactics, countdown timers, or "limited availability" messaging
   - Balanced presentation including when surgery IS the appropriate option

3. **MHRA (Medicines Regulation):**
   - Regulatory status disclaimer on every page
   - No claims of MHRA/FDA approval for therapies that don't have it
   - Content does not position therapies as licensed medicines
   - Consultation framing: selling the assessment, not the treatment

### Compliant CTA Hierarchy

| CTA | Framing | Where |
|---|---|---|
| Primary | "Get Your Free Joint Health Score" | Hero, sticky bar |
| Secondary | "Book Your Free Strategy Consultation" | Score results |
| Tertiary | "Speak with a Specialist" | Footer |

All CTAs sell the CONSULTATION and ASSESSMENT, never the treatment itself. Every CTA accompanied by: "No obligation. Your consultant will assess your individual situation."

### Compliant Pricing Display

Pricing appears as informational context within educational treatment cards:
```
PRP Therapy — From £399 per session
(Final fees confirmed following assessment, based on individual treatment plan)
```
Never: "Buy PRP therapy for £399" or "Book your treatment — £399"

---

## Content Data Bank

### Key Statistics (With Sources)

| Statistic | Source | Use On |
|---|---|---|
| 20M people in UK with MSK conditions (32%) | Versus Arthritis 2025 | All pages — Problem section |
| 28-29 week average wait for knee replacement | NHS England 2026 | Knee, Hip pages |
| 7.1M working days lost to MSK annually | HSE 2024/25 | All pages — Problem section |
| Only 61.6% treated within 18-week target | King's Fund 2026 | All pages — NHS context |
| 1 in 200 die within 90 days of knee replacement | PMC | Knee page — Surgery risks |
| Steroid injections accelerate cartilage damage | RSNA 2025 | All pages — Steroid section |
| PRP reduced knee OA pain 45-65% at 12 months | AJSM 2023 | Knee page — PRP section |
| BMAC best long-term outcomes (4-year data) | Frontiers in Medicine 2024 | Knee, Hip pages — Stem cell section |
| Failed back surgery syndrome: 10-40% | StatPearls/NCBI | Back page — Surgery risks |
| Exosome therapy: 0.7% serious adverse events | NIH Meta-analysis 2024 | All pages — Exosome section |
| PRP beats steroid for gluteal tendinopathy at 12 weeks | PMC 2024 | Hip page — PRP section |
| Rotator cuff surgery retear rate: 11-94% by size | BMC MSK Disorders 2021 | Shoulder page — Surgery risks |
| PRP for plantar fasciitis: quicker recovery (10.2 vs 37.2 months) | MDPI J Clin Med 2022 | Foot/ankle — PRP section |
| Tennis elbow PRP: 83.9% success vs 68.3% control | Pabst et al. AJSM 2013 | Elbow page — PRP section |

### Clinical Studies Reference List

1. Frontiers in Medicine 2024 — Injection therapy comparison for knee OA
2. PMC 2023 — Culture-expanded MSC therapy for knee OA (12/15 RCTs positive)
3. PMC 2024 — PRP for degenerative meniscus tears
4. PMC 2025 — Non-surgical ACL treatment with BMC (2-year RCT)
5. Frontiers in Bioengineering 2024 — MSC-derived exosomes for knee OA
6. Nature Scientific Reports 2022 — RCT stem cell injection for tendon tear
7. Mayo Clinic 2024 — Regenerative medicine and shoulder surgery
8. PMC 2020 — Rotator cuff RCT with bone marrow concentrate
9. BMC MSK Disorders 2021 — Rotator cuff retear rates
10. MDPI J Clin Med 2022 — PRP vs plantar fasciotomy
11. Pabst et al. AJSM 2013 — PRP for tennis elbow (230 patients)
12. PMC 2024 — PRP for plantar fasciitis meta-analysis
13. PMC 2024 — Exosome safety meta-analysis
14. RSNA 2025 — Steroid injections worsen knee arthritis
15. The Lancet 2019 — Hip replacement longevity

---

## Project Structure

```
hsw-joint-pain/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── logo-white.png
│   │   └── [condition illustrations]
│   ├── llms.txt
│   ├── llms-full.txt
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (nav, footer, fonts, analytics)
│   │   ├── page.tsx                # Home page (/)
│   │   ├── [bodyArea]/
│   │   │   └── page.tsx            # Dynamic body area pages
│   │   └── api/
│   │       └── quiz-submit/
│   │           └── route.ts        # GoHighLevel webhook handler
│   ├── components/
│   │   ├── Nav.tsx                 # Sticky navigation with body area tabs
│   │   ├── TrustBar.tsx            # Rating/location/credential bar
│   │   ├── Hero.tsx                # Hero section with CTA
│   │   ├── SocialProof.tsx         # Stats counter strip
│   │   ├── StatsSection.tsx        # UK statistics cards
│   │   ├── ConditionCards.tsx      # Condition education grid
│   │   ├── TraditionalRisks.tsx    # Surgery/steroid risks section
│   │   ├── ComparisonTable.tsx     # Surgery vs regenerative table
│   │   ├── TreatmentCards.tsx      # PRP/Exosome/Stem Cell cards
│   │   ├── Quiz.tsx                # Improvement Score Quiz (lazy-loaded)
│   │   ├── QuizResults.tsx         # Score display + treatment match
│   │   ├── Testimonials.tsx        # Consultation experience carousel
│   │   ├── LocationTrust.tsx       # Map + clinician bio + trust badges
│   │   ├── FAQ.tsx                 # Accordion FAQ section
│   │   ├── Footer.tsx              # Footer + disclaimers
│   │   ├── StickyCtaBar.tsx        # Mobile sticky bottom CTA
│   │   └── ui/                     # Shared UI primitives
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Accordion.tsx
│   │       └── CountUp.tsx
│   ├── data/
│   │   ├── bodyAreas.ts            # Body area definitions + conditions
│   │   ├── treatments.ts           # Treatment data (PRP, Exosomes, Stem Cells)
│   │   ├── quizQuestions.ts        # Questions per body area
│   │   ├── faqs.ts                 # FAQ content per body area
│   │   ├── stats.ts                # UK statistics with sources
│   │   └── testimonials.ts         # Testimonial content
│   ├── lib/
│   │   ├── scoring.ts              # Quiz scoring algorithm
│   │   ├── ghl.ts                  # GoHighLevel webhook client
│   │   └── schema.ts               # JSON-LD schema generators
│   └── styles/
│       └── globals.css             # Tailwind imports + custom properties
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

### Key Technical Decisions

- **`[bodyArea]/page.tsx`** uses `generateStaticParams` to pre-render all 6 body area pages at build time
- **`data/` directory** contains all content as TypeScript objects — makes content management simple and type-safe
- **`Quiz.tsx`** is lazy-loaded via `next/dynamic` with `{ ssr: false }` — keeps initial page weight low
- **`api/quiz-submit/route.ts`** handles form submission server-side, posts to GoHighLevel webhook, returns score — keeps API keys secure
- **`lib/schema.ts`** generates JSON-LD schema objects per page — FAQPage, MedicalWebPage, MedicalClinic, etc.
- **All content** in `data/` files uses compliant language patterns — single source of truth for copy

---

## Out of Scope

- Patient portal / login system
- Online booking/calendar integration (CTA links to external booking or phone)
- Blog / content management system
- Multi-language support
- Payment processing
- Email marketing automation (GoHighLevel handles post-capture nurture)
- Video content production
- Google Business Profile setup (separate task)
- Google Ads campaign creation (separate task — pages are the landing destinations)

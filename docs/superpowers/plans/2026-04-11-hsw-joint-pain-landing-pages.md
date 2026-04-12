# HSW Joint Pain Landing Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-page Next.js landing page system for Harley Street Wellness targeting joint pain patients in London, with an Improvement Score Quiz feeding leads to GoHighLevel CRM.

**Architecture:** Static Site Generation via Next.js App Router. Each body area page (`/knee-pain`, `/hip-pain`, etc.) uses the same template component with condition-specific data injected from TypeScript data files. The quiz runs client-side, submits via API route to GoHighLevel webhook.

**Tech Stack:** Next.js 14+ (App Router), Tailwind CSS, TypeScript, Playfair Display + Inter fonts, Vercel deployment

**Spec:** `docs/superpowers/specs/2026-04-11-hsw-joint-pain-landing-pages-design.md`

---

## File Structure

```
hsw-joint-pain/
├── public/
│   ├── images/
│   │   └── logo.png
│   ├── llms.txt
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── [bodyArea]/
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── quiz-submit/
│   │           └── route.ts
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── TrustBar.tsx
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ConditionCards.tsx
│   │   ├── TraditionalRisks.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── TreatmentCards.tsx
│   │   ├── Quiz.tsx
│   │   ├── QuizResults.tsx
│   │   ├── StickyCtaBar.tsx
│   │   ├── Testimonials.tsx
│   │   ├── LocationTrust.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Accordion.tsx
│   │       ├── CountUp.tsx
│   │       └── FadeIn.tsx
│   ├── data/
│   │   ├── bodyAreas.ts
│   │   ├── treatments.ts
│   │   ├── quizQuestions.ts
│   │   ├── faqs.ts
│   │   ├── stats.ts
│   │   └── testimonials.ts
│   ├── lib/
│   │   ├── scoring.ts
│   │   ├── ghl.ts
│   │   └── schema.ts
│   └── styles/
│       └── globals.css
├── __tests__/
│   ├── scoring.test.ts
│   └── schema.test.ts
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `hsw-joint-pain/` (entire project scaffold)
- Create: `tailwind.config.ts`
- Create: `src/styles/globals.css`
- Create: `next.config.ts`

- [ ] **Step 1: Create Next.js project**

```bash
cd "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM"
npx create-next-app@latest hsw-joint-pain --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

Expected: Project created with default Next.js + Tailwind + TypeScript setup.

- [ ] **Step 2: Install dependencies**

```bash
cd "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM/hsw-joint-pain"
npm install @next/font
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Tailwind with design system colors and fonts**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4A843",
          dark: "#B8912E",
        },
        cream: "#FAF8F3",
        ivory: "#F5F0E8",
        charcoal: "#2C2C2C",
        "trust-green": "#1A6B4A",
        muted: "#888888",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "h1-mobile": ["1.75rem", { lineHeight: "1.25" }],
        "h1-desktop": ["2.625rem", { lineHeight: "1.25" }],
        "h2-mobile": ["1.375rem", { lineHeight: "1.3" }],
        "h2-desktop": ["2rem", { lineHeight: "1.3" }],
        "h3-mobile": ["1.125rem", { lineHeight: "1.4" }],
        "h3-desktop": ["1.5rem", { lineHeight: "1.4" }],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06)",
        cta: "0 4px 12px rgba(212,168,67,0.3)",
        quiz: "0 8px 32px rgba(0,0,0,0.06)",
        sticky: "0 -4px 20px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        card: "12px",
        button: "10px",
        pill: "20px",
      },
      maxWidth: {
        page: "1200px",
        quiz: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Set up globals.css with custom properties and font imports**

Replace `src/styles/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-gold: #D4A843;
  --color-gold-dark: #B8912E;
  --color-cream: #FAF8F3;
  --color-ivory: #F5F0E8;
  --color-charcoal: #2C2C2C;
  --color-trust-green: #1A6B4A;
  --color-muted: #888888;

  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;

  --shadow-card: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-cta: 0 4px 12px rgba(212,168,67,0.3);
  --shadow-quiz: 0 8px 32px rgba(0,0,0,0.06);
  --shadow-sticky: 0 -4px 20px rgba(0,0,0,0.08);
}

@layer base {
  body {
    @apply bg-cream text-charcoal font-sans;
    font-size: 16px;
    line-height: 1.7;
  }

  h1, h2, h3 {
    @apply font-serif;
  }

  @media (min-width: 1024px) {
    body {
      font-size: 18px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Configure next.config.ts**

Replace `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Note: Using `output: "export"` for fully static site. If GoHighLevel API route is needed server-side, remove this and deploy to Vercel with serverless functions. For now we keep static export and handle quiz submission client-side or switch later.

- [ ] **Step 6: Set up root layout with fonts**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "../styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harley Street Wellness | Joint Pain Education & Assessment",
  description:
    "Educational resources about non-surgical approaches to joint pain. Take a free joint health assessment at our Harley Street clinic in London.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Copy logo to public directory**

```bash
cp "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM/logo (2).png" "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM/hsw-joint-pain/public/images/logo.png"
```

- [ ] **Step 8: Verify project builds**

```bash
cd "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM/hsw-joint-pain"
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 9: Configure vitest**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Add to `package.json` scripts: `"test": "vitest run", "test:watch": "vitest"`

- [ ] **Step 10: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with Tailwind design system"
```

---

### Task 2: Data Layer — Body Areas & Conditions

**Files:**
- Create: `src/data/bodyAreas.ts`

- [ ] **Step 1: Define TypeScript types and body area data**

Create `src/data/bodyAreas.ts`:

```typescript
export interface Condition {
  slug: string;
  name: string;
  icon: string;
  description: string; // 134-167 words, self-contained, compliant
  symptoms: string[];
  progression: string; // What happens if untreated
}

export interface BodyArea {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  headline: string; // H1 — message-matched to ad
  subheadline: string;
  heroDescription: string; // 130-160 word intro
  conditions: Condition[];
  surgeryRisks: string; // 134-167 word block about surgery risks for this joint
  steroidRisks: string; // Steroid injection risks specific to this joint
  comparisonNote: string; // Where surgery IS the better option for this joint
}

export const bodyAreas: BodyArea[] = [
  {
    slug: "knee-pain",
    name: "Knee Pain",
    shortName: "Knee",
    icon: "🦵",
    headline: "Understanding Your Knee Pain Options",
    subheadline:
      "Take our 2-minute joint health assessment to explore which non-surgical approaches may be suitable for your condition.",
    heroDescription:
      "Knee pain affects millions of people across the UK, with over 20 million adults living with a musculoskeletal condition according to Versus Arthritis (2025). Whether caused by osteoarthritis, a meniscus tear, or ligament damage, chronic knee pain can significantly limit your daily activities and quality of life. The average NHS waiting time for knee replacement surgery is 28-29 weeks, and many patients are seeking to understand the full range of options available to them. This educational resource explores non-surgical regenerative approaches including PRP therapy, exosome therapy, and regenerative cell therapy. Our goal is to help you make informed decisions about your joint health by presenting the current evidence base alongside traditional treatment pathways. Every patient's situation is unique, and a thorough medical assessment is the essential first step.",
    conditions: [
      {
        slug: "osteoarthritis",
        name: "Knee Osteoarthritis",
        icon: "🦴",
        description:
          "Knee osteoarthritis is a degenerative condition characterised by the gradual breakdown of cartilage that cushions the joint surfaces. According to NHS data, osteoarthritis affects approximately 1 in 5 adults over the age of 45 in the UK. Early symptoms typically include intermittent aching on the inner side of the knee and occasional swelling after activity. As the condition progresses, patients may experience persistent pain throughout the knee, morning stiffness lasting 30 minutes or more, a grinding or crunching sensation during movement, and visible swelling. Without intervention, cartilage continues to wear until bone-on-bone contact develops, leading to significant functional limitation, muscle atrophy around the joint, and altered gait patterns. Research published in Frontiers in Medicine (2024) compared injection therapies for knee osteoarthritis and found varying outcomes across cortisol, hyaluronic acid, PRP, and bone marrow aspirate concentrate approaches.",
        symptoms: [
          "Intermittent aching, especially on the inner knee",
          "Morning stiffness lasting 30+ minutes",
          "Grinding or crunching sensation during movement",
          "Swelling after activity",
          "Reduced range of motion",
          "Muscle weakness around the knee",
        ],
        progression:
          "Without management, cartilage loss accelerates. Bone spurs develop, pain becomes constant, and mobility significantly decreases. Compensatory gait changes may lead to secondary problems in the hip and lower back.",
      },
      {
        slug: "meniscus-tears",
        name: "Meniscus Tears",
        icon: "💥",
        description:
          "A meniscus tear involves damage to the C-shaped cartilage that acts as a shock absorber between the thighbone and shinbone. Meniscus tears are among the most common knee injuries, with degenerative tears frequently occurring in adults over 40 and traumatic tears common in younger, active individuals. Typical symptoms include pain when twisting or rotating the knee, swelling and stiffness, difficulty fully straightening the leg, and a locking or catching sensation during movement. Many patients describe a feeling of instability, as though the knee might give way. A 2024 systematic review published in PMC examined PRP therapy for degenerative meniscus tears and found variable MRI outcomes but significant improvements in pain scores. Conservative management including physiotherapy is often the first approach, with surgical intervention reserved for tears that cause persistent mechanical symptoms such as locking.",
        symptoms: [
          "Pain when twisting or rotating the knee",
          "Swelling and stiffness",
          "Difficulty fully straightening the leg",
          "Locking or catching sensation",
          "Feeling of knee instability",
        ],
        progression:
          "Untreated meniscus tears can lead to increased cartilage wear, accelerating the development of osteoarthritis. Mechanical symptoms like locking may worsen over time.",
      },
      {
        slug: "acl-tears",
        name: "ACL Tears",
        icon: "⚡",
        description:
          "An anterior cruciate ligament (ACL) tear is a significant knee injury that commonly occurs during sports involving sudden stops, direction changes, or pivoting movements. At the time of injury, many patients report hearing or feeling a distinct 'pop' in the knee, followed by rapid swelling, severe pain, and instability. The knee often feels as though it will give way during activities that require cutting or pivoting. ACL tears can range from partial to complete, and the choice of treatment depends on the patient's activity level, age, and the degree of instability. A 2025 randomised controlled trial published in PMC compared non-surgical treatment of ACL tears using bone marrow concentrate and platelet products against exercise therapy alone, with two-year follow-up data showing differing outcomes between groups. Reconstruction surgery remains common for active individuals, though non-surgical approaches are increasingly being studied.",
        symptoms: [
          "Sudden 'pop' sensation at time of injury",
          "Rapid swelling within hours",
          "Severe pain and inability to continue activity",
          "Knee instability during pivoting or cutting",
          "Loss of full range of motion",
        ],
        progression:
          "Without treatment, ACL-deficient knees may experience recurrent instability episodes, increasing the risk of meniscus tears and accelerated osteoarthritis development.",
      },
    ],
    surgeryRisks:
      "Knee replacement surgery involves a 7-8 inch incision, typically requires 3-5 days of hospital stay, and 1-3 months of walking with aids before full mobility returns. According to published clinical data, the overall complication rate ranges from 1.65% to 11.3%, with blood clots occurring in 0.6-3% of patients and infection in less than 2%. One of the most concerning statistics from PMC research indicates that 1 in 200 patients die within 90 days of knee replacement surgery. Stiffness (arthrofibrosis) is one of the most common complications, and long-term osteolysis from prosthetic debris can lead to bone loss. While 85% of implants last 20 years, approximately 10% of patients will eventually require complex revision surgery. Full recovery typically takes 3-12 months, during which many patients require opioid pain medication. It is important to note that approximately 5-20% of patients report persistent pain even after successful knee replacement.",
    steroidRisks:
      "A 2025 study presented at the Radiological Society of North America (RSNA) found that corticosteroid injections led to more knee joint damage over two years compared to control groups and hyaluronic acid groups. Corticosteroids provide short-term relief, typically lasting 6-8 weeks, but research indicates they may impair cartilage repair mechanisms and inhibit matrix synthesis. Chronic use has been associated with accelerated osteoarthritis progression, subchondral insufficiency fractures, and in some cases rapid joint destruction including bone loss. Methylprednisolone shows dose-dependent deleterious effects on cartilage, which is why clinicians typically limit injections to no more than once every 6 weeks.",
    comparisonNote:
      "Knee replacement surgery remains the appropriate option for patients with severe, end-stage osteoarthritis (Kellgren-Lawrence grade IV) who have exhausted conservative treatments. For advanced bone-on-bone degeneration with significant functional limitation, total knee replacement offers durable long-term outcomes.",
  },
  {
    slug: "hip-pain",
    name: "Hip Pain",
    shortName: "Hip",
    icon: "🦴",
    headline: "Understanding Your Hip Pain Options",
    subheadline:
      "Take our 2-minute joint health assessment to explore which non-surgical approaches may be suitable for your hip condition.",
    heroDescription:
      "Hip pain is one of the most common musculoskeletal complaints in the UK, significantly affecting mobility, sleep quality, and overall quality of life. The NHS waiting time for hip replacement surgery averages approximately 27 weeks, with some regions facing considerably longer delays. Many patients experience hip pain from conditions including osteoarthritis, labral tears, bursitis, and tendon injuries, each requiring a different approach to management. This educational resource examines the range of options available for hip pain, from traditional treatments to regenerative approaches that research is continuing to explore. Understanding the evidence behind each approach allows you to have more informed conversations with your healthcare providers. At Harley Street Wellness, our GMC-registered specialists provide thorough consultations to assess your individual situation and discuss which pathways may be most appropriate for your specific condition.",
    conditions: [
      {
        slug: "hip-arthritis",
        name: "Hip Arthritis & Osteoarthritis",
        icon: "🦴",
        description:
          "Hip osteoarthritis involves the progressive deterioration of cartilage within the hip joint, leading to pain, stiffness, and reduced range of motion. It is one of the most prevalent forms of arthritis, with the hip being the second most commonly affected joint after the knee. Patients typically first notice groin pain and stiffness, particularly in the morning or after prolonged sitting. As the condition progresses, pain may worsen with activity and eventually become constant, making daily tasks such as walking, climbing stairs, bending, and putting on shoes increasingly difficult. Research published in The Lancet (2019) examined hip replacement longevity, finding that 80-85% of implants last 20 years. However, studies have also explored regenerative approaches, with evidence suggesting that stem cell-based injections may help slow or support early cartilage maintenance in some patients with mild to moderate hip arthritis. Individual assessment determines suitability.",
        symptoms: [
          "Groin pain that may radiate to the thigh",
          "Morning stiffness lasting 30+ minutes",
          "Reduced range of motion",
          "Difficulty walking, climbing stairs, or bending",
          "'Starting pain' upon standing after sitting",
          "Pain that worsens with activity",
        ],
        progression:
          "Cartilage loss accelerates without management. Compensatory gait changes can lead to secondary problems in knees, back, and the opposite hip. Progressive loss of mobility and independence often follows.",
      },
      {
        slug: "labrum-tears",
        name: "Hip Labrum Tears",
        icon: "💥",
        description:
          "A hip labral tear involves damage to the ring of cartilage (labrum) that follows the outside rim of the hip joint socket, helping to hold the head of the femur securely in place. Labral tears may result from structural abnormalities such as femoroacetabular impingement (FAI), repetitive movements common in sports, or degenerative changes associated with ageing. Patients typically experience deep groin pain, a clicking or catching sensation in the hip, pain during hip rotation or prolonged sitting, and a feeling of instability. Hip arthroscopy for labral repair has an overall success rate of approximately 85-90%, though research shows that labral debridement has a failure rate of 63.6% compared to 22.8% for labral repair or reconstruction. Recovery from arthroscopic hip surgery typically requires 3-6 months. Regenerative approaches are being studied as potential complementary options to support healing.",
        symptoms: [
          "Deep groin pain",
          "Clicking or catching sensation in the hip",
          "Pain with hip rotation or prolonged sitting",
          "Feeling of hip instability",
          "Sharp pain with certain movements",
        ],
        progression:
          "Untreated labral tears can lead to accelerated cartilage wear and early-onset osteoarthritis in the hip joint.",
      },
      {
        slug: "bursitis",
        name: "Hip Bursitis",
        icon: "🔥",
        description:
          "Hip bursitis, also known as greater trochanteric pain syndrome (GTPS), involves inflammation of the fluid-filled sacs (bursae) that cushion the bones, tendons, and muscles near the hip joint. It causes pain on the outside of the hip that is often worse when lying on the affected side, climbing stairs, or after prolonged walking. The condition is particularly common in middle-aged and older adults, and in runners. A network meta-analysis published in PMC (2024) examined treatments for greater trochanteric pain syndrome and found that PRP injection had the highest probability of being the most effective treatment at both 1-3 months and 6-12 months follow-up. The study also found that while steroid injections provided initial improvement, the benefit was maximal at 6 weeks and not sustained beyond 24 weeks, whereas PRP showed sustained improvement at 2 years.",
        symptoms: [
          "Pain on the outside of the hip",
          "Tenderness over the greater trochanter",
          "Pain worse when lying on the affected side",
          "Pain climbing stairs or after prolonged walking",
          "Pain radiating down the outer thigh",
        ],
        progression:
          "Chronic bursitis may lead to ongoing pain, sleep disruption, and compensatory movement patterns that affect other joints.",
      },
    ],
    surgeryRisks:
      "Hip replacement surgery requires a recovery period of 2-4 weeks initially, with 3-6 months needed to return to low-impact activities and up to 1 year for full muscle recovery. Published data indicates serious complications occur in less than 1 in 100 procedures, blood clots develop in approximately 5% of patients in the legs and 1-2% in the lungs, and nerve injury occurs in 0.6-3.7% of cases. The overall mortality rate is 0.2-0.3%. Approximately 1 in 10 patients will require revision surgery, though 80-85% of hip implants last 20 years. Hip arthroscopy for labral repair carries its own risks, with temporary groin numbness affecting approximately 5% of patients and recovery requiring 3-6 months.",
    steroidRisks:
      "As with other joints, corticosteroid injections in the hip provide temporary relief but carry risks of cartilage damage with repeated use. Research indicates that steroid injection relief is typically short-term, lasting 6-12 weeks, and the benefit diminishes with repeat injections. For greater trochanteric pain syndrome specifically, PRP has demonstrated sustained improvement at 2 years versus steroid improvement that was not maintained beyond 24 weeks.",
    comparisonNote:
      "Total hip replacement remains the definitive option for severe, end-stage hip arthritis with significant bone-on-bone degeneration. For patients with advanced disease who have exhausted conservative options, hip replacement offers excellent long-term pain relief and functional improvement.",
  },
  {
    slug: "shoulder-pain",
    name: "Shoulder Pain",
    shortName: "Shoulder",
    icon: "💪",
    headline: "Understanding Your Shoulder Pain Options",
    subheadline:
      "Take our 2-minute joint health assessment to explore which non-surgical approaches may be suitable for your shoulder condition.",
    heroDescription:
      "Shoulder pain is one of the most common reasons patients seek orthopaedic consultation, with conditions ranging from rotator cuff tears to frozen shoulder affecting people of all ages. The shoulder is the most mobile joint in the body, which makes it particularly vulnerable to injury and degeneration. Many shoulder conditions can significantly impact daily activities including reaching, lifting, sleeping, and personal care. Traditional treatment pathways often begin with physiotherapy and pain management, progressing to steroid injections and potentially surgical intervention. However, published research is exploring how regenerative approaches may support healing in certain shoulder conditions. This educational resource presents the current evidence for both traditional and regenerative approaches, helping you understand your options before consulting with a specialist. Every shoulder condition has unique characteristics that require individual assessment.",
    conditions: [
      {
        slug: "rotator-cuff",
        name: "Rotator Cuff Tears",
        icon: "💥",
        description:
          "Rotator cuff tears involve damage to one or more of the four tendons that stabilise the shoulder joint and enable arm rotation. These tears may be partial or full-thickness, and can result from acute injury or gradual degeneration over time. Patients typically experience pain when reaching overhead or behind the back, weakness in the arm, difficulty lifting objects, and night pain that disrupts sleep. Published data on rotator cuff repair surgery shows an overall complication rate of approximately 10.5%, with retear rates ranging from 11% for small tears to as high as 94% for massive tears. A Mayo Clinic study (2024) examining real-world evidence found that bone marrow aspirate concentrate used during rotator cuff repair was associated with a nearly threefold reduction in revision surgery rates. A separate 2020 RCT found that BMAC treatment significantly improved function and pain at 3 months compared to exercise therapy alone.",
        symptoms: [
          "Pain when reaching overhead or behind the back",
          "Weakness in the arm",
          "Difficulty lifting objects",
          "Night pain, especially lying on affected side",
          "Crackling sensation with movement",
          "Progressive weakness over time",
        ],
        progression:
          "Partial tears may enlarge to full-thickness tears over time. Muscle atrophy develops from disuse, making eventual repair more challenging and outcomes less predictable.",
      },
      {
        slug: "frozen-shoulder",
        name: "Frozen Shoulder",
        icon: "❄️",
        description:
          "Frozen shoulder (adhesive capsulitis) is a condition characterised by progressive stiffness and pain in the shoulder joint, affecting 2-5.3% of the population. The condition typically progresses through three stages: the freezing stage (increasing pain over 6-9 months), the frozen stage (stiffness with reduced range of motion lasting 4-12 months), and the thawing stage (gradual improvement over 6-24 months). The total duration can span 1-3 years. It is more common in patients with diabetes and after prolonged periods of immobilisation. A systematic review published in PMC (2023) examined PRP therapy for frozen shoulder and found that both PRP and steroid injections improved outcomes at 3 months, but PRP demonstrated significantly better range of motion in passive forward flexion and improved SPADI scores compared to steroid injection, with no reported side effects beyond injection-site discomfort.",
        symptoms: [
          "Gradually increasing shoulder pain",
          "Progressive stiffness and loss of range of motion",
          "Difficulty with daily tasks (dressing, reaching)",
          "Pain that may wake you at night",
          "Stiffness worse in the morning",
        ],
        progression:
          "While frozen shoulder typically resolves on its own over 1-3 years, some patients retain permanent stiffness without intervention. The condition can significantly impact quality of life during its course.",
      },
      {
        slug: "impingement",
        name: "Shoulder Impingement",
        icon: "⚠️",
        description:
          "Shoulder impingement syndrome occurs when the tendons of the rotator cuff become compressed or irritated as they pass through the subacromial space — the narrow passage beneath the acromion bone at the top of the shoulder. This compression causes pain and inflammation, particularly when lifting the arm above shoulder height. The condition is common in people who perform repetitive overhead movements, including swimmers, painters, and construction workers. Initial treatment typically involves physiotherapy focused on rotator cuff strengthening and postural correction, along with anti-inflammatory medication. Steroid injections may provide short-term relief. If conservative management fails after 3-6 months, subacromial decompression surgery may be considered. Research has explored PRP therapy as a potential supportive approach, with its anti-inflammatory properties and growth factors potentially helping to reduce tendon irritation. However, chronic impingement left untreated can lead to rotator cuff tears.",
        symptoms: [
          "Pain when lifting arm above shoulder height",
          "Pain reaching behind the back",
          "Weakness and difficulty with overhead activities",
          "Night pain when lying on the shoulder",
          "Aching pain at rest that worsens with activity",
        ],
        progression:
          "Chronic impingement can lead to tendon degeneration and eventually rotator cuff tears if the underlying compression is not addressed.",
      },
    ],
    surgeryRisks:
      "Rotator cuff repair surgery has an overall complication rate of approximately 10.5% for both arthroscopic and open procedures. Nerve injury occurs in 1-2% of cases, and retear rates vary dramatically by tear size — from 5-15% for small tears to 30-50% for large and massive tears. Recovery requires 6 weeks of initial healing, 3 months for strong tendon attachment, and 6-9 months for complete healing, with patients typically not feeling normal until 9 months post-surgery. A blinded randomised controlled trial for SLAP (labrum) repairs showed no clinical differences between surgical repair, biceps tenodesis, and sham surgery at 2 years — suggesting that for some shoulder conditions, supervised physiotherapy may achieve equivalent long-term outcomes.",
    steroidRisks:
      "Corticosteroid injections in the shoulder provide temporary pain relief, typically lasting weeks to months. However, repeated steroid injections near tendons carry a risk of tendon weakening, potentially increasing the risk of full-thickness tears. This is particularly concerning for patients with existing partial rotator cuff tears, where steroid-induced tendon degeneration could accelerate progression to a complete tear.",
    comparisonNote:
      "Surgical repair remains the recommended approach for acute, full-thickness rotator cuff tears in active patients, particularly when the tear results from trauma. Large tears with significant retraction are best addressed surgically before muscle atrophy becomes irreversible.",
  },
  {
    slug: "back-pain",
    name: "Back Pain",
    shortName: "Back",
    icon: "🔙",
    headline: "Understanding Your Back Pain Options",
    subheadline:
      "Take our 2-minute assessment to explore which non-surgical approaches may be suitable for your back condition.",
    heroDescription:
      "Back pain is the leading cause of disability in the UK, affecting approximately 1 in 5 adults and costing the economy an estimated 10-12 billion pounds per year according to published research in the British Journal of Pain (2024). NHS primary care costs alone for back pain amount to 3.2 billion pounds annually. Whether caused by disc herniation, sciatica, or spinal degeneration, chronic back pain can profoundly impact every aspect of daily life. One of the most concerning aspects of back surgery is the prevalence of Failed Back Surgery Syndrome (FBSS), which affects 10-40% of patients according to StatPearls (NCBI). This educational resource explores the full spectrum of options from conservative management to regenerative approaches, presenting the current evidence to help you understand what may be suitable for your situation. A thorough assessment by a qualified specialist is essential before considering any treatment pathway.",
    conditions: [
      {
        slug: "disc-herniation",
        name: "Disc Herniation & Bulging Discs",
        icon: "💥",
        description:
          "A disc herniation occurs when the soft, gel-like centre of a spinal disc pushes through a tear in the tougher exterior, potentially compressing nearby nerves. This can cause sharp, burning pain in the lower back that radiates to the buttock and leg, along with numbness, tingling, or muscle weakness in the affected area. Symptoms are often worse with sitting, bending, or coughing. Microdiscectomy — the surgical removal of herniated disc material — has a failure rate of 19-25% according to published data, with re-herniation at the same level occurring in 5-15% of patients within 2 years. Recovery from microdiscectomy typically takes 6-12 weeks, while spinal fusion requires 3-6 months with up to 1 year for bone consolidation. Regenerative approaches including PRP and stem cell injections are being studied for their potential to support disc repair, with some published data showing improvements in pain and function scores.",
        symptoms: [
          "Sharp, burning pain in the lower back",
          "Pain radiating to buttock and leg",
          "Numbness or tingling in affected area",
          "Muscle weakness in the leg",
          "Symptoms worse with sitting or bending",
        ],
        progression:
          "Without management, disc height may reduce and nerve compression can worsen, leading to chronic pain, progressive weakness, and numbness.",
      },
      {
        slug: "sciatica",
        name: "Sciatica",
        icon: "⚡",
        description:
          "Sciatica refers to pain that radiates along the path of the sciatic nerve, which branches from the lower back through the hips and buttocks and down each leg. It typically occurs when a herniated disc, bone spur, or narrowing of the spine compresses part of the nerve. The pain can range from a mild ache to sharp, burning, or electric-shock-like sensations, and usually affects only one side of the body. Many cases of sciatica resolve with conservative management within 4-6 weeks, including physiotherapy and pain medication. However, chronic sciatica lasting more than 12 weeks may require more interventional approaches. Epidural steroid injections provide temporary relief of nerve inflammation but do not address the underlying cause. Research has explored fluoroscopy-guided PRP injections to deliver concentrated growth factors directly to the affected area, with some studies showing improvements in pain ratings and quality of life measures.",
        symptoms: [
          "Pain radiating from lower back through buttock and down leg",
          "Sharp, burning, or electric-shock-like pain",
          "Usually affects one side only",
          "Numbness, tingling, or weakness in affected leg",
          "Pain worse with prolonged sitting",
        ],
        progression:
          "Most acute sciatica resolves within weeks. Chronic sciatica can lead to persistent nerve irritation, progressive weakness, and significant impact on work and daily activities.",
      },
      {
        slug: "spinal-degeneration",
        name: "Spinal Degeneration",
        icon: "🔗",
        description:
          "Degenerative disc disease is a chronic condition in which the intervertebral discs gradually lose hydration, height, and structural integrity over time. This leads to chronic, dull aching in the lower back that worsens with sitting, bending, or twisting, interspersed with episodes of severe pain. As discs deteriorate, they can lead to spinal stenosis — a narrowing of the spinal canal that compresses nerves. Lumbar spinal fusion, a common surgical intervention, has a failure rate of 30-46% according to published clinical data, with 36% of patients developing transition syndrome within 5 years — degeneration at adjacent spinal levels caused by the altered mechanics of fusion. Success rates diminish dramatically with repeat surgeries: approximately 50% for the first operation, 30% for the second, 15% for the third, and 5% for the fourth. Intradiscal stem cell injection is being studied for its potential to support disc structure and hydration.",
        symptoms: [
          "Chronic, dull aching in the lower back",
          "Pain worsens with sitting, bending, or twisting",
          "Intermittent episodes of severe pain",
          "Stiffness and reduced flexibility",
          "Pain that may radiate to legs if nerves compressed",
        ],
        progression:
          "Disc height continues to reduce, potentially leading to spinal stenosis, chronic nerve compression, and significant functional limitation.",
      },
    ],
    surgeryRisks:
      "Back surgery carries some of the highest failure rates in orthopaedic surgery. Failed Back Surgery Syndrome affects 10-40% of patients according to StatPearls (NCBI), with chronic pain after spinal surgery occurring in approximately 15% of cases. Lumbar spinal fusion has a failure rate of 30-46%, and 36% develop transition syndrome within 5 years. Microdiscectomy failure rate is 19-25%, with 5-15% re-herniation within 2 years. The infection risk ranges from 5-10%, and recovery from spinal fusion takes 3-6 months with up to 1 year for bone consolidation. Perhaps most concerning, success rates diminish dramatically with each subsequent surgery.",
    steroidRisks:
      "Epidural steroid injections for back pain provide temporary relief of nerve inflammation, typically lasting weeks to months. They do not address the underlying structural cause and their benefit diminishes with repeat injections. Long-term use carries risks of bone density reduction and potential hormonal effects. Multiple studies have questioned the long-term value of repeated epidural steroid injections for chronic back conditions.",
    comparisonNote:
      "Surgery remains essential for patients experiencing cauda equina syndrome (a rare but serious condition requiring emergency intervention) and for those with progressive neurological deficits including significant muscle weakness or loss of bowel/bladder control.",
  },
  {
    slug: "elbow-pain",
    name: "Elbow Pain",
    shortName: "Elbow",
    icon: "💪",
    headline: "Understanding Your Elbow Pain Options",
    subheadline:
      "Take our 2-minute assessment to explore which non-surgical approaches may be suitable for your elbow condition.",
    heroDescription:
      "Elbow pain can significantly impact your ability to work, exercise, and perform everyday tasks. Conditions such as tennis elbow, golfer's elbow, and elbow bursitis are among the most common causes of elbow discomfort, affecting people across all activity levels. Tennis elbow alone accounts for a substantial proportion of upper limb pain consultations in the UK. Traditional management typically includes rest, bracing, physiotherapy with eccentric exercises, and anti-inflammatory medication. When conservative measures fail, steroid injections may provide short-term relief, though recurrence rates are high. Interestingly, a blinded randomised controlled trial suggested that outcomes of tennis elbow surgery are very similar to outcomes after sham surgery, questioning the rationale for surgical intervention in some cases. This educational resource examines the current evidence for all approaches, including regenerative therapies that research is exploring for tendon conditions.",
    conditions: [
      {
        slug: "tennis-elbow",
        name: "Tennis & Golfer's Elbow",
        icon: "🎾",
        description:
          "Tennis elbow (lateral epicondylitis) and golfer's elbow (medial epicondylitis) are tendon overuse conditions causing pain on the outside or inside of the elbow respectively. Tennis elbow causes pain and burning on the outer elbow with weak grip strength, worsened by forearm activities such as turning a doorknob or shaking hands. Golfer's elbow causes inner elbow pain with stiffness and weakness in the hands. A randomised controlled trial by Pabst et al. published in the American Journal of Sports Medicine (2013) studied 230 patients with tennis elbow and found success rates of 83.9% in the PRP group versus 68.3% in the control group at 24 weeks, with pain improvement of 71.5% in the PRP group versus 56.1% in controls. However, the Cochrane review found moderate-certainty evidence that PRP does not provide patient-important benefits compared with placebo, highlighting the complexity of the evidence base.",
        symptoms: [
          "Pain on the outside (tennis) or inside (golfer's) of the elbow",
          "Weak grip strength",
          "Pain worsened by forearm activity",
          "Stiffness in the elbow",
          "Pain when lifting or gripping objects",
        ],
        progression:
          "Chronic tendon degeneration may replace initial inflammation. Grip strength progressively weakens, and daily activities become increasingly difficult.",
      },
      {
        slug: "elbow-bursitis",
        name: "Elbow Bursitis & Arthritis",
        icon: "🔥",
        description:
          "Elbow bursitis (olecranon bursitis) involves swelling of the fluid-filled sac at the tip of the elbow, causing pain with movement or pressure, and visible swelling. It can result from trauma, prolonged pressure on the elbow, infection, or inflammatory conditions. Elbow arthritis, while less common than in weight-bearing joints, causes pain, swelling, stiffness, and reduced range of motion, sometimes with locking or catching sensations. If the ulnar nerve is affected, numbness in the ring and little fingers may develop. Conservative treatment includes rest, ice, compression, NSAIDs, and physiotherapy. Steroid injections provide short-term relief but have high recurrence rates for elbow conditions. Surgery for tennis elbow includes ECRB release — with a percutaneous approach allowing return to work at 2 weeks versus 15 weeks for open surgery. PRP therapy for elbow conditions targets growth factor delivery to promote tendon regeneration and reduce inflammation.",
        symptoms: [
          "Swelling at the tip of the elbow (bursitis)",
          "Pain with movement or pressure",
          "Stiffness and reduced range of motion (arthritis)",
          "Locking or catching sensation",
          "Numbness in ring and little fingers (if nerve affected)",
        ],
        progression:
          "Chronic bursitis can become recurrent. Elbow arthritis may progressively limit range of motion and cause ulnar nerve compression.",
      },
    ],
    surgeryRisks:
      "Surgery for tennis elbow has varying recovery times, with percutaneous approaches allowing return to work at 2 weeks compared to 15 weeks for open surgery. Success rates range from 80-97% for various procedures. However, a blinded randomised controlled trial suggested outcomes of tennis elbow surgery are very similar to outcomes after sham (placebo) surgery or no treatment, raising important questions about the value of surgical intervention. Risks include posterolateral instability, neuroma formation, and late return to work or sport.",
    steroidRisks:
      "Steroid injections for elbow conditions provide short-term relief but are associated with high recurrence rates. For tennis elbow specifically, steroid injections often provide initial improvement that reverses within months, with some studies showing worse long-term outcomes than no treatment at all due to disruption of the natural healing process.",
    comparisonNote:
      "Surgical intervention may be appropriate for patients who have failed 6-12 months of comprehensive conservative treatment and continue to experience significant functional limitation.",
  },
  {
    slug: "hand-wrist-foot-ankle",
    name: "Hand, Wrist, Foot & Ankle Pain",
    shortName: "Extremities",
    icon: "🤲",
    headline: "Understanding Your Hand, Wrist, Foot & Ankle Pain Options",
    subheadline:
      "Take our 2-minute assessment to explore which non-surgical approaches may be suitable for your condition.",
    heroDescription:
      "Pain in the hands, wrists, feet, and ankles can profoundly affect your ability to perform daily tasks, from typing and gripping to walking and exercising. These smaller joints are susceptible to a range of conditions including osteoarthritis, trigger finger, plantar fasciitis, and tendon injuries. While these may seem like minor complaints, chronic pain in the extremities can significantly reduce quality of life and independence. Traditional management ranges from splinting and physiotherapy to steroid injections and surgical release procedures. Research is increasingly exploring how regenerative approaches including PRP therapy may support healing in soft tissue injuries of the hands, wrists, feet, and ankles. A 2022 randomised prospective study published in the MDPI Journal of Clinical Medicine found that PRP demonstrated quicker recovery (10.2 months average) compared to surgery (37.2 months) for plantar fasciitis. Individual assessment is essential to determine the most appropriate pathway.",
    conditions: [
      {
        slug: "plantar-fasciitis",
        name: "Plantar Fasciitis",
        icon: "🦶",
        description:
          "Plantar fasciitis is one of the most common causes of heel pain, caused by inflammation and degeneration of the plantar fascia — the thick band of tissue connecting the heel bone to the toes. Patients typically experience sharp heel pain with their first steps in the morning that usually improves with movement but returns after prolonged standing. It most commonly affects one foot and is prevalent among runners, people who are overweight, and those who wear shoes with inadequate support. A 2024 systematic review and meta-analysis published in PMC found that PRP is more effective than corticosteroid injections, extracorporeal shockwave therapy, and placebo in reducing pain and improving function for plantar fasciitis. A separate 2022 study comparing PRP to partial plantar fasciotomy surgery found PRP group recovery averaged 10.2 months compared to 37.2 months for the surgical group, with lower complication rates in the PRP cohort.",
        symptoms: [
          "Sharp heel pain with first steps in the morning",
          "Pain after prolonged standing",
          "Pain when standing after sitting",
          "Usually affects one foot",
          "Pain improves with movement but returns after activity",
        ],
        progression:
          "Chronic plantar fasciitis can lead to altered gait patterns, which in turn may cause secondary knee, hip, and back problems.",
      },
      {
        slug: "trigger-finger",
        name: "Trigger Finger & Hand Conditions",
        icon: "🤚",
        description:
          "Trigger finger (stenosing tenosynovitis) occurs when the tendon sheath in a finger becomes inflamed, causing the finger to catch or lock when bent. Patients experience a painful clicking or snapping sensation, stiffness especially in the morning, and sometimes a palpable bump at the base of the affected finger. In severe cases, the finger may become permanently locked. Initial treatment with steroid injection has approximately 90% success rate, with 66.3% of patients needing no further treatment. However, 30.5% require re-injection within 6 months and 3.2% proceed to surgery within 1 year. Hand and wrist osteoarthritis, particularly at the base of the thumb, causes pain, stiffness, reduced grip strength, and difficulty with fine motor tasks. Bony enlargements known as Heberden's and Bouchard's nodes may develop. PRP and regenerative approaches are being studied for their potential to support tendon healing and reduce inflammation in these conditions.",
        symptoms: [
          "Finger catching or locking when bent",
          "Painful clicking or snapping sensation",
          "Stiffness, especially in the morning",
          "Bump at the base of the affected finger",
          "Reduced grip strength (OA)",
        ],
        progression:
          "Trigger finger may progress from occasional catching to permanent locking. Hand OA can lead to joint deformity and severe functional limitation.",
      },
      {
        slug: "ankle-tendon",
        name: "Ankle Tendon & Ligament Injuries",
        icon: "🦶",
        description:
          "Ankle tendon injuries, particularly Achilles tendinopathy, involve pain and stiffness along the Achilles tendon that is typically worst in the morning and worsens with activity. The tendon may become swollen and thickened. Ankle ligament tears from sprains can lead to chronic instability if not properly rehabilitated. Published research has explored PRP therapy for Achilles tendon conditions, with studies showing improvements in pain intensity and functional ability. One study found that implanting PRP gel into Achilles tears in athletes improved range of motion and function more quickly than open suture repair. Level 4 evidence also showed no reruptures at 2.5 years after open Achilles repair augmented with bone marrow aspirate concentrate. Ankle osteoarthritis, while less common than knee or hip OA, causes pain, stiffness, and reduced range of motion that can significantly affect walking and daily activities. PRP may support healing in soft-tissue ankle injuries.",
        symptoms: [
          "Pain and stiffness along the Achilles tendon",
          "Pain worst in the morning, worsens with activity",
          "Swelling and thickening of the tendon",
          "Ankle instability (ligament tears)",
          "Reduced ability to flex the foot",
        ],
        progression:
          "Achilles tendinopathy carries a risk of complete tendon rupture. Chronic ankle instability from untreated ligament injuries can lead to early-onset ankle arthritis.",
      },
    ],
    surgeryRisks:
      "Trigger finger release surgery has a high success rate of approximately 99%, with only 2.68% needing further treatment. However, for plantar fasciitis, surgical fasciotomy is reserved for cases failing 6-12 months of conservative care, and recovery takes significantly longer than non-surgical approaches. Achilles tendon surgery carries risks including wound healing complications, nerve damage, and re-rupture, with a prolonged rehabilitation period of 6-12 months.",
    steroidRisks:
      "Steroid injections for trigger finger have a 90% initial success rate but 30.5% recurrence within 6 months. For plantar fasciitis, steroid injections provide short-term relief but carry risks of plantar fascia rupture with repeated injections. For Achilles tendinopathy, steroid injections near the tendon are generally avoided due to the significant risk of tendon rupture.",
    comparisonNote:
      "Trigger finger release surgery has excellent outcomes and may be the most efficient option for patients with recurrent locking despite steroid injections. Acute complete Achilles tendon rupture typically requires surgical repair, particularly in active individuals.",
  },
];

export function getBodyAreaBySlug(slug: string): BodyArea | undefined {
  return bodyAreas.find((ba) => ba.slug === slug);
}

export function getAllBodyAreaSlugs(): string[] {
  return bodyAreas.map((ba) => ba.slug);
}
```

- [ ] **Step 2: Verify file compiles**

```bash
cd "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM/hsw-joint-pain"
npx tsc --noEmit src/data/bodyAreas.ts
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/bodyAreas.ts
git commit -m "feat: add body areas data with 6 areas and 17 conditions"
```

---

### Task 3: Data Layer — Treatments, Stats, Testimonials, Quiz Questions, FAQs

**Files:**
- Create: `src/data/treatments.ts`
- Create: `src/data/stats.ts`
- Create: `src/data/testimonials.ts`
- Create: `src/data/quizQuestions.ts`
- Create: `src/data/faqs.ts`

- [ ] **Step 1: Create treatments data**

Create `src/data/treatments.ts`:

```typescript
export interface Treatment {
  slug: string;
  name: string;
  price: string;
  priceNote: string;
  duration: string;
  setting: string;
  downtime: string;
  description: string; // 134-167 words, educational, compliant
  mechanism: string;
  tags: string[];
  matchLabel: {
    good: string;
    best: string;
    explore: string;
  };
}

export const treatments: Treatment[] = [
  {
    slug: "prp",
    name: "PRP Therapy",
    price: "From £399",
    priceNote:
      "Final fees confirmed following assessment, based on individual treatment plan",
    duration: "30-60 minutes",
    setting: "Outpatient",
    downtime: "Minimal — most return to daily activities within 24-48 hours",
    description:
      "Platelet-rich plasma (PRP) therapy is a regenerative approach that uses a concentrated preparation of a patient's own blood platelets to support healing in damaged joints and soft tissues. During the procedure, approximately 30-60ml of blood is drawn and processed in a centrifuge to isolate platelets at 3-5 times their normal concentration. These concentrated platelets are then injected directly into the affected area under ultrasound guidance. The platelets release growth factors including PDGF, TGF, VEGF, and EGF that may help stimulate cell reproduction, support tissue repair processes, and modulate inflammatory responses. Because PRP uses the patient's own blood (autologous), the risk of allergic reaction or rejection is minimal. Published research has explored PRP for a range of joint and tendon conditions, with studies suggesting it may help reduce pain and support functional improvement in some patients. Individual results vary based on the nature and severity of the condition.",
    mechanism:
      "Blood is drawn, centrifuged to concentrate platelets to 3-5x normal levels, then injected under ultrasound guidance into the affected area.",
    tags: ["30-60 min", "Outpatient", "Minimal downtime"],
    matchLabel: {
      good: "Good Match",
      best: "Best Match",
      explore: "Worth Exploring",
    },
  },
  {
    slug: "exosomes",
    name: "Exosome Therapy",
    price: "From £599",
    priceNote:
      "Final fees confirmed following assessment, based on individual treatment plan",
    duration: "30-60 minutes",
    setting: "Outpatient",
    downtime: "Minimal — most return to daily activities within 24-48 hours",
    description:
      "Exosome therapy is an emerging regenerative approach that uses nanoscale vesicles (30-150 nanometres) derived from mesenchymal stem cells. These vesicles carry microRNAs, proteins, and growth factors that play a role in cellular communication and may support tissue repair processes. Research published in Frontiers in Bioengineering and Biotechnology (2024) has explored how exosomes may reduce pro-inflammatory cytokines, promote anti-inflammatory macrophage activity, and support cell proliferation in joint tissues. A 2024 NIH meta-analysis reported a 0.7% serious adverse event rate across studied populations. It is important to note that exosome therapy is an area of active research, and no exosome products currently hold regulatory approval from the MHRA or FDA for joint conditions. The evidence base is growing but remains more limited than for PRP therapy. A thorough consultation with a qualified specialist is essential to understand whether this approach may be relevant to your individual situation.",
    mechanism:
      "Nanoscale vesicles derived from mesenchymal stem cells deliver microRNAs and growth factors to support cellular communication and tissue repair processes.",
    tags: ["30-60 min", "Outpatient", "Cellular communication"],
    matchLabel: {
      good: "Good Match",
      best: "Best Match",
      explore: "Worth Exploring",
    },
  },
  {
    slug: "stem-cells",
    name: "Regenerative Cell Therapy",
    price: "From £5,000",
    priceNote:
      "Final fees confirmed following assessment, based on individual treatment plan",
    duration: "1-2 hours",
    setting: "Outpatient",
    downtime: "Light activity within 1-7 days, full recovery 6-12 weeks",
    description:
      "Regenerative cell therapy (often referred to as stem cell therapy) is an advanced regenerative approach that uses mesenchymal stem cells (MSCs) harvested from the patient's own bone marrow or adipose tissue. These cells have the potential to differentiate into various tissue types including cartilage cells (chondrocytes) and may produce anti-inflammatory cytokines and growth factors through paracrine signalling. A 2023 review published in Cellular and Molecular Immunology found positive effects on pain and symptoms in 12 out of 15 randomised controlled trials. Research published in Frontiers in Medicine (2024) showed that bone marrow aspirate concentrate (BMAC) demonstrated the best long-term outcomes at 4-year follow-up compared to cortisol, hyaluronic acid, and PRP. This therapy is typically considered for more complex joint degeneration where other approaches may not be sufficient. As with all regenerative therapies, this is an area of ongoing research, and individual suitability is determined through comprehensive medical assessment.",
    mechanism:
      "Mesenchymal stem cells harvested from bone marrow or adipose tissue are processed and injected into the affected joint to support tissue repair through differentiation and paracrine signalling.",
    tags: ["1-2 hours", "Outpatient", "Advanced option"],
    matchLabel: {
      good: "Good Match",
      best: "Best Match",
      explore: "Worth Exploring",
    },
  },
];
```

- [ ] **Step 2: Create stats data**

Create `src/data/stats.ts`:

```typescript
export interface Stat {
  value: string;
  label: string;
  source: string;
  sourceUrl?: string;
  useOn: string; // "all" or specific body area slugs
}

export const ukStats: Stat[] = [
  {
    value: "20M+",
    label: "people in the UK live with a musculoskeletal condition",
    source: "Versus Arthritis, State of MSK Health 2025",
    useOn: "all",
  },
  {
    value: "28-29",
    label: "weeks — average NHS waiting time for knee replacement",
    source: "NHS England 2026",
    useOn: "knee-pain,hip-pain",
  },
  {
    value: "7.1M",
    label: "working days lost to MSK conditions annually in the UK",
    source: "HSE 2024/25",
    useOn: "all",
  },
  {
    value: "61.6%",
    label: "of patients treated within the 18-week NHS target",
    source: "King's Fund, January 2026",
    useOn: "all",
  },
  {
    value: "10-40%",
    label: "of back surgery patients develop Failed Back Surgery Syndrome",
    source: "StatPearls, NCBI",
    useOn: "back-pain",
  },
];

export const socialProofStats = [
  { value: "6K+", label: "Assessments Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "4.9", label: "Star Rating" },
];
```

- [ ] **Step 3: Create testimonials data**

Create `src/data/testimonials.ts`:

```typescript
export interface Testimonial {
  quote: string;
  name: string;
  initials: string;
  label: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "The consultation was incredibly thorough. The specialist took time to explain every option available to me, and I never felt pressured into any particular treatment.",
    name: "James T.",
    initials: "JT",
    label: "Verified Patient",
    rating: 5,
  },
  {
    quote:
      "I appreciated the honest, evidence-based approach. They clearly explained what the research shows and what it doesn't, which helped me make an informed decision.",
    name: "Sarah M.",
    initials: "SM",
    label: "Verified Patient",
    rating: 5,
  },
  {
    quote:
      "The assessment process was straightforward and professional. The team made sure I understood my condition fully before discussing any next steps.",
    name: "David R.",
    initials: "DR",
    label: "Verified Patient",
    rating: 5,
  },
  {
    quote:
      "From the moment I walked in, the clinic felt welcoming and professional. The specialist answered all my questions patiently and provided detailed written information to take away.",
    name: "Emma L.",
    initials: "EL",
    label: "Verified Patient",
    rating: 5,
  },
  {
    quote:
      "An excellent consultation experience. The doctor reviewed my imaging, explained the findings clearly, and outlined all available pathways without any sales pressure.",
    name: "Michael K.",
    initials: "MK",
    label: "Verified Patient",
    rating: 5,
  },
];
```

- [ ] **Step 4: Create quiz questions data**

Create `src/data/quizQuestions.ts`:

```typescript
export interface QuizOption {
  label: string;
  value: string;
  weight: number; // 1-5 scale contributing to score
}

export interface QuizQuestion {
  id: string;
  question: string;
  multiSelect?: boolean;
  options: QuizOption[];
}

export interface BodyAreaQuizConfig {
  bodyAreaSlug: string;
  questions: QuizQuestion[];
}

function buildQuestions(painLocationOptions: QuizOption[]): QuizQuestion[] {
  return [
    {
      id: "pain-location",
      question: "Where is your primary area of discomfort?",
      options: painLocationOptions,
    },
    {
      id: "duration",
      question: "How long have you been experiencing this pain?",
      options: [
        { label: "Less than 1 month", value: "lt-1m", weight: 1 },
        { label: "1–6 months", value: "1-6m", weight: 2 },
        { label: "6–12 months", value: "6-12m", weight: 3 },
        { label: "1–3 years", value: "1-3y", weight: 4 },
        { label: "3+ years", value: "3y-plus", weight: 5 },
      ],
    },
    {
      id: "daily-impact",
      question: "How does this affect your daily activities?",
      options: [
        { label: "Mild — occasional discomfort", value: "mild", weight: 1 },
        {
          label: "Moderate — limits some activities",
          value: "moderate",
          weight: 2,
        },
        {
          label: "Significant — walking is difficult",
          value: "significant",
          weight: 4,
        },
        {
          label: "Severe — constant pain, very limited",
          value: "severe",
          weight: 5,
        },
      ],
    },
    {
      id: "previous-treatments",
      question: "Have you tried any previous treatments?",
      multiSelect: true,
      options: [
        { label: "No treatment yet", value: "none", weight: 1 },
        { label: "Physiotherapy", value: "physio", weight: 2 },
        { label: "Steroid injections", value: "steroids", weight: 3 },
        { label: "Pain medication", value: "medication", weight: 2 },
        { label: "Surgery recommended", value: "surgery-rec", weight: 5 },
      ],
    },
    {
      id: "primary-goal",
      question: "What is your primary goal?",
      options: [
        {
          label: "Return to sports / exercise",
          value: "sports",
          weight: 3,
        },
        { label: "Walk pain-free again", value: "walk", weight: 3 },
        { label: "Avoid surgery", value: "avoid-surgery", weight: 4 },
        {
          label: "Reduce daily pain / medication",
          value: "reduce-pain",
          weight: 3,
        },
        {
          label: "Improve long-term joint health",
          value: "long-term",
          weight: 2,
        },
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

- [ ] **Step 5: Create FAQs data**

Create `src/data/faqs.ts`:

```typescript
export interface FAQ {
  question: string;
  answer: string; // 40-60 word direct answer + supporting detail to reach 130-160 words
}

export interface BodyAreaFAQs {
  bodyAreaSlug: string;
  faqs: FAQ[];
}

const commonFAQs: FAQ[] = [
  {
    question: "Is regenerative therapy safe?",
    answer:
      "PRP therapy uses your own blood, making allergic reactions or rejection extremely unlikely. The most common side effect is temporary soreness at the injection site. A 2024 NIH meta-analysis of exosome therapy reported a serious adverse event rate of 0.7% across studied populations. All regenerative procedures at our clinic are performed by GMC-registered practitioners using sterile techniques and ultrasound guidance. As with any medical procedure, potential risks and individual suitability are discussed thoroughly during your consultation. Your practitioner will review your medical history, current medications, and any contraindications before recommending any approach.",
  },
  {
    question: "What happens during a consultation at Harley Street Wellness?",
    answer:
      "Your consultation begins with a comprehensive review of your medical history, symptoms, and any previous imaging or treatments. The specialist will perform a physical examination of the affected area and may recommend additional imaging if needed. You will receive a clear explanation of your diagnosis, all available treatment options (including conservative, surgical, and regenerative approaches), the current evidence base for each, and associated costs. There is no obligation to proceed with any treatment. The consultation typically lasts 30-45 minutes, and you will receive written information to take away and consider at your own pace.",
  },
  {
    question:
      "What is the difference between PRP, exosomes, and regenerative cell therapy?",
    answer:
      "PRP (platelet-rich plasma) uses concentrated platelets from your own blood to deliver growth factors to the affected area. It is the most established regenerative approach with the broadest evidence base, starting from £399. Exosome therapy uses nanoscale vesicles derived from stem cells that carry signalling molecules involved in cellular communication and tissue repair, starting from £599. Regenerative cell therapy (stem cells) uses mesenchymal stem cells from your own bone marrow or fat tissue, offering the most advanced approach for complex degeneration, starting from £5,000. Your specialist will discuss which approach may be most suitable based on your individual condition and the current evidence.",
  },
  {
    question: "How much does regenerative therapy cost?",
    answer:
      "PRP therapy starts from £399 per session. Exosome therapy starts from £599. Regenerative cell therapy starts from £5,000. Final fees are confirmed following your assessment and are based on your individual treatment plan, including the area being treated and the number of sessions recommended. All pricing is transparent and inclusive. Your consultation will include a detailed breakdown of costs with no hidden fees. These treatments are not currently available on the NHS, and most private health insurance policies do not cover regenerative therapies, though we recommend checking with your provider.",
  },
  {
    question: "Can regenerative therapy help if I have been told I need surgery?",
    answer:
      "A surgical recommendation does not necessarily mean surgery is the only option. Many patients explore regenerative approaches as part of their decision-making process, particularly for mild-to-moderate conditions. Published research suggests that PRP and stem cell therapies may help support recovery in some patients who have been considered for surgery. However, for severe end-stage joint disease or acute injuries requiring structural repair, surgery may indeed be the most appropriate option. A consultation at our clinic will provide an honest, evidence-based assessment of whether regenerative approaches may be relevant to your specific situation. We believe in presenting all options transparently.",
  },
];

export const bodyAreaFAQs: BodyAreaFAQs[] = [
  {
    bodyAreaSlug: "knee-pain",
    faqs: [
      {
        question:
          "How long does PRP therapy take to show results for knee pain?",
        answer:
          "Most patients who respond to PRP therapy for knee conditions report noticeable improvements within 4-6 weeks, with maximum benefit typically reached at 3-6 months. Published research in the American Journal of Sports Medicine found that PRP injections reduced knee osteoarthritis pain scores by 45-65% at 12-month follow-up compared to baseline. Results typically last 12-18 months, after which a follow-up injection may be discussed. Individual response varies based on the severity of joint degeneration, the specific condition being treated, and overall health factors. Your specialist will set realistic expectations based on your individual assessment.",
      },
      {
        question:
          "How does PRP compare to steroid injections for knee osteoarthritis?",
        answer:
          "Steroid injections typically provide faster initial relief, often within days, but the benefit usually lasts only 6-8 weeks and diminishes with repeat injections. A 2025 RSNA study found that steroid injections led to more knee joint damage over two years compared to control groups. PRP, by contrast, may take 4-6 weeks to show benefit but research suggests it may provide more sustained improvement. Published studies have shown PRP outperforming corticosteroids in pain and function scores at 6+ months follow-up. The choice between approaches depends on your individual situation and is best discussed with a specialist.",
      },
      {
        question: "How many PRP sessions are typically needed for knee pain?",
        answer:
          "The number of PRP sessions recommended varies based on the condition and its severity. For mild-to-moderate knee osteoarthritis, many practitioners recommend a series of 1-3 injections spaced 2-4 weeks apart. For tendon injuries such as patellar tendinopathy, a single injection may be sufficient. Your specialist will recommend a treatment plan based on your individual assessment, taking into account the specific condition, its severity, and your response to initial treatment. Some patients benefit from a follow-up injection at 12-18 months.",
      },
      {
        question: "Am I a good candidate for non-surgical knee treatment?",
        answer:
          "Patients with mild-to-moderate knee osteoarthritis (Kellgren-Lawrence grades I-III), partial meniscus tears, or tendon injuries may be suitable candidates for regenerative approaches. The best candidates are typically those who have not responded adequately to conservative treatments such as physiotherapy but whose condition has not progressed to severe end-stage disease. Factors including age, BMI, overall health, and the specific nature of your condition all influence suitability. A thorough medical assessment including review of imaging is essential to determine whether you may benefit from regenerative approaches.",
      },
      ...commonFAQs,
    ],
  },
  {
    bodyAreaSlug: "hip-pain",
    faqs: [
      {
        question: "How effective is PRP therapy for hip bursitis?",
        answer:
          "A network meta-analysis published in PMC (2024) found that PRP injection had the highest probability of being the most effective treatment for greater trochanteric pain syndrome (hip bursitis) at both 1-3 months and 6-12 months follow-up. The study also found that while steroid injections provided initial improvement, the benefit was maximal at 6 weeks and not sustained beyond 24 weeks, whereas PRP showed sustained improvement at 2 years. Individual results vary, and your specialist will assess whether PRP may be appropriate for your specific hip condition.",
      },
      {
        question: "What is the recovery time after PRP therapy for hip pain?",
        answer:
          "Most patients return to normal daily activities within 24-48 hours of a PRP injection for hip conditions. It is advisable to take it easy for approximately two weeks and avoid long walks or standing for prolonged periods during the initial healing phase. Low-impact exercise such as swimming or cycling can typically be resumed within 1-2 weeks. Full benefit from the treatment is usually assessed at 3-6 months. Your specialist will provide specific guidance based on your condition and the area treated.",
      },
      ...commonFAQs,
    ],
  },
  {
    bodyAreaSlug: "shoulder-pain",
    faqs: [
      {
        question:
          "Can PRP help with frozen shoulder?",
        answer:
          "A systematic review published in PMC (2023) examined PRP therapy for frozen shoulder and found that both PRP and steroid injections improved outcomes at 3 months. However, PRP demonstrated significantly better range of motion in passive forward flexion and improved SPADI scores compared to steroid injection, with no reported side effects beyond injection-site discomfort. Frozen shoulder typically follows a natural course over 1-3 years, and PRP is being studied as a potential way to support recovery during this process. Your specialist will assess whether PRP may be relevant to your stage of frozen shoulder.",
      },
      {
        question:
          "What are the risks of rotator cuff surgery compared to regenerative options?",
        answer:
          "Rotator cuff repair surgery has an overall complication rate of approximately 10.5%, with retear rates varying from 11% for small tears to as high as 94% for massive tears. Recovery requires 6-9 months before patients typically feel normal. A Mayo Clinic study (2024) found that bone marrow aspirate concentrate used during repair was associated with a nearly threefold reduction in revision surgery rates. Regenerative approaches alone may be suitable for partial tears and tendinopathy, while acute full-thickness tears in active patients often benefit most from surgical repair. Your specialist will provide an honest assessment based on your imaging and examination findings.",
      },
      ...commonFAQs,
    ],
  },
  {
    bodyAreaSlug: "back-pain",
    faqs: [
      {
        question: "What is Failed Back Surgery Syndrome?",
        answer:
          "Failed Back Surgery Syndrome (FBSS) refers to persistent or recurrent pain following spinal surgery. According to StatPearls (NCBI), FBSS affects 10-40% of back surgery patients. Lumbar spinal fusion has a failure rate of 30-46%, and 36% of patients develop transition syndrome — degeneration at adjacent spinal levels — within 5 years. Success rates diminish dramatically with repeat surgeries: approximately 50% for the first operation, 30% for the second, 15% for the third, and 5% for the fourth. This data highlights the importance of careful patient selection and thorough assessment before pursuing surgical options for back pain.",
      },
      {
        question:
          "How do regenerative approaches work for disc problems?",
        answer:
          "For disc-related conditions, regenerative approaches involve fluoroscopy-guided injection of PRP or stem cells directly into or around the damaged disc. PRP delivers concentrated growth factors that may promote disc cell proliferation and reduce inflammatory mediators. Stem cell therapy aims to support disc structure, hydration, and function through paracrine signalling — the release of anti-inflammatory, anti-apoptotic, and restorative molecules. Published studies have shown improvements in pain ratings and quality-of-life measures in some patients. These approaches may be most effective in early-to-moderate stages of degeneration. Recovery typically allows return to light activity within 2-4 weeks, compared to 6-12 weeks for microdiscectomy and 3-6 months for fusion.",
      },
      ...commonFAQs,
    ],
  },
  {
    bodyAreaSlug: "elbow-pain",
    faqs: [
      {
        question: "How effective is PRP for tennis elbow?",
        answer:
          "The evidence for PRP in tennis elbow is mixed but generally promising. A randomised controlled trial by Pabst et al. (2013) studying 230 patients found success rates of 83.9% in the PRP group versus 68.3% in controls at 24 weeks, with pain improvement of 71.5% versus 56.1%. However, the Cochrane review found moderate-certainty evidence that PRP does not provide patient-important benefits compared with placebo. Individual response may be influenced by factors including genetic variation. Your specialist will discuss the full evidence base and help determine whether PRP may be appropriate for your specific situation.",
      },
      ...commonFAQs,
    ],
  },
  {
    bodyAreaSlug: "hand-wrist-foot-ankle",
    faqs: [
      {
        question: "How does PRP compare to surgery for plantar fasciitis?",
        answer:
          "A 2022 randomised prospective study published in the MDPI Journal of Clinical Medicine compared PRP therapy to partial plantar fasciotomy surgery. The PRP group demonstrated significantly quicker recovery, averaging 10.2 months compared to 37.2 months for the surgical group. PRP also showed lower complication rates. A separate 2024 systematic review and meta-analysis found that PRP is more effective than corticosteroid injections, extracorporeal shockwave therapy, and placebo in reducing pain and improving function for plantar fasciitis. Surgery is typically reserved for cases that have failed 6-12 months of comprehensive conservative management.",
      },
      ...commonFAQs,
    ],
  },
];

export function getFAQsByBodyArea(bodyAreaSlug: string): FAQ[] {
  const config = bodyAreaFAQs.find((f) => f.bodyAreaSlug === bodyAreaSlug);
  return config?.faqs ?? commonFAQs;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/data/
git commit -m "feat: add treatments, stats, testimonials, quiz, and FAQ data"
```

---

### Task 4: Scoring Algorithm with Tests

**Files:**
- Create: `src/lib/scoring.ts`
- Create: `__tests__/scoring.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `__tests__/scoring.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM/hsw-joint-pain"
npx vitest run __tests__/scoring.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement the scoring algorithm**

Create `src/lib/scoring.ts`:

```typescript
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run __tests__/scoring.test.ts
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/scoring.ts __tests__/scoring.test.ts
git commit -m "feat: add quiz scoring algorithm with tests"
```

---

### Task 5: GoHighLevel Client + API Route

**Files:**
- Create: `src/lib/ghl.ts`
- Create: `src/app/api/quiz-submit/route.ts`

- [ ] **Step 1: Create GoHighLevel webhook client**

Create `src/lib/ghl.ts`:

```typescript
export interface QuizSubmission {
  name: string;
  email: string;
  phone: string;
  bodyArea: string;
  painLocation: string;
  duration: string;
  dailyImpact: string;
  previousTreatments: string[];
  primaryGoal: string;
  score: number;
  scoreLabel: string;
  matchedTreatment: string;
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
          pain_duration: data.duration,
          daily_impact: data.dailyImpact,
          previous_treatments: data.previousTreatments.join(", "),
          primary_goal: data.primaryGoal,
          improvement_score: data.score.toString(),
          score_label: data.scoreLabel,
          matched_treatment: data.matchedTreatment,
          source: data.source,
        },
        tags: [
          `body-area:${data.bodyArea}`,
          `score:${data.scoreLabel.toLowerCase().replace(/\s+/g, "-")}`,
          `treatment:${data.matchedTreatment}`,
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

- [ ] **Step 2: Create API route**

Create `src/app/api/quiz-submit/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { submitToGoHighLevel, type QuizSubmission } from "@/lib/ghl";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, bodyArea, answers, score, scoreLabel, matchedTreatment } = body;

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
      duration: answers.duration,
      dailyImpact: answers.dailyImpact,
      previousTreatments: answers.previousTreatments,
      primaryGoal: answers.primaryGoal,
      score,
      scoreLabel,
      matchedTreatment,
      source: "landing-page",
      timestamp: new Date().toISOString(),
    };

    const result = await submitToGoHighLevel(submission);

    if (!result.success) {
      console.error("GHL webhook error:", result.error);
      // Still return success to user — we don't want CRM issues to block the UX
    }

    return NextResponse.json({ success: true, score, scoreLabel, matchedTreatment });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
```

Note: If using `output: "export"` (static), API routes won't work. In that case, remove `output: "export"` from `next.config.ts` and deploy to Vercel with serverless functions. Alternatively, the quiz submission can be done client-side directly to the GoHighLevel webhook (less secure but works for static export).

- [ ] **Step 3: Update next.config.ts to remove static export (needed for API routes)**

Replace the content of `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create `.env.local` template**

Create `.env.local.example`:

```
GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID
```

- [ ] **Step 5: Add `.env.local` to `.gitignore`**

Verify `.gitignore` contains `.env*.local`. If not, add it.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ghl.ts src/app/api/quiz-submit/route.ts next.config.ts .env.local.example
git commit -m "feat: add GoHighLevel webhook client and quiz submission API route"
```

---

### Task 6: Schema Generators

**Files:**
- Create: `src/lib/schema.ts`
- Create: `__tests__/schema.test.ts`

- [ ] **Step 1: Write the failing test**

Create `__tests__/schema.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { generateFAQSchema, generateMedicalClinicSchema, generateBreadcrumbSchema } from "../src/lib/schema";

describe("generateFAQSchema", () => {
  it("produces valid FAQPage JSON-LD", () => {
    const schema = generateFAQSchema([
      { question: "What is PRP?", answer: "PRP is a therapy." },
      { question: "Is it safe?", answer: "Yes, generally." },
    ]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]["@type"]).toBe("Question");
    expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
  });
});

describe("generateMedicalClinicSchema", () => {
  it("includes required NAP fields", () => {
    const schema = generateMedicalClinicSchema();
    expect(schema["@type"]).toBe("MedicalClinic");
    expect(schema.name).toBe("Harley Street Wellness");
    expect(schema.address.streetAddress).toBe("10 Harley Street");
    expect(schema.address.addressLocality).toBe("London");
  });
});

describe("generateBreadcrumbSchema", () => {
  it("generates correct breadcrumb list", () => {
    const schema = generateBreadcrumbSchema("Knee Pain", "/knee-pain");
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[1].item).toContain("/knee-pain");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run __tests__/schema.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement schema generators**

Create `src/lib/schema.ts`:

```typescript
import type { FAQ } from "@/data/faqs";

const BASE_URL = "https://harleystreetmedicalwellness.co.uk";

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage" as const,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  };
}

export function generateMedicalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic" as const,
    name: "Harley Street Wellness",
    url: BASE_URL,
    telephone: "+44-20-XXXX-XXXX",
    email: "info@harleystreetmedicalwellness.co.uk",
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: "10 Harley Street",
      addressLocality: "London",
      postalCode: "W1G 9PF",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: 51.5155,
      longitude: -0.1484,
    },
    medicalSpecialty: "Musculoskeletal Medicine",
    availableService: [
      {
        "@type": "MedicalTherapy" as const,
        name: "PRP Therapy",
        description:
          "Platelet-rich plasma therapy using concentrated platelets from the patient's own blood",
      },
      {
        "@type": "MedicalTherapy" as const,
        name: "Exosome Therapy",
        description:
          "Regenerative approach using nanoscale vesicles derived from mesenchymal stem cells",
      },
      {
        "@type": "MedicalTherapy" as const,
        name: "Regenerative Cell Therapy",
        description:
          "Advanced regenerative approach using mesenchymal stem cells from bone marrow or adipose tissue",
      },
    ],
  };
}

export function generateBreadcrumbSchema(pageName: string, pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      {
        "@type": "ListItem" as const,
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem" as const,
        position: 2,
        name: pageName,
        item: `${BASE_URL}${pagePath}`,
      },
    ],
  };
}

export function generateMedicalWebPageSchema(
  title: string,
  description: string,
  path: string,
  datePublished: string,
  dateModified: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage" as const,
    name: title,
    description,
    url: `${BASE_URL}${path}`,
    datePublished,
    dateModified,
    publisher: {
      "@type": "MedicalOrganization" as const,
      name: "Harley Street Wellness",
      url: BASE_URL,
    },
    about: {
      "@type": "MedicalCondition" as const,
      name: title,
    },
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    medicalAudience: {
      "@type": "PatientAudience" as const,
    },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run __tests__/schema.test.ts
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema.ts __tests__/schema.test.ts
git commit -m "feat: add JSON-LD schema generators for FAQ, MedicalClinic, breadcrumbs"
```

---

### Task 7: UI Primitives

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Accordion.tsx`
- Create: `src/components/ui/CountUp.tsx`
- Create: `src/components/ui/FadeIn.tsx`

- [ ] **Step 1: Create Button component**

Create `src/components/ui/Button.tsx`:

```tsx
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "font-sans font-bold rounded-button transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary: "bg-gold text-white shadow-cta hover:bg-gold-dark",
    secondary: "bg-ivory text-muted hover:bg-cream",
    outline:
      "bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create Card component**

Create `src/components/ui/Card.tsx`:

```tsx
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlighted" | "ivory";
}

export function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white border border-ivory shadow-card",
    highlighted: "bg-white border-2 border-gold shadow-card",
    ivory: "bg-ivory border border-ivory",
  };

  return (
    <div
      className={`rounded-card p-5 md:p-6 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create Accordion component**

Create `src/components/ui/Accordion.tsx`:

```tsx
"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-ivory last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-semibold pr-4">
          {question}
        </h3>
        <svg
          className={`w-5 h-5 text-gold shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[500px] pb-5" : "max-h-0"
        }`}
      >
        <p className="text-charcoal/80 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create CountUp component**

Create `src/components/ui/CountUp.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: string; // e.g., "6K+", "10+", "4.9"
  duration?: number;
}

export function CountUp({ end, duration = 1500 }: CountUpProps) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  });

  function animateCount() {
    const numericPart = parseFloat(end.replace(/[^0-9.]/g, ""));
    const suffix = end.replace(/[0-9.]/g, "");
    const isDecimal = end.includes(".");
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      const current = numericPart * eased;

      if (isDecimal) {
        setDisplay(current.toFixed(1) + suffix);
      } else {
        setDisplay(Math.floor(current) + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplay(end);
      }
    }

    requestAnimationFrame(update);
  }

  return <span ref={ref}>{display}</span>;
}
```

- [ ] **Step 5: Create FadeIn component**

Create `src/components/ui/FadeIn.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI primitives — Button, Card, Accordion, CountUp, FadeIn"
```

---

### Task 8: Layout Components — Nav, TrustBar, Footer

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/TrustBar.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Nav component**

Create `src/components/Nav.tsx`:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { bodyAreas } from "@/data/bodyAreas";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ivory h-14 flex items-center">
      <div className="max-w-page mx-auto w-full px-4 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Harley Street Wellness"
            width={48}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="flex gap-1 overflow-x-auto scrollbar-hide ml-4">
          {bodyAreas.map((area) => {
            const isActive = pathname === `/${area.slug}`;
            return (
              <Link
                key={area.slug}
                href={`/${area.slug}`}
                className={`whitespace-nowrap px-3 py-1.5 rounded-pill text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gold text-white"
                    : "text-muted hover:text-charcoal hover:bg-ivory"
                }`}
              >
                {area.shortName}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create TrustBar component**

Create `src/components/TrustBar.tsx`:

```tsx
export function TrustBar() {
  return (
    <div className="bg-ivory py-1.5 text-center">
      <div className="flex items-center justify-center gap-3 text-[11px] text-muted">
        <span>⭐ 4.9 Rating</span>
        <span className="text-ivory">|</span>
        <span>📍 Harley Street, London</span>
        <span className="text-ivory">|</span>
        <span>🏥 GMC Registered</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import Link from "next/link";
import { bodyAreas } from "@/data/bodyAreas";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-page mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-gold mb-4">
              Harley Street Wellness
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Educational resources about non-surgical approaches to joint pain.
              GMC-registered specialists providing evidence-based consultations
              at our Harley Street clinic.
            </p>
            <address className="text-sm not-italic">
              10 Harley Street
              <br />
              London W1G 9PF
            </address>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Conditions
            </h4>
            <ul className="space-y-2">
              {bodyAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/${area.slug}`}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <p className="text-sm mb-2">Phone: +44 20 XXXX XXXX</p>
            <p className="text-sm mb-6">
              Email: info@harleystreetmedicalwellness.co.uk
            </p>
            <Button variant="outline" size="sm">
              Speak with a Specialist
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="border-t border-white/10">
        <div className="max-w-page mx-auto px-4 py-8">
          <div className="space-y-4 text-[11px] text-white/40 leading-relaxed">
            <p>
              The information on this page is provided for educational and
              informational purposes only and does not constitute medical advice.
              Always consult a qualified healthcare professional regarding your
              individual circumstances.
            </p>
            <p>
              Individual results may vary. Outcomes depend on a range of factors
              including the nature and severity of your condition, your overall
              health, and your body&apos;s individual response. No treatment outcome
              can be guaranteed.
            </p>
            <p>
              Regenerative therapies, including PRP and stem cell-based
              approaches, are areas of ongoing research. Some treatments
              discussed on this page may not yet have full regulatory approval
              for all applications. Your practitioner will discuss the current
              evidence base and regulatory status as part of your consultation.
            </p>
            <p>
              All consultations and treatments are carried out by GMC-registered
              doctors at our Harley Street clinic.
            </p>
            <p>
              Booking a consultation does not commit you to any treatment. The
              purpose of the consultation is to assess your condition and discuss
              whether any approach may be appropriate.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-white/30 text-center">
            © {new Date().getFullYear()} Harley Street Wellness. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.tsx src/components/TrustBar.tsx src/components/Footer.tsx
git commit -m "feat: add Nav, TrustBar, and Footer layout components"
```

---

### Task 9: Hero + Social Proof Sections

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/SocialProof.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
import { Button } from "@/components/ui/Button";
import type { BodyArea } from "@/data/bodyAreas";

interface HeroProps {
  bodyArea: BodyArea;
}

export function Hero({ bodyArea }: HeroProps) {
  return (
    <section className="bg-cream py-12 md:py-20">
      <div className="max-w-page mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-gold mb-3">
            Free Educational Assessment
          </p>
          <h1 className="font-serif text-h1-mobile lg:text-h1-desktop font-bold text-charcoal mb-4">
            {bodyArea.headline}
          </h1>
          <p className="text-base md:text-lg text-charcoal/70 mb-8 leading-relaxed">
            {bodyArea.subheadline}
          </p>
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              document
                .getElementById("quiz")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Your Free Joint Health Score →
          </Button>
          <p className="mt-3 text-[11px] text-muted">
            Takes 2 minutes · No obligation · Educational only
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create SocialProof component**

Create `src/components/SocialProof.tsx`:

```tsx
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { socialProofStats } from "@/data/stats";

export function SocialProof() {
  return (
    <section className="bg-cream pb-12">
      <div className="max-w-page mx-auto px-4">
        <Card className="!p-4 md:!p-6">
          <div className="flex justify-around items-center text-center">
            {socialProofStats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-10 bg-ivory" />}
                <div>
                  <p className="font-serif text-2xl font-extrabold text-gold">
                    <CountUp end={stat.value} />
                  </p>
                  <p className="text-[11px] text-muted mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx src/components/SocialProof.tsx
git commit -m "feat: add Hero and SocialProof sections"
```

---

### Task 10: Content Sections — Stats, Conditions, Risks, Comparison, Treatments

**Files:**
- Create: `src/components/StatsSection.tsx`
- Create: `src/components/ConditionCards.tsx`
- Create: `src/components/TraditionalRisks.tsx`
- Create: `src/components/ComparisonTable.tsx`
- Create: `src/components/TreatmentCards.tsx`

- [ ] **Step 1: Create StatsSection**

Create `src/components/StatsSection.tsx`:

```tsx
import { ukStats } from "@/data/stats";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

interface StatsSectionProps {
  bodyAreaSlug: string;
}

export function StatsSection({ bodyAreaSlug }: StatsSectionProps) {
  const relevantStats = ukStats.filter(
    (s) => s.useOn === "all" || s.useOn.includes(bodyAreaSlug)
  );

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            Why Joint Pain in the UK Is a Growing Challenge
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relevantStats.map((stat, i) => (
            <FadeIn key={stat.value} delay={i * 100}>
              <Card className="text-center">
                <p className="font-serif text-3xl font-extrabold text-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-charcoal/70 mb-3">{stat.label}</p>
                <p className="text-[11px] text-muted">{stat.source}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ConditionCards**

Create `src/components/ConditionCards.tsx`:

```tsx
import type { Condition } from "@/data/bodyAreas";
import { Card } from "@/components/ui/Card";
import { AccordionItem } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";

interface ConditionCardsProps {
  conditions: Condition[];
  bodyAreaName: string;
}

export function ConditionCards({
  conditions,
  bodyAreaName,
}: ConditionCardsProps) {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            What Causes {bodyAreaName}?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions.map((condition, i) => (
            <FadeIn key={condition.slug} delay={i * 100}>
              <Card>
                <div className="w-10 h-10 bg-ivory rounded-[10px] flex items-center justify-center mb-4 text-xl">
                  {condition.icon}
                </div>
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-3">
                  {condition.name}
                </h3>
                <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                  {condition.description}
                </p>
                <div className="border-t border-ivory pt-4">
                  <AccordionItem
                    question="Common symptoms"
                    answer={condition.symptoms.join(" • ")}
                  />
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create TraditionalRisks**

Create `src/components/TraditionalRisks.tsx`:

```tsx
import type { BodyArea } from "@/data/bodyAreas";
import { FadeIn } from "@/components/ui/FadeIn";

interface TraditionalRisksProps {
  bodyArea: BodyArea;
}

export function TraditionalRisks({ bodyArea }: TraditionalRisksProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            What Are the Risks of Traditional Approaches?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeIn delay={100}>
            <div className="bg-cream rounded-card p-6 border border-ivory">
              <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-semibold mb-4">
                Surgery Considerations
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                {bodyArea.surgeryRisks}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="bg-cream rounded-card p-6 border border-ivory">
              <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-semibold mb-4">
                Steroid Injection Considerations
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                {bodyArea.steroidRisks}
              </p>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={300}>
          <div className="mt-8 max-w-3xl mx-auto bg-trust-green/5 border border-trust-green/20 rounded-card p-5">
            <p className="text-sm text-charcoal/70 leading-relaxed text-center">
              {bodyArea.comparisonNote}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create ComparisonTable**

Create `src/components/ComparisonTable.tsx`:

```tsx
import { FadeIn } from "@/components/ui/FadeIn";

const comparisonData = [
  {
    factor: "Procedure time",
    surgery: "1-4 hours",
    prp: "30-60 minutes",
    exosomes: "30-60 minutes",
    stemCells: "1-2 hours",
  },
  {
    factor: "Anaesthesia",
    surgery: "General / spinal",
    prp: "Local / none",
    exosomes: "Local / none",
    stemCells: "Local",
  },
  {
    factor: "Hospital stay",
    surgery: "1-5 days",
    prp: "None (outpatient)",
    exosomes: "None (outpatient)",
    stemCells: "None (outpatient)",
  },
  {
    factor: "Return to work",
    surgery: "2-12 weeks",
    prp: "1-3 days",
    exosomes: "1-3 days",
    stemCells: "1-7 days",
  },
  {
    factor: "Full recovery",
    surgery: "3-12 months",
    prp: "4-6 weeks",
    exosomes: "4-6 weeks",
    stemCells: "6-12 weeks",
  },
  {
    factor: "Infection risk",
    surgery: "1-10%",
    prp: "Minimal (<0.1%)",
    exosomes: "Minimal (0.7% SAE)",
    stemCells: "Minimal",
  },
  {
    factor: "Reversibility",
    surgery: "Irreversible",
    prp: "Non-invasive",
    exosomes: "Non-invasive",
    stemCells: "Non-invasive",
  },
  {
    factor: "Can be repeated",
    surgery: "Revision complex",
    prp: "Yes",
    exosomes: "Yes",
    stemCells: "Yes",
  },
];

export function ComparisonTable() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            How Do Non-Surgical Approaches Compare to Surgery?
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-gold">
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    Factor
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    Surgery
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    PRP Therapy
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    Exosome Therapy
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    Stem Cell Therapy
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr
                    key={row.factor}
                    className={`border-b border-ivory ${
                      i % 2 === 0 ? "bg-white" : "bg-ivory/50"
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-charcoal">
                      {row.factor}
                    </td>
                    <td className="py-3 px-4 text-charcoal/70">
                      {row.surgery}
                    </td>
                    <td className="py-3 px-4 text-charcoal/70">{row.prp}</td>
                    <td className="py-3 px-4 text-charcoal/70">
                      {row.exosomes}
                    </td>
                    <td className="py-3 px-4 text-charcoal/70">
                      {row.stemCells}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create TreatmentCards**

Create `src/components/TreatmentCards.tsx`:

```tsx
import { treatments } from "@/data/treatments";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

interface TreatmentCardsProps {
  bodyAreaName: string;
}

export function TreatmentCards({ bodyAreaName }: TreatmentCardsProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            What Non-Surgical Options Exist for {bodyAreaName}?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {treatments.map((treatment, i) => (
            <FadeIn key={treatment.slug} delay={i * 100}>
              <Card className="border-t-4 border-t-gold">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold">
                    {treatment.name}
                  </h3>
                  <span className="text-gold font-bold text-sm whitespace-nowrap ml-2">
                    {treatment.price}
                  </span>
                </div>
                <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                  {treatment.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {treatment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-trust-green/10 text-trust-green px-3 py-1 rounded-pill text-[11px] font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-muted italic">
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

- [ ] **Step 6: Commit**

```bash
git add src/components/StatsSection.tsx src/components/ConditionCards.tsx src/components/TraditionalRisks.tsx src/components/ComparisonTable.tsx src/components/TreatmentCards.tsx
git commit -m "feat: add Stats, Conditions, Risks, Comparison, and Treatment sections"
```

---

### Task 11: Quiz System — Quiz, QuizResults, StickyCtaBar

**Files:**
- Create: `src/components/Quiz.tsx`
- Create: `src/components/QuizResults.tsx`
- Create: `src/components/StickyCtaBar.tsx`

- [ ] **Step 1: Create Quiz component**

Create `src/components/Quiz.tsx`:

```tsx
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
```

- [ ] **Step 2: Create QuizResults component**

Create `src/components/QuizResults.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { treatments } from "@/data/treatments";
import { getScoreLabel, getTreatmentMatchLabels } from "@/lib/scoring";

interface QuizResultsProps {
  score: number;
}

export function QuizResults({ score }: QuizResultsProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const scoreLabel = getScoreLabel(score);
  const matchLabels = getTreatmentMatchLabels(score);

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

  const matchLabelStyles: Record<string, { bg: string; text: string; label: string }> = {
    best: { bg: "bg-gold", text: "text-white", label: "Best Match" },
    good: { bg: "bg-trust-green/10", text: "text-trust-green", label: "Good Match" },
    explore: { bg: "bg-ivory", text: "text-muted", label: "Worth Exploring" },
  };

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-gold mb-4">
            Your Joint Health Improvement Score
          </p>

          {/* Score gauge */}
          <div className="relative w-36 h-36 mx-auto mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#F5F0E8"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#1A6B4A"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(displayScore / 100) * 327} 327`}
                className="transition-all duration-100"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-4xl font-extrabold text-trust-green">
                {displayScore}
              </span>
              <span className="text-[11px] text-muted">out of 100</span>
            </div>
          </div>

          <p className="text-lg font-semibold text-trust-green">{scoreLabel}</p>
          <p className="text-sm text-charcoal/70 max-w-lg mx-auto mt-2">
            Based on your responses, your condition profile suggests potential
            for improvement through non-surgical regenerative approaches.
            Individual outcomes vary.
          </p>
        </div>

        {/* Treatment recommendations */}
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-gold text-center mb-6">
          Educational Treatment Options For Your Profile
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {treatments.map((treatment) => {
            const matchType = matchLabels[treatment.slug] || "explore";
            const style = matchLabelStyles[matchType];
            const isBest = matchType === "best";

            return (
              <Card
                key={treatment.slug}
                variant={isBest ? "highlighted" : "default"}
                className={`text-center relative ${isBest ? "md:-mt-2 md:mb-2" : ""}`}
              >
                {isBest && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white px-4 py-1 rounded-pill text-[11px] font-bold">
                    BEST MATCH
                  </div>
                )}
                <p className="text-[11px] text-muted uppercase tracking-wider">
                  {treatment.name}
                </p>
                <p className="text-gold font-bold text-xl font-serif mt-1 mb-2">
                  {treatment.price}
                </p>
                <p className="text-xs text-charcoal/70 mb-4">
                  {treatment.mechanism}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-pill text-[11px] font-semibold ${style.bg} ${style.text}`}
                >
                  {style.label}
                </span>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button size="lg">Book Your Free Strategy Consultation →</Button>
          <p className="text-xs text-muted mt-2">
            Discuss your score with a specialist — no obligation
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 max-w-3xl mx-auto bg-white rounded-card p-5 border border-ivory">
          <p className="text-[11px] text-muted text-center leading-relaxed">
            This assessment is for educational purposes only and does not
            constitute medical advice. Your score is based on general research
            and may not reflect your individual health profile. A qualified
            medical professional should evaluate your specific condition before
            recommending any treatment approach. Results from regenerative
            therapies vary based on individual health profiles.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create StickyCtaBar component**

Create `src/components/StickyCtaBar.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const heroBottom = window.innerHeight;
      const quiz = document.getElementById("quiz");
      const quizTop = quiz?.getBoundingClientRect().top ?? Infinity;
      const quizBottom = quiz?.getBoundingClientRect().bottom ?? Infinity;

      const pastHero = window.scrollY > heroBottom;
      const quizVisible = quizTop < window.innerHeight && quizBottom > 0;

      setVisible(pastHero && !quizVisible);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-400 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/90 backdrop-blur-xl border-t border-ivory shadow-sticky px-4 py-3">
        <div className="flex items-center gap-3 max-w-page mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-muted">Free Assessment</p>
            <p className="font-bold text-sm text-charcoal truncate">
              2-min Joint Health Score
            </p>
          </div>
          <Button
            size="sm"
            onClick={() =>
              document
                .getElementById("quiz")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Now →
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Quiz.tsx src/components/QuizResults.tsx src/components/StickyCtaBar.tsx
git commit -m "feat: add Quiz, QuizResults, and StickyCtaBar components"
```

---

### Task 12: Trust Sections — Testimonials, LocationTrust, FAQ

**Files:**
- Create: `src/components/Testimonials.tsx`
- Create: `src/components/LocationTrust.tsx`
- Create: `src/components/FAQ.tsx`

- [ ] **Step 1: Create Testimonials component**

Create `src/components/Testimonials.tsx`:

```tsx
import { testimonials } from "@/data/testimonials";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

export function Testimonials() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            What Our Patients Say About Their Experience
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <FadeIn key={t.name} delay={i * 100}>
              <Card>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-charcoal italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-ivory rounded-full flex items-center justify-center text-xs font-bold text-gold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-xs">{t.name}</p>
                    <p className="text-[11px] text-muted">{t.label}</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted mt-3 italic">
                  Individual experiences may vary.
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

- [ ] **Step 2: Create LocationTrust component**

Create `src/components/LocationTrust.tsx`:

```tsx
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

export function LocationTrust() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            Visit Us at Harley Street
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={100}>
            <div className="rounded-card overflow-hidden h-80 bg-ivory flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8!2d-0.1484!3d51.5155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s10+Harley+Street%2C+London+W1G+9PF!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Harley Street Wellness Location"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <Card>
              <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-4">
                Our Specialist Team
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
                All consultations and treatments at Harley Street Wellness are
                carried out by GMC-registered doctors with specialist training
                in musculoskeletal medicine and regenerative approaches. Our
                practitioners are committed to providing honest, evidence-based
                assessments tailored to your individual situation.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  "GMC Registered",
                  "Harley Street Location",
                  "Evidence-Based",
                  "No Obligation",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="bg-trust-green/10 text-trust-green px-3 py-1.5 rounded-pill text-[11px] font-semibold"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <address className="text-sm text-charcoal/70 not-italic">
                <strong className="text-charcoal">10 Harley Street</strong>
                <br />
                London W1G 9PF
                <br />
                <br />
                Phone: +44 20 XXXX XXXX
                <br />
                Email: info@harleystreetmedicalwellness.co.uk
              </address>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create FAQ component**

Create `src/components/FAQ.tsx`:

```tsx
import { getFAQsByBodyArea, type FAQ as FAQType } from "@/data/faqs";
import { AccordionItem } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";

interface FAQProps {
  bodyAreaSlug: string;
  bodyAreaName: string;
}

export function FAQ({ bodyAreaSlug, bodyAreaName }: FAQProps) {
  const faqs = getFAQsByBodyArea(bodyAreaSlug);

  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            Frequently Asked Questions About {bodyAreaName} Treatment
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="max-w-3xl mx-auto bg-white rounded-card p-6 md:p-8 shadow-card">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Testimonials.tsx src/components/LocationTrust.tsx src/components/FAQ.tsx
git commit -m "feat: add Testimonials, LocationTrust, and FAQ sections"
```

---

### Task 13: Page Assembly — Body Area Pages, Home Page, Layout

**Files:**
- Create: `src/app/[bodyArea]/page.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create dynamic body area page**

Create `src/app/[bodyArea]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getBodyAreaBySlug, getAllBodyAreaSlugs } from "@/data/bodyAreas";
import { getFAQsByBodyArea } from "@/data/faqs";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateMedicalWebPageSchema,
  generateMedicalClinicSchema,
} from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { StatsSection } from "@/components/StatsSection";
import { ConditionCards } from "@/components/ConditionCards";
import { TraditionalRisks } from "@/components/TraditionalRisks";
import { ComparisonTable } from "@/components/ComparisonTable";
import { TreatmentCards } from "@/components/TreatmentCards";
import { Testimonials } from "@/components/Testimonials";
import { LocationTrust } from "@/components/LocationTrust";
import { FAQ } from "@/components/FAQ";

const Quiz = dynamic(() => import("@/components/Quiz").then((m) => ({ default: m.Quiz })), {
  ssr: false,
});

export function generateStaticParams() {
  return getAllBodyAreaSlugs().map((slug) => ({ bodyArea: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bodyArea: string }>;
}): Promise<Metadata> {
  const { bodyArea: slug } = await params;
  const bodyArea = getBodyAreaBySlug(slug);
  if (!bodyArea) return {};

  return {
    title: `${bodyArea.headline} | Harley Street Wellness`,
    description: bodyArea.subheadline,
    openGraph: {
      title: `${bodyArea.headline} | Harley Street Wellness`,
      description: bodyArea.subheadline,
      type: "website",
    },
  };
}

export default async function BodyAreaPage({
  params,
}: {
  params: Promise<{ bodyArea: string }>;
}) {
  const { bodyArea: slug } = await params;
  const bodyArea = getBodyAreaBySlug(slug);
  if (!bodyArea) notFound();

  const faqs = getFAQsByBodyArea(slug);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(bodyArea.name, `/${slug}`);
  const clinicSchema = generateMedicalClinicSchema();
  const pageSchema = generateMedicalWebPageSchema(
    bodyArea.headline,
    bodyArea.subheadline,
    `/${slug}`,
    "2026-04-11",
    "2026-04-11"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, breadcrumbSchema, clinicSchema, pageSchema]),
        }}
      />
      <Hero bodyArea={bodyArea} />
      <SocialProof />
      <StatsSection bodyAreaSlug={slug} />
      <ConditionCards
        conditions={bodyArea.conditions}
        bodyAreaName={bodyArea.name}
      />
      <TraditionalRisks bodyArea={bodyArea} />
      <ComparisonTable />
      <TreatmentCards bodyAreaName={bodyArea.name} />
      <Quiz bodyAreaSlug={slug} />
      <Testimonials />
      <LocationTrust />
      <FAQ bodyAreaSlug={slug} bodyAreaName={bodyArea.name} />
    </>
  );
}
```

- [ ] **Step 2: Create home page**

Replace `src/app/page.tsx`:

```tsx
import Link from "next/link";
import { bodyAreas } from "@/data/bodyAreas";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SocialProof } from "@/components/SocialProof";
import { ComparisonTable } from "@/components/ComparisonTable";
import { TreatmentCards } from "@/components/TreatmentCards";
import { Testimonials } from "@/components/Testimonials";
import { LocationTrust } from "@/components/LocationTrust";
import { FadeIn } from "@/components/ui/FadeIn";
import { generateMedicalClinicSchema } from "@/lib/schema";

export default function HomePage() {
  const clinicSchema = generateMedicalClinicSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />

      {/* Hero */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-page mx-auto px-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-gold mb-3">
            Harley Street Wellness — London
          </p>
          <h1 className="font-serif text-h1-mobile lg:text-h1-desktop font-bold text-charcoal mb-4 max-w-3xl mx-auto">
            Understanding Non-Surgical Options for Joint Pain
          </h1>
          <p className="text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto mb-8">
            Educational resources about regenerative approaches to joint and
            musculoskeletal pain. Take a free assessment for your specific
            condition.
          </p>
        </div>
      </section>

      <SocialProof />

      {/* Body Area Grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-page mx-auto px-4">
          <FadeIn>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
              Select Your Area of Concern
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bodyAreas.map((area, i) => (
              <FadeIn key={area.slug} delay={i * 100}>
                <Link href={`/${area.slug}`}>
                  <Card className="hover:border-gold transition-colors cursor-pointer h-full">
                    <div className="w-12 h-12 bg-ivory rounded-[10px] flex items-center justify-center mb-4 text-2xl">
                      {area.icon}
                    </div>
                    <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-2">
                      {area.name}
                    </h3>
                    <p className="text-sm text-charcoal/70 leading-relaxed mb-3">
                      {area.conditions.map((c) => c.name).join(" · ")}
                    </p>
                    <p className="text-sm text-gold font-semibold">
                      Take Assessment →
                    </p>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ComparisonTable />
      <TreatmentCards bodyAreaName="Joint Pain" />
      <Testimonials />
      <LocationTrust />
    </>
  );
}
```

- [ ] **Step 3: Update root layout with Nav, TrustBar, Footer, StickyCtaBar**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "../styles/globals.css";
import { Nav } from "@/components/Nav";
import { TrustBar } from "@/components/TrustBar";
import { Footer } from "@/components/Footer";
import { StickyCtaBar } from "@/components/StickyCtaBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harley Street Wellness | Joint Pain Education & Assessment",
  description:
    "Educational resources about non-surgical approaches to joint pain. Take a free joint health assessment at our Harley Street clinic in London.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Nav />
        <TrustBar />
        <main>{children}</main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
cd "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM/hsw-joint-pain"
npm run build
```

Expected: Build succeeds, all 7 pages generated.

- [ ] **Step 5: Commit**

```bash
git add src/app/
git commit -m "feat: assemble body area pages, home page, and root layout"
```

---

### Task 14: SEO/GEO Files + Final Build

**Files:**
- Create: `public/robots.txt`
- Create: `public/llms.txt`

- [ ] **Step 1: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

# Allow AI crawlers for GEO
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Block training crawlers
User-agent: CCBot
Disallow: /

Sitemap: https://harleystreetmedicalwellness.co.uk/sitemap.xml
```

- [ ] **Step 2: Create llms.txt**

Create `public/llms.txt`:

```markdown
# Harley Street Wellness - Joint Pain Education & Assessment

> Harley Street Wellness is a London clinic providing educational resources
> and specialist consultations about non-surgical regenerative approaches
> to joint pain, including PRP therapy, exosome therapy, and regenerative
> cell therapy. GMC-registered practitioners at 10 Harley Street, W1G 9PF.

## Conditions
- [Knee Pain](/knee-pain): Osteoarthritis, meniscus tears, ACL injuries — symptoms, causes, treatment options
- [Hip Pain](/hip-pain): Hip arthritis, labrum tears, bursitis, tendon injuries
- [Shoulder Pain](/shoulder-pain): Rotator cuff tears, frozen shoulder, impingement
- [Back Pain](/back-pain): Disc herniation, sciatica, spinal degeneration
- [Elbow Pain](/elbow-pain): Tennis elbow, golfer's elbow, bursitis
- [Hand, Wrist, Foot & Ankle](/hand-wrist-foot-ankle): Plantar fasciitis, trigger finger, ankle tendon injuries

## Treatments
- PRP Therapy: Platelet-rich plasma using the patient's own blood, from £399
- Exosome Therapy: Cell-derived nanoscale vesicles, from £599
- Regenerative Cell Therapy: Mesenchymal stem cells from bone marrow or adipose tissue, from £5,000

## About
- Location: 10 Harley Street, London W1G 9PF
- All practitioners are GMC-registered
- Evidence-based consultations with no obligation
```

- [ ] **Step 3: Run final build and verify all pages**

```bash
cd "C:/Users/faisa/OneDrive/Desktop/Joint Pain HSM/hsw-joint-pain"
npm run build
```

Expected: Build succeeds. Pages generated:
- `/` (home)
- `/knee-pain`
- `/hip-pain`
- `/shoulder-pain`
- `/back-pain`
- `/elbow-pain`
- `/hand-wrist-foot-ankle`

- [ ] **Step 4: Run tests**

```bash
npx vitest run
```

Expected: All tests pass.

- [ ] **Step 5: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- Home page loads with body area grid
- Click knee pain → `/knee-pain` loads with all sections
- Quiz works: answer 5 questions → contact form → score display
- Nav tabs switch between body areas
- Sticky CTA appears on scroll, hides near quiz
- FAQ accordions open/close
- Footer disclaimers are visible
- Mobile responsive (use browser dev tools)

- [ ] **Step 6: Commit**

```bash
git add public/ 
git commit -m "feat: add robots.txt, llms.txt, and verify final build"
```

---

## Plan Summary

| Task | Description | Key Files |
|---|---|---|
| 1 | Project scaffolding | tailwind.config, globals.css, layout.tsx |
| 2 | Body areas data (6 areas, 17 conditions) | data/bodyAreas.ts |
| 3 | Treatments, stats, testimonials, quiz, FAQs | data/*.ts |
| 4 | Scoring algorithm + tests | lib/scoring.ts, tests |
| 5 | GoHighLevel client + API route | lib/ghl.ts, api/quiz-submit |
| 6 | Schema generators + tests | lib/schema.ts, tests |
| 7 | UI primitives | components/ui/*.tsx |
| 8 | Nav, TrustBar, Footer | components/Nav,TrustBar,Footer |
| 9 | Hero + SocialProof | components/Hero,SocialProof |
| 10 | Content sections (5 components) | Stats,Conditions,Risks,Comparison,Treatments |
| 11 | Quiz system (3 components) | Quiz,QuizResults,StickyCtaBar |
| 12 | Trust sections (3 components) | Testimonials,LocationTrust,FAQ |
| 13 | Page assembly (body area + home + layout) | app/[bodyArea]/page, app/page, layout |
| 14 | SEO files + final build | robots.txt, llms.txt |

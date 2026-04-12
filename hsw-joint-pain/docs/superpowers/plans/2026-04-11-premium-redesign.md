# Premium UI/UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Harley Street Wellness site from a flat, clinical layout into a premium, interactive landing page experience optimized for affluent 45-65+ ad traffic converting through a quiz funnel.

**Architecture:** Pure visual redesign of existing Next.js 16 + Tailwind CSS 4 components. No changes to data files, API routes, scoring logic, or schema generators. Every component gets rewritten with new typography (Playfair Display + DM Sans), color tokens, interactive animations (scroll-triggered fade-ups, animated counters, hover effects, magnetic buttons), and premium visual treatments (shimmer borders, floating elements, trust marquee, decorative gradients). The body area pages are restructured to place the quiz immediately after the hero.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, `next/font/google` (Playfair Display + DM Sans)

**Design Spec:** `docs/superpowers/specs/2026-04-11-premium-redesign-design.md`
**Visual Reference:** `.superpowers/brainstorm/525-1775882824/content/body-area-page-v3.html`

---

## File Map

All files are under `src/`. New files: TrustMarquee, BottomCTA, ScrollProgress. TrustBar is deleted (replaced by TrustMarquee).

| File | Action | Responsibility |
|------|--------|---------------|
| `styles/globals.css` | Rewrite | Theme tokens, animations, utility classes |
| `app/layout.tsx` | Modify | Swap Inter → DM Sans, add TrustMarquee |
| `app/page.tsx` | Rewrite | Homepage: centered hero, lead form, body area grid |
| `app/[bodyArea]/page.tsx` | Modify | Move Quiz after Hero, add BottomCTA |
| `components/TrustMarquee.tsx` | Create | Scrolling trust ticker strip |
| `components/BottomCTA.tsx` | Create | Bottom CTA section with pulsing rings |
| `components/Nav.tsx` | Rewrite | Logo mark, blur backdrop, pill nav |
| `components/TrustBar.tsx` | Delete/Replace | Replaced by TrustMarquee in layout |
| `components/Hero.tsx` | Rewrite | Two-column with floating clinic card, counters |
| `components/Quiz.tsx` | Rewrite | Step dots, hover-slide options, premium inputs |
| `components/QuizResults.tsx` | Rewrite | Gold gradient gauge, shimmer cards |
| `components/SocialProof.tsx` | Rewrite | Gold serif numbers, gradient dividers |
| `components/ConditionCards.tsx` | Rewrite | Shimmer borders, symptom pills, hover-lift |
| `components/StatsSection.tsx` | Rewrite | Gold top bars, section header pattern |
| `components/TraditionalRisks.tsx` | Rewrite | Icon headers, green callout |
| `components/ComparisonTable.tsx` | Rewrite | Dark charcoal section, green highlights |
| `components/TreatmentCards.tsx` | Rewrite | Shimmer bars, green tag pills |
| `components/Testimonials.tsx` | Rewrite | Star SVGs, gradient avatars, hover-lift |
| `components/LocationTrust.tsx` | Rewrite | 2x2 trust badge grid |
| `components/FAQ.tsx` | Rewrite | Section header pattern |
| `components/LeadCaptureForm.tsx` | Rewrite | Charcoal bg, icon inputs, value props |
| `components/Footer.tsx` | Rewrite | Refined spacing, gold accents |
| `components/StickyCtaBar.tsx` | Rewrite | Detect both quiz and form sections |
| `components/ui/ScrollProgress.tsx` | Create | Fixed scroll progress bar at top |
| `components/ui/Button.tsx` | Rewrite | Charcoal primary, magnetic hover |
| `components/ui/Card.tsx` | Rewrite | hover-lift shadow, glass variant |
| `components/ui/Accordion.tsx` | Rewrite | Gold hover, animated toggle circle |
| `components/ui/FadeIn.tsx` | Rewrite | New cubic-bezier curve, CSS class approach |

Files **not touched** (no changes needed):
- `components/ui/Icons.tsx`, `ui/BodyAreaIcon.tsx`, `ui/ConditionIcon.tsx` — already built
- `components/ui/CountUp.tsx` — works as-is
- `data/*` — all data files stay as-is (emoji icons already replaced with keys)
- `lib/*` — scoring, GHL, schema untouched
- `app/api/*` — API route untouched

---

## Task 1: Global Theme & Typography Foundation

**Files:**
- Rewrite: `src/styles/globals.css`
- Modify: `src/app/layout.tsx`

This task sets up every color token, animation keyframe, and utility class that all other tasks depend on. Nothing else can be built until this is done.

- [ ] **Step 1: Rewrite globals.css with complete theme**

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-cream: #FDFAF5;
  --color-warm-white: #FFFEF9;
  --color-ivory: #F0EBE0;
  --color-charcoal: #1A1A1A;
  --color-charcoal-light: #3A3A3A;
  --color-slate: #6B6B6B;
  --color-muted: #999999;
  --color-gold: #C8A96E;
  --color-gold-dark: #B8912E;
  --color-gold-light: #E8D5A0;
  --color-trust-green: #1A6B4A;
  --color-trust-green-light: #E8F5EE;
  --color-green-bright: #4ADE80;

  /* Typography */
  --font-serif: var(--font-playfair), Georgia, serif;
  --font-sans: var(--font-dm-sans), system-ui, sans-serif;

  --text-h1-mobile: 2.25rem;
  --text-h1-mobile--line-height: 1.08;
  --text-h1-desktop: 3.25rem;
  --text-h1-desktop--line-height: 1.06;
  --text-h2-mobile: 1.625rem;
  --text-h2-mobile--line-height: 1.2;
  --text-h2-desktop: 2.125rem;
  --text-h2-desktop--line-height: 1.15;
  --text-h3-mobile: 1.0625rem;
  --text-h3-mobile--line-height: 1.35;
  --text-h3-desktop: 1.1875rem;
  --text-h3-desktop--line-height: 1.35;

  /* Shadows */
  --shadow-card: 0 4px 24px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02);
  --shadow-card-hover: 0 20px 60px rgba(0,0,0,0.08);
  --shadow-quiz: 0 16px 56px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03);
  --shadow-sticky: 0 -4px 24px rgba(0,0,0,0.1);
  --shadow-cta: 0 4px 16px rgba(0,0,0,0.12);
  --shadow-cta-hover: 0 8px 32px rgba(0,0,0,0.2);

  /* Radii */
  --radius-card: 18px;
  --radius-card-lg: 22px;
  --radius-card-xl: 20px;
  --radius-button: 12px;
  --radius-pill: 24px;

  /* Layout */
  --max-width-page: 1200px;
  --max-width-quiz: 540px;
}

@layer base {
  body {
    @apply bg-cream text-charcoal font-sans;
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3 {
    @apply font-serif;
    letter-spacing: -0.5px;
  }
  @media (min-width: 1024px) {
    body { font-size: 17px; }
    h1 { letter-spacing: -1.5px; }
  }
}

/* ── Scroll-triggered fade-up ── */
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
.fade-up.delay-1 { transition-delay: 0.1s; }
.fade-up.delay-2 { transition-delay: 0.2s; }
.fade-up.delay-3 { transition-delay: 0.3s; }
.fade-up.delay-4 { transition-delay: 0.4s; }
.fade-up.delay-5 { transition-delay: 0.5s; }

/* ── Hover effects ── */
.hover-lift {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
}

.hover-glow {
  transition: box-shadow 0.35s ease;
}
.hover-glow:hover {
  box-shadow: 0 0 0 1px rgba(200,169,110,0.3), 0 12px 40px rgba(0,0,0,0.06);
}

.hover-scale {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-scale:hover {
  transform: scale(1.02);
}

/* ── Magnetic button ── */
.mag-btn {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.mag-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.mag-btn:hover::after { transform: translateX(100%); }
.mag-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-cta-hover); }
.mag-btn:active { transform: translateY(0); }

/* ── Card shimmer border ── */
.card-shimmer { position: relative; }
.card-shimmer::before {
  content: '';
  position: absolute;
  top: -1px; left: 0; right: 0;
  height: 5px;
  background: linear-gradient(90deg, #C8A96E, #E8D5A0, #C8A96E);
  background-size: 200% 100%;
  animation: shimmer 3s ease infinite;
  border-radius: var(--radius-card) var(--radius-card) 0 0;
}

/* ── Keyframes ── */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes floatSlow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(1deg); }
}
@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.15); }
}
@keyframes pulseRing {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}
@keyframes gentleGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(200,169,110,0.05); }
  50% { box-shadow: 0 0 40px rgba(200,169,110,0.12); }
}
@keyframes revealLine {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── Marquee ── */
.marquee-wrap {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
}
.marquee-track {
  display: flex;
  gap: 48px;
  width: max-content;
  animation: marquee 30s linear infinite;
}

/* ── Hero background ── */
.hero-gradient {
  background: linear-gradient(160deg, #FAF5EC 0%, #EDE5D5 50%, #E8DFCF 100%);
}

/* ── Premium inputs ── */
.premium-input {
  @apply bg-warm-white border border-ivory rounded-[14px] px-5 py-4 text-sm font-sans;
  @apply transition-all duration-200;
  @apply focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10;
}
.premium-input::placeholder { @apply text-muted/50; }

/* ── Section header pattern ── */
.section-header-label {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}
.section-header-label .gold-line {
  width: 48px;
  height: 1px;
  background: #C8A96E;
}
.section-header-label span {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #B8912E;
  font-weight: 700;
}

/* ── Quiz option ── */
.quiz-option {
  @apply flex items-center gap-3.5 p-4 border-[1.5px] border-ivory rounded-[14px] text-left cursor-pointer;
  @apply bg-white text-slate text-sm transition-all duration-200;
}
.quiz-option:hover {
  @apply border-gold;
  transform: translateX(4px);
}
.quiz-option.selected {
  @apply border-charcoal border-2 bg-charcoal/[0.03] text-charcoal font-semibold;
}

/* ── Scrollbar hide ── */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* ── Noise texture ── */
.noise-overlay { position: relative; }
.noise-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}

/* ── Scroll progress bar ── */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #C8A96E, #E8D5A0);
  z-index: 9999;
  transition: width 0.1s linear;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .fade-up { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Update layout.tsx — swap Inter for DM Sans, add scroll progress bar, replace TrustBar with TrustMarquee**

Replace the Inter import with DM Sans. Add the TrustMarquee component (which we'll create in Task 2). Add a client-side ScrollProgress component.

```tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "../styles/globals.css";
import { Nav } from "@/components/Nav";
import { TrustMarquee } from "@/components/TrustMarquee";
import { Footer } from "@/components/Footer";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ScrollProgress />
        <Nav />
        <TrustMarquee />
        <main>{children}</main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create ScrollProgress component**

Create `src/components/ui/ScrollProgress.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(h > 0 ? (window.scrollY / h) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}
```

- [ ] **Step 4: Build to verify theme compiles**

Run: `npm run build`
Expected: Build succeeds. The TrustMarquee import will fail — that's expected, we create it in Task 2. For now, temporarily comment out the TrustMarquee import and usage in layout.tsx to verify the theme compiles.

- [ ] **Step 5: Commit**

```bash
git add src/styles/globals.css src/app/layout.tsx src/components/ui/ScrollProgress.tsx
git commit -m "feat: rewrite global theme with premium tokens, animations, and DM Sans font"
```

---

## Task 2: TrustMarquee + Nav + Button + Card + FadeIn + Accordion

**Files:**
- Create: `src/components/TrustMarquee.tsx`
- Rewrite: `src/components/Nav.tsx`
- Rewrite: `src/components/ui/Button.tsx`
- Rewrite: `src/components/ui/Card.tsx`
- Rewrite: `src/components/ui/FadeIn.tsx`
- Rewrite: `src/components/ui/Accordion.tsx`
- Delete: `src/components/TrustBar.tsx` (replaced by TrustMarquee)

These are the shared primitives every section component depends on.

- [ ] **Step 1: Create TrustMarquee component**

Create `src/components/TrustMarquee.tsx`:

```tsx
import { StarIcon } from "@/components/ui/Icons";

export function TrustMarquee() {
  const items = (
    <>
      <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-muted">
        <StarIcon size={12} className="text-gold" />
        4.9 Star Rating
      </span>
      <span className="text-[11px] text-muted/40">&middot;</span>
      <span className="whitespace-nowrap text-[11px] text-muted">GMC Registered Specialists</span>
      <span className="text-[11px] text-muted/40">&middot;</span>
      <span className="whitespace-nowrap text-[11px] text-muted">10 Harley Street, London</span>
      <span className="text-[11px] text-muted/40">&middot;</span>
      <span className="whitespace-nowrap text-[11px] text-muted">6,000+ Patients Assessed</span>
      <span className="text-[11px] text-muted/40">&middot;</span>
      <span className="whitespace-nowrap text-[11px] text-muted">Non-Surgical Experts</span>
      <span className="text-[11px] text-muted/40">&middot;</span>
    </>
  );

  return (
    <div className="bg-[#F6F1E7] py-2.5 border-b border-black/[0.03] marquee-wrap">
      <div className="marquee-track">
        {items}
        {items}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite Nav.tsx**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { bodyAreas } from "@/data/bodyAreas";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-cream/97 backdrop-blur-2xl border-b border-black/[0.04] h-[58px] flex items-center">
      <div className="max-w-page mx-auto w-full px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="shrink-0 flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-[11px] bg-gradient-to-br from-charcoal to-charcoal-light flex items-center justify-center hover:scale-[1.03] transition-transform duration-200">
            <span className="font-serif text-gold text-xl font-bold">H</span>
          </div>
          <div className="hidden md:block">
            <div className="font-serif text-[15px] font-bold text-charcoal leading-none">Harley Street</div>
            <div className="text-[9px] text-gold-dark font-semibold uppercase tracking-[2.5px]">Wellness Clinic</div>
          </div>
        </Link>

        <div className="flex gap-1 overflow-x-auto scrollbar-hide ml-4">
          {bodyAreas.map((area) => {
            const isActive = pathname === `/${area.slug}`;
            return (
              <Link
                key={area.slug}
                href={`/${area.slug}`}
                className={`whitespace-nowrap px-4 py-[7px] rounded-pill text-[11px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-charcoal text-white"
                    : "text-muted hover:text-charcoal hover:scale-[1.02]"
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

- [ ] **Step 3: Rewrite Button.tsx**

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
  const base = "font-sans font-bold rounded-button inline-flex items-center justify-center gap-2.5 cursor-pointer";

  const variants = {
    primary: "mag-btn bg-charcoal text-white shadow-cta",
    secondary: "bg-ivory text-charcoal-light hover:bg-[#E8DFD0] active:scale-[0.97] transition-all duration-200",
    outline: "bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white active:scale-[0.97] transition-all duration-200",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[13px]",
    md: "px-7 py-3.5 text-[14px]",
    lg: "px-8 py-4 text-[15px] tracking-wide",
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

- [ ] **Step 4: Rewrite Card.tsx**

```tsx
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlighted" | "shimmer";
  hover?: boolean;
}

export function Card({
  variant = "default",
  hover = true,
  className = "",
  children,
  ...props
}: CardProps) {
  const base = "rounded-card bg-white border border-black/[0.04]";

  const variants = {
    default: "shadow-card",
    highlighted: "shadow-card border-2 border-gold",
    shimmer: "shadow-card card-shimmer overflow-hidden",
  };

  const hoverClass = hover ? "hover-lift" : "";

  return (
    <div
      className={`${base} ${variants[variant]} ${hoverClass} p-7 md:p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Rewrite FadeIn.tsx to use CSS class approach**

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  });

  const delayClass = delay > 0 ? `delay-${Math.round(delay / 100)}` : "";

  return (
    <div ref={ref} className={`fade-up ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
```

Note: The `delay` prop is still supported for API compatibility. Values like 100, 200, 300 map to delay-1, delay-2, delay-3 CSS classes. The `setTimeout` is kept as a fallback for custom delay values.

- [ ] **Step 6: Rewrite Accordion.tsx**

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
        className="flex w-full items-center justify-between py-5 text-left group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-semibold pr-4 group-hover:text-gold transition-colors duration-200">
          {question}
        </h3>
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? "bg-gold border-gold rotate-180" : "bg-warm-white border-ivory"
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 ${isOpen ? "text-white" : "text-gold"}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-[500px] pb-5" : "max-h-0"}`}>
        <p className="text-slate leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Delete TrustBar.tsx and uncomment TrustMarquee in layout.tsx**

Remove the TrustBar import and file. Ensure layout.tsx uses TrustMarquee (from Step 2 of Task 1).

- [ ] **Step 8: Build to verify**

Run: `npm run build`
Expected: Build succeeds. Some pages may have visual issues since section components haven't been updated yet, but no compilation errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add shared UI primitives — TrustMarquee, Nav, Button, Card, FadeIn, Accordion"
```

---

## Task 3: Hero + SocialProof + Quiz + QuizResults

**Files:**
- Rewrite: `src/components/Hero.tsx`
- Rewrite: `src/components/SocialProof.tsx`
- Rewrite: `src/components/Quiz.tsx`
- Rewrite: `src/components/QuizResults.tsx`

These are the conversion-critical components. The Hero and Quiz are the first things ad traffic sees.

- [ ] **Step 1: Rewrite Hero.tsx**

Full two-column hero with floating clinic card, animated counters, trust badge, gold gradient headline accent, floating testimonial, and "Online now" indicator. Use the code from the v3 mockup translated to React/Tailwind. Key elements:

- Hero background: `hero-gradient` class + grid pattern overlay (2% opacity) + two pulsing radial gradient orbs + floating decorative dots
- Left column: animated trust pill (green pulsing dot + "GMC Registered"), Playfair 52px headline with gold gradient `background-clip: text` on accent line + animated underline via `revealLine`, DM Sans body text, charcoal `mag-btn` CTA, stats row with `CountUp` components
- Right column: white floating card with teal gradient image placeholder, star badge overlapping bottom-left, card body with clinic info, floating testimonial with `floatSlow` animation, "Online now" pill with pulsing green dot
- Mobile: stacks vertically, hides testimonial and online indicator

The Hero component receives `bodyArea` prop and uses `bodyArea.headline` and `bodyArea.subheadline` for content.

- [ ] **Step 2: Rewrite SocialProof.tsx**

```tsx
import { CountUp } from "@/components/ui/CountUp";
import { socialProofStats } from "@/data/stats";
import { FadeIn } from "@/components/ui/FadeIn";

export function SocialProof() {
  return (
    <section className="bg-cream py-10 md:py-14">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="bg-white rounded-card border border-black/[0.04] shadow-card px-8 py-6">
            <div className="flex justify-around items-center text-center">
              {socialProofStats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  {i > 0 && (
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-ivory to-transparent" />
                  )}
                  <div>
                    <p className="font-serif text-2xl md:text-3xl font-extrabold text-gold tracking-tight">
                      <CountUp end={stat.value} />
                    </p>
                    <p className="text-[10px] text-muted mt-1.5 font-semibold uppercase tracking-[1.5px]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite Quiz.tsx**

Key changes from current:
- Background: `white` section (not gold/navy gradient)
- Section header: flanking gold lines + "FREE ASSESSMENT" label + Playfair heading
- Quiz card: cream bg, 22px radius, 40px padding, `gentleGlow` animation
- Step indicator: 5 pill-shaped dots (28px x 5px) — active charcoal, rest ivory
- Options: use `.quiz-option` CSS class, radio dots with animated scale-in on select
- Hover: options slide 4px right with gold border
- Selected: charcoal border + bg tint + bold text
- Contact form: shield icon header, inputs with leading SVG icons (UserIcon, MailIcon, PhoneIcon), premium-input class
- Trust line below quiz card: GDPR + 2 minutes with green SVG icons

Preserve all existing quiz logic (selectOption, goNext, goBack, handleSubmit, state management). Only change the JSX and class names.

- [ ] **Step 4: Rewrite QuizResults.tsx**

Key changes:
- Section header with gold-line
- Score gauge uses gradient stroke (`linearGradient` from trust-green to gold)
- Treatment cards use `variant="shimmer"` Card with hover-lift
- "BEST MATCH" badge uses gold gradient bg
- Match label pills use CheckCircleIcon
- Bottom CTA uses charcoal mag-btn
- Disclaimer card with ShieldCheckIcon

Preserve all existing scoring logic and animation.

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: rewrite Hero, SocialProof, Quiz, and QuizResults with premium design"
```

---

## Task 4: Content Sections — Conditions, Stats, Risks, Comparison, Treatments

**Files:**
- Rewrite: `src/components/ConditionCards.tsx`
- Rewrite: `src/components/StatsSection.tsx`
- Rewrite: `src/components/TraditionalRisks.tsx`
- Rewrite: `src/components/ComparisonTable.tsx`
- Rewrite: `src/components/TreatmentCards.tsx`

- [ ] **Step 1: Rewrite ConditionCards.tsx**

- Section header pattern (flanking gold lines + label + heading + subtitle)
- Card variant `"shimmer"` with hover-lift
- 52px icon container with gold gradient bg
- ConditionIcon SVG inside
- Symptom pills: `text-[10px] px-3 py-1.5 bg-[#F6F1E7] rounded-pill text-muted`
- Each card fades up with staggered delay

- [ ] **Step 2: Rewrite StatsSection.tsx**

- White background
- Section header pattern
- Cards with `card-shimmer` top bar (thin 0.5px version — use a separate CSS class or inline the height)
- Gold serif stat numbers, slate description, italic muted source

- [ ] **Step 3: Rewrite TraditionalRisks.tsx**

- Section header pattern
- 2-column grid, cream bg cards with ivory border
- Icon + heading row using AlertIcon in charcoal/5% bg container
- Green callout below using ShieldCheckIcon + trust-green-light bg

- [ ] **Step 4: Rewrite ComparisonTable.tsx**

- Dark section: `bg-charcoal` with decorative radial gradient orbs
- Section header in white/gold
- Table: gold uppercase headers for regenerative, muted white for surgery
- Green `#4ADE80` text for positive values (None, Minimal, <0.1%)
- Surgery values in `rgba(255,255,255,0.25)`
- Each row fades up on scroll with FadeIn

- [ ] **Step 5: Rewrite TreatmentCards.tsx**

- Cream background
- Card variant `"shimmer"` with hover-lift
- Price in gold serif bold, right-aligned
- Tags: trust-green-light bg with CheckCircleIcon
- Italic price note at bottom

- [ ] **Step 6: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: rewrite content sections with premium card design and dark comparison table"
```

---

## Task 5: Testimonials, LocationTrust, FAQ, Footer, BottomCTA

**Files:**
- Rewrite: `src/components/Testimonials.tsx`
- Rewrite: `src/components/LocationTrust.tsx`
- Rewrite: `src/components/FAQ.tsx`
- Rewrite: `src/components/Footer.tsx`
- Create: `src/components/BottomCTA.tsx`

- [ ] **Step 1: Rewrite Testimonials.tsx**

- Section header pattern
- Cards: white, 20px radius, hover-lift
- Gold StarIcon SVGs (not emoji characters)
- Italic quote, border-top divider, gradient avatar circle + name
- Disclaimer at bottom of each card

- [ ] **Step 2: Rewrite LocationTrust.tsx**

- Section header pattern with subtitle
- 2-column: map iframe left, Card right
- Card: 2x2 grid of trust badges (trust-green-light bg, rounded-xl, icon + label)
- Address block with border-top divider

- [ ] **Step 3: Rewrite FAQ.tsx**

- Section header pattern with subtitle
- White card container, max-w-3xl, border + shadow
- Uses the updated AccordionItem from Task 2

- [ ] **Step 4: Rewrite Footer.tsx**

- Refined spacing: 20px vertical padding
- Gold serif brand name, slate/50 body text, white/40 links
- Hover: links turn gold
- Charcoal outline button for "Speak with a Specialist"
- Disclaimer text at white/25 opacity
- Border separators at white/5

- [ ] **Step 5: Create BottomCTA.tsx**

```tsx
"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function BottomCTA() {
  return (
    <section className="py-20 md:py-24 bg-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,110,0.04),transparent_60%)]" />
      {/* Pulsing decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/[0.06]" style={{ animation: "pulseRing 4s ease-in-out infinite" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gold/[0.08]" style={{ animation: "pulseRing 4s ease-in-out infinite 1s" }} />

      <div className="relative z-10">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-3">
            Ready to Explore Your Options?
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="text-sm text-slate mb-8">
            Take the free 2-minute assessment and see your personalised score
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <Button
            size="lg"
            onClick={() => {
              const quiz = document.getElementById("quiz");
              const form = document.getElementById("assessment-form");
              (quiz || form)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Free Assessment
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12H19" /><path d="M14 7L19 12L14 17" />
            </svg>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: rewrite Testimonials, LocationTrust, FAQ, Footer, and add BottomCTA"
```

---

## Task 6: Page Layouts — Homepage + Body Area Pages + StickyCtaBar

**Files:**
- Rewrite: `src/app/page.tsx`
- Modify: `src/app/[bodyArea]/page.tsx`
- Rewrite: `src/components/LeadCaptureForm.tsx`
- Rewrite: `src/components/StickyCtaBar.tsx`

- [ ] **Step 1: Rewrite homepage page.tsx**

Section order:
1. Centered hero (no right column, just headline + trust indicators, no CTA button — form is below)
2. LeadCaptureForm
3. SocialProof
4. Body Area Grid (6 cards with BodyAreaIcon, ArrowRightIcon, hover-lift + gold border on hover)
5. ComparisonTable
6. TreatmentCards
7. Testimonials
8. LocationTrust

Homepage hero: centered layout, animated trust pill, Playfair 52px headline with gold underline on "Joint Pain", subtitle, trust indicator row (ShieldCheckIcon + ClockIcon + HeartPulseIcon).

- [ ] **Step 2: Rewrite LeadCaptureForm.tsx**

- Charcoal `#1A1A1A` background with noise-overlay
- Decorative gradient orbs at low opacity
- Two-column grid: left has white text value props (gold-line, heading, description, 3 items with icon containers), right has white form card
- Form: "FREE ASSESSMENT" label, heading, 3 premium-input fields, charcoal submit button, GDPR text
- Success state: trust-green ShieldCheckIcon + thank you message

- [ ] **Step 3: Modify body area page.tsx**

Update section order to:
1. Hero
2. Quiz (moved from position 8 to position 2)
3. SocialProof
4. StatsSection
5. ConditionCards
6. TraditionalRisks
7. ComparisonTable
8. TreatmentCards
9. Testimonials
10. LocationTrust
11. FAQ
12. BottomCTA (new)

Add BottomCTA import and usage at the end.

- [ ] **Step 4: Rewrite StickyCtaBar.tsx**

- Detect both `#quiz` and `#assessment-form` sections
- HeartPulseIcon instead of text label
- Charcoal CTA button
- Scrolls to whichever form exists on the page

- [ ] **Step 5: Build and verify the complete site**

Run: `npm run build`
Expected: Build succeeds with 0 errors, all 11 static pages generated.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: rewrite page layouts — homepage centered hero, body area quiz-after-hero, BottomCTA"
```

---

## Task 7: Final Visual QA & Polish

**Files:**
- Possibly any file that needs tweaking

- [ ] **Step 1: Run dev server and visually inspect all pages**

Run: `npm run dev`

Check in browser:
- Homepage: hero centered, lead form renders, body area grid links work
- /knee-pain: hero two-column, quiz immediately after, all sections render
- /hip-pain, /shoulder-pain, /back-pain, /elbow-pain, /hand-wrist-foot-ankle: same structure
- Mobile viewport (375px): stacked layouts, hidden desktop-only elements, sticky CTA appears
- Scroll progress bar visible and tracking
- Trust marquee scrolling continuously
- Hover effects on cards, buttons, nav pills
- Quiz options clickable with proper select/deselect states
- CountUp animations fire on scroll

- [ ] **Step 2: Fix any visual issues found**

Address spacing, color, or alignment issues discovered during QA.

- [ ] **Step 3: Final build**

Run: `npm run build`
Expected: Build succeeds, 11 static pages, 0 errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: visual QA polish and final adjustments"
```

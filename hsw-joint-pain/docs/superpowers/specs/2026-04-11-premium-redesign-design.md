# Harley Street Wellness — Premium UI/UX Redesign

## Context

Ad-driven landing pages for a Harley Street private clinic selling regenerative joint treatments (PRP, exosomes, stem cells). The site has 6 body-area pages (knee, hip, shoulder, back, elbow, extremities) plus a homepage. Ad traffic lands directly on body-area pages. The homepage is secondary.

**Target audience**: Affluent adults 45-65+, expecting luxury private healthcare.
**Primary conversion**: Quiz completion (5 questions) followed by lead capture (name, email, phone) into GoHighLevel.
**Core problem**: Current design is too clinical, too content-heavy before the quiz, has no visual identity, and doesn't feel premium.

## Design Direction

**Warm Minimal with Premium Interactivity** — cream/warm-white palette, editorial typography, charcoal CTAs, gold accents. Rich micro-interactions and scroll-triggered animations throughout. The design should feel like a high-end private clinic consultation, not an NHS information page.

Reference mockup: `.superpowers/brainstorm/525-1775882824/content/body-area-page-v3.html`

## Typography

- **Headings**: Playfair Display (400, 600, 700) — bold, decorative serif with luxury recognition
- **Body**: DM Sans (400, 500, 600, 700) — clean geometric sans, more distinctive than Inter
- **Heading letter-spacing**: -0.5px to -1.5px for tight editorial feel
- **Label text**: DM Sans, 10-11px, uppercase, letter-spacing 2-3px, gold color
- **Heading sizes**: Hero h1 52px desktop / 36px mobile, section h2 34px / 26px, h3 19px / 17px

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#FDFAF5` | Page background, default section bg |
| `warm-white` | `#FFFEF9` | Input backgrounds |
| `ivory` | `#F0EBE0` | Borders, dividers, tag pill backgrounds |
| `charcoal` | `#1A1A1A` | Primary text, CTA buttons, selected quiz state |
| `charcoal-light` | `#3A3A3A` | Secondary headings |
| `slate` | `#6B6B6B` | Body text |
| `muted` | `#999999` | Captions, disclaimers |
| `gold` | `#C8A96E` | Accent labels, icons, decorative elements, stat highlights |
| `gold-dark` | `#B8912E` | Label text, hover states |
| `gold-light` | `#E8D5A0` | Gradient endpoint |
| `trust-green` | `#1A6B4A` | Trust badges, GMC indicator, positive table values |
| `navy` | `#1A1A1A` | Dark sections (comparison table) — use charcoal, not blue-navy |

**No blue-navy backgrounds.** Dark sections use `#1A1A1A` charcoal. Gold is accent-only — never used for CTA buttons. CTAs are always charcoal with white text.

## Page Architecture — Body Area Pages (Primary Landing Pages)

The body area pages are where ad traffic lands. Every design decision optimizes for quiz completion.

### Section Order

1. **Nav** — sticky, blur backdrop, logo + body area pills
2. **Trust Marquee** — continuously scrolling ticker: "4.9 Rating / GMC Registered / Harley Street / 6,000+ Assessed / Non-Surgical Experts"
3. **Hero** — two-column on desktop, stacked on mobile
4. **Quiz** — full-width section immediately after hero (the primary conversion)
5. **Social Proof** — stats bar (6K+ / 10yr / 4.9)
6. **Conditions** — 3-column card grid for the body area's conditions
7. **Stats Section** — UK statistics cards with sources
8. **Traditional Risks** — surgery + steroid risk cards
9. **Comparison Table** — dark charcoal section, surgery vs regenerative
10. **Treatment Cards** — PRP, exosomes, stem cells with pricing
11. **Testimonials** — 3-column testimonial cards
12. **Location & Trust** — map + clinic info card
13. **FAQ** — accordion
14. **Bottom CTA** — centered call to action with pulsing decorative rings

### Nav

- Sticky, `top: 0`, `z-index: 50`
- Background: `cream/97% opacity` with `backdrop-filter: blur(16px)`
- Left: logo mark (dark rounded square with gold "H") + "Harley Street / WELLNESS CLINIC" text
- Right: body area pills — active pill is charcoal bg with white text, others are muted with hover scale
- Height: 56-60px
- Border-bottom: `1px solid rgba(0,0,0,0.04)`

### Trust Marquee

- Background: `#F6F1E7` (slightly darker than cream)
- Continuously scrolling left with CSS `marquee` animation (30s loop)
- Items: gold star SVG + "4.9 Rating", "GMC Registered", "Harley Street, London", "6,000+ Assessed", "Non-Surgical Experts" separated by middle dots
- Duplicate content for seamless loop
- Mask gradient on left/right edges for fade effect
- Font: 11px, muted color

### Hero Section

**Background**: Gradient `linear-gradient(160deg, #FAF5EC, #EDE5D5)` with:
- Subtle grid pattern overlay at 2% opacity
- Two radial gradient orbs (gold at top-right, green at bottom-left) that pulse slowly
- Small floating decorative dots (gold/green, 5-8px) with staggered float animations

**Left column** (desktop):
- Animated trust pill badge: white bg, green dot (pulsing), "GMC Registered / Harley Street, London"
- Headline: Playfair 52px, "Your Knee Pain / **Has Better Options** / Than Surgery"
  - "Has Better Options" has gold gradient text (`background-clip: text`) with a gold underline highlight that animates in via `scaleX` from left
- Subheadline: DM Sans 17px, slate color, max-width 460px
- CTA button: charcoal bg, white text, arrow SVG, magnetic hover effect (lifts + shimmer sweep)
- "No obligation" text beside button
- Stats row below a 1px divider: 3 animated counters (6,000+ / 4.9/5 / 10yr) that count up from 0 when scrolled into view. Serif numbers, gold accent characters (+, /5, yr)

**Right column** (desktop):
- Floating clinic card: white, 22px border-radius, large shadow. Top half is a teal/forest gradient placeholder for a real clinic photo (280px height). Star rating badge overlaps the image bottom-left. Card body shows "Harley Street Clinic / Non-surgical knee specialists / address"
- Floating testimonial snippet: white card, max-width 230px, positioned bottom-right, floats with `floatSlow` animation (6s). Shows a short quote + avatar circle + "Verified Patient"
- "Online now" indicator: small white pill with pulsing green dot, floats at top-right of the card

**Mobile**: stacks vertically — headline, subheadline, CTA, stats row, then clinic card below (testimonial and online indicator hidden on mobile to reduce clutter)

### Quiz Section

- Background: white
- Top accent: 1px gradient divider `linear-gradient(90deg, transparent, #E0D5C0, transparent)`
- Subtle radial glow at top center: `rgba(200,169,110,0.03)`
- Section label: flanking gold lines + "FREE ASSESSMENT" in gold uppercase
- Heading: Playfair 36px, "Discover Your Improvement Score"
- Subtitle: "5 quick questions / Personalised results / No obligation"

**Quiz card**: max-width 540px, cream bg (`#FDFAF5`), 22px border-radius, generous 40px padding, layered shadow + subtle `gentleGlow` animation (pulsing box-shadow)

- **Step indicator**: 5 pill-shaped dots (28px wide, 5px tall), active one is charcoal, rest are ivory. Transitions with 0.4s
- Question counter + percentage on same line
- Question text: Playfair 22px bold
- Options: 14px DM Sans, white bg, 1.5px ivory border, 14px border-radius, 16px padding
  - Hover: border shifts to gold, element slides 4px right, faint gold gradient overlay fades in
  - Selected: 2px charcoal border, charcoal radio dot animates in with scale, light charcoal bg tint, bold text
  - Radio circles: 22px, 2px border
- Auto-advance on single-select after 300ms

**Contact form** (after quiz questions):
- Shield icon in gold/10% bg circle
- "YOUR ASSESSMENT IS READY" label
- "Where should we send your Joint Health Score?" heading
- Inputs with leading SVG icons (user, mail, phone), premium-input class styling
- Charcoal submit button, full width
- GDPR disclaimer text

**Trust line below quiz**: GDPR Compliant + Takes 2 minutes with green shield/clock SVGs

### Social Proof Bar

- Cream background
- White card with subtle border and shadow
- 3 stats in a row with gradient dividers: `6,000+` / `10+` / `4.9`
- Serif numbers, gold color, uppercase tracking labels below
- Animate on scroll (fade-up)

### Condition Cards

- Cream section background
- Standard section header (flanking gold lines + label + Playfair heading + subtitle)
- 3-column grid, 20px gap
- Each card: white, 18px border-radius, **animated shimmer gold gradient top bar** (4-6px height, background-size 200%, shimmer animation 3s)
- Icon container: 52px, 16px border-radius, gold gradient bg (12% to 4%), gold stroke SVG icon
- Heading: Playfair 19px bold
- Description: DM Sans 13px, slate
- Bottom section: ivory divider, symptom pills (10px text, ivory bg, 20px border-radius)
- **Hover**: entire card lifts 6px with enhanced shadow (hover-lift class)
- **Scroll**: each card fades up with staggered delays

### Stats Section

- White background
- Standard section header
- 4-column grid (2 on mobile)
- Each card: white with ivory border, gold gradient top bar (0.5px), serif stat number in gold, description, source in italic muted
- Fade-up on scroll

### Traditional Risks

- White background
- 2-column grid for surgery risks and steroid risks
- Each: cream bg, ivory border, icon + heading row, body text
- Below: trust-green light bg callout with shield icon + comparison note
- Fade-up with staggered delays

### Comparison Table (Dark Section)

- Background: `#1A1A1A` charcoal
- Decorative radial gradient orbs (gold top-right, green bottom-left) at very low opacity
- Standard section header but in white/gold
- Full-width table with:
  - Gold uppercase column headers for regenerative options
  - Muted white headers for surgery column
  - Row borders at `rgba(255,255,255,0.04)`
  - Alternating rows with `rgba(255,255,255,0.01)` bg
  - Green (`#4ADE80`) text for positive regenerative values (None, Minimal, <0.1%)
  - Surgery values in `rgba(255,255,255,0.25)` to visually de-emphasize
  - Each row fades up on scroll with staggered delay

### Treatment Cards

- Cream background
- 3-column grid
- Same card style as conditions: white, shimmer top bar, hover-lift
- Price in gold serif bold, right-aligned in header
- Trust-green pills with check icons for tags
- Italic price note at bottom

### Testimonials

- Cream background
- 3-column grid
- White cards, 20px border-radius, hover-lift
- Gold star SVGs (not emoji)
- Italic quote text
- Divider, then avatar circle (gradient bg) + name + "Verified Patient"
- Disclaimer text at bottom of each card

### Location & Trust

- Slightly different cream (`ivory/50`) background
- 2-column: Google Maps iframe left, clinic info card right
- Info card has 2x2 grid of trust badges (green bg containers with icons)
- Address block at bottom with divider

### FAQ

- Cream background
- White card container with border and shadow, max-width 3xl
- Accordion items with:
  - Hover: heading turns gold
  - Toggle button: 28px circle, ivory border, gold chevron. When open: gold bg, white chevron, rotated 180deg
  - Smooth max-height transition

### Bottom CTA

- White background
- Radial gold glow at center (4% opacity)
- Concentric decorative rings: 2 circles (300px, 400px), 1px gold border at 6-8% opacity, pulsing animation with staggered timing
- Playfair heading, subtitle, charcoal magnetic button

### Sticky CTA Bar (Mobile)

- Fixed bottom, hidden on desktop (lg:hidden)
- White/95% bg with blur, ivory border-top, sticky shadow
- Shows when past hero AND quiz/form are not in viewport
- HeartPulse icon, "Free Assessment / 2-Min Joint Health Score", charcoal CTA button

## Page Architecture — Homepage (Secondary)

The homepage is for organic/direct traffic, not ad traffic.

### Section Order

1. Nav
2. Trust Marquee
3. Hero (centered, no right column — just headline + CTA + trust indicators)
4. Lead Capture Form (two-column: value props left, form right, charcoal `#1A1A1A` background)
5. Social Proof
6. Body Area Grid (6 cards linking to body area pages)
7. Comparison Table (dark)
8. Treatment Cards
9. Testimonials
10. Location & Trust

### Homepage Hero

- Same warm gradient background as body area pages
- **Centered** layout (not two-column)
- Animated trust pill at top
- Headline: Playfair 52px, "Non-Surgical Solutions for **Joint Pain**" with gold underline highlight on "Joint Pain"
- Subtitle + trust indicators row (shield, clock, heart-pulse icons)
- No CTA button in hero — the form is immediately below

### Lead Capture Form

- Charcoal (`#1A1A1A`) background with noise texture overlay
- Decorative gradient orbs (gold, green) at low opacity
- Left column (white text): gold-line divider, heading, description, 3 value props with icon containers (white/5% bg, white/10% border)
- Right column: white form card with "FREE ASSESSMENT" label, heading, 3 inputs (premium-input class), charcoal submit button, GDPR text
- Success state: trust-green shield icon + thank you message

### Body Area Grid

- White background
- Section header with gold-line, heading, subtitle
- 3-column grid (2 on tablet, 1 on mobile)
- Each card: white with hover-lift + gold border on hover
  - Body area SVG icon in gold gradient container (top-left)
  - Arrow icon (top-right, muted, slides right on hover)
  - Heading, condition names separated by " / ", gold "Take Assessment" link with arrow

## Interactive Features & Animations

### Scroll-Triggered

- **Intersection Observer** on all `.fade-up` elements — adds `.visible` class when 15% visible with -40px root margin
- Elements start `opacity: 0; translateY(30px)` and transition with `cubic-bezier(0.16, 1, 0.3, 1)` over 0.7s
- Stagger delays via `.delay-1` through `.delay-5` (100ms increments)

### Animated Counters

- Separate Intersection Observer at 50% threshold
- Numbers count from 0 to target over 1800ms with cubic ease-out
- Supports decimal (4.9) and integer (6000) modes
- Fires once per element

### Scroll Progress Bar

- Fixed `top: 0`, full width, 2px height
- Gold gradient background
- Width updates on scroll via `scrollY / (scrollHeight - innerHeight)`

### Hover Effects

- **hover-lift**: `translateY(-6px)` + enhanced shadow, `cubic-bezier(0.16, 1, 0.3, 1)` 350ms
- **hover-glow**: 1px gold ring + enhanced shadow, 350ms
- **hover-scale**: `scale(1.02)`, 300ms
- **Magnetic buttons (mag-btn)**: lifts 2px + shadow increase + shimmer pseudo-element sweeps left-to-right on hover. Active state returns to 0. Uses `::after` with gradient overlay

### Quiz Interactions

- Options slide 4px right on hover with gold border
- Selected option: charcoal border, radio dot scales in with 0.2s animation, tint background
- Auto-advance after 300ms on single-select questions
- Step dots transition between charcoal (active) and ivory (inactive) with 0.4s

### Card Animations

- **Shimmer border (card-animated)**: `::before` pseudo with gold gradient, `background-size: 200%`, shimmer animation 3s infinite
- **Gentle glow**: box-shadow pulses between subtle and slightly more visible gold glow, 4-5s infinite

### Decorative

- **Float**: `translateY(-10px)` over 4-6s, infinite, ease-in-out
- **FloatSlow**: float + subtle 1deg rotation, 6s
- **Pulse**: opacity 0.4-0.8 + scale 1-1.15, 2-6s depending on element
- **PulseRing**: decorative concentric rings in bottom CTA, opacity + scale pulse
- **RevealLine**: gold underline highlight animates via `scaleX(0)` to `scaleX(1)` with 0.8s delay

### Trust Marquee

- CSS-only `marquee` animation, 30s linear infinite
- Content duplicated for seamless loop
- Left/right fade mask via `mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent)`

## SVG Icons

All icons are custom SVG components (already built in `src/components/ui/Icons.tsx`). No emoji anywhere.

- **Body area icons**: KneeIcon, HipIcon, ShoulderIcon, SpineIcon, ElbowIcon, HandFootIcon
- **Condition icons**: BoneIcon, TearIcon, LightningIcon, FlameIcon, SnowflakeIcon, AlertIcon, LinkChainIcon, TennisIcon, FootIcon, HandIcon
- **UI icons**: StarIcon, LocationPinIcon, MedicalCrossIcon, ShieldCheckIcon, ClockIcon, UserCheckIcon, HeartPulseIcon, ArrowRightIcon, CheckCircleIcon, PhoneIcon, MailIcon, UserIcon

All are stroke-based, 24x24 viewBox, accept `size` and `className` props.

## Accessibility

- All animations respect `prefers-reduced-motion: reduce` — set duration to 0.01ms
- Quiz options have proper focus states and keyboard navigation
- Accordion buttons have `aria-expanded` attribute
- Color contrast: charcoal on cream passes WCAG AA. Gold on white does NOT pass for body text — gold is only used for labels and decorative elements, never for primary readable content
- All SVG icons in interactive contexts have appropriate labels

## Technical Notes

- Framework: Next.js 16 with Tailwind CSS 4
- Fonts loaded via `next/font/google` with `display: swap`
- FadeIn component uses IntersectionObserver (existing `src/components/ui/FadeIn.tsx` — will need updates for new transition curve and timing)
- CountUp component exists (`src/components/ui/CountUp.tsx`) — keep as-is
- Quiz state management is client-side React state (existing pattern, no changes)
- GoHighLevel webhook integration via `/api/quiz-submit` (existing, no changes)
- Stock photo placeholders: use teal/forest gradient with medical cross SVG placeholder. Real photos to be added later.

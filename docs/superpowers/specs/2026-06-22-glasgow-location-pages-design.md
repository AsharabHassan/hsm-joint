# Glasgow Location Pages — Design Spec

**Date:** 2026-06-22
**Status:** Approved for planning
**Author:** Brainstorming session

---

## Goal

Create a full mirror of the existing London landing-page funnel for a **real Glasgow clinic**, served under `/glasgow/...` URLs, using the same brand ("Harley Street Wellness") and the same doctors. Glasgow pages must show Glasgow-specific location details (address, phone, email, map) while every existing London page continues to render **identically**.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Scope | **Full mirror** — homepage + 6 body-area pages + joint-pain + pain-management + cortisone-injections + prp + exosomes + stem-cells |
| Clinic | **Real Glasgow clinic** (physical address provided) |
| URL structure | **Subfolder** — `/glasgow/<slug>` |
| Brand | **Same brand name** ("Harley Street Wellness"), Glasgow location details swapped in location contexts |
| Doctors | **Same doctors** — reuse existing `DoctorProfiles` |
| Build approach | **Approach B (duplicate)** — duplicate page route files; do not rewrite London route files |
| Scotland NHS stats | **Keep England figures** as-is on Glasgow pages (user directive) |

## Glasgow clinic details (source of truth)

- **Clinic name (location heading):** "Visit Our Clinic" / section heading "Find Us in Glasgow"
- **Address:** 5th Floor, Ingram House, 227 Ingram St, Glasgow G1 1DA
- **Phone:** 0141 488 8985  (tel: `01414888985`)
- **Email:** hello@harleystreetmedicalwellness.co.uk
- **Geo (Merchant City, approximate):** lat `55.8602`, long `-4.2466`
- **Map embed:** Google Maps embed querying `227 Ingram St, Glasgow G1 1DA`
- **Transport:** `TODO` — sensible default (Buchanan Street Subway / Queen Street station), confirm later
- **Reviews link / rating:** `TODO` — reuse brand 4.9 rating; Glasgow-specific Google reviews URL to confirm

---

## Architecture

### Approach B with additive, backward-compatible shared components

Page **route files** are fully duplicated into `src/app/glasgow/`. London route files are **not** modified.

Shared components imported by every page (`Hero`, `LocationTrust`, `Nav`, `Footer`, `StickyCtaBar`) and the `schema.ts` helpers **cannot** display a Glasgow address otherwise, so they become location-aware **additively**:

- They gain an optional `location` input that **defaults to London**.
- London pages pass nothing → identical behavior and output (verifiable by diffing rendered HTML / existing tests).
- Glasgow pages pass `location="glasgow"` (or are detected via pathname for chrome).

This is the single, unavoidable concession in Approach B. It is **not** the Approach-A refactor (no London route file becomes a thin wrapper around an extracted `*PageContent` component).

### Location data layer — `src/data/locations.ts` (new)

```ts
export interface Location {
  slug: "london" | "glasgow";
  pathPrefix: string;        // "" | "/glasgow"
  webhookPrefix: string;     // "" | "glasgow-"
  brandName: string;         // "Harley Street Wellness" (same for both)
  cityName: string;          // "London" | "Glasgow"
  locationHeading: string;   // "Find Us in London" | "Find Us in Glasgow"
  locationSubheading: string;
  phoneDisplay: string;      // "020 4628 3137" | "0141 488 8985"
  phoneHref: string;         // "02046283137" | "01414888985"
  email: string;
  baseUrl: string;           // see "Known issues" re: domain
  reviewsUrl: string;
  reviewRating: string;      // "4.9"
  reviewCount: string;       // "200"
  clinics: ClinicAddress[];  // London has 2; Glasgow has 1
  geo: { latitude: number; longitude: number };
  mapEmbedUrl: string;
  transport: { mode: string; text: string }[];
}

export interface ClinicAddress {
  name: string;              // "Harley Street Clinic" | "Ingram House Clinic"
  lines: string[];           // ["5th Floor, Ingram House", "227 Ingram St", "Glasgow G1 1DA"]
}

export const locations: Record<"london" | "glasgow", Location> = { /* ... */ };
export function getLocation(slug?: "london" | "glasgow"): Location; // defaults london
```

The `london` record encodes the **current** hard-coded London values exactly (so passing `location="london"` reproduces today's output). The `glasgow` record encodes the details above, with `TODO`-marked placeholders for transport and reviews.

### Location-aware shared components (additive edits)

| File | Change |
|------|--------|
| `src/lib/schema.ts` | `generateMedicalClinicSchema`, `generateBreadcrumbSchema`, `generateMedicalWebPageSchema` accept an optional `location` (default London) and read address/geo/baseUrl from the location record. |
| `src/components/LocationTrust.tsx` | Optional `location` prop (default London). Renders that location's heading, clinics, map, transport, reviews. London call site unchanged → renders the existing two-clinic London layout. |
| `src/components/Hero.tsx` | Trust-pill location text ("Harley Street, London" vs "Ingram St, Glasgow") sourced from the location; optional prop default London. |
| `src/components/Nav.tsx` | Detect `/glasgow` via `usePathname()`. Logo/home link and internal nav links stay within the active funnel (`/glasgow/...` on Glasgow); contact details swap. London (`/...`) path → existing behavior. |
| `src/components/Footer.tsx` | Same pathname-based location detection for addresses/contact/links. |
| `src/components/StickyCtaBar.tsx` | Same — CTA targets and phone follow the active location. |

`Quiz.tsx` and `LeadCaptureForm.tsx` already accept a `pageSource` prop; **no structural change** — Glasgow pages simply pass a `glasgow-` prefixed value.

### Glasgow routes (new) — `src/app/glasgow/`

13 pages, each a duplicate of its London counterpart with: Glasgow `location`, Glasgow `pageSource` (prefixed `glasgow-`), and Glasgow-localized metadata (title/description mention Glasgow).

| Route | Mirrors | pageSource |
|-------|---------|-----------|
| `/glasgow` | `/` (`app/page.tsx`) | `glasgow-home` |
| `/glasgow/[bodyArea]` | `/[bodyArea]` (6 slugs via `generateStaticParams`) | `glasgow-<slug>` |
| `/glasgow/joint-pain` | `/joint-pain` | `glasgow-joint-pain` |
| `/glasgow/pain-management` | `/pain-management-london` | `glasgow-pain-management` |
| `/glasgow/cortisone-injections` | `/cortisone-injections` | `glasgow-cortisone-injections` |
| `/glasgow/prp` | `/prp` | `glasgow-prp` |
| `/glasgow/exosomes` | `/exosomes` | `glasgow-exosomes` |
| `/glasgow/stem-cells` | `/stem-cells` | `glasgow-stem-cells` |

Body-area data, treatment data, FAQs, testimonials, doctors, and condition content are **reused unchanged** (UK-wide medical content). Per the locked decision, England NHS figures remain as-is on Glasgow pages.

### Lead routing (no API change)

`src/app/api/quiz-submit/route.ts` → `resolveWebhookUrl(pageSource)` already builds the env key `GHL_WEBHOOK_URL_${pageSource.toUpperCase().replace(/-/g, "_")}` with a global fallback. A Glasgow `pageSource` of `glasgow-knee-pain` resolves `GHL_WEBHOOK_URL_GLASGOW_KNEE_PAIN`, falling back to `GHL_WEBHOOK_URL`. No code change required.

`.env.example` gains a Glasgow block:

```
# Glasgow — global fallback
GHL_WEBHOOK_URL_GLASGOW=
# Glasgow body areas
GHL_WEBHOOK_URL_GLASGOW_KNEE_PAIN=
GHL_WEBHOOK_URL_GLASGOW_HIP_PAIN=
GHL_WEBHOOK_URL_GLASGOW_SHOULDER_PAIN=
GHL_WEBHOOK_URL_GLASGOW_BACK_PAIN=
GHL_WEBHOOK_URL_GLASGOW_ELBOW_PAIN=
GHL_WEBHOOK_URL_GLASGOW_HAND_WRIST_FOOT_ANKLE=
# Glasgow other pages
GHL_WEBHOOK_URL_GLASGOW_HOME=
GHL_WEBHOOK_URL_GLASGOW_JOINT_PAIN=
GHL_WEBHOOK_URL_GLASGOW_PAIN_MANAGEMENT=
GHL_WEBHOOK_URL_GLASGOW_CORTISONE_INJECTIONS=
GHL_WEBHOOK_URL_GLASGOW_PRP=
GHL_WEBHOOK_URL_GLASGOW_EXOSOMES=
GHL_WEBHOOK_URL_GLASGOW_STEM_CELLS=
```

### SEO

- `src/app/sitemap.ts` — append the 13 Glasgow URLs (additive; London entries unchanged).
- Glasgow pages emit JSON-LD with the Glasgow address/geo via the location-aware `schema.ts`.
- `public/llms.txt` — optional Glasgow mention (low priority).

---

## Data flow

```
Glasgow page (location="glasgow", pageSource="glasgow-knee-pain")
  ├─ Hero / LocationTrust / Footer / Nav  → read Glasgow record from locations.ts
  ├─ schema.ts helpers (location="glasgow") → JSON-LD with Ingram St address + geo
  └─ Quiz/LeadCaptureForm (pageSource="glasgow-knee-pain")
        └─ POST /api/quiz-submit
              └─ resolveWebhookUrl → GHL_WEBHOOK_URL_GLASGOW_KNEE_PAIN (or fallback)
```

## Testing

- **Existing tests stay green:** `scoring.test.ts`, `schema.test.ts` must pass. If `schema.test.ts` asserts London output, the default-London behavior must keep those assertions valid.
- **New:** a small test asserting `getLocation("glasgow")` returns Glasgow address/phone, and that `generateMedicalClinicSchema("glasgow")` emits the Glasgow `streetAddress`/`geo`.
- **Build:** `npm run build` succeeds; all 13 Glasgow routes statically generate.
- **Manual smoke:** spot-check `/glasgow/knee-pain` renders Glasgow address/phone, and `/knee-pain` (London) is visually unchanged.

## Backward-compatibility guarantee

Every shared-component edit is additive with a London default. Acceptance: rendered output of all existing London routes is unchanged. No London route file (`src/app/page.tsx`, `src/app/[bodyArea]/page.tsx`, `src/app/{prp,exosomes,stem-cells,cortisone-injections,joint-pain,pain-management-london}/page.tsx`) is modified.

## Known issues (flagged, not fixed — would alter London output)

1. **Base-URL domain mismatch:** `schema.ts` uses `https://harleystreetwellness.co.uk`, while `sitemap.ts`, `robots.txt`, and the real email domain use `harleystreetmedicalwellness.co.uk`. Glasgow's `baseUrl` will be set to the **correct** domain in `locations.ts`; London keeps its current value to stay byte-identical. Recommend a separate global fix.
2. **England NHS figures on Glasgow pages:** retained per user directive; factually England-specific (e.g. 28–29-week knee wait, 61.6% 18-week target). Revisit if Scotland accuracy becomes a compliance concern.

## Out of scope

- Refactoring London pages into shared `*PageContent` components (Approach A — rejected).
- Scotland-specific medical/stat content.
- Real transport directions and Glasgow-specific reviews URL (placeholders; confirm later).
- Multi-city generalization beyond London + Glasgow (the location layer allows it, but only these two are built).

# Glasgow Location Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full `/glasgow/...` mirror of the existing London landing-page funnel (13 pages) for a real Glasgow clinic, sharing the same brand and doctors, while every existing London page renders identically.

**Architecture:** Approach B (duplicate page route files into `src/app/glasgow/`). A new `src/data/locations.ts` is the single source of truth for per-city details. Shared components (`schema.ts`, `LocationTrust`, `Hero`, `Nav`, `Footer`, `LeadCaptureForm`) are made location-aware **additively** — an optional input that **defaults to London**, so London output is byte-for-byte unchanged. Glasgow leads route through the existing GHL webhook resolver via a `glasgow-` prefixed `pageSource`.

**Tech Stack:** Next.js 16 (App Router, `generateStaticParams`), React 19, TypeScript, Tailwind CSS 4, Vitest, `next/navigation` `usePathname`.

**Spec:** `docs/superpowers/specs/2026-06-22-glasgow-location-pages-design.md`

## Global Constraints

- **London is immutable.** Do NOT modify any file under `src/app/` that serves a London route (`page.tsx`, `[bodyArea]/page.tsx`, `prp/`, `exosomes/`, `stem-cells/`, `cortisone-injections/`, `joint-pain/`, `pain-management-london/`). Shared-component edits MUST default to London and leave London output unchanged.
- **Brand name stays "Harley Street Wellness"** everywhere (it is the company name, not a location). Only *physical-location* references change for Glasgow.
- **Keep England NHS figures** (e.g. "28-week NHS wait", "61.6%") unchanged on Glasgow pages — per user directive. Do not localize stat numbers.
- **Glasgow clinic facts (verbatim):** 5th Floor, Ingram House, 227 Ingram St, Glasgow G1 1DA · phone `0141 488 8985` (tel `01414888985`) · email `hello@harleystreetmedicalwellness.co.uk`.
- **Webhook prefix:** Glasgow `pageSource` values are the London value prefixed with `glasgow-` (e.g. `knee-pain` → `glasgow-knee-pain`). The body-area page passes `glasgow-${slug}`.
- **Localization mapping** (apply to all *visible copy* in duplicated Glasgow pages; case-sensitive find/replace unless noted):
  | Find | Replace |
  |------|---------|
  | `Harley Street, London W1G` | `Ingram St, Glasgow G1` |
  | `Harley Street, London` | `Ingram St, Glasgow` |
  | `our Harley Street clinic` | `our Glasgow clinic` |
  | `at our Harley Street clinic` | `at our Glasgow clinic` |
  | `Central London` | `Central Glasgow` |
  | `Pain Management London` | `Pain Management Glasgow` |
  | ` London \|` (in `metadata` titles) | ` Glasgow \|` |
  | `Harley Street clinic exterior` / `Harley Street clinic reception` (alt text) | `Glasgow clinic exterior` / `Glasgow clinic reception` |
  Do NOT replace: `Harley Street Wellness` (brand), `Harley Street specialists`/`Harley Street Medical Wellness` legal phrasing in disclaimers (handled by the location-aware Footer), or NHS stat sentences.
- **Verification baseline:** `npm run test`, `npm run lint`, and `npm run build` must all pass at the end of every task that changes code.

---

### Task 1: Location data layer (`src/data/locations.ts`)

**Files:**
- Create: `src/data/locations.ts`
- Create: `__tests__/locations.test.ts`

**Interfaces:**
- Produces:
  - `type LocationSlug = "london" | "glasgow"`
  - `interface Location` (fields listed in code below)
  - `const locations: Record<LocationSlug, Location>`
  - `function getLocation(slug?: LocationSlug): Location` — defaults to `"london"`
  - `function getLocationFromPath(pathname: string | null): Location` — returns Glasgow if path starts with `/glasgow`, else London

- [ ] **Step 1: Write the failing test**

Create `__tests__/locations.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { getLocation, getLocationFromPath } from "../src/data/locations";

describe("getLocation", () => {
  it("defaults to London", () => {
    expect(getLocation().slug).toBe("london");
    expect(getLocation().phoneDisplay).toBe("020 4628 3137");
  });

  it("returns Glasgow details", () => {
    const g = getLocation("glasgow");
    expect(g.phoneDisplay).toBe("0141 488 8985");
    expect(g.phoneHref).toBe("01414888985");
    expect(g.email).toBe("hello@harleystreetmedicalwellness.co.uk");
    expect(g.clinics).toHaveLength(1);
    expect(g.clinics[0].lines.join(" ")).toContain("227 Ingram St");
    expect(g.schemaAddress.postalCode).toBe("G1 1DA");
    expect(g.pathPrefix).toBe("/glasgow");
    expect(g.webhookPrefix).toBe("glasgow-");
  });

  it("keeps London with two clinics and original domain", () => {
    const l = getLocation("london");
    expect(l.clinics).toHaveLength(2);
    expect(l.baseUrl).toBe("https://harleystreetwellness.co.uk");
  });
});

describe("getLocationFromPath", () => {
  it("detects Glasgow from /glasgow paths", () => {
    expect(getLocationFromPath("/glasgow/knee-pain").slug).toBe("glasgow");
    expect(getLocationFromPath("/glasgow").slug).toBe("glasgow");
  });
  it("defaults to London otherwise", () => {
    expect(getLocationFromPath("/knee-pain").slug).toBe("london");
    expect(getLocationFromPath(null).slug).toBe("london");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- locations`
Expected: FAIL — cannot find module `../src/data/locations`.

- [ ] **Step 3: Create the implementation**

Create `src/data/locations.ts`:

```typescript
export type LocationSlug = "london" | "glasgow";

export interface ClinicAddress {
  name: string;
  lines: string[]; // full display address, one entry per line
}

export interface TransportLine {
  mode: string; // emoji
  text: string;
}

export interface Location {
  slug: LocationSlug;
  pathPrefix: string; // "" | "/glasgow"
  webhookPrefix: string; // "" | "glasgow-"
  brandName: string; // same for both
  cityName: string; // "London" | "Glasgow"
  locationHeading: string; // "Find Us in London" | "Find Us in Glasgow"
  locationSubheading: string;
  clinicCountLabel: string; // "2 London Clinics" | "1 Glasgow Clinic"
  phoneDisplay: string;
  phoneHref: string;
  telephoneE164: string; // schema format
  email: string;
  baseUrl: string;
  reviewsUrl: string;
  reviewRating: string;
  reviewCount: string;
  clinics: ClinicAddress[];
  schemaAddress: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
  };
  geo: { latitude: number; longitude: number };
  mapEmbedUrl: string;
  transport: TransportLine[];
}

export const locations: Record<LocationSlug, Location> = {
  london: {
    slug: "london",
    pathPrefix: "",
    webhookPrefix: "",
    brandName: "Harley Street Wellness",
    cityName: "London",
    locationHeading: "Find Us in London",
    locationSubheading:
      "Two convenient locations in the heart of London's prestigious medical district",
    clinicCountLabel: "2 London Clinics",
    phoneDisplay: "020 4628 3137",
    phoneHref: "02046283137",
    telephoneE164: "+44-20-4628-3137",
    email: "hello@harleystreetwellness.co.uk",
    baseUrl: "https://harleystreetwellness.co.uk",
    reviewsUrl: "https://g.co/kgs/harleystreetwellness",
    reviewRating: "4.9",
    reviewCount: "200",
    clinics: [
      { name: "Harley Street Clinic", lines: ["10 Harley Street", "London W1G 9PF"] },
      { name: "Portpool Lane Clinic", lines: ["1-5 Portpool Ln", "London EC1N 7UU"] },
    ],
    schemaAddress: {
      streetAddress: "10 Harley Street",
      addressLocality: "London",
      postalCode: "W1G 9PF",
    },
    geo: { latitude: 51.5155, longitude: -0.1484 },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8!2d-0.1484!3d51.5155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s10+Harley+Street%2C+London+W1G+9PF!5e0!3m2!1sen!2suk!4v1",
    transport: [
      { mode: "🚇", text: "Oxford Circus (3 min walk) · Regent's Park (5 min walk)" },
      { mode: "🚌", text: "Bus routes: 88, 453, C2 — stop on Harley Street" },
    ],
  },
  glasgow: {
    slug: "glasgow",
    pathPrefix: "/glasgow",
    webhookPrefix: "glasgow-",
    brandName: "Harley Street Wellness",
    cityName: "Glasgow",
    locationHeading: "Find Us in Glasgow",
    locationSubheading:
      "Our Glasgow clinic in the heart of the Merchant City",
    clinicCountLabel: "1 Glasgow Clinic",
    phoneDisplay: "0141 488 8985",
    phoneHref: "01414888985",
    telephoneE164: "+44-141-488-8985",
    email: "hello@harleystreetmedicalwellness.co.uk",
    baseUrl: "https://harleystreetmedicalwellness.co.uk",
    // TODO: confirm Glasgow-specific Google reviews URL (reusing brand URL for now)
    reviewsUrl: "https://g.co/kgs/harleystreetwellness",
    reviewRating: "4.9",
    reviewCount: "200",
    clinics: [
      {
        name: "Ingram House Clinic",
        lines: ["5th Floor, Ingram House", "227 Ingram St", "Glasgow G1 1DA"],
      },
    ],
    schemaAddress: {
      streetAddress: "5th Floor, Ingram House, 227 Ingram St",
      addressLocality: "Glasgow",
      postalCode: "G1 1DA",
    },
    geo: { latitude: 55.8602, longitude: -4.2466 },
    mapEmbedUrl:
      "https://www.google.com/maps?q=227+Ingram+St,+Glasgow+G1+1DA&output=embed",
    transport: [
      // TODO: confirm exact walking times
      { mode: "🚇", text: "Buchanan Street Subway (4 min walk)" },
      { mode: "🚆", text: "Glasgow Queen Street station (5 min walk)" },
    ],
  },
};

export function getLocation(slug: LocationSlug = "london"): Location {
  return locations[slug];
}

export function getLocationFromPath(pathname: string | null): Location {
  return pathname && pathname.startsWith("/glasgow")
    ? locations.glasgow
    : locations.london;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- locations`
Expected: PASS (5 assertions across 2 suites).

- [ ] **Step 5: Checkpoint**

Run: `npm run lint`
Expected: no errors. (If the project is git-initialized, commit: `git add src/data/locations.ts __tests__/locations.test.ts && git commit -m "feat: add location data layer for London + Glasgow"`.)

---

### Task 2: Make `schema.ts` location-aware

**Files:**
- Modify: `src/lib/schema.ts`
- Modify: `__tests__/schema.test.ts` (add Glasgow assertions only; keep existing London assertions intact)

**Interfaces:**
- Consumes: `getLocation`, `LocationSlug` from Task 1.
- Produces (updated signatures — all default London):
  - `generateMedicalClinicSchema(location?: LocationSlug)`
  - `generateBreadcrumbSchema(pageName: string, pagePath: string, location?: LocationSlug)`
  - `generateMedicalWebPageSchema(title, description, path, datePublished, dateModified, location?: LocationSlug)`
  - `generateFAQSchema(faqs)` — unchanged

- [ ] **Step 1: Write the failing test**

Append to `__tests__/schema.test.ts`:

```typescript
import { generateMedicalClinicSchema } from "../src/lib/schema";

describe("generateMedicalClinicSchema location awareness", () => {
  it("defaults to the London Harley Street address", () => {
    const s = generateMedicalClinicSchema();
    expect(s.address.streetAddress).toBe("10 Harley Street");
    expect(s.address.postalCode).toBe("W1G 9PF");
    expect(s.telephone).toBe("+44-20-4628-3137");
  });

  it("emits the Glasgow address and geo when location=glasgow", () => {
    const s = generateMedicalClinicSchema("glasgow");
    expect(s.address.addressLocality).toBe("Glasgow");
    expect(s.address.postalCode).toBe("G1 1DA");
    expect(s.telephone).toBe("+44-141-488-8985");
    expect(s.geo.latitude).toBe(55.8602);
    expect(s.url).toBe("https://harleystreetmedicalwellness.co.uk");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- schema`
Expected: FAIL — the Glasgow case returns London data (no `location` param yet).

- [ ] **Step 3: Update the implementation**

In `src/lib/schema.ts`, replace the top import and the three generator functions. Keep `generateFAQSchema` as-is.

Replace the file's existing constant/imports header:

```typescript
import type { FAQ } from "@/data/faqs";
import { getLocation, type LocationSlug } from "@/data/locations";
```

(Delete the old `const BASE_URL = "https://harleystreetwellness.co.uk";` line — base URL now comes from the location record.)

Replace `generateMedicalClinicSchema`:

```typescript
export function generateMedicalClinicSchema(location: LocationSlug = "london") {
  const loc = getLocation(location);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic" as const,
    name: loc.brandName,
    url: loc.baseUrl,
    telephone: loc.telephoneE164,
    email: loc.email,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: loc.schemaAddress.streetAddress,
      addressLocality: loc.schemaAddress.addressLocality,
      postalCode: loc.schemaAddress.postalCode,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: loc.geo.latitude,
      longitude: loc.geo.longitude,
    },
    medicalSpecialty: "Musculoskeletal Medicine",
    availableService: [
      {
        "@type": "MedicalTherapy" as const,
        name: "Cortisone Injections",
        description:
          "Anti-inflammatory corticosteroid injections for acute joint pain and inflammation",
      },
      {
        "@type": "MedicalTherapy" as const,
        name: "Hyaluronic Acid Injections",
        description:
          "Joint lubrication therapy to improve cushioning and reduce pain in arthritic joints",
      },
      {
        "@type": "MedicalTherapy" as const,
        name: "Non-Surgical Joint Treatment",
        description:
          "Evidence-based injection therapies for musculoskeletal conditions as alternatives to surgery",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating" as const,
      ratingValue: loc.reviewRating,
      reviewCount: loc.reviewCount,
      bestRating: "5",
    },
  };
}
```

Replace `generateBreadcrumbSchema`:

```typescript
export function generateBreadcrumbSchema(
  pageName: string,
  pagePath: string,
  location: LocationSlug = "london"
) {
  const base = getLocation(location).baseUrl;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: base },
      {
        "@type": "ListItem" as const,
        position: 2,
        name: pageName,
        item: `${base}${pagePath}`,
      },
    ],
  };
}
```

Replace `generateMedicalWebPageSchema` (only the `BASE_URL` references and publisher change):

```typescript
export function generateMedicalWebPageSchema(
  title: string,
  description: string,
  path: string,
  datePublished: string,
  dateModified: string,
  location: LocationSlug = "london"
) {
  const loc = getLocation(location);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage" as const,
    name: title,
    description,
    url: `${loc.baseUrl}${path}`,
    datePublished,
    dateModified,
    publisher: {
      "@type": "MedicalOrganization" as const,
      name: loc.brandName,
      url: loc.baseUrl,
    },
    about: { "@type": "MedicalCondition" as const, name: title },
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    medicalAudience: { "@type": "PatientAudience" as const },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -- schema`
Expected: PASS — both the pre-existing London assertions and the new Glasgow ones.

- [ ] **Step 5: Checkpoint**

Run: `npm run test && npm run lint`
Expected: all green. (Commit if git-initialized: `git commit -am "feat: make schema generators location-aware (default London)"`.)

---

### Task 3: Make `LocationTrust` location-aware

**Files:**
- Modify: `src/components/LocationTrust.tsx`

**Interfaces:**
- Consumes: `getLocation`, `LocationSlug` from Task 1.
- Produces: `LocationTrust` now accepts `{ location?: LocationSlug }` (default `"london"`). Existing London call sites (`<LocationTrust />`) are unchanged.

- [ ] **Step 1: Update the component signature and data source**

In `src/components/LocationTrust.tsx`, add the import and a props parameter, and source all location-specific values from the record. Replace the function declaration line and the hard-coded blocks as follows.

Add near the top imports:

```typescript
import { getLocation, type LocationSlug } from "@/data/locations";
```

Change the signature:

```typescript
export function LocationTrust({ location = "london" }: { location?: LocationSlug } = {}) {
  const loc = getLocation(location);
```

Replace the heading block text (`Find Us in London` / subheading) with:

```tsx
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              {loc.locationHeading}
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              {loc.locationSubheading}
            </p>
```

Replace the reviews "See All Reviews" anchor `href` and the rating/count text to use `loc.reviewsUrl`, `loc.reviewRating`, and `` `Based on ${loc.reviewCount}+ verified patient reviews on Google` ``.

Replace the map `<iframe src=...>` with `src={loc.mapEmbedUrl}` and `title={` `${loc.brandName} — ${loc.cityName}` `}`.

Replace the `LocationPinIcon` badge label `"2 London Clinics"` with `{loc.clinicCountLabel}`.

Replace the two hard-coded `<address>` blocks with a map over `loc.clinics`:

```tsx
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {loc.clinics.map((clinic) => (
                    <address key={clinic.name} className="text-[13px] text-slate not-italic leading-relaxed">
                      <strong className="text-charcoal block mb-1">{clinic.name}</strong>
                      {clinic.lines.map((line, i) => (
                        <span key={i}>{line}{i < clinic.lines.length - 1 ? <br /> : null}</span>
                      ))}
                    </address>
                  ))}
                </div>
```

Replace the phone anchor: `href={` `tel:${loc.phoneHref}` `}` and visible text `{loc.phoneDisplay}`.
Replace the email anchor: `href={` `mailto:${loc.email}` `}` and visible text `{loc.email}`.

Replace the two transport rows with a map over `loc.transport`:

```tsx
                <div className="flex flex-col gap-2">
                  {loc.transport.map((t) => (
                    <div key={t.text} className="flex items-center gap-2">
                      <span className="text-[12px]">{t.mode}</span>
                      <span className="text-[12px] text-slate">{t.text}</span>
                    </div>
                  ))}
                </div>
```

- [ ] **Step 2: Verify London output unchanged**

Run: `npm run build`
Expected: build succeeds. Manually confirm a London page (e.g. `/knee-pain`) still shows both clinics, "Find Us in London", and the London map (default `location="london"` reproduces prior content).

- [ ] **Step 3: Checkpoint**

Run: `npm run lint`
Expected: no errors. (Commit if git-initialized.)

---

### Task 4: Make `Hero` trust pill location-aware

**Files:**
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `getLocation`, `LocationSlug` from Task 1.
- Produces: `Hero` accepts `{ bodyArea: BodyArea; location?: LocationSlug }` (default London).

- [ ] **Step 1: Update the component**

In `src/components/Hero.tsx`, add import:

```typescript
import { getLocation, type LocationSlug } from "@/data/locations";
```

Change the props interface and signature:

```typescript
interface HeroProps {
  bodyArea: BodyArea;
  location?: LocationSlug;
}

export function Hero({ bodyArea, location = "london" }: HeroProps) {
  const loc = getLocation(location);
```

Replace the trust-pill location `<span>` (currently the literal `Harley Street, London`) with a city-aware value:

```tsx
              <span className="text-[12px] text-muted">
                {loc.slug === "glasgow" ? "Ingram St, Glasgow" : "Harley Street, London"}
              </span>
```

Leave the "Skip the 28-week NHS wait" callout unchanged (per Global Constraints).

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: success; `/knee-pain` (London) trust pill still reads "Harley Street, London".

- [ ] **Step 3: Checkpoint**

Run: `npm run lint`. (Commit if git-initialized.)

---

### Task 5: Make `Nav` and `Footer` location-aware via pathname

**Files:**
- Modify: `src/components/Nav.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `getLocationFromPath` from Task 1.
- Produces: Nav and Footer auto-detect Glasgow from the URL; no prop changes (they live in the root layout).

- [ ] **Step 1: Update `Nav.tsx`**

`Nav.tsx` already imports `usePathname`. Add:

```typescript
import { getLocationFromPath } from "@/data/locations";
```

Inside the component, after `const pathname = usePathname();`, add:

```typescript
  const loc = getLocationFromPath(pathname);
  const prefix = loc.pathPrefix; // "" | "/glasgow"
```

Then make every internal link and the active-state comparison prefix-aware:
- Logo `<Link href="/">` → `href={prefix || "/"}`.
- The "Joint Pain" links: `href="/joint-pain"` → `href={` `${prefix}/joint-pain` `}`; active check `pathname === "/joint-pain"` → `pathname === ` `${prefix}/joint-pain`.
- The body-area maps: `href={` `/${area.slug}` `}` → `href={` `${prefix}/${area.slug}` `}`; active check `pathname === ` `/${area.slug}` → `pathname === ` `${prefix}/${area.slug}`.
- Phone anchor: `href="tel:02046283137"` → `href={` `tel:${loc.phoneHref}` `}` and visible text `{loc.phoneDisplay}`.

(Apply to BOTH the desktop and mobile link rows.)

- [ ] **Step 2: Update `Footer.tsx`**

`Footer.tsx` is currently a server component. Convert it to a client component so it can read the pathname:

Add as the VERY FIRST line of the file:

```typescript
"use client";
```

Add imports:

```typescript
import { usePathname } from "next/navigation";
import { getLocationFromPath } from "@/data/locations";
```

Inside the component body (before `return`):

```typescript
  const pathname = usePathname();
  const loc = getLocationFromPath(pathname);
  const prefix = loc.pathPrefix;
```

Then:
- Conditions list links: `href={` `/${area.slug}` `}` → `href={` `${prefix}/${area.slug}` `}`.
- "Our Clinics" column: replace the two hard-coded `<address>` blocks with a map over `loc.clinics` (same shape as Task 3), appending `<br />United Kingdom` after the last line of each.
- Contact phone: `href="tel:02046283137"` → `href={` `tel:${loc.phoneHref}` `}`, visible `{loc.phoneDisplay}`.
- Contact email: `href="mailto:hello@harleystreetwellness.co.uk"` → `href={` `mailto:${loc.email}` `}`, visible `{loc.email}`.
- Transport block: replace the two hard-coded rows with a map over `loc.transport` (mode + text).
- Disclaimer line "All consultations and treatments are carried out by GMC-registered doctors at our Harley Street clinic." → replace `at our Harley Street clinic` with `` {`at our ${loc.cityName} clinic`} `` (keep the rest).
- Copyright line keeps `{loc.brandName}` (already "Harley Street Wellness").
- Note: `new Date().getFullYear()` is fine in a client component.

- [ ] **Step 3: Verify London unchanged + build**

Run: `npm run build`
Expected: success. On a London route, Nav/Footer links still point to `/joint-pain`, `/knee-pain`, etc., phone `020 4628 3137`, both London clinics shown.

- [ ] **Step 4: Checkpoint**

Run: `npm run lint`. (Commit if git-initialized.)

---

### Task 6: Add optional `pageSource`/`bodyArea` props to `LeadCaptureForm`

**Files:**
- Modify: `src/components/LeadCaptureForm.tsx`

**Interfaces:**
- Produces: `LeadCaptureForm` accepts `{ pageSource?: string; bodyArea?: string }`, both default `"homepage"`. London homepage call site (`<LeadCaptureForm />`) is unchanged.

- [ ] **Step 1: Update the component**

In `src/components/LeadCaptureForm.tsx`, change the signature:

```typescript
export function LeadCaptureForm({
  pageSource = "homepage",
  bodyArea = "homepage",
}: { pageSource?: string; bodyArea?: string } = {}) {
```

In `handleSubmit`, replace the hard-coded analytics + fetch body:

```typescript
    trackLeadSubmit({
      form_type: "lead_capture",
      page_source: pageSource,
    });

    try {
      await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, bodyArea, pageSource }),
      });
    } catch {
      // Still show success
    }
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: success; London homepage still posts `pageSource: "homepage"` (defaults).

- [ ] **Step 3: Checkpoint**

Run: `npm run lint`. (Commit if git-initialized.)

---

### Task 7: Glasgow homepage (`/glasgow`)

**Files:**
- Create: `src/app/glasgow/page.tsx` (duplicate of `src/app/page.tsx`)

**Interfaces:**
- Consumes: location-aware `LocationTrust` (Task 3), `LeadCaptureForm` (Task 6), `generateMedicalClinicSchema` (Task 2).

- [ ] **Step 1: Copy the London homepage**

Copy `src/app/page.tsx` to `src/app/glasgow/page.tsx` verbatim.

- [ ] **Step 2: Apply Glasgow edits**

In `src/app/glasgow/page.tsx`:
1. Schema: `generateMedicalClinicSchema()` → `generateMedicalClinicSchema("glasgow")`.
2. Trust pill: replace the hero `Harley Street, London` span text with `Ingram St, Glasgow` (per mapping).
3. Body-area grid links: `href={` `/${area.slug}` `}` → `href={` `/glasgow/${area.slug}` `}`.
4. `<LeadCaptureForm />` → `<LeadCaptureForm pageSource="glasgow-home" bodyArea="glasgow-homepage" />`.
5. `<LocationTrust />` → `<LocationTrust location="glasgow" />`.
6. Apply the localization mapping to any remaining visible copy (e.g. "Joint Pain" hero subcopy referencing London, if present).

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: `/glasgow` route compiles and statically generates. Smoke-check: Glasgow address in LocationTrust, body-area cards link to `/glasgow/...`.

- [ ] **Step 4: Checkpoint**

Run: `npm run lint`. (Commit if git-initialized.)

---

### Task 8: Glasgow body-area route (`/glasgow/[bodyArea]`)

**Files:**
- Create: `src/app/glasgow/[bodyArea]/page.tsx` (duplicate of `src/app/[bodyArea]/page.tsx`)

- [ ] **Step 1: Copy the London body-area page**

Copy `src/app/[bodyArea]/page.tsx` to `src/app/glasgow/[bodyArea]/page.tsx` verbatim. `generateStaticParams` and `getAllBodyAreaSlugs()` stay identical (same 6 slugs).

- [ ] **Step 2: Apply Glasgow edits**

In `src/app/glasgow/[bodyArea]/page.tsx`:
1. `generateMetadata`: append " | Glasgow" context — set `title` to `` `${bodyArea.headline} | Glasgow | Harley Street Wellness` `` and keep `description` (it is generic). Update the `openGraph.title` to match.
2. Schema calls:
   - `generateBreadcrumbSchema(bodyArea.name, ` `/${slug}` `)` → `generateBreadcrumbSchema(bodyArea.name, ` `/glasgow/${slug}` `, "glasgow")`.
   - `generateMedicalClinicSchema()` → `generateMedicalClinicSchema("glasgow")`.
   - `generateMedicalWebPageSchema(bodyArea.headline, bodyArea.subheadline, ` `/${slug}` `, "2026-04-11", "2026-04-11")` → path `` `/glasgow/${slug}` `` and add 6th arg `"glasgow"`.
3. `<Hero bodyArea={bodyArea} />` → `<Hero bodyArea={bodyArea} location="glasgow" />`.
4. `<Quiz bodyAreaSlug={slug} pageSource={slug} />` → `pageSource={` `glasgow-${slug}` `}`.
5. `<LocationTrust />` → `<LocationTrust location="glasgow" />`.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: all 6 Glasgow body-area routes statically generate (`/glasgow/knee-pain` … `/glasgow/hand-wrist-foot-ankle`). Smoke-check `/glasgow/knee-pain`: Glasgow trust pill, Glasgow LocationTrust, quiz posts `glasgow-knee-pain`.

- [ ] **Step 4: Checkpoint**

Run: `npm run lint`. (Commit if git-initialized.)

---

### Task 9: Glasgow ad-safe pages (joint-pain, pain-management, cortisone-injections)

**Files:**
- Create: `src/app/glasgow/joint-pain/page.tsx` (from `src/app/joint-pain/page.tsx`)
- Create: `src/app/glasgow/pain-management/page.tsx` (from `src/app/pain-management-london/page.tsx`)
- Create: `src/app/glasgow/cortisone-injections/page.tsx` (from `src/app/cortisone-injections/page.tsx`)

For EACH page: copy the source file, then apply (a) the localization mapping from Global Constraints to all visible copy, (b) the schema/pageSource/LocationTrust edits below. Each page's hero is inline (no `Hero` component) — localize its trust-pill text directly via the mapping.

- [ ] **Step 1: `glasgow/joint-pain/page.tsx`**

Copy `src/app/joint-pain/page.tsx` → `src/app/glasgow/joint-pain/page.tsx`. Then:
1. `metadata.title`: `"Joint Pain Treatment London | Non-Surgical Options | Harley Street Wellness"` → `"Joint Pain Treatment Glasgow | Non-Surgical Options | Harley Street Wellness"`; `openGraph.title` `"Joint Pain Treatment London | Harley Street Wellness"` → `"Joint Pain Treatment Glasgow | Harley Street Wellness"`; in both descriptions replace `our Harley Street specialists`→`our Glasgow specialists` and `at Harley Street`→`at our Glasgow clinic` where present.
2. Trust pill `Harley Street, London` → `Ingram St, Glasgow`.
3. `alt="Harley Street Wellness clinic reception"` → `alt="Harley Street Wellness Glasgow clinic reception"`.
4. `<Quiz bodyAreaSlug="general" pageSource="joint-pain" />` → `pageSource="glasgow-joint-pain"`.
5. `<LocationTrust />` → `<LocationTrust location="glasgow" />`.
6. `generateMedicalClinicSchema()` if present → `("glasgow")`.

- [ ] **Step 2: `glasgow/pain-management/page.tsx`**

Copy `src/app/pain-management-london/page.tsx` → `src/app/glasgow/pain-management/page.tsx`. Then:
1. Rename the default export function `PainManagementLondonPage` → `PainManagementGlasgowPage`.
2. `metadata.title` `"Pain Management London | Harley Street Specialists | Harley Street Wellness"` → `"Pain Management Glasgow | Harley Street Specialists | Harley Street Wellness"`; `openGraph.title` `"Pain Management London | Harley Street Wellness"` → `"Pain Management Glasgow | Harley Street Wellness"`; descriptions: `Expert pain management in Central London` → `Expert pain management in Central Glasgow`, `on Harley Street`→`in Glasgow`.
3. Hero pill `Harley Street, London W1G` → `Ingram St, Glasgow G1`.
4. Headline fragment `in Central London` → `in Central Glasgow`.
5. Body copy `our Harley Street specialists` → `our Glasgow specialists`; `alt="Harley Street clinic exterior"` → `alt="Glasgow clinic exterior"`; section label `Why Harley Street Wellness` stays (brand).
6. Keep the "average NHS orthopaedic wait is 28 weeks" sentence unchanged.
7. `<Quiz bodyAreaSlug="general" pageSource="pain-management-london" />` → `pageSource="glasgow-pain-management"`.
8. `<LocationTrust />` → `<LocationTrust location="glasgow" />`.
9. `generateMedicalClinicSchema()` if present → `("glasgow")`.

- [ ] **Step 3: `glasgow/cortisone-injections/page.tsx`**

Copy `src/app/cortisone-injections/page.tsx` → `src/app/glasgow/cortisone-injections/page.tsx`. Then:
1. `metadata.title` / `openGraph.title` `"Cortisone & Steroid Injections London | Harley Street Wellness"` → `"Cortisone & Steroid Injections Glasgow | Harley Street Wellness"`; in descriptions `at our Harley Street clinic` → `at our Glasgow clinic`.
2. Trust pill `Harley Street, London` → `Ingram St, Glasgow`.
3. Body copy: `delivered by GMC-registered specialists at our Harley Street clinic` → `…at our Glasgow clinic`; `alt="Cortisone injection preparation at Harley Street clinic"` → `…at Glasgow clinic`; `At Harley Street Wellness, all cortisone injections…` stays (brand); `Our Harley Street specialists explain…` → `Our Glasgow specialists explain…`.
4. Keep "NHS & NICE Recognised" / "used across the NHS" unchanged.
5. `<Quiz bodyAreaSlug="cortisone" pageSource="cortisone-injections" />` → `pageSource="glasgow-cortisone-injections"`.
6. `<LocationTrust />` → `<LocationTrust location="glasgow" />`.
7. `generateMedicalClinicSchema()` if present → `("glasgow")`.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: `/glasgow/joint-pain`, `/glasgow/pain-management`, `/glasgow/cortisone-injections` all generate. Grep check: `grep -rn 'pageSource="glasgow-' src/app/glasgow/` shows the three new sources.

- [ ] **Step 5: Checkpoint**

Run: `npm run lint`. (Commit if git-initialized.)

---

### Task 10: Glasgow treatment pages (prp, exosomes, stem-cells)

**Files:**
- Create: `src/app/glasgow/prp/page.tsx` (from `src/app/prp/page.tsx`)
- Create: `src/app/glasgow/exosomes/page.tsx` (from `src/app/exosomes/page.tsx`)
- Create: `src/app/glasgow/stem-cells/page.tsx` (from `src/app/stem-cells/page.tsx`)

For EACH: copy the source, apply the localization mapping, then the edits below.

- [ ] **Step 1: `glasgow/prp/page.tsx`**

Copy `src/app/prp/page.tsx` → `src/app/glasgow/prp/page.tsx`. Then:
1. `metadata.title` / `openGraph.title` `"PRP Therapy London | Platelet-Rich Plasma Injections | Harley Street Wellness"` → `"PRP Therapy Glasgow | Platelet-Rich Plasma Injections | Harley Street Wellness"`; descriptions `at our Harley Street clinic` → `at our Glasgow clinic`.
2. Trust pill `Harley Street, London` → `Ingram St, Glasgow`.
3. Body copy `Delivered by GMC-registered specialists at our Harley Street clinic.` → `…at our Glasgow clinic.`
4. `<Quiz bodyAreaSlug="general" pageSource="prp" />` → `pageSource="glasgow-prp"`.
5. `<LocationTrust />` → `<LocationTrust location="glasgow" />`.
6. `generateMedicalClinicSchema()` if present → `("glasgow")`.

- [ ] **Step 2: `glasgow/exosomes/page.tsx`**

Copy `src/app/exosomes/page.tsx` → `src/app/glasgow/exosomes/page.tsx`. Then:
1. `metadata.title` / `openGraph.title` `"Exosome Therapy London | Joint Treatment | Harley Street Wellness"` → `"Exosome Therapy Glasgow | Joint Treatment | Harley Street Wellness"`; descriptions `at our Harley Street clinic` → `at our Glasgow clinic`.
2. Trust pill `Harley Street, London` → `Ingram St, Glasgow`.
3. Body copy `Administered by GMC-registered specialists at our Harley Street clinic,` → `…at our Glasgow clinic,`.
4. `<Quiz bodyAreaSlug="general" pageSource="exosomes" />` → `pageSource="glasgow-exosomes"`.
5. `<LocationTrust />` → `<LocationTrust location="glasgow" />`.
6. `generateMedicalClinicSchema()` if present → `("glasgow")`.

- [ ] **Step 3: `glasgow/stem-cells/page.tsx`**

Copy `src/app/stem-cells/page.tsx` → `src/app/glasgow/stem-cells/page.tsx`. Then:
1. `metadata.title` / `openGraph.title` `"Stem Cell Therapy London | Regenerative Cell Treatment | Harley Street Wellness"` → `"Stem Cell Therapy Glasgow | Regenerative Cell Treatment | Harley Street Wellness"`; descriptions `at our Harley Street clinic` → `at our Glasgow clinic`.
2. Trust pill `Harley Street, London` → `Ingram St, Glasgow`.
3. Body copy `…processed and injected by GMC-registered specialists at our Harley Street clinic.` → `…at our Glasgow clinic.`.
4. `<Quiz bodyAreaSlug="general" pageSource="stem-cells" />` → `pageSource="glasgow-stem-cells"`.
5. `<LocationTrust />` → `<LocationTrust location="glasgow" />`.
6. `generateMedicalClinicSchema()` if present → `("glasgow")`.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: `/glasgow/prp`, `/glasgow/exosomes`, `/glasgow/stem-cells` generate. Grep: `grep -rn 'Harley Street, London' src/app/glasgow/` returns nothing.

- [ ] **Step 5: Checkpoint**

Run: `npm run lint`. (Commit if git-initialized.)

---

### Task 11: Sitemap + environment keys

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `.env.example`

**Interfaces:**
- Consumes: `getAllBodyAreaSlugs` (existing).

- [ ] **Step 1: Add Glasgow routes to the sitemap**

In `src/app/sitemap.ts`, after the existing `bodyAreaRoutes` const, add a Glasgow block and spread it into the returned array. Note: the sitemap `BASE_URL` is `https://harleystreetmedicalwellness.co.uk` (correct domain), so Glasgow URLs use it directly.

```typescript
  const glasgowBodyAreaRoutes = bodyAreaSlugs.map((slug) => ({
    url: `${BASE_URL}/glasgow/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const glasgowRoutes = [
    "/glasgow",
    "/glasgow/joint-pain",
    "/glasgow/pain-management",
    "/glasgow/cortisone-injections",
    "/glasgow/prp",
    "/glasgow/exosomes",
    "/glasgow/stem-cells",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/glasgow" ? 0.9 : 0.8,
  }));
```

Then add `...glasgowRoutes, ...glasgowBodyAreaRoutes` to the end of the returned array (after `...bodyAreaRoutes`).

- [ ] **Step 2: Add Glasgow webhook keys to `.env.example`**

Append to `.env.example`:

```
# ─── Glasgow Webhooks ────────────────────────────────────────────────────────
GHL_WEBHOOK_URL_GLASGOW=
GHL_WEBHOOK_URL_GLASGOW_HOME=
GHL_WEBHOOK_URL_GLASGOW_KNEE_PAIN=
GHL_WEBHOOK_URL_GLASGOW_HIP_PAIN=
GHL_WEBHOOK_URL_GLASGOW_SHOULDER_PAIN=
GHL_WEBHOOK_URL_GLASGOW_BACK_PAIN=
GHL_WEBHOOK_URL_GLASGOW_ELBOW_PAIN=
GHL_WEBHOOK_URL_GLASGOW_HAND_WRIST_FOOT_ANKLE=
GHL_WEBHOOK_URL_GLASGOW_JOINT_PAIN=
GHL_WEBHOOK_URL_GLASGOW_PAIN_MANAGEMENT=
GHL_WEBHOOK_URL_GLASGOW_CORTISONE_INJECTIONS=
GHL_WEBHOOK_URL_GLASGOW_PRP=
GHL_WEBHOOK_URL_GLASGOW_EXOSOMES=
GHL_WEBHOOK_URL_GLASGOW_STEM_CELLS=
```

Note: `resolveWebhookUrl` derives these keys automatically from `pageSource` (e.g. `glasgow-knee-pain` → `GHL_WEBHOOK_URL_GLASGOW_KNEE_PAIN`), falling back to `GHL_WEBHOOK_URL`. No route code change needed.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: success. The generated `/sitemap.xml` now includes all 13 Glasgow URLs.

- [ ] **Step 4: Checkpoint**

Run: `npm run lint`. (Commit if git-initialized.)

---

### Task 12: Full verification sweep

**Files:** none (verification only).

- [ ] **Step 1: Run the whole test suite**

Run: `npm run test`
Expected: PASS — `scoring`, `schema` (London + Glasgow), `locations`.

- [ ] **Step 2: Lint + production build**

Run: `npm run lint && npm run build`
Expected: no lint errors; build statically generates all London routes plus the 13 Glasgow routes:
`/glasgow`, `/glasgow/[knee-pain|hip-pain|shoulder-pain|back-pain|elbow-pain|hand-wrist-foot-ankle]`, `/glasgow/joint-pain`, `/glasgow/pain-management`, `/glasgow/cortisone-injections`, `/glasgow/prp`, `/glasgow/exosomes`, `/glasgow/stem-cells`.

- [ ] **Step 3: London-immutability grep checks**

Run: `grep -rn 'Harley Street, London' src/app/glasgow/`
Expected: no matches (all Glasgow trust pills localized).

Run: `grep -rln 'location="glasgow"' src/app/glasgow/`
Expected: every Glasgow page file that renders `LocationTrust` appears.

Run: `grep -rn 'pageSource="glasgow-\|pageSource={`glasgow-' src/app/glasgow/`
Expected: each interior Glasgow page shows a `glasgow-`-prefixed source.

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev`, then visit:
- `/knee-pain` — confirm unchanged (London trust pill, two London clinics, `/joint-pain` nav links, phone 020…).
- `/glasgow/knee-pain` — Glasgow trust pill ("Ingram St, Glasgow"), Glasgow LocationTrust (Ingram House, single clinic, 0141 phone), Nav links point to `/glasgow/...`, Footer shows Glasgow address.
- Submit the quiz on `/glasgow/knee-pain` with the network tab open — confirm the POST body has `pageSource: "glasgow-knee-pain"`.

- [ ] **Step 5: Final checkpoint**

(Commit if git-initialized: `git add -A && git commit -m "feat: add Glasgow location pages (/glasgow mirror)"`.)

---

## Self-Review Notes

- **Spec coverage:** locations.ts (Task 1) ✓; location-aware schema/LocationTrust/Hero/Nav/Footer/LeadCaptureForm (Tasks 2–6) ✓; 13 Glasgow pages (Tasks 7–10) ✓; lead routing via `glasgow-` prefix + env keys (Tasks 8–11) ✓; sitemap (Task 11) ✓; backward-compat guarantee enforced by London-default params + grep checks (Task 12) ✓.
- **Known issues (from spec, intentionally not fixed):** London `schema.ts` base-URL domain (`harleystreetwellness.co.uk`) retained for London to stay identical; Glasgow uses the correct `harleystreetmedicalwellness.co.uk`. England NHS stats retained on Glasgow pages per user directive.
- **Placeholders:** `TODO` markers in `locations.ts` for Glasgow transport walking times and the Glasgow-specific reviews URL are intentional data-confirmation items, not code gaps.

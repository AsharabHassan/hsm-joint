// Centralised GTM dataLayer push for lead/form conversions.
//
// IMPORTANT: every form on the site is a React form that calls
// e.preventDefault() and submits via fetch(). GTM's built-in
// "Form Submission" trigger (gtm.formSubmit) does NOT fire for these,
// because there is no native browser submit. Instead we push a custom
// dataLayer event named "hsw_lead_submit". In GTM, fire conversion tags on
// a CUSTOM EVENT trigger with event name = "hsw_lead_submit".
//
// The event name is deliberately unique (NOT "form_submit") so it cannot
// collide with GTM's native gtm.formSubmit or GA4 Enhanced Measurement's
// automatic "form_submit" event, which would otherwise cause double-firing.

export interface LeadSubmitParams {
  form_type: string;
  page_source: string;
  body_area?: string;
  score?: number;
}

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function trackLeadSubmit(params: LeadSubmitParams): void {
  if (typeof window === "undefined") return;

  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "hsw_lead_submit",
    ...params,
  });
}

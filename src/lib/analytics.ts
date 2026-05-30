// Centralised GTM dataLayer push for lead/form conversions.
//
// IMPORTANT: every form on the site is a React form that calls
// e.preventDefault() and submits via fetch(). GTM's built-in
// "Form Submission" trigger (gtm.formSubmit) does NOT fire for these,
// because there is no native browser submit. Instead we push a custom
// dataLayer event named "form_submit". In GTM, fire conversion tags on a
// CUSTOM EVENT trigger with event name = "form_submit".

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
    event: "form_submit",
    ...params,
  });
}

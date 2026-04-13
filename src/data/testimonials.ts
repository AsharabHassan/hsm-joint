export interface Testimonial {
  quote: string;
  name: string;
  initials: string;
  label: string;
  rating: number;
  treatment: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "The consultation was incredibly thorough. The specialist took time to explain every option available to me, and I never felt pressured into any particular treatment.",
    name: "James T.",
    initials: "JT",
    label: "Verified Patient",
    rating: 5,
    treatment: "Knee Consultation",
  },
  {
    quote:
      "I appreciated the honest, evidence-based approach. They clearly explained what the research shows and what it doesn't, which helped me make an informed decision.",
    name: "Sarah M.",
    initials: "SM",
    label: "Verified Patient",
    rating: 5,
    treatment: "Hip Assessment",
  },
  {
    quote:
      "The assessment process was straightforward and professional. The team made sure I understood my condition fully before discussing any next steps.",
    name: "David R.",
    initials: "DR",
    label: "Verified Patient",
    rating: 5,
    treatment: "Shoulder Review",
  },
  {
    quote:
      "From the moment I walked in, the clinic felt welcoming and professional. The specialist answered all my questions patiently and provided detailed written information to take away.",
    name: "Emma L.",
    initials: "EL",
    label: "Verified Patient",
    rating: 5,
    treatment: "Back Consultation",
  },
  {
    quote:
      "An excellent consultation experience. The doctor reviewed my imaging, explained the findings clearly, and outlined all available pathways without any sales pressure.",
    name: "Michael K.",
    initials: "MK",
    label: "Verified Patient",
    rating: 5,
    treatment: "Knee Treatment",
  },
];

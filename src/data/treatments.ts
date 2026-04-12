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
  adSafe?: boolean; // true = can be shown on Google Ads landing pages
}

export const treatments: Treatment[] = [
  {
    slug: "cortisone",
    name: "Cortisone Injection",
    price: "From £250",
    priceNote: "Final fees confirmed following assessment, based on individual treatment plan",
    duration: "15-30 minutes",
    setting: "Outpatient",
    downtime: "Minimal — resume normal activities same day",
    description:
      "Cortisone (corticosteroid) injections are one of the most established treatments for joint inflammation and pain. The injection delivers a powerful anti-inflammatory medication directly into the affected joint, providing targeted relief. Cortisone works by suppressing the immune response that causes inflammation, which in turn reduces swelling, pain, and stiffness. Relief typically begins within 48-72 hours and can last from several weeks to several months depending on the individual and severity of the condition. Cortisone injections are widely used across the NHS and private practice for osteoarthritis, bursitis, tendinitis, and other inflammatory joint conditions. While effective for short-to-medium-term pain relief, repeated cortisone injections are generally limited to 3-4 per year for a single joint, as research suggests that frequent use may contribute to cartilage thinning over time.",
    mechanism:
      "Anti-inflammatory corticosteroid delivered directly into the joint to suppress inflammation and reduce pain.",
    tags: ["15-30 min", "Outpatient", "Same-day recovery"],
    matchLabel: {
      good: "Good Match",
      best: "Best Match",
      explore: "Worth Exploring",
    },
    adSafe: true,
  },
  {
    slug: "hyaluronic-acid",
    name: "Hyaluronic Acid Injection",
    price: "From £350",
    priceNote: "Final fees confirmed following assessment, based on individual treatment plan",
    duration: "15-30 minutes",
    setting: "Outpatient",
    downtime: "Minimal — resume normal activities within 24 hours",
    description:
      "Hyaluronic acid (HA) injection therapy, also known as viscosupplementation, involves injecting a gel-like substance directly into the affected joint. Hyaluronic acid is a naturally occurring component of synovial fluid — the lubricant that helps joints move smoothly. In joints affected by osteoarthritis, the concentration and quality of natural hyaluronic acid decreases, contributing to friction, pain, and stiffness. HA injections aim to restore this lubrication, cushioning the joint and potentially reducing pain during movement. A course typically involves 1-3 injections spaced one week apart, with effects that may last 6-12 months. NICE guidelines recognise viscosupplementation as a treatment option for knee osteoarthritis. HA injections are considered safe with a low side-effect profile, making them suitable for patients who cannot tolerate anti-inflammatory medications or who wish to reduce their reliance on pain medication.",
    mechanism:
      "Gel-like hyaluronic acid injected into the joint to restore natural lubrication and cushioning, reducing friction and pain.",
    tags: ["15-30 min", "Outpatient", "NICE recognised"],
    matchLabel: {
      good: "Good Match",
      best: "Best Match",
      explore: "Worth Exploring",
    },
    adSafe: true,
  },
  {
    slug: "advanced-options",
    name: "Advanced Injection Options",
    price: "Discussed at Consultation",
    priceNote: "Your specialist will recommend the most suitable approach for your condition",
    duration: "30-90 minutes",
    setting: "Outpatient",
    downtime: "Varies by treatment — your specialist will advise",
    description:
      "Several advanced injection therapies may be suitable depending on your individual assessment results, the severity of your condition, and your treatment history. These evidence-based approaches use the body's own biological mechanisms to support joint health and tissue repair. Your GMC-registered specialist will review your assessment and medical history to determine which advanced options, if any, may be appropriate for your situation. A thorough consultation ensures you receive personalised guidance based on the latest published research and clinical evidence.",
    mechanism:
      "Several advanced injection therapies may be suitable depending on your assessment results. Discuss with your specialist.",
    tags: ["Personalised", "Specialist-guided", "Evidence-based"],
    matchLabel: {
      good: "Worth Exploring",
      best: "Recommended",
      explore: "Ask Your Specialist",
    },
    adSafe: true,
  },
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
    adSafe: false,
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
    adSafe: false,
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
    adSafe: false,
  },
];

export function getAdSafeTreatments(): Treatment[] {
  return treatments.filter((t) => t.adSafe === true);
}

export function getAllTreatments(): Treatment[] {
  return treatments;
}

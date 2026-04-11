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

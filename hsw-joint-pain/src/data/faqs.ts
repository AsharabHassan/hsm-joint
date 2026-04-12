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

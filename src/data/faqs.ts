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
    question: "Are non-surgical joint treatments safe?",
    answer:
      "Non-surgical injection therapies used at our clinic — including cortisone, hyaluronic acid, and other evidence-based approaches — have well-established safety profiles. The most common side effect is temporary soreness at the injection site, which typically resolves within 24-48 hours. All procedures are performed by GMC-registered practitioners using sterile techniques for precision. As with any medical procedure, potential risks and individual suitability are discussed thoroughly during your consultation. Your practitioner will review your medical history, current medications, and any contraindications before recommending a treatment plan tailored to your needs.",
  },
  {
    question: "What happens during a consultation at Harley Street Wellness?",
    answer:
      "Your consultation begins with a comprehensive review of your medical history, symptoms, and any previous imaging or treatments. The specialist will perform a physical examination of the affected area and may recommend additional imaging if needed. You will receive a clear explanation of your diagnosis, all available treatment options (including conservative, injection-based, and surgical approaches), the current evidence base for each, and associated costs. There is no obligation to proceed with any treatment. The consultation typically lasts 30-45 minutes, and you will receive written information to take away and consider at your own pace.",
  },
  {
    question:
      "What types of non-surgical injection therapies are available?",
    answer:
      "We offer a range of evidence-based injection therapies tailored to your condition. Cortisone injections reduce inflammation quickly and are ideal for acute flare-ups. Hyaluronic acid injections help lubricate the joint and improve cushioning, particularly effective for osteoarthritis. We also offer advanced non-surgical approaches that use your body's own natural healing mechanisms to support tissue repair. Your specialist will discuss which approach is most suitable based on your diagnosis, the severity of your condition, and the current published research. All options, including their benefits and limitations, are explained transparently during your consultation.",
  },
  {
    question: "How much do non-surgical joint treatments cost?",
    answer:
      "Treatment costs vary depending on the type of therapy recommended for your specific condition. Cortisone and hyaluronic acid injections are among the most affordable options, with prices confirmed following your assessment. Final fees are based on your individual treatment plan, including the area being treated and the number of sessions recommended. All pricing is transparent and inclusive with no hidden fees. Your consultation will include a detailed breakdown of costs. These treatments are not currently available on the NHS, and most private health insurance policies do not cover injection therapies, though we recommend checking with your provider.",
  },
  {
    question: "Can non-surgical treatment help if I have been told I need surgery?",
    answer:
      "A surgical recommendation does not necessarily mean surgery is the only option. Many patients explore non-surgical injection therapies as part of their decision-making process, particularly for mild-to-moderate conditions. Published research suggests that certain injection-based treatments may help support recovery in some patients who have been considered for surgery. However, for severe end-stage joint disease or acute injuries requiring structural repair, surgery may indeed be the most appropriate option. A consultation at our clinic will provide an honest, evidence-based assessment of whether non-surgical approaches may be relevant to your specific situation. We believe in presenting all options transparently.",
  },
];

export const bodyAreaFAQs: BodyAreaFAQs[] = [
  {
    bodyAreaSlug: "knee-pain",
    faqs: [
      {
        question:
          "How long do non-surgical injection therapies take to show results for knee pain?",
        answer:
          "The timeline depends on the type of injection therapy used. Cortisone injections typically provide relief within a few days and last 6-8 weeks. Hyaluronic acid injections may take 2-4 weeks to show full benefit, with results often lasting 6-12 months. Other advanced injection therapies may take 4-6 weeks for noticeable improvement, with maximum benefit typically reached at 3-6 months. Individual response varies based on the severity of joint degeneration, the specific condition being treated, and overall health factors. Your specialist will set realistic expectations based on your individual assessment.",
      },
      {
        question:
          "How do non-surgical injections compare to steroid injections for knee osteoarthritis?",
        answer:
          "Steroid (cortisone) injections typically provide faster initial relief, often within days, but the benefit usually lasts only 6-8 weeks and may diminish with repeat injections. A 2025 RSNA study found that steroid injections led to more knee joint damage over two years compared to control groups. Hyaluronic acid injections may take 2-4 weeks to show benefit but research suggests they provide more sustained improvement, often lasting 6-12 months. The choice between approaches depends on your individual situation — whether you need quick relief from a flare-up or longer-term joint support — and is best discussed with a specialist.",
      },
      {
        question: "How many injection sessions are typically needed for knee pain?",
        answer:
          "The number of sessions recommended varies based on the condition, its severity, and the type of injection therapy used. Cortisone injections are typically limited to 3-4 per year per joint. Hyaluronic acid may involve a series of 1-3 injections spaced 1-2 weeks apart. For other injection therapies, many practitioners recommend 1-3 sessions spaced 2-4 weeks apart. Your specialist will recommend a treatment plan based on your individual assessment, taking into account the specific condition, its severity, and your response to initial treatment.",
      },
      {
        question: "Am I a good candidate for non-surgical knee treatment?",
        answer:
          "Patients with mild-to-moderate knee osteoarthritis, partial meniscus tears, or tendon injuries may be suitable candidates for non-surgical injection therapies. The best candidates are typically those who have not responded adequately to conservative treatments such as physiotherapy but whose condition has not progressed to severe end-stage disease. Factors including age, BMI, overall health, and the specific nature of your condition all influence suitability. A thorough medical assessment including review of imaging is essential to determine whether non-surgical approaches may benefit your situation.",
      },
      ...commonFAQs,
    ],
  },
  {
    bodyAreaSlug: "hip-pain",
    faqs: [
      {
        question: "How effective are injection therapies for hip bursitis?",
        answer:
          "A network meta-analysis published in PMC (2024) examined treatments for greater trochanteric pain syndrome (hip bursitis) and found that targeted injection therapies had the highest probability of being the most effective treatment at both 1-3 months and 6-12 months follow-up. The study also found that while steroid injections provided initial improvement, the benefit was maximal at 6 weeks and not sustained beyond 24 weeks, whereas certain non-surgical injection approaches showed sustained improvement at 2 years. Individual results vary, and your specialist will assess which injection therapy may be appropriate for your specific hip condition.",
      },
      {
        question: "What is the recovery time after injection therapy for hip pain?",
        answer:
          "Most patients return to normal daily activities within 24-48 hours of an injection for hip conditions. It is advisable to take it easy for approximately two weeks and avoid long walks or standing for prolonged periods during the initial healing phase. Low-impact exercise such as swimming or cycling can typically be resumed within 1-2 weeks. Full benefit from the treatment is usually assessed at 3-6 months depending on the type of therapy used. Your specialist will provide specific guidance based on your condition and the area treated.",
      },
      ...commonFAQs,
    ],
  },
  {
    bodyAreaSlug: "shoulder-pain",
    faqs: [
      {
        question:
          "Can injection therapy help with frozen shoulder?",
        answer:
          "A systematic review published in PMC (2023) examined injection therapies for frozen shoulder and found that targeted non-surgical injections improved outcomes at 3 months. The study found that certain injection approaches demonstrated significantly better range of motion in passive forward flexion and improved SPADI scores compared to steroid injection alone, with no reported side effects beyond injection-site discomfort. Frozen shoulder typically follows a natural course over 1-3 years, and injection therapies are being studied as a potential way to support recovery during this process. Your specialist will assess which approach may be relevant to your stage of frozen shoulder.",
      },
      {
        question:
          "What are the risks of rotator cuff surgery compared to non-surgical options?",
        answer:
          "Rotator cuff repair surgery has an overall complication rate of approximately 10.5%, with retear rates varying from 11% for small tears to as high as 94% for massive tears. Recovery requires 6-9 months before patients typically feel normal. Published research has shown that certain advanced injection approaches used alongside surgical repair can reduce revision surgery rates significantly. Non-surgical injection therapies alone may be suitable for partial tears and tendinopathy, while acute full-thickness tears in active patients often benefit most from surgical repair. Your specialist will provide an honest assessment based on your imaging and examination findings.",
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
          "How do non-surgical approaches work for disc problems?",
        answer:
          "For disc-related conditions, non-surgical injection approaches involve fluoroscopy-guided delivery of therapeutic agents directly into or around the damaged disc. These treatments deliver concentrated healing factors that may promote disc cell proliferation and reduce inflammatory mediators. Advanced injection therapies aim to support disc structure, hydration, and function through the release of anti-inflammatory and restorative molecules. Published studies have shown improvements in pain ratings and quality-of-life measures in some patients. These approaches may be most effective in early-to-moderate stages of degeneration. Recovery typically allows return to light activity within 2-4 weeks, compared to 6-12 weeks for microdiscectomy and 3-6 months for fusion.",
      },
      ...commonFAQs,
    ],
  },
  {
    bodyAreaSlug: "elbow-pain",
    faqs: [
      {
        question: "How effective are injection therapies for tennis elbow?",
        answer:
          "The evidence for non-surgical injection therapies in tennis elbow is generally promising. A randomised controlled trial studying 230 patients found success rates of 83.9% in the injection therapy group versus 68.3% in controls at 24 weeks, with pain improvement of 71.5% versus 56.1%. However, some systematic reviews show mixed results, and individual response may be influenced by factors including the chronicity of the condition. Interestingly, a blinded randomised controlled trial suggested outcomes of tennis elbow surgery are very similar to outcomes after sham surgery, highlighting the value of exploring non-surgical options. Your specialist will discuss the full evidence base for your specific situation.",
      },
      ...commonFAQs,
    ],
  },
  {
    bodyAreaSlug: "hand-wrist-foot-ankle",
    faqs: [
      {
        question: "How do injection therapies compare to surgery for plantar fasciitis?",
        answer:
          "A 2022 randomised prospective study published in the MDPI Journal of Clinical Medicine compared non-surgical injection therapy to partial plantar fasciotomy surgery. The injection therapy group demonstrated significantly quicker recovery, averaging 10.2 months compared to 37.2 months for the surgical group, with lower complication rates. A separate 2024 systematic review and meta-analysis found that targeted injection therapies are more effective than corticosteroid injections, extracorporeal shockwave therapy, and placebo in reducing pain and improving function for plantar fasciitis. Surgery is typically reserved for cases that have failed 6-12 months of comprehensive conservative management.",
      },
      ...commonFAQs,
    ],
  },
];

export function getFAQsByBodyArea(bodyAreaSlug: string): FAQ[] {
  const config = bodyAreaFAQs.find((f) => f.bodyAreaSlug === bodyAreaSlug);
  return config?.faqs ?? commonFAQs;
}

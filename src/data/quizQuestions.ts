export interface QuizOption {
  label: string;
  value: string;
  weight: number;
}

export interface NrsConfig {
  min: number;
  max: number;
  labels: Record<number, string>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "single" | "multi" | "nrs";
  options?: QuizOption[];
  nrsConfig?: NrsConfig;
}

export interface BodyAreaQuizConfig {
  bodyAreaSlug: string;
  questions: QuizQuestion[];
}

function buildQuestions(painLocationOptions: QuizOption[]): QuizQuestion[] {
  return [
    {
      id: "pain-location",
      type: "single",
      question: "Where is your primary area of discomfort?",
      options: painLocationOptions,
    },
    {
      id: "pain-intensity",
      type: "nrs",
      question: "On a scale of 0-10, how would you rate your pain on a typical day?",
      nrsConfig: {
        min: 0,
        max: 10,
        labels: {
          0: "No pain",
          3: "Mild",
          5: "Moderate",
          7: "Severe",
          10: "Worst imaginable",
        },
      },
    },
    {
      id: "stiffness",
      type: "single",
      question: "How severe is your joint stiffness first thing in the morning?",
      options: [
        { label: "None — I move freely", value: "none", weight: 1 },
        { label: "Mild — loosens within 10 minutes", value: "mild", weight: 2 },
        { label: "Moderate — takes 10-30 minutes to ease", value: "moderate", weight: 3 },
        { label: "Severe — lasts over 30 minutes", value: "severe", weight: 4 },
        { label: "Extreme — stiffness barely improves", value: "extreme", weight: 5 },
      ],
    },
    {
      id: "functional-impact",
      type: "multi",
      question: "Which daily activities are affected by your joint pain?",
      options: [
        { label: "Walking on flat surfaces", value: "walking-flat", weight: 2 },
        { label: "Going up or down stairs", value: "stairs", weight: 3 },
        { label: "Getting in/out of a car or chair", value: "sitting-standing", weight: 3 },
        { label: "Standing for 15+ minutes", value: "standing", weight: 3 },
        { label: "Exercise or sports", value: "exercise", weight: 2 },
        { label: "Sleeping through the night", value: "sleeping", weight: 4 },
      ],
    },
    {
      id: "duration",
      type: "single",
      question: "How long have you been experiencing this pain?",
      options: [
        { label: "Less than 1 month", value: "lt-1m", weight: 1 },
        { label: "1–6 months", value: "1-6m", weight: 2 },
        { label: "6–12 months", value: "6-12m", weight: 3 },
        { label: "1–3 years", value: "1-3y", weight: 4 },
        { label: "3+ years", value: "3y-plus", weight: 5 },
      ],
    },
    {
      id: "previous-treatments",
      type: "multi",
      question: "Which treatments have you already tried?",
      options: [
        { label: "No treatment yet", value: "none", weight: 1 },
        { label: "Over-the-counter painkillers", value: "otc", weight: 1 },
        { label: "Physiotherapy", value: "physio", weight: 2 },
        { label: "Cortisone / steroid injections", value: "cortisone", weight: 3 },
        { label: "Hyaluronic acid injections", value: "ha", weight: 3 },
        { label: "Prescription pain medication", value: "prescription", weight: 2 },
        { label: "Surgery has been recommended", value: "surgery-rec", weight: 5 },
      ],
    },
    {
      id: "age-range",
      type: "single",
      question: "What is your age range?",
      options: [
        { label: "Under 30", value: "under-30", weight: 2 },
        { label: "30–44", value: "30-44", weight: 3 },
        { label: "45–59", value: "45-59", weight: 4 },
        { label: "60–74", value: "60-74", weight: 5 },
        { label: "75+", value: "75-plus", weight: 4 },
      ],
    },
    {
      id: "primary-goal",
      type: "single",
      question: "What matters most to you right now?",
      options: [
        { label: "Return to sports or exercise", value: "sports", weight: 3 },
        { label: "Walk without pain", value: "walk", weight: 4 },
        { label: "Avoid or delay surgery", value: "avoid-surgery", weight: 5 },
        { label: "Reduce daily pain and medication", value: "reduce-pain", weight: 3 },
        { label: "Understand my options before deciding", value: "understand", weight: 2 },
      ],
    },
  ];
}

// ── Cortisone-specific assessment ─────────────────────────────────
// Custom questions tailored to cortisone injection suitability.
// Uses the same 8 question IDs so the scoring engine works unchanged.
const cortisoneQuestions: QuizQuestion[] = [
  {
    id: "pain-location",
    type: "single",
    question: "Which joint or area do you need a cortisone injection for?",
    options: [
      { label: "Knee — osteoarthritis or inflammation", value: "knee", weight: 4 },
      { label: "Hip — bursitis or arthritis", value: "hip", weight: 4 },
      { label: "Shoulder — frozen shoulder, bursitis or impingement", value: "shoulder", weight: 4 },
      { label: "Back — spinal or facet joint pain", value: "back", weight: 3 },
      { label: "Elbow — tennis elbow or golfer's elbow", value: "elbow", weight: 3 },
      { label: "Hand, wrist, foot or ankle", value: "extremity", weight: 3 },
      { label: "Multiple joints", value: "multiple", weight: 5 },
    ],
  },
  {
    id: "pain-intensity",
    type: "nrs",
    question: "How would you rate your current pain during a flare-up?",
    nrsConfig: {
      min: 0,
      max: 10,
      labels: {
        0: "No pain",
        3: "Mild",
        5: "Moderate",
        7: "Severe",
        10: "Worst imaginable",
      },
    },
  },
  {
    id: "stiffness",
    type: "single",
    question: "How would you describe the inflammation in your joint?",
    options: [
      { label: "No visible swelling — just pain", value: "none", weight: 2 },
      { label: "Occasional swelling after activity", value: "mild", weight: 3 },
      { label: "Frequent swelling and warmth", value: "moderate", weight: 4 },
      { label: "Constant swelling — joint feels hot and tight", value: "severe", weight: 5 },
      { label: "Severe flare-up right now — very swollen", value: "extreme", weight: 5 },
    ],
  },
  {
    id: "functional-impact",
    type: "multi",
    question: "How is the pain affecting your daily life right now?",
    options: [
      { label: "I can't exercise or play sports", value: "exercise", weight: 2 },
      { label: "Walking is painful or limited", value: "walking-flat", weight: 3 },
      { label: "Struggling with stairs or getting up from chairs", value: "stairs", weight: 3 },
      { label: "Pain wakes me up at night", value: "sleeping", weight: 4 },
      { label: "Can't work or do my job properly", value: "standing", weight: 3 },
      { label: "Simple tasks hurt — gripping, reaching, bending", value: "sitting-standing", weight: 3 },
    ],
  },
  {
    id: "duration",
    type: "single",
    question: "Have you had cortisone injections before?",
    options: [
      { label: "No — this would be my first", value: "lt-1m", weight: 2 },
      { label: "Yes — 1 injection, more than 6 months ago", value: "1-6m", weight: 3 },
      { label: "Yes — 2-3 injections over the past year", value: "6-12m", weight: 4 },
      { label: "Yes — multiple injections, effect is wearing off faster", value: "1-3y", weight: 5 },
      { label: "Yes — they no longer seem to work for me", value: "3y-plus", weight: 5 },
    ],
  },
  {
    id: "previous-treatments",
    type: "multi",
    question: "What else have you tried for this pain?",
    options: [
      { label: "Over-the-counter painkillers (ibuprofen, paracetamol)", value: "otc", weight: 1 },
      { label: "Physiotherapy or exercises", value: "physio", weight: 2 },
      { label: "Ice, heat, or compression", value: "none", weight: 1 },
      { label: "Prescription anti-inflammatories", value: "prescription", weight: 2 },
      { label: "Hyaluronic acid injections", value: "ha", weight: 3 },
      { label: "Surgery has been discussed or recommended", value: "surgery-rec", weight: 5 },
    ],
  },
  {
    id: "age-range",
    type: "single",
    question: "Do any of the following apply to you?",
    options: [
      { label: "None of the below apply", value: "under-30", weight: 1 },
      { label: "I have diabetes (Type 1 or Type 2)", value: "30-44", weight: 4 },
      { label: "I am on blood-thinning medication", value: "45-59", weight: 3 },
      { label: "I have an active infection or fever", value: "60-74", weight: 5 },
      { label: "I have had a joint replacement in the affected area", value: "75-plus", weight: 4 },
    ],
  },
  {
    id: "primary-goal",
    type: "single",
    question: "What is your main goal from a cortisone injection?",
    options: [
      { label: "Quick relief from a painful flare-up", value: "reduce-pain", weight: 4 },
      { label: "Reduce swelling so I can start physio", value: "sports", weight: 3 },
      { label: "Bridge the gap while waiting for surgery", value: "avoid-surgery", weight: 4 },
      { label: "Find out if cortisone is right for me long-term", value: "understand", weight: 2 },
      { label: "Explore alternatives — cortisone isn't lasting anymore", value: "walk", weight: 5 },
    ],
  },
];

export const quizConfigs: BodyAreaQuizConfig[] = [
  {
    bodyAreaSlug: "cortisone",
    questions: cortisoneQuestions,
  },
  {
    bodyAreaSlug: "general",
    questions: buildQuestions([
      { label: "Knee", value: "knee", weight: 4 },
      { label: "Hip", value: "hip", weight: 4 },
      { label: "Shoulder", value: "shoulder", weight: 3 },
      { label: "Back or Spine", value: "back", weight: 4 },
      { label: "Elbow", value: "elbow", weight: 3 },
      { label: "Hand, Wrist, Foot or Ankle", value: "extremity", weight: 3 },
      { label: "Multiple areas", value: "multiple", weight: 5 },
    ]),
  },
  {
    bodyAreaSlug: "knee-pain",
    questions: buildQuestions([
      { label: "Inner knee", value: "inner", weight: 3 },
      { label: "Outer knee", value: "outer", weight: 3 },
      { label: "Behind knee", value: "behind", weight: 2 },
      { label: "Kneecap area", value: "kneecap", weight: 3 },
      { label: "General / all around", value: "general", weight: 4 },
    ]),
  },
  {
    bodyAreaSlug: "hip-pain",
    questions: buildQuestions([
      { label: "Groin area", value: "groin", weight: 4 },
      { label: "Outside of hip", value: "outside", weight: 3 },
      { label: "Buttock area", value: "buttock", weight: 2 },
      { label: "Front of hip", value: "front", weight: 3 },
      { label: "General / deep hip pain", value: "general", weight: 4 },
    ]),
  },
  {
    bodyAreaSlug: "shoulder-pain",
    questions: buildQuestions([
      { label: "Top of shoulder", value: "top", weight: 3 },
      { label: "Front of shoulder", value: "front", weight: 3 },
      { label: "Side of shoulder / upper arm", value: "side", weight: 3 },
      { label: "Back of shoulder", value: "back", weight: 2 },
      { label: "Deep inside the joint", value: "deep", weight: 4 },
    ]),
  },
  {
    bodyAreaSlug: "back-pain",
    questions: buildQuestions([
      { label: "Lower back (lumbar)", value: "lower", weight: 4 },
      { label: "Mid back (thoracic)", value: "mid", weight: 2 },
      { label: "Radiating to leg (sciatica)", value: "sciatica", weight: 5 },
      { label: "Neck area (cervical)", value: "neck", weight: 3 },
      { label: "General / multiple areas", value: "general", weight: 4 },
    ]),
  },
  {
    bodyAreaSlug: "elbow-pain",
    questions: buildQuestions([
      { label: "Outside of elbow", value: "outside", weight: 3 },
      { label: "Inside of elbow", value: "inside", weight: 3 },
      { label: "Tip of elbow", value: "tip", weight: 2 },
      { label: "Forearm (near elbow)", value: "forearm", weight: 3 },
      { label: "General / all around", value: "general", weight: 3 },
    ]),
  },
  {
    bodyAreaSlug: "hand-wrist-foot-ankle",
    questions: buildQuestions([
      { label: "Hand or wrist", value: "hand-wrist", weight: 3 },
      { label: "Thumb base", value: "thumb", weight: 3 },
      { label: "Heel (plantar fasciitis)", value: "heel", weight: 4 },
      { label: "Ankle", value: "ankle", weight: 3 },
      { label: "Achilles tendon", value: "achilles", weight: 4 },
    ]),
  },
];

export function getQuizConfig(
  bodyAreaSlug: string
): BodyAreaQuizConfig | undefined {
  return quizConfigs.find((qc) => qc.bodyAreaSlug === bodyAreaSlug);
}

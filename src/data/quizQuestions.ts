export interface QuizOption {
  label: string;
  value: string;
  weight: number; // 1-5 scale contributing to score
}

export interface QuizQuestion {
  id: string;
  question: string;
  multiSelect?: boolean;
  options: QuizOption[];
}

export interface BodyAreaQuizConfig {
  bodyAreaSlug: string;
  questions: QuizQuestion[];
}

function buildQuestions(painLocationOptions: QuizOption[]): QuizQuestion[] {
  return [
    {
      id: "pain-location",
      question: "Where is your primary area of discomfort?",
      options: painLocationOptions,
    },
    {
      id: "duration",
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
      id: "daily-impact",
      question: "How does this affect your daily activities?",
      options: [
        { label: "Mild — occasional discomfort", value: "mild", weight: 1 },
        {
          label: "Moderate — limits some activities",
          value: "moderate",
          weight: 2,
        },
        {
          label: "Significant — walking is difficult",
          value: "significant",
          weight: 4,
        },
        {
          label: "Severe — constant pain, very limited",
          value: "severe",
          weight: 5,
        },
      ],
    },
    {
      id: "previous-treatments",
      question: "Have you tried any previous treatments?",
      multiSelect: true,
      options: [
        { label: "No treatment yet", value: "none", weight: 1 },
        { label: "Physiotherapy", value: "physio", weight: 2 },
        { label: "Steroid injections", value: "steroids", weight: 3 },
        { label: "Pain medication", value: "medication", weight: 2 },
        { label: "Surgery recommended", value: "surgery-rec", weight: 5 },
      ],
    },
    {
      id: "primary-goal",
      question: "What is your primary goal?",
      options: [
        {
          label: "Return to sports / exercise",
          value: "sports",
          weight: 3,
        },
        { label: "Walk pain-free again", value: "walk", weight: 3 },
        { label: "Avoid surgery", value: "avoid-surgery", weight: 4 },
        {
          label: "Reduce daily pain / medication",
          value: "reduce-pain",
          weight: 3,
        },
        {
          label: "Improve long-term joint health",
          value: "long-term",
          weight: 2,
        },
      ],
    },
  ];
}

export const quizConfigs: BodyAreaQuizConfig[] = [
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

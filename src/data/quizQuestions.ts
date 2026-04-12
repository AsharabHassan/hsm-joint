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

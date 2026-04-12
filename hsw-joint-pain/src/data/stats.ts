export interface Stat {
  value: string;
  label: string;
  source: string;
  sourceUrl?: string;
  useOn: string; // "all" or specific body area slugs
}

export const ukStats: Stat[] = [
  {
    value: "20M+",
    label: "people in the UK live with a musculoskeletal condition",
    source: "Versus Arthritis, State of MSK Health 2025",
    useOn: "all",
  },
  {
    value: "28-29",
    label: "weeks — average NHS waiting time for knee replacement",
    source: "NHS England 2026",
    useOn: "knee-pain,hip-pain",
  },
  {
    value: "7.1M",
    label: "working days lost to MSK conditions annually in the UK",
    source: "HSE 2024/25",
    useOn: "all",
  },
  {
    value: "61.6%",
    label: "of patients treated within the 18-week NHS target",
    source: "King's Fund, January 2026",
    useOn: "all",
  },
  {
    value: "10-40%",
    label: "of back surgery patients develop Failed Back Surgery Syndrome",
    source: "StatPearls, NCBI",
    useOn: "back-pain",
  },
];

export const socialProofStats = [
  { value: "6K+", label: "Assessments Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "4.9", label: "Star Rating" },
];

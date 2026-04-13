export interface QuizSubmission {
  name: string;
  email: string;
  phone: string;
  bodyArea: string;
  painLocation: string;
  painIntensity: number;
  stiffness: string;
  functionalImpact: string[];
  duration: string;
  previousTreatments: string[];
  ageRange: string;
  primaryGoal: string;
  score: number;
  scoreLabel: string;
  matchedTreatments: {
    cortisone: string;
    hyaluronicAcid: string;
    advancedOptions: string;
  };
  source: string;
  timestamp: string;
}

export async function submitToGoHighLevel(
  data: QuizSubmission,
  webhookUrl: string
): Promise<{ success: boolean; error?: string }> {
  if (!webhookUrl) {
    console.error("No GHL webhook URL configured for source:", data.source);
    return { success: false, error: "Webhook URL not configured" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: {
          firstName: data.name.split(" ")[0],
          lastName: data.name.split(" ").slice(1).join(" ") || "",
          email: data.email,
          phone: data.phone,
        },
        customFields: {
          body_area: data.bodyArea,
          pain_location: data.painLocation,
          pain_intensity: data.painIntensity.toString(),
          stiffness: data.stiffness,
          functional_impact: data.functionalImpact.join(", "),
          pain_duration: data.duration,
          previous_treatments: data.previousTreatments.join(", "),
          age_range: data.ageRange,
          primary_goal: data.primaryGoal,
          improvement_score: data.score.toString(),
          score_label: data.scoreLabel,
          matched_cortisone: data.matchedTreatments.cortisone,
          matched_ha: data.matchedTreatments.hyaluronicAcid,
          matched_advanced: data.matchedTreatments.advancedOptions,
          source: data.source,
        },
        tags: [
          `body-area:${data.bodyArea}`,
          `score:${data.scoreLabel.toLowerCase().replace(/\s+/g, "-")}`,
          `advanced:${data.matchedTreatments.advancedOptions}`,
          `source:${data.source}`,
        ],
      }),
    });

    if (!response.ok) {
      return { success: false, error: `Webhook returned ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}

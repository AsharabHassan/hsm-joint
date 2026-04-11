export interface QuizSubmission {
  name: string;
  email: string;
  phone: string;
  bodyArea: string;
  painLocation: string;
  duration: string;
  dailyImpact: string;
  previousTreatments: string[];
  primaryGoal: string;
  score: number;
  scoreLabel: string;
  matchedTreatment: string;
  source: string;
  timestamp: string;
}

export async function submitToGoHighLevel(
  data: QuizSubmission
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("GHL_WEBHOOK_URL environment variable not set");
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
          pain_duration: data.duration,
          daily_impact: data.dailyImpact,
          previous_treatments: data.previousTreatments.join(", "),
          primary_goal: data.primaryGoal,
          improvement_score: data.score.toString(),
          score_label: data.scoreLabel,
          matched_treatment: data.matchedTreatment,
          source: data.source,
        },
        tags: [
          `body-area:${data.bodyArea}`,
          `score:${data.scoreLabel.toLowerCase().replace(/\s+/g, "-")}`,
          `treatment:${data.matchedTreatment}`,
          "source:landing-page",
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

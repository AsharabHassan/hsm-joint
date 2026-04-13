import { NextRequest, NextResponse } from "next/server";
import { submitToGoHighLevel, type QuizSubmission } from "@/lib/ghl";

/**
 * Resolves the GHL webhook URL for a given page source.
 *
 * Lookup order:
 *   1. GHL_WEBHOOK_URL_<PAGE_SOURCE_UPPERCASED>  (e.g. GHL_WEBHOOK_URL_PRP)
 *   2. GHL_WEBHOOK_URL  (global fallback)
 *
 * Examples:
 *   pageSource="prp"                    → GHL_WEBHOOK_URL_PRP
 *   pageSource="exosomes"               → GHL_WEBHOOK_URL_EXOSOMES
 *   pageSource="stem-cells"             → GHL_WEBHOOK_URL_STEM_CELLS
 *   pageSource="cortisone-injections"   → GHL_WEBHOOK_URL_CORTISONE_INJECTIONS
 *   pageSource="joint-pain"             → GHL_WEBHOOK_URL_JOINT_PAIN
 *   pageSource="pain-management-london" → GHL_WEBHOOK_URL_PAIN_MANAGEMENT_LONDON
 *   pageSource="knee-pain"              → GHL_WEBHOOK_URL_KNEE_PAIN
 */
function resolveWebhookUrl(pageSource: string): string {
  const envKey = `GHL_WEBHOOK_URL_${pageSource.toUpperCase().replace(/-/g, "_")}`;
  return process.env[envKey] || process.env.GHL_WEBHOOK_URL || "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      bodyArea,
      pageSource,
      answers,
      score,
      scoreLabel,
      matchedTreatments,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const isSimpleLead = !answers;

    const submission: QuizSubmission = {
      name,
      email,
      phone,
      bodyArea,
      painLocation: isSimpleLead ? undefined : answers.painLocation,
      painIntensity: isSimpleLead ? undefined : answers.painIntensity,
      stiffness: isSimpleLead ? undefined : answers.stiffness,
      functionalImpact: isSimpleLead ? [] : answers.functionalImpact,
      duration: isSimpleLead ? undefined : answers.duration,
      previousTreatments: isSimpleLead ? [] : answers.previousTreatments,
      ageRange: isSimpleLead ? undefined : answers.ageRange,
      primaryGoal: isSimpleLead ? undefined : answers.primaryGoal,
      score: isSimpleLead ? undefined : score,
      scoreLabel: isSimpleLead ? undefined : scoreLabel,
      matchedTreatments: isSimpleLead ? undefined : matchedTreatments,
      source: pageSource || bodyArea || "landing-page",
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = resolveWebhookUrl(pageSource || bodyArea || "");
    const result = await submitToGoHighLevel(submission, webhookUrl);

    if (!result.success) {
      console.error("GHL webhook error:", result.error);
    }

    return NextResponse.json({ success: true, score, scoreLabel, matchedTreatments });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

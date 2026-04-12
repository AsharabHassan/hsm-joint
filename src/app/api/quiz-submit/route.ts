import { NextRequest, NextResponse } from "next/server";
import { submitToGoHighLevel, type QuizSubmission } from "@/lib/ghl";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, bodyArea, answers, score, scoreLabel, matchedTreatments } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const submission: QuizSubmission = {
      name,
      email,
      phone,
      bodyArea,
      painLocation: answers.painLocation,
      painIntensity: answers.painIntensity,
      stiffness: answers.stiffness,
      functionalImpact: answers.functionalImpact,
      duration: answers.duration,
      previousTreatments: answers.previousTreatments,
      ageRange: answers.ageRange,
      primaryGoal: answers.primaryGoal,
      score,
      scoreLabel,
      matchedTreatments,
      source: "landing-page",
      timestamp: new Date().toISOString(),
    };

    const result = await submitToGoHighLevel(submission);

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

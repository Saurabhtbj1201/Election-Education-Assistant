import { listTrustedSources, type Citation } from "./firestore.js";

export interface AssistantResult {
  answer: string;
  confidence: "high" | "medium" | "low";
  citations: Citation[];
  fallback: boolean;
}

const persuasionPattern =
  /\b(who should i vote for|best party|which candidate is better|support this party)\b/i;

const confidenceLowPattern = /\b(opinion|predict|future winner|guarantee)\b/i;

export async function askGroundedQuestion(
  question: string,
  state?: string
): Promise<AssistantResult> {
  const trimmedQuestion = question.trim();
  const citations = await listTrustedSources();

  if (persuasionPattern.test(trimmedQuestion)) {
    return {
      answer:
        "I can help with election process education, but I cannot recommend candidates or political parties.",
      confidence: "high",
      citations,
      fallback: true
    };
  }

  if (confidenceLowPattern.test(trimmedQuestion)) {
    return {
      answer:
        "I am not confident this can be answered reliably. Please refer to official election authorities for confirmed updates.",
      confidence: "low",
      citations,
      fallback: true
    };
  }

  const stateLabel = state?.trim() ? ` for ${state.trim()}` : "";

  return {
    answer: `Here is a non-partisan overview${stateLabel}: verify your voter roll status, check official polling updates, and follow published polling-day instructions from trusted election authorities.`,
    confidence: "medium",
    citations,
    fallback: false
  };
}

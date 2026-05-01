import { GoogleGenerativeAI } from "@google/generative-ai";
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

const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
const geminiModelName = process.env.GEMINI_MODEL?.trim() || "gemini-1.5-flash";
const geminiClient = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

function formatSourceList(citations: Citation[]): string {
  return citations.map((citation) => `- ${citation.name}: ${citation.url}`).join("\n");
}

async function generateAssistantAnswer(
  question: string,
  state: string | undefined,
  citations: Citation[]
): Promise<string | null> {
  if (!geminiClient) {
    return null;
  }

  const model = geminiClient.getGenerativeModel({ model: geminiModelName });
  const stateLine = state?.trim() ? `State: ${state.trim()}\n` : "";
  const prompt = [
    "You are PromptWars, a non-partisan election education assistant for India.",
    "Answer clearly, safely, and in plain language.",
    "Do not recommend candidates or political parties.",
    "If the question asks for process, timings, or preparation, give practical steps.",
    "Use the source list below as grounding context when helpful.",
    "Keep the answer to 2 short paragraphs max.",
    "",
    stateLine.trim(),
    `Question: ${question.trim()}`,
    "",
    "Trusted sources:",
    formatSourceList(citations)
  ]
    .filter(Boolean)
    .join("\n");

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  return text.length > 0 ? text : null;
}

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

  const generatedAnswer = await generateAssistantAnswer(trimmedQuestion, state, citations);

  if (generatedAnswer) {
    return {
      answer: generatedAnswer,
      confidence: "high",
      citations,
      fallback: false
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

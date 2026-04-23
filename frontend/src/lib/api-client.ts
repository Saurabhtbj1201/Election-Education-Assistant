export interface Citation {
  name: string;
  url: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  source?: Citation;
}

export interface ChatResponse {
  answer: string;
  confidence: "high" | "medium" | "low";
  citations: Citation[];
  fallback: boolean;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  source?: Citation;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  source?: Citation;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8080";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchTimeline(state?: string): Promise<TimelineItem[]> {
  try {
    const query = state ? `?state=${encodeURIComponent(state)}` : "";
    const payload = await request<{ items: TimelineItem[] }>(`/api/timeline${query}`);
    return payload.items;
  } catch {
    return [
      {
        id: "notification",
        title: "Election Notification",
        description: "Election authority announces schedule and related notices."
      },
      {
        id: "polling-day",
        title: "Polling Day",
        description: "Eligible voters cast ballots at their designated booths."
      }
    ];
  }
}

export async function fetchProcessSteps(state: string): Promise<string[]> {
  try {
    const payload = await request<{ steps: string[] }>(
      `/api/process?state=${encodeURIComponent(state)}`
    );
    return payload.steps;
  } catch {
    return [
      "Check your voter roll status from an official election source.",
      "Carry approved identification on polling day.",
      "Reach your polling station during published timings."
    ];
  }
}

export async function askAssistant(question: string, state?: string): Promise<ChatResponse> {
  return request<ChatResponse>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ question, state })
  });
}

export async function fetchGlossaryData(term?: string): Promise<{
  glossary: GlossaryEntry[];
  faq: FaqEntry[];
}> {
  try {
    const query = term?.trim() ? `?term=${encodeURIComponent(term.trim())}` : "";
    return await request<{ glossary: GlossaryEntry[]; faq: FaqEntry[] }>(
      `/api/glossary${query}`
    );
  } catch {
    return {
      glossary: [
        {
          term: "Electoral Roll",
          definition: "The official list of registered voters in a constituency."
        }
      ],
      faq: [
        {
          id: "fallback-faq-1",
          question: "How can I verify election updates?",
          answer: "Use official election authority websites and notifications for confirmation."
        }
      ]
    };
  }
}

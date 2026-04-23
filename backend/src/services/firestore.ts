import { Firestore } from "@google-cloud/firestore";
import { seedData } from "./seed-data.js";

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

export interface GlossaryItem {
  term: string;
  definition: string;
  source?: Citation;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  source?: Citation;
}

interface TimelineDoc {
  id?: string;
  title: string;
  description: string;
  sourceName?: string;
  sourceUrl?: string;
  order?: number;
}

interface StateProcessDoc {
  steps?: string[];
}
const sourceMap = new Map(seedData.sources.map((source) => [source.id, source]));

const firestore = process.env.GOOGLE_CLOUD_PROJECT
  ? new Firestore({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      databaseId: process.env.FIRESTORE_DATABASE || "(default)"
    })
  : null;

function resolveCitation(sourceId?: string): Citation | undefined {
  if (!sourceId) {
    return undefined;
  }

  const source = sourceMap.get(sourceId);
  if (!source) {
    return undefined;
  }

  return {
    name: source.name,
    url: source.url
  };
}

function normalizeStateKey(state?: string): string {
  if (!state || !state.trim()) {
    return "default";
  }

  return state.trim().toLowerCase();
}

export async function getTimeline(_state?: string): Promise<TimelineItem[]> {
  const localTimeline: TimelineItem[] = seedData.timeline.map((item) => {
    const source = resolveCitation(item.sourceId);

    return source
      ? {
          id: item.id,
          title: item.title,
          description: item.description,
          source
        }
      : {
          id: item.id,
          title: item.title,
          description: item.description
        };
  });

  if (!firestore) {
    return localTimeline;
  }

  try {
    const snapshot = await firestore.collection("timeline").orderBy("order", "asc").get();

    if (snapshot.empty) {
      return localTimeline;
    }

    return snapshot.docs.map((doc) => {
      const payload = doc.data() as TimelineDoc;
      const source =
        payload.sourceName && payload.sourceUrl
          ? {
              name: payload.sourceName,
              url: payload.sourceUrl
            }
          : undefined;

      return source
        ? {
            id: payload.id ?? doc.id,
            title: payload.title,
            description: payload.description,
            source
          }
        : {
            id: payload.id ?? doc.id,
            title: payload.title,
            description: payload.description
          };
    });
  } catch {
    return localTimeline;
  }
}

export async function getProcessSteps(state?: string): Promise<string[]> {
  const stateKey = normalizeStateKey(state);
  const localFallback = seedData.stateProcesses[stateKey] ?? seedData.stateProcesses.default ?? [];

  if (!firestore) {
    return localFallback;
  }

  try {
    const document = await firestore.collection("stateProcesses").doc(stateKey).get();
    if (!document.exists) {
      return localFallback;
    }

    const payload = document.data() as StateProcessDoc | undefined;
    if (!payload?.steps || !Array.isArray(payload.steps)) {
      return localFallback;
    }

    return payload.steps;
  } catch {
    return localFallback;
  }
}

export async function searchGlossary(term?: string): Promise<GlossaryItem[]> {
  const normalized = term?.trim().toLowerCase() ?? "";

  return seedData.glossary
    .filter((item) => {
      if (!normalized) {
        return true;
      }

      return item.term.toLowerCase().includes(normalized);
    })
    .map((item) => {
      const source = resolveCitation(item.sourceId);

      return source
        ? {
            term: item.term,
            definition: item.definition,
            source
          }
        : {
            term: item.term,
            definition: item.definition
          };
    });
}

export async function searchFaq(query?: string): Promise<FaqItem[]> {
  const normalized = query?.trim().toLowerCase() ?? "";

  return seedData.faq
    .filter((item) => {
      if (!normalized) {
        return true;
      }

      return item.question.toLowerCase().includes(normalized);
    })
    .map((item) => {
      const source = resolveCitation(item.sourceId);

      return source
        ? {
            id: item.id,
            question: item.question,
            answer: item.answer,
            source
          }
        : {
            id: item.id,
            question: item.question,
            answer: item.answer
          };
    });
}

export async function listTrustedSources(): Promise<Citation[]> {
  return seedData.sources.map((source) => ({
    name: source.name,
    url: source.url
  }));
}

"use client";

import { FormEvent, useState } from "react";
import { askAssistant, type ChatResponse } from "../lib/api-client";

export function AssistantPanel() {
  const [question, setQuestion] = useState("");
  const [stateName, setStateName] = useState("Maharashtra");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!question.trim()) {
      setError("Please enter a question before submitting.");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const result = await askAssistant(question.trim(), stateName.trim() || undefined);
      setResponse(result);
    } catch {
      setError("Assistant is unavailable right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="list-panel" aria-label="Assistant chat panel">
      <form onSubmit={onSubmit}>
        <label htmlFor="assistant-state">State</label>
        <input
          id="assistant-state"
          value={stateName}
          onChange={(event) => setStateName(event.target.value)}
        />

        <label htmlFor="assistant-question">Your question</label>
        <textarea
          id="assistant-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={4}
          placeholder="Example: What should I do before polling day in my state?"
        />

        <div className="form-row">
          <button type="submit" disabled={loading}>
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </form>

      {error ? <p role="status">{error}</p> : null}

      {response ? (
        <article className="assistant-answer" aria-live="polite">
          <h2>Assistant Response</h2>
          <p>{response.answer}</p>
          <p>
            Confidence: <strong>{response.confidence}</strong>
          </p>
          {response.citations.length > 0 ? (
            <ul>
              {response.citations.map((citation) => (
                <li key={`${citation.name}-${citation.url}`}>
                  <a href={citation.url}>{citation.name}</a>
                </li>
              ))}
            </ul>
          ) : null}
          {response.fallback ? (
            <p className="muted">Model confidence was low. A safer fallback answer was returned.</p>
          ) : null}
        </article>
      ) : null}
    </section>
  );
}

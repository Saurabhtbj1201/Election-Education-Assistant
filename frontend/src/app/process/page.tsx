"use client";

import { useState } from "react";
import { fetchProcessSteps } from "../../lib/api-client";

const defaultState = "Maharashtra";

export default function ProcessPage() {
  const [stateName, setStateName] = useState(defaultState);
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLoadSteps(): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      const nextSteps = await fetchProcessSteps(stateName);
      setSteps(nextSteps);
    } catch {
      setError("Could not load steps right now. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="main-content" className="page-wrap">
      <section className="hero" aria-labelledby="process-title">
        <span className="tag">State-aware guidance</span>
        <h1 id="process-title">Find your election preparation steps</h1>
        <p>Select your state to view a practical, non-partisan checklist for polling readiness.</p>
      </section>

      <section className="list-panel" aria-label="State process lookup">
        <label htmlFor="state-input">State</label>
        <div className="form-row">
          <input
            id="state-input"
            name="state"
            value={stateName}
            onChange={(event) => setStateName(event.target.value)}
            placeholder="Type a state name"
          />
          <button type="button" onClick={onLoadSteps} disabled={loading}>
            {loading ? "Loading..." : "Load Steps"}
          </button>
        </div>

        {error ? <p role="status">{error}</p> : null}

        {steps.length > 0 ? (
          <ol>
            {steps.map((step, index) => (
              <li key={`${step}-${index}`}>{step}</li>
            ))}
          </ol>
        ) : (
          <p className="muted">No steps loaded yet. Enter a state and click Load Steps.</p>
        )}
      </section>
    </main>
  );
}

import { AssistantPanel } from "../../components/assistant-panel";

export default function ChatPage() {
  return (
    <main id="main-content" className="page-wrap">
      <section className="hero" aria-labelledby="chat-title">
        <span className="tag">Guided Q and A</span>
        <h1 id="chat-title">Ask election process questions safely</h1>
        <p>
          Ask in plain language. The assistant responds with educational guidance and falls back
          when confidence is low.
        </p>
      </section>

      <AssistantPanel />

      <section className="list-panel disclaimer" aria-label="Scope reminder">
        <h2>Scope reminder</h2>
        <p>
          Responses are informational and non-partisan. For official directives, verify with
          Election Commission sources.
        </p>
      </section>
    </main>
  );
}

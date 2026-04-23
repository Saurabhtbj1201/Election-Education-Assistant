import { fetchGlossaryData } from "../../lib/api-client";

export default async function GlossaryPage() {
  const { glossary, faq } = await fetchGlossaryData();

  return (
    <main id="main-content" className="page-wrap">
      <section className="hero" aria-labelledby="glossary-title">
        <span className="tag">Terms and definitions</span>
        <h1 id="glossary-title">Learn election language quickly</h1>
        <p>
          Read key election terms and practical FAQs in simple language, then confirm details
          through trusted official sources.
        </p>
      </section>

      <section className="list-panel" aria-label="Election glossary">
        <h2>Glossary</h2>
        <ul>
          {glossary.map((entry) => (
            <li key={entry.term}>
              <h3>{entry.term}</h3>
              <p className="muted">{entry.definition}</p>
              {entry.source ? (
                <p>
                  Source: <a href={entry.source.url}>{entry.source.name}</a>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="list-panel" aria-label="Frequently asked questions">
        <h2>FAQs</h2>
        <ul>
          {faq.map((entry) => (
            <li key={entry.id}>
              <h3>{entry.question}</h3>
              <p className="muted">{entry.answer}</p>
              {entry.source ? (
                <p>
                  Source: <a href={entry.source.url}>{entry.source.name}</a>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

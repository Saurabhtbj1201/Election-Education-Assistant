import { fetchTimeline } from "../../lib/api-client";

export default async function TimelinePage() {
  const items = await fetchTimeline();

  return (
    <main id="main-content" className="page-wrap">
      <section className="hero" aria-labelledby="timeline-title">
        <span className="tag">Journey view</span>
        <h1 id="timeline-title">Election timeline in clear steps</h1>
        <p>
          Follow the full election sequence from schedule announcement to result declaration.
          Each stage is presented in plain language for quick understanding.
        </p>
      </section>

      <section className="list-panel" aria-label="Timeline steps">
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p className="muted">{item.description}</p>
              {item.source ? (
                <p>
                  Source: <a href={item.source.url}>{item.source.name}</a>
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

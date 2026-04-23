import Link from "next/link";

const cards = [
  {
    title: "Understand The Election Timeline",
    href: "/timeline",
    description:
      "See the end-to-end sequence from notification to results with concise explanations."
  },
  {
    title: "Find My Steps",
    href: "/process",
    description:
      "Get a state-aware checklist to prepare for polling day with practical next actions."
  },
  {
    title: "Learn Terms",
    href: "/glossary",
    description:
      "Search essential election terms and common questions with source-backed definitions."
  },
  {
    title: "Ask The Assistant",
    href: "/chat",
    description:
      "Ask questions in plain language and receive grounded, non-partisan responses."
  }
];

export default function HomePage() {
  return (
    <main id="main-content" className="page-wrap">
      <section className="hero" aria-labelledby="home-title">
        <span className="tag">India-focused, educational, non-partisan</span>
        <h1 id="home-title">Election clarity for every voter journey</h1>
        <p>
          This assistant explains election processes in clear language and avoids political persuasion.
          It is designed for awareness, confidence, and safe guidance using trusted sources.
        </p>
      </section>

      <section className="card-grid" aria-label="Primary journeys">
        {cards.map((card) => (
          <article key={card.href} className="info-card">
            <h2>{card.title}</h2>
            <p className="muted">{card.description}</p>
            <Link href={card.href}>Open</Link>
          </article>
        ))}
      </section>

      <section className="list-panel disclaimer" aria-label="Important note">
        <h2>Important Note</h2>
        <p>
          This project is for election education only. It does not recommend candidates, parties,
          or political positions.
        </p>
      </section>
    </main>
  );
}

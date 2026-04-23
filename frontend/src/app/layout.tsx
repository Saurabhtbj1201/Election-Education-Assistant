import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

const uiFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap"
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "PromptWars | Election Education Assistant",
  description:
    "Non-partisan election education assistant for India with state-aware guidance and trusted source citations."
};

const navItems = [
  { href: "/timeline", label: "Timeline" },
  { href: "/process", label: "Find My Steps" },
  { href: "/glossary", label: "Glossary" },
  { href: "/chat", label: "Ask Assistant" }
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${uiFont.variable} ${displayFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <header className="site-header" role="banner">
          <div className="header-inner">
            <Link href="/" className="brand" aria-label="PromptWars home">
              PromptWars
              <span>Election Education</span>
            </Link>
            <nav aria-label="Primary">
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

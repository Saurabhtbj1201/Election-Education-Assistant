# PromptWars Election Education Assistant

A score-focused, non-partisan election education web assistant for general voters in India.

## Problem Focus
Many voters struggle to find reliable, simple, and state-aware election process information. This project provides educational guidance with source citations and transparent confidence boundaries.

## Stack
- Frontend: Next.js (TypeScript)
- Backend: Node.js + Express on Cloud Run
- Data: Firestore
- AI: Vertex AI (Gemini)
- Secrets: Secret Manager

## Core Features
- Election timeline education flow
- State-specific process walkthrough
- Glossary and FAQ lookup
- Guided AI assistant with safe fallback behavior
- Citation and last-verified metadata in responses

## Guardrails
- Educational and non-partisan only
- No candidate ranking or persuasion
- No transactional voter registration workflow
- Every informational response should include source references when available

## Repository Layout
- frontend: Next.js application
- backend: API service for Cloud Run
- data/seed: normalized domain seed data
- scripts: ingestion and maintenance scripts
- tests: end-to-end validation
- docs: security, architecture, accessibility, and testing evidence

## Local Development
1. Install dependencies:
   npm install
2. Start backend:
   npm run dev:backend
3. Start frontend:
   npm run dev:frontend
4. Run quality checks:
   npm run lint
   npm run typecheck
   npm run test

## Environment Variables
Backend (.env in backend):
- PORT=8080
- FRONTEND_ORIGIN=http://localhost:3000
- GOOGLE_CLOUD_PROJECT=<your-project-id>
- FIRESTORE_DATABASE=(default)
- VERTEX_LOCATION=asia-south1
- VERTEX_MODEL=gemini-1.5-pro

Frontend (.env.local in frontend):
- NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

## Judging Criteria Traceability
| Criterion | Planned Evidence |
| --- | --- |
| Code Quality | Strict TypeScript configs, modular architecture, lint + type checks |
| Security | Validation middleware, rate limiting, safe prompt guards, secrets policy |
| Efficiency | Cached static references, bounded API payloads, lightweight pages |
| Testing | Unit + integration + e2e suites in CI |
| Accessibility | Semantic HTML, keyboard support, contrast-safe styles, reduced motion |
| Google Services | Cloud Run + Firestore + Vertex AI + Secret Manager integration |
| Problem Alignment | India-focused election education with state-specific guidance |

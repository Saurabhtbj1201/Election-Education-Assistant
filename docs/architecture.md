# Architecture

## Overview
This solution uses a split frontend/backend architecture optimized for Cloud Run deployment and transparent election education workflows.

- Next.js frontend serves voter-friendly educational UI.
- Express backend exposes versioned REST endpoints.
- Firestore stores curated election process content and citations.
- Vertex AI (Gemini) generates grounded answers from trusted context.

## Request Flow
1. User opens a route in frontend and selects state or asks a question.
2. Frontend requests backend API endpoint.
3. Backend validates input, applies rate limits, and fetches structured context from Firestore.
4. For chat requests, backend sends grounded prompt to Vertex AI.
5. Backend returns answer plus citations and confidence metadata.

## Core Endpoints
- GET /api/timeline
- GET /api/process
- GET /api/glossary
- POST /api/chat

## Deployment Shape
- frontend: deployable as static/SSR service (Cloud Run compatible)
- backend: Cloud Run HTTP service
- Firestore: managed content store
- Secret Manager: runtime secret injection

## Scalability Notes
- Cache read-heavy glossary and FAQ responses.
- Keep chat payloads bounded by schema validation.
- Add per-route latency telemetry and error budgets.

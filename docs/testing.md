# Testing Strategy

## Scope
- Unit: data transforms, validators, prompt builders, UI utilities.
- Integration: API route behavior with seeded data.
- E2E: user journeys across timeline, process lookup, glossary, and chat.

## Quality Gates
- Lint passes on frontend and backend.
- Type checks pass in strict mode.
- Unit + integration + e2e suites pass in CI.

## Critical E2E Journeys
1. User views election timeline and sees source citation.
2. User selects state and gets process steps.
3. User searches glossary and receives concise definitions.
4. User asks assistant a question and gets grounded answer or safe fallback.

## Evidence for Submission
- CI run links
- Test result screenshots
- Accessibility report artifacts
- Coverage report for core modules

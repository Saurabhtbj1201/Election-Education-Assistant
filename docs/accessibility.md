# Accessibility

## Principles
- Keyboard-first navigation for all core flows.
- Semantic landmarks and heading hierarchy.
- Contrast-safe colors and visible focus indicators.
- Reduced-motion support for users with vestibular sensitivity.

## Required Checks
- Tab order is logical across timeline, process, glossary, and chat routes.
- Every form control has a programmatic label.
- Interactive controls are reachable without pointer input.
- Primary content can be understood with screen reader output.

## Automation
- Add axe checks to CI for key routes.
- Fail build on serious accessibility violations.

## Manual Audit
- Keyboard-only pass on all primary journeys.
- Screen-reader smoke test on route transitions and form feedback.
- Verify error messages are announced and understandable.

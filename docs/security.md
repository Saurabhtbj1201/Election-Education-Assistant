# Security

## Threat Model
- Prompt injection attempts through chat input.
- Abuse via high-frequency API calls.
- Sensitive data leakage through logs or repository history.
- Invalid state/term parameters leading to unsafe behavior.

## Controls Implemented
- Input validation with schema checks.
- Per-IP request rate limiting.
- CORS allowlist from environment settings.
- Helmet security headers.
- Secrets loaded from environment/Secret Manager, never hardcoded.
- Safe fallback when model confidence is low.

## Data Handling Rules
- No personal voter data collection in MVP.
- Store only educational content and user-agnostic metadata.
- Include last-verified timestamp and source citation for trust.

## Operational Checklist
- Run dependency audit in CI.
- Verify no secrets are committed.
- Keep prompt templates under version control.
- Review logs for blocked validation and abuse patterns.

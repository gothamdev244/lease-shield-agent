# Lease Shield Agent

## Agent: lease-analyzer

Analyzes Indian rental lease agreements clause-by-clause using Gemini 2.5 Flash.

### Modes

- **analyze**: Parses lease text, categorizes each clause (legal-violation, tenant-right, hidden-risk, financial-trap, lock-in-issue, standard), assigns severity, cites Indian law, provides actionable pushback scripts or remedies.
- **chat**: Answers tenant questions about their lease in casual but authoritative tone, citing specific clauses and applicable laws.

### Skills

- `analyze-lease` — Structured clause analysis with Valibot schema validation
- `chat-about-lease` — Conversational Q&A with lease context

### Role

- `legal-advisor` — Indian rental law expert with knowledge of Model Tenancy Act 2021, state rent control acts (Maharashtra, Karnataka, Delhi, Tamil Nadu, UP), deposit caps, lock-in rules, eviction protections, and common landlord tricks.

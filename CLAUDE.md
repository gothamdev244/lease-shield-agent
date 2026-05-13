# Lease Shield Agent

AI-powered Indian rental lease analyzer built on the Flue agent framework with Gemini 2.5 Flash.

## Architecture

- **Framework**: Flue (`@flue/sdk` + `@flue/cli` v0.5.3)
- **Model**: `google/gemini-2.5-flash`
- **Runtime**: Node.js 22, `sandbox: 'local'`
- **Skills at runtime**: `.agents/skills/<name>/SKILL.md` (NOT `.flue/skills/`)
- **Skills at build time**: `.flue/skills/<name>.md` (build convention only)
- **Roles**: `.flue/roles/<name>.md` (bundled into dist at build time)
- **Config import**: `defineConfig` from `@flue/sdk/config` (NOT `@flue/cli/config`)
- **Context import**: `FlueContext` from `@flue/sdk/client`

## Deployment

- **Platform**: Fly.io (Singapore region)
- **URL**: https://lease-shield-agent.fly.dev
- **GitHub**: https://github.com/gothamdev244/lease-shield-agent
- **Port**: 3000 (Flue default, NOT 3583 in production)
- **API key env var**: `GEMINI_API_KEY` (what the Google provider expects, NOT `GOOGLE_GENERATIVE_AI_API_KEY`)

## API Endpoints

```
POST /agents/lease-analyzer/<session-id>
```

### Analyze mode
```json
{"mode": "analyze", "leaseText": "...", "stage": "pre-sign|post-sign", "state": "maharashtra"}
```
Returns `{ result: { clauses: [...], summary: {...} } }`

### Chat mode
```json
{"mode": "chat", "leaseText": "...", "question": "...", "sessionId": "..."}
```
Returns streamed text response.

## Deploy commands

```bash
flyctl deploy                          # Deploy to Fly.io
flyctl secrets set GEMINI_API_KEY=...  # Set API key
flyctl logs --no-tail                  # Check logs
```

## Key gotchas

- Flue's virtual sandbox starts empty — skills are NOT found unless you use `sandbox: 'local'` or mount files into the sandbox
- Skills must be at `.agents/skills/<name>/SKILL.md` for runtime discovery (the `.flue/skills/` dir is build-time only)
- The Google provider reads `GEMINI_API_KEY`, not `GOOGLE_GENERATIVE_AI_API_KEY`
- Flue defaults to port 3000 via `PORT` env var, not 3583 (3583 is the `flue dev` default only)

---
name: analyze-lease
description: Clause-by-clause analysis of an Indian rental lease agreement
---

Analyze the following rental lease agreement clause by clause. For each distinct clause or section in the lease, produce a structured analysis.

**IMPORTANT**: If the provided text is NOT a rental/lease agreement (e.g., it's a resume, article, technical document, etc.), return this exact JSON:
```json
{"clauses": [], "summary": {"total": 0, "violations": 0, "risks": 0, "traps": 0, "safe": 0}}
```
Do NOT try to force non-lease content into the analysis schema.

## Inputs

- **leaseText**: `{{leaseText}}` — The full text of the lease agreement
- **stage**: `{{stage}}` — Either "pre-sign" (tenant hasn't signed yet) or "post-sign" (tenant already signed)
- **state**: `{{state}}` — The Indian state (e.g., "maharashtra", "karnataka", "delhi", "tamil-nadu", "uttar-pradesh"). Use this to apply state-specific rent control laws in addition to the Model Tenancy Act.

## Instructions

1. Read through the entire lease text carefully.
2. Identify every distinct clause, condition, or provision.
3. For each clause, determine its category and severity.
4. Return the analysis as structured JSON.

## Category Definitions

- `legal-violation`: Clause violates a specific Indian law or is unenforceable
- `tenant-right`: Clause relates to a right the tenant has (may be standard or favorable)
- `hidden-risk`: Clause contains ambiguous language that could be exploited against the tenant
- `financial-trap`: Clause imposes unreasonable financial obligations or hidden costs
- `lock-in-issue`: Clause creates unfair lock-in conditions or exit penalties
- `standard`: Clause is standard, fair, and legally sound

## Severity Definitions

- `high`: Immediate legal concern or significant financial risk — tenant should push back or seek legal advice
- `medium`: Notable concern that could cause problems — tenant should be aware and negotiate if possible
- `low`: Minor observation or standard clause — informational only

## For Each Clause, Output

- `clauseText`: The exact text from the lease (quoted verbatim)
- `category`: One of the categories above
- `title`: A short descriptive label (e.g., "Excessive Security Deposit", "Standard Rent Payment Terms")
- `explanation`: Plain English explanation in 1-2 sentences. What this means for the tenant.
- `lawReference`: The specific act and section that applies (e.g., "Model Tenancy Act 2021, Section 8"). If no specific law applies, cite the general legal principle.
- `action`: Based on stage:
  - **pre-sign**: A pushback message the tenant can send to the landlord to negotiate this clause
  - **post-sign**: The tenant's rights and available remedies (where to complain, what to do)
- `severity`: One of high, medium, low

## Output Format

Return a JSON object with this structure:

```json
{
  "clauses": [
    {
      "clauseText": "...",
      "category": "legal-violation",
      "title": "...",
      "explanation": "...",
      "lawReference": "...",
      "action": "...",
      "severity": "high"
    }
  ],
  "summary": {
    "total": 0,
    "violations": 0,
    "risks": 0,
    "traps": 0,
    "safe": 0
  }
}
```

In the summary:
- `total`: Total number of clauses analyzed
- `violations`: Count of `legal-violation` clauses
- `risks`: Count of `hidden-risk` clauses
- `traps`: Count of `financial-trap` + `lock-in-issue` clauses combined
- `safe`: Count of `standard` + `tenant-right` clauses combined

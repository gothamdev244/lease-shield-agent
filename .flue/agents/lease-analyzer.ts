import type { FlueContext } from '@flue/sdk/client';
import * as v from 'valibot';

export const triggers = { webhook: true };

export default async function ({ init, payload }: FlueContext) {
  const harness = await init({
    model: 'google/gemini-2.5-flash',
    sandbox: 'local',
  });
  const session = await harness.session(payload.sessionId || 'default');

  if (payload.mode === 'analyze') {
    const { data } = await session.skill('analyze-lease', {
      args: {
        leaseText: payload.leaseText,
        stage: payload.stage,
        state: payload.state,
      },
      role: 'legal-advisor',
      schema: v.object({
        clauses: v.array(
          v.object({
            clauseText: v.string(),
            category: v.picklist([
              'legal-violation',
              'tenant-right',
              'hidden-risk',
              'financial-trap',
              'lock-in-issue',
              'standard',
            ]),
            title: v.string(),
            explanation: v.string(),
            lawReference: v.string(),
            action: v.string(),
            severity: v.picklist(['high', 'medium', 'low']),
          }),
        ),
        summary: v.object({
          total: v.number(),
          violations: v.number(),
          risks: v.number(),
          traps: v.number(),
          safe: v.number(),
        }),
      }),
    });
    return data;
  }

  if (payload.mode === 'chat') {
    const { data } = await session.skill('chat-about-lease', {
      args: {
        leaseText: payload.leaseText,
        question: payload.question,
      },
      role: 'legal-advisor',
    });
    return data;
  }

  return { error: 'Invalid mode. Use "analyze" or "chat".' };
}

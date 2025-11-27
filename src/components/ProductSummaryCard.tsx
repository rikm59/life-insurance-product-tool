'use client';

import {ProductConfig, UserSession, Step} from '@/lib/types';

interface Props {
  session: UserSession;
  productConfig: ProductConfig;
  step: Step;
}

/**
 * Displays high-level information about the current session, including
 * language, mode, audience, tone, the selected product type, and the current
 * step in the conversation.
 */
export function ProductSummaryCard({session, productConfig, step}: Props) {
  return (
    <div className="space-y-1 rounded-lg border border-slate-700 bg-slate-900/90 p-2 shadow-card">
      <h2 className="text-[13px] font-semibold">Session</h2>
      <p className="text-[11px] text-slate-300">
        Language: {session.language.toUpperCase()} · Mode: {session.mode}
      </p>
      <p className="text-[11px] text-slate-300">
        Audience: {session.audience} · Tone: {session.tone}
      </p>
      <p className="text-[11px] text-slate-300">
        Product type: {productConfig.productType ?? 'Pending'}
      </p>
      <p className="text-[11px] text-slate-400">Step: {step}</p>
    </div>
  );
}
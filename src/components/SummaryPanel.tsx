'use client';

import {useSessionStore} from '@/store/sessionStore';
import {ProductSummaryCard} from './ProductSummaryCard';
import {InlineCalculator} from './InlineCalculator';

/**
 * SummaryPanel shows the current session information and any generated output.
 * It also includes inline calculators for quick guideline premium and MEC
 * checks.
 */
export function SummaryPanel() {
  const session = useSessionStore(s => s.session);
  const productConfig = useSessionStore(s => s.productConfig);
  const output = useSessionStore(s => s.output);
  const step = useSessionStore(s => s.step);

  if (!session) {
    return (
      <div className="text-xs text-slate-300">
        Summary appears after language and product type selections.
      </div>
    );
  }

  return (
    <div className="space-y-3 text-xs">
      <ProductSummaryCard session={session} productConfig={productConfig} step={step} />
      <InlineCalculator />
      {output && (
        <div className="mt-2 space-y-1">
          <h3 className="text-[13px] font-semibold">Latest tool output</h3>
          <p className="text-[11px] text-slate-400">
            Edit any section in place without new generation.
          </p>
          <details className="rounded border border-slate-700 bg-slate-900/90 p-2">
            <summary className="cursor-pointer text-[11px] font-semibold">
              Sections
            </summary>
            <ul className="mt-2 space-y-1 text-[11px]">
              <li>Product definition</li>
              <li>Premium structure</li>
              <li>Cash value or coverage mechanics</li>
              <li>Living benefits (when supported)</li>
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
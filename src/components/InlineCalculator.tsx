'use client';

import {FormEvent, useState} from 'react';
import {guidelinePremium, mecProximity, loanStressTest} from '@/lib/calculators';

/**
 * InlineCalculator provides quick calculations for guideline premium, MEC
 * proximity, and a sample loan stress test. These tools help users
 * understand funding impacts while designing a product.
 */
export function InlineCalculator() {
  const [face, setFace] = useState('500000');
  const [factor, setFactor] = useState('0.08');
  const [guideline, setGuideline] = useState<number | null>(null);
  const [planned, setPlanned] = useState('12000');
  const [mecRatio, setMecRatio] = useState<number | null>(null);

  function handleGuideline(e: FormEvent) {
    e.preventDefault();
    const faceNum = Number(face);
    const factorNum = Number(factor);
    const result = guidelinePremium(faceNum, factorNum);
    setGuideline(result);
    const plannedNum = Number(planned);
    setMecRatio(mecProximity(result, plannedNum));
  }

  const loanExample = loanStressTest(100000, 0.05, 0.04, 20);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-2 text-[11px]">
      <h3 className="text-[12px] font-semibold">Inline calculators</h3>
      <form className="mt-1 space-y-1" onSubmit={handleGuideline}>
        <div className="flex gap-1">
          <label className="flex-1">
            Face amount (USD)
            <input
              value={face}
              onChange={e => setFace(e.target.value)}
              className="mt-0.5 h-7 w-full rounded border border-slate-700 bg-slate-950 px-2 text-[11px]"
            />
          </label>
          <label className="w-20">
            Factor
            <input
              value={factor}
              onChange={e => setFactor(e.target.value)}
              className="mt-0.5 h-7 w-full rounded border border-slate-700 bg-slate-950 px-2 text-[11px]"
            />
          </label>
        </div>
        <div className="flex gap-1">
          <label className="flex-1">
            Planned annual premium (USD)
            <input
              value={planned}
              onChange={e => setPlanned(e.target.value)}
              className="mt-0.5 h-7 w-full rounded border border-slate-700 bg-slate-950 px-2 text-[11px]"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-1 rounded bg-slate-700 px-2 py-1 text-[11px] font-semibold text-slate-50"
        >
          Update guideline and MEC
        </button>
      </form>
      {guideline !== null && (
        <div className="mt-1 space-y-0.5">
          <p>Guideline premium: ${guideline.toFixed(0)}</p>
          {mecRatio !== null && <p>MEC proximity: {mecRatio.toFixed(2)}</p>}
          <p className="text-[10px] text-slate-400">
            Ratio near 1.00 means premium is close to guideline. Above 1.00 increases MEC risk.
          </p>
        </div>
      )}
      <div className="mt-2 border-t border-slate-800 pt-1">
        <p>Loan stress test snapshot (sample)</p>
        <p>Remaining value after 20 years: ${loanExample.remainingValue.toFixed(0)}</p>
        {loanExample.warning && (
          <p className="text-[10px] text-rose-400">
            Loan plus rate spread risks depletion of cash value.
          </p>
        )}
      </div>
    </div>
  );
}
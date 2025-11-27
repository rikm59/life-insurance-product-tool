'use client';

import {useState} from 'react';
import {analyzeIllustration} from '@/lib/auditAnalyzer';
import examples from '@/data/examples.json';

/**
 * AuditUploadPanel simulates file upload for illustration auditing. In this
 * demonstration, clicking the button runs the sample data through the
 * analysis and shows the findings. Real uploads would be parsed server-side.
 */
export function AuditUploadPanel() {
  const [result, setResult] = useState<ReturnType<typeof analyzeIllustration> | null>(null);

  function handleSample() {
    const sample = examples.auditSample.parsedFields;
    const findings = analyzeIllustration(sample);
    setResult(findings);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-3 px-4 py-6">
      <h1 className="text-lg font-semibold">Audit Mode</h1>
      <p className="text-sm text-slate-300">
        Upload a carrier illustration PDF for parsing in production.  
        Demo here uses sample data.
      </p>
      <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3 text-sm">
        <label className="block text-xs font-semibold">
          Illustration PDF
          <input
            type="file"
            disabled
            className="mt-1 block w-full text-[11px] text-slate-400"
          />
        </label>
        <p className="mt-1 text-[11px] text-slate-400">
          Parsing runs in a sandbox on the server. No sensitive data stays in the browser beyond the session.
        </p>
        <button
          type="button"
          onClick={handleSample}
          className="mt-2 rounded bg-brand-primary px-3 py-1.5 text-[11px] font-semibold text-slate-50"
        >
          Run sample audit
        </button>
      </div>
      {result && (
        <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-3 text-xs">
          <h2 className="text-[13px] font-semibold">Findings</h2>
          <p>Underfunding risk: {result.underfundingRisk}</p>
          <p>MEC risk: {result.mecRisk}</p>
          <p>Lapse risk: {result.lapseRisk}</p>
          <ul className="mt-1 list-disc pl-5">
            {result.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
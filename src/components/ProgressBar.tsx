'use client';

import {Step} from '@/lib/types';

// Defines the order of steps in the conversation for progress bar rendering.
const order: Step[] = [
  'language',
  'productType',
  'guidedQuestions',
  'summary',
  'build',
  'postBuildEdit'
];

/**
 * ProgressBar renders a simple indicator showing which step of the conversation
 * the user is currently on. Completed steps are highlighted.
 */
// Display the progress through conversation steps using labeled dots. The
// current step is highlighted with the brand color, while future steps are
// muted. Labels are shown beneath each dot for clarity.
export function ProgressBar({step}: {step: Step}) {
  const index = order.indexOf(step);
  // Human‑friendly labels for each step.
  const labels: Record<Step, string> = {
    language: 'Language',
    productType: 'Product',
    guidedQuestions: 'Questions',
    summary: 'Summary',
    build: 'Build',
    postBuildEdit: 'Edit'
  };
  return (
    <div className="mt-2 flex flex-col gap-2" aria-label="Progress">
      <div className="flex items-center justify-between">
        {order.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col items-center">
            <span
              className={`h-2 w-2 rounded-full ${
                i <= index ? 'bg-brand-primary' : 'bg-slate-700'
              }`}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] text-slate-400">
        {order.map(s => (
          <div key={s} className="flex-1 text-center">
            {labels[s]}
          </div>
        ))}
      </div>
    </div>
  );
}
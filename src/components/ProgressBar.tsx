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
export function ProgressBar({step}: {step: Step}) {
  const index = order.indexOf(step);
  return (
    <div className="mt-2 flex items-center gap-1" aria-label="Progress">
      {order.map((s, i) => (
        <div
          key={s}
          className={`h-1 flex-1 rounded-full ${
            i <= index ? 'bg-brand-primary' : 'bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
}
'use client';

import {Step} from '@/lib/types';
import {useTranslations} from 'next-intl';

interface Props {
  step: Step;
  onClickChip: (text: string) => void;
}

/**
 * SuggestionChips renders context-aware buttons that the user can click
 * instead of typing. The labels vary depending on the conversation step.
 */
export function SuggestionChips({step, onClickChip}: Props) {
  const t = useTranslations('Builder');
  const chips: string[] = [];

  if (step === 'language') {
    chips.push('English', 'Español');
  } else if (step === 'productType') {
    chips.push('IUL', 'Whole Life', 'Term', 'GUL');
  } else if (step === 'guidedQuestions') {
    chips.push('Quick mode', 'Guided mode', t('buildNow'));
  } else if (step === 'summary' || step === 'build') {
    chips.push(t('buildNow'));
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(label => (
        <button
          key={label}
          type="button"
          onClick={() => onClickChip(label)}
          className="focus-outline rounded-full border border-slate-700 bg-slate-800/80 px-2 py-1 text-[11px] text-slate-100"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
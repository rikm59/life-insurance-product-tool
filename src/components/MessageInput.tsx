'use client';

import {FormEvent, useState} from 'react';
import {useSessionStore} from '@/store/sessionStore';
import {SuggestionChips} from './SuggestionChips';
import {useTranslations} from 'next-intl';

/**
 * MessageInput captures user input and triggers updates to the conversation
 * state. Suggestion chips are offered for quick responses appropriate to
 * the current step of the conversation.
 */
export function MessageInput() {
  const t = useTranslations('Builder');
  const [value, setValue] = useState('');
  const handleUserInput = useSessionStore(s => s.handleUserInput);
  const step = useSessionStore(s => s.step);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    handleUserInput(trimmed);
    setValue('');
  }

  function handleChipClick(text: string) {
    handleUserInput(text);
    setValue('');
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <SuggestionChips step={step} onClickChip={handleChipClick} />
      <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="builder-input">
            {t('inputPlaceholder')}
          </label>
        <input
          id="builder-input"
          className="focus-outline h-10 flex-1 rounded-lg border border-slate-700 bg-slate-900/80 px-3 text-xs"
          placeholder={t('inputPlaceholder')}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="focus-outline rounded-lg bg-brand-primary px-3 py-2 text-xs font-semibold text-slate-50"
        >
          Send
        </button>
      </div>
    </form>
  );
}
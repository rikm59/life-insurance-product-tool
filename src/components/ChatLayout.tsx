'use client';

import {MessageList} from './MessageList';
import {MessageInput} from './MessageInput';
import {SummaryPanel} from './SummaryPanel';
import {ProgressBar} from './ProgressBar';
import {useSessionStore} from '@/store/sessionStore';

/**
 * ChatLayout composes the conversation interface, including the list of
 * messages, the user input box with suggestions, a progress bar, and a live
 * summary panel. Layout adjusts responsively.
 */
export function ChatLayout() {
  const step = useSessionStore(s => s.step);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row">
      <section
        aria-label="Conversational builder"
        className="flex flex-1 flex-col rounded-xl border border-slate-800 bg-slate-900/70 shadow-card"
      >
        <div className="border-b border-slate-800 p-4">
          <h1 className="text-lg font-semibold font-heading text-brand-primary">
            Life Insurance Product Tool Builder
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Conversation always starts with language, then product type, then guided prompts.
          </p>
          <ProgressBar step={step} />
        </div>
        <div className="flex flex-1 flex-col">
          <MessageList />
        </div>
        <div className="border-t border-slate-800 p-3">
          <MessageInput />
        </div>
      </section>
      <aside
        aria-label="Live summary"
        className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 shadow-card md:mt-0 md:w-80"
      >
        <SummaryPanel />
      </aside>
    </div>
  );
}
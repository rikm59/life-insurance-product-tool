'use client';

import {useSessionStore} from '@/store/sessionStore';

/**
 * Renders the list of conversation messages as chat bubbles. Provides a hint
 * when no messages have been sent yet and indicates the conversation step.
 */
export function MessageList() {
  const messages = useSessionStore(s => s.messages);
  const step = useSessionStore(s => s.step);

  return (
    <div className="flex-1 space-y-2 overflow-y-auto p-3" aria-live="polite">
      {messages.length === 0 && (
        <div className="rounded-lg bg-slate-800/80 p-3 text-xs text-slate-300">
          Start by telling me your preferred language.  
          Example: “English” or “Español”.
        </div>
      )}
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-3 py-2 text-xs shadow-card ${
              msg.role === 'user'
                ? 'bg-brand-primary text-slate-50'
                : 'bg-slate-800 text-slate-100'
            } animate-bubble-pop`}
          >
            <p>{msg.content}</p>
            {msg.meta?.step && (
              <p className="mt-1 text-[10px] text-slate-300/70">
                Step: {msg.meta.step}
              </p>
            )}
          </div>
        </div>
      ))}
      {step === 'guidedQuestions' && (
        <div className="mt-2 text-[11px] text-slate-400">
          I will ask only what is needed. Advanced options appear when they matter.
        </div>
      )}
    </div>
  );
}
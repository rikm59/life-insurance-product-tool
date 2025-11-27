'use client';

import {useState} from 'react';
import {Audience, Tone, Language} from '@/lib/types';

/**
 * Settings page allows customization of default preferences like audience mode,
 * tone, language, and whether to translate jargon into plain language. In a
 * full implementation, these settings would persist across sessions.
 */
export default function SettingsPage() {
  const [audience, setAudience] = useState<Audience>('agent');
  const [tone, setTone] = useState<Tone>('plain');
  const [language, setLanguage] = useState<Language>('en');
  const [jargonTranslation, setJargonTranslation] = useState(true);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 text-sm">
      <h1 className="text-lg font-semibold">Settings</h1>
      <form className="mt-4 space-y-3 text-xs">
        <div>
          <label className="block font-semibold">Audience mode</label>
          <select
            value={audience}
            onChange={e => setAudience(e.target.value as Audience)}
            className="mt-1 h-8 rounded border border-slate-700 bg-slate-900 px-2"
          >
            <option value="consumer">Consumer</option>
            <option value="agent">Agent</option>
            <option value="internalTraining">Internal training</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Tone</label>
          <select
            value={tone}
            onChange={e => setTone(e.target.value as Tone)}
            className="mt-1 h-8 rounded border border-slate-700 bg-slate-900 px-2"
          >
            <option value="plain">Plain</option>
            <option value="technical">Technical</option>
            <option value="salesSupport">Sales-supportive</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Language</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as Language)}
            className="mt-1 h-8 rounded border border-slate-700 bg-slate-900 px-2"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="jargon"
            type="checkbox"
            checked={jargonTranslation}
            onChange={e => setJargonTranslation(e.target.checked)}
          />
          <label htmlFor="jargon">Translate jargon into plain language in summaries.</label>
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Settings influence prompts and wording in future sessions.
          Sensitive data stays on the server; sessions in the browser only hold design inputs.
        </p>
      </form>
    </div>
  );
}
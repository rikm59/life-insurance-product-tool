import {useTranslations} from 'next-intl';
import Link from 'next/link';

/**
 * Home page displays an overview of the application with call-to-action links
 * to each major area of the tool: builder, compare, audit.
 */
export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* Hero section with gradient background and call‑to‑action */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary p-8 text-center shadow-card">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-50 font-heading">
          {t('title')}
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-200 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/builder"
            className="focus-outline rounded-full bg-white px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-slate-100"
          >
            {t('cta')}
          </Link>
          <Link
            href="/compare"
            className="focus-outline rounded-full border border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Compare designs
          </Link>
          <Link
            href="/audit"
            className="focus-outline rounded-full border border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Audit a design
          </Link>
        </div>
      </section>
      {/* Feature cards */}
      <section className="grid gap-4 md:grid-cols-3 text-xs">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-card transition-transform hover:-translate-y-1">
          <h2 className="text-base font-semibold text-slate-100 mb-1">Conversational builder</h2>
          <p className="text-slate-400">
            Start with language, then product type, then guided prompts with smart defaults.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-card transition-transform hover:-translate-y-1">
          <h2 className="text-base font-semibold text-slate-100 mb-1">Compare mode</h2>
          <p className="text-slate-400">
            Line up two or three designs with tables and narrative review.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-card transition-transform hover:-translate-y-1">
          <h2 className="text-base font-semibold text-slate-100 mb-1">Audit mode</h2>
          <p className="text-slate-400">
            Parse carrier outputs and surface underfunding, MEC, and lapse risk.
          </p>
        </div>
      </section>
    </div>
  );
}
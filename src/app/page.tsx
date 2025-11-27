import {useTranslations} from 'next-intl';
import Link from 'next/link';

/**
 * Home page displays an overview of the application with call-to-action links
 * to each major area of the tool: builder, compare, audit.
 */
export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-10">
      <h1 className="text-2xl font-semibold">{t('title')}</h1>
      <p className="text-sm text-slate-300">{t('subtitle')}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <Link
          href="/builder"
          className="focus-outline rounded-lg bg-brand-primary px-4 py-2 font-semibold text-slate-50"
        >
          {t('cta')}
        </Link>
        <Link
          href="/compare"
          className="focus-outline rounded-lg border border-slate-700 px-4 py-2 text-slate-100"
        >
          Compare designs
        </Link>
        <Link
          href="/audit"
          className="focus-outline rounded-lg border border-slate-700 px-4 py-2 text-slate-100"
        >
          Audit a design
        </Link>
      </div>
      <section className="mt-6 grid gap-3 text-xs md:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
          <h2 className="text-sm font-semibold">Conversational builder</h2>
          <p className="mt-1 text-slate-300">
            Start with language, then product type, then guided prompts with smart defaults.
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
          <h2 className="text-sm font-semibold">Compare mode</h2>
          <p className="mt-1 text-slate-300">
            Line up two or three designs with tables and narrative review.
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
          <h2 className="text-sm font-semibold">Audit mode</h2>
          <p className="mt-1 text-slate-300">
            Parse carrier outputs and surface underfunding, MEC, and lapse risk.
          </p>
        </div>
      </section>
    </div>
  );
}
import '@/app/globals.css';
import {ReactNode} from 'react';
import {getRequestConfig} from 'next-intl/server';
import requestConfig from '@/i18n/request';
import {Providers} from '@/components/Providers';
import {routing} from '@/i18n/routing';

export const metadata = {
  title: 'Life Insurance Product Tool Builder',
  description: 'Conversational tool builder for life insurance products.'
};

/*
 * We intentionally omit generateStaticParams here to avoid pre-rendering only
 * locale-segmented routes. Without this function, Next.js will serve the root
 * path (/) and any locale-prefixed paths (e.g., /en, /es) at runtime. The
 * `RootLayout` below handles optional locale detection and falls back to the
 * default locale when none is provided or when an unsupported locale is used.
 */

/**
 * Root layout for the application. The locale is optional; if none is provided,
 * it falls back to the default locale specified in the routing configuration. This
 * prevents the app from rendering a blank page when accessed at the root path (/),
 * which doesn't include a locale segment. If an unsupported locale is provided,
 * the default locale is used instead.
 */
export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params?: Promise<{ locale?: string }>;
}) {
  // Resolve the params promise if provided. It may be undefined when no locale
  // segment exists in the route (e.g. the root path). In that case, locale will
  // remain undefined and we fall back to the default locale below.
  const resolvedParams = params ? await params : {};
  const { locale: requestedLocale } = resolvedParams;

  // Determine the locale to use: use the requested locale if it's supported,
  // otherwise fall back to the default locale. When no locale is provided,
  // requestedLocale will be undefined.
  const locale = routing.locales.includes(requestedLocale as any)
    ? (requestedLocale as string)
    : routing.defaultLocale;

  // Load the configuration (messages) for the chosen locale. Passing
  // requestLocale as a resolved promise ensures getRequestConfig functions
  // correctly when run in a server component.
  const config = await getRequestConfig(requestConfig)({
    requestLocale: Promise.resolve(locale)
  });

  return (
    <html lang={locale} className="h-full">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        {/* Cast messages to any to satisfy the Provider prop type. The messages
         * returned by next-intl may be a DeepPartial, null, or undefined.
         * Casting here ensures the type matches the expected Record<string, unknown>.
         */}
        <Providers locale={config.locale} messages={config.messages as any}>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-800 bg-slate-900">
              <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-brand-primary px-2 py-1 text-xs font-semibold uppercase tracking-wide">
                    LI Tool Builder
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <a href="/" className="focus-outline">
                    Home
                  </a>
                  <a href="/builder" className="focus-outline">
                    Builder
                  </a>
                  <a href="/compare" className="focus-outline">
                    Compare
                  </a>
                  <a href="/audit" className="focus-outline">
                    Audit
                  </a>
                  <a href="/docs" className="focus-outline">
                    Docs
                  </a>
                  <a href="/settings" className="focus-outline">
                    Settings
                  </a>
                </div>
              </nav>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
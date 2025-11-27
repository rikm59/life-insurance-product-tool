import '@/app/globals.css';
import {ReactNode} from 'react';
import {getRequestConfig} from 'next-intl/server';
import requestConfig from '@/i18n/request';
import {Providers} from '@/components/Providers';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';

export const metadata = {
  title: 'Life Insurance Product Tool Builder',
  description: 'Conversational tool builder for life insurance products.'
};

/**
 * Generates static params for each locale to enable static pre-rendering of
 * localized routes. If you prefer not to have locale segments, remove this
 * function and adjust routing accordingly.
 */
export async function generateStaticParams() {
  return routing.locales.map(locale => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const config = await (getRequestConfig(requestConfig)({requestLocale: Promise.resolve(locale)}));

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale} className="h-full">
      <body className="min-h-screen bg-slate-950 text-slate-50">
   <Providers locale={config.locale} messages={config.messages ?? {}}>
     
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

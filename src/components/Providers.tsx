'use client';

import {ReactNode, useState} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

type Props = {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

/**
 * Wraps children with providers for internationalization and React Query.
 */
export function Providers({children, locale, messages}: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextIntlClientProvider>
  );
}
import {defineRouting} from 'next-intl/routing';

/**
 * Defines which locales are available in the application and the default locale.
 */
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en'
});
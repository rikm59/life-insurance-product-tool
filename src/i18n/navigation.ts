import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

/**
 * Provides helpers for locale-aware navigation such as Link and useRouter.
 */
export const {Link, usePathname, useRouter, getPathname, redirect} =
  createNavigation(routing);
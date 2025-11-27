import {Language, Mode, ProductType} from './types';

/**
 * Attempts to parse a language code from free-form user input. Handles simple
 * variations such as "English", "En", "Español" or "Spanish". Returns null if
 * no supported language is found.
 */
export function parseLanguageFromInput(input: string): Language | null {
  const normalized = input.trim().toLowerCase();
  if (normalized.startsWith('en') || normalized.includes('english')) return 'en';
  if (normalized.startsWith('es') || normalized.includes('español') || normalized.includes('spanish')) return 'es';
  return null;
}

// Mapping of common strings to internal product type identifiers.
const productMap: Record<string, ProductType> = {
  term: 'term',
  'whole life': 'wholeLife',
  wl: 'wholeLife',
  ul: 'ul',
  'universal life': 'ul',
  gul: 'gul',
  'guaranteed universal life': 'gul',
  iul: 'iul',
  'index universal life': 'iul',
  vul: 'vul',
  ivul: 'ivul',
  'final expense': 'finalExpense',
  'guaranteed issue': 'guaranteedIssue',
  'simplified issue': 'simplifiedIssue',
  'senior term': 'seniorTerm',
  'group life': 'groupLife'
};

/**
 * Parses the product type from free-form user input by checking known keys
 * against the input string. Returns null when no match is found.
 */
export function parseProductTypeFromInput(input: string): ProductType | null {
  const normalized = input.trim().toLowerCase();
  for (const key of Object.keys(productMap)) {
    if (normalized.includes(key)) {
      return productMap[key];
    }
  }
  return null;
}

/**
 * Parses the preferred mode (quick or guided) from user input. Returns null
 * when not specified.
 */
export function parseModeFromInput(input: string): Mode | null {
  const normalized = input.trim().toLowerCase();
  if (normalized.includes('quick')) return 'quick';
  if (normalized.includes('gui')) return 'guided';
  return null;
}

/**
 * Checks whether the user is requesting immediate build of the document. The
 * keywords checked depend on the current language. Returns true if the
 * trigger phrase is present.
 */
export function isBuildNow(input: string, language: Language): boolean {
  const normalized = input.trim().toLowerCase();
  if (language === 'en') {
    return normalized.includes('build now');
  }
  return normalized.includes('construir ahora') || normalized.includes('empezar ahora');
}
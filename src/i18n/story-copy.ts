export type Locale = 'en' | 'pt';

export const pick = <T>(copy: Record<Locale, T>, locale: unknown): T =>
  copy[locale === 'pt' ? 'pt' : 'en'];

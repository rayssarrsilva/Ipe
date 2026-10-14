import { createContext, useContext, type ReactNode } from 'react';

export type Locale = 'en' | 'pt';

export const LocaleContext = createContext<Locale>('en');

export const useLocale = () => useContext(LocaleContext);

export const toLocale = (value: unknown): Locale => (value === 'pt' ? 'pt' : 'en');

/** Renders its children only when the docs language matches `only`. */
export function Lang({ only, children }: { only: Locale; children: ReactNode }) {
  return useLocale() === only ? <>{children}</> : null;
}

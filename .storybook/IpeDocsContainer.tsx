import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { LocaleContext, toLocale } from '../src/docs/locale';
import { ipeDarkTheme, ipeTheme } from './theme';

type Globals = Record<string, unknown>;
type StoreWithGlobals = { userGlobals?: { get?: () => Globals } };

const GLOBALS_UPDATED = 'globalsUpdated';

export function IpeDocsContainer({ children, context }: PropsWithChildren<DocsContainerProps>) {
  const [globals, setGlobals] = useState<Globals>(() => {
    const store = (context as unknown as { store?: StoreWithGlobals }).store;
    return store?.userGlobals?.get?.() ?? {};
  });

  useEffect(() => {
    const onUpdate = (payload: { globals: Globals }) => setGlobals(payload.globals);
    context.channel.on(GLOBALS_UPDATED, onUpdate);
    return () => context.channel.off(GLOBALS_UPDATED, onUpdate);
  }, [context]);

  const dark = globals.theme === 'dark';
  const locale = toLocale(globals.locale);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [dark, locale]);

  return (
    <LocaleContext.Provider value={locale}>
      <DocsContainer context={context} theme={dark ? ipeDarkTheme : ipeTheme}>
        {children}
      </DocsContainer>
    </LocaleContext.Provider>
  );
}

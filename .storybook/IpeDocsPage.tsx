import { Controls, Markdown, Primary, Stories, Title, useOf } from '@storybook/addon-docs/blocks';
import { useLocale } from '../src/docs/locale';

type DocsI18n = { en?: string; pt?: string };

/** Autodocs page that shows the component description in the selected language. */
export function IpeDocsPage() {
  const locale = useLocale();
  const { preparedMeta } = useOf('meta');
  const i18n = (preparedMeta.parameters?.docs as { i18n?: DocsI18n } | undefined)?.i18n;
  const description = i18n?.[locale] ?? i18n?.en;

  return (
    <>
      <Title />
      {description && <Markdown>{description}</Markdown>}
      <Primary />
      <Controls />
      <Stories title={locale === 'pt' ? 'Exemplos' : 'Examples'} />
    </>
  );
}

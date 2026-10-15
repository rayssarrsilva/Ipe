import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/styles/generated/tokens.css';
import { IpeDocsContainer } from './IpeDocsContainer';
import { IpeDocsPage } from './IpeDocsPage';

const withThemeAndLocale: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string | undefined) ?? 'light';
  const locale = (context.globals.locale as string | undefined) ?? 'en';
  document.documentElement.dataset.theme = theme;
  document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  return <Story />;
};

const preview: Preview = {
  decorators: [withThemeAndLocale],
  globalTypes: {
    locale: {
      description: 'Language for story content',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English', right: 'EN' },
          { value: 'pt', title: 'Português (Brasil)', right: 'PT' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'en',
    theme: typeof __IPE_TEST_THEME__ === 'undefined' ? 'light' : __IPE_TEST_THEME__,
  },
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: { disable: true },
    a11y: { test: 'error' },
    docs: { container: IpeDocsContainer, page: IpeDocsPage },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Components', 'Patterns'],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;

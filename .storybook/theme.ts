import { create } from 'storybook/theming';

const shared = {
  brandTitle: 'Ipê Design System',
  brandUrl: 'https://github.com/rayssarrsilva/Ipe',
  brandTarget: '_blank',
  appBorderRadius: 16,
  inputBorderRadius: 999,
  fontBase: '"Instrument Sans", system-ui, sans-serif',
} as const;

export const ipeTheme = create({
  ...shared,
  base: 'light',
  colorPrimary: '#1F5A3A',
  colorSecondary: '#264B8F',
  appBg: '#FBF5E9',
  appContentBg: '#FBF5E9',
  appPreviewBg: '#FBF5E9',
  appBorderColor: '#E5D9C3',
  textColor: '#231C14',
  textMutedColor: '#6B5E4E',
  barBg: '#F3EADA',
  barTextColor: '#6B5E4E',
  barSelectedColor: '#1F5A3A',
  inputBg: '#FBF5E9',
  inputBorder: '#8C7D69',
  inputTextColor: '#231C14',
});

export const ipeDarkTheme = create({
  ...shared,
  base: 'dark',
  colorPrimary: '#7CC08A',
  colorSecondary: '#8FB0EA',
  appBg: '#17130E',
  appContentBg: '#17130E',
  appPreviewBg: '#17130E',
  appBorderColor: '#3A3128',
  textColor: '#FBF5E9',
  textMutedColor: '#B8AA95',
  barBg: '#221C15',
  barTextColor: '#B8AA95',
  barSelectedColor: '#7CC08A',
  inputBg: '#221C15',
  inputBorder: '#7A6C5A',
  inputTextColor: '#FBF5E9',
});

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
  appBg: '#FFFFFF',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#E5E5E5',
  textColor: '#0A0A0A',
  textMutedColor: '#555555',
  barBg: '#F4F4F4',
  barTextColor: '#555555',
  barSelectedColor: '#1F5A3A',
  inputBg: '#FFFFFF',
  inputBorder: '#767676',
  inputTextColor: '#0A0A0A',
});

export const ipeDarkTheme = create({
  ...shared,
  base: 'dark',
  colorPrimary: '#7CC08A',
  colorSecondary: '#8FB0EA',
  appBg: '#000000',
  appContentBg: '#000000',
  appPreviewBg: '#000000',
  appBorderColor: '#262626',
  textColor: '#FFFFFF',
  textMutedColor: '#A3A3A3',
  barBg: '#141414',
  barTextColor: '#A3A3A3',
  barSelectedColor: '#7CC08A',
  inputBg: '#141414',
  inputBorder: '#8A8A8A',
  inputTextColor: '#FFFFFF',
});

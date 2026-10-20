# @rayssarrsilva/ipe

## 2.0.0

### Major Changes

- a6f0b0a: Neutral base palette: pure white and pure black backgrounds, with the strong Brazilian colors (ipê yellow, forest green, urucum, indigo) kept as the brand accents.
  
  **Breaking:** the `cream`, `ink` and `noite` primitives were removed and replaced by a `neutral` scale. Components and semantic tokens are unchanged, so apps that only use semantic tokens (`--ipe-bg-*`, `--ipe-text-*`…) need no changes. If you used primitives directly, migrate:
  
  | Removed                 | Use instead                |
  | ----------------------- | -------------------------- |
  | `--ipe-color-cream-50`  | `--ipe-color-neutral-0`    |
  | `--ipe-color-cream-100` | `--ipe-color-neutral-50`   |
  | `--ipe-color-cream-200` | `--ipe-color-neutral-100`  |
  | `--ipe-color-ink-900`   | `--ipe-color-neutral-950`  |
  | `--ipe-color-ink-700`   | `--ipe-color-neutral-600`  |
  | `--ipe-color-ink-500`   | `--ipe-color-neutral-500`  |
  | `--ipe-color-noite-950` | `--ipe-color-neutral-1000` |
  | `--ipe-color-noite-900` | `--ipe-color-neutral-900`  |
  | `--ipe-color-noite-800` | `--ipe-color-neutral-800`  |
  | `--ipe-color-noite-500` | `--ipe-color-neutral-400`  |
  | `--ipe-color-noite-300` | `--ipe-color-neutral-300`  |
  
  Also: the components entry now starts with `'use client'`, so Ipê works in Next.js Server Components without a wrapper. The tokens entry stays server-safe.

## 1.0.1

### Patch Changes

- b0968f6: Accessibility fixes from the 1.0 QA cycle:
  
  - Switch: track, thumb and on/off state stay visible in Windows High Contrast (forced colors).
  - Tabs: the selected tab keeps a visible indicator in Windows High Contrast.
  - Checkbox: the box is now 24 × 24 px (WCAG 2.5.8 target size) and its checked state uses system colors in High Contrast.
  - Textarea: screen readers hear "9 of 280 characters" instead of "9/280". New `formatCount` prop to translate it.

## 1.0.0

### Major Changes

- 96725eb: First stable release of Ipê: 11 accessible React components, design tokens synced with Figma, light and dark themes, a Tailwind CSS v4 preset, and every story tested in real Chromium.

### Minor Changes

- 13f04d9: Add composite components: Dialog, Toast (with a `useToast()` hook), Tabs, Dropdown Menu and Tooltip, built on Radix UI. Add the `bg/raised` token for floating layers so depth reads clearly in the dark theme.
- a08c501: First foundations: design tokens (light and dark), generated CSS variables, Tailwind v4 preset and the Button component.
- 607528a: Add form components: Input, Textarea (with live character counter), Checkbox (with indeterminate state), Switch and Badge. All fields share accessible label, hint and error wiring.

### Patch Changes

- 887dc71: Run every story in real Chromium, in light and dark, with interaction tests and axe-core on every pull request. Add an accessibility statement.

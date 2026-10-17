# @rayssarrsilva/ipe

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

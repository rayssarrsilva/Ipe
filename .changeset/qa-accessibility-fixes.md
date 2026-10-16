---
'@rayssarrsilva/ipe': patch
---

Accessibility fixes from the 1.0 QA cycle:

- Switch: track, thumb and on/off state stay visible in Windows High Contrast (forced colors).
- Tabs: the selected tab keeps a visible indicator in Windows High Contrast.
- Checkbox: the box is now 24 × 24 px (WCAG 2.5.8 target size) and its checked state uses system colors in High Contrast.
- Textarea: screen readers hear "9 of 280 characters" instead of "9/280". New `formatCount` prop to translate it.

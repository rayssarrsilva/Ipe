<div align="center">

# 🌼 Ipê Design System

**Clean, organic and unmistakably Brazilian.**

[![npm](https://img.shields.io/npm/v/@rayssarrsilva/ipe?color=F7C531&label=npm)](https://www.npmjs.com/package/@rayssarrsilva/ipe)
[![CI](https://github.com/rayssarrsilva/Ipe/actions/workflows/ci.yml/badge.svg)](https://github.com/rayssarrsilva/Ipe/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-live-1F5A3A?logo=storybook&logoColor=white)](https://rayssarrsilva.github.io/Ipe/?path=/docs/introduction--docs)
[![License: MIT](https://img.shields.io/badge/license-MIT-F7C531)](./LICENSE)

**English** · [Português](./README.pt-BR.md)

[Storybook](https://rayssarrsilva.github.io/Ipe/?path=/docs/introduction--docs) · [Foundations: Color](https://rayssarrsilva.github.io/Ipe/?path=/docs/foundations-color--docs) · [Figma](https://www.figma.com/design/o3irY2VOsGjlLt3fiAPTU0) · [Report a bug](https://github.com/rayssarrsilva/Ipe/issues/new/choose)

</div>

---

## Why "Ipê"?

The ipê is a Brazilian tree that blooms in bright yellow during the driest months of the year. This design system borrows that idea: a calm, solid foundation that still carries color.

Cream backgrounds, coffee-brown text, and strong yet creamy accents in passion-fruit yellow, forest green, urucum and indigo.

## Highlights

- **Design tokens as the single source of truth.** Tokens live in [`/tokens`](./tokens), sync with Figma through Tokens Studio, and are compiled by Style Dictionary into CSS variables. The CSS variable names match the code syntax set on every Figma variable.
- **Light and dark themes** driven by semantic tokens, following `prefers-color-scheme` or a `data-theme` attribute.
- **Accessible by default.** Every color pair is checked against WCAG 2.2, including the 3:1 rule for form-control borders. Components are tested with keyboard interaction and axe-core.
- **Bilingual documentation.** Storybook switches every story between English and Portuguese, and between light and dark, from the toolbar.
- **Works with or without Tailwind.** Ships plain CSS plus an optional Tailwind CSS v4 theme preset.
- **Real-world patterns.** A complete, validated sign-up form built only with Ipê components lives in Storybook under _Patterns_.
- **Tested in a real browser on every pull request.** Every story runs in Chromium, in light and dark, with its interaction test and an axe-core audit including color contrast. See [ACCESSIBILITY.md](./ACCESSIBILITY.md).
- **QA cycle documented.** A test plan, 24 test cases and 6 bug reports with before and after evidence live in [`/qa`](./qa). Every fix shipped with a regression check.

## Installation

```bash
npm install @rayssarrsilva/ipe
```

```tsx
import '@rayssarrsilva/ipe/styles.css';
import { Button } from '@rayssarrsilva/ipe';

export function App() {
  return <Button onClick={() => alert('🌱')}>Plant a seed</Button>;
}
```

Load the fonts once in your app (both are free on Google Fonts):

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..700,0..100&family=Instrument+Sans:wght@400..700&display=swap"
/>
```

### Theming

```html
<html data-theme="dark"></html>
```

Without the attribute, Ipê follows the operating system preference.

### Tailwind CSS v4

```css
@import 'tailwindcss';
@import '@rayssarrsilva/ipe/tokens.css';
@import '@rayssarrsilva/ipe/tailwind.css';
```

Then use the tokens as utilities: `bg-action-primary`, `text-text-secondary`, `rounded-pill`, `shadow-md`.

### Tokens in JavaScript

```ts
import { lightTokens } from '@rayssarrsilva/ipe/tokens';
```

## Components

| Component                                | Status |
| ---------------------------------------- | ------ |
| Button                                   | ✅     |
| Input, Textarea, Checkbox, Switch, Badge | ✅     |
| Dialog, Toast, Tabs, Dropdown, Tooltip   | ✅     |

## Tech stack

React 19 · TypeScript · Vite (library mode) · Radix UI primitives · CSS Modules · Style Dictionary + Tokens Studio · Storybook 10 · Vitest + Testing Library + axe-core · ESLint + Prettier · Husky + commitlint (Conventional Commits) · Changesets · GitHub Actions

## Development

Requires Node.js 22 (see `.nvmrc`).

```bash
npm install
npm run dev            # Storybook at http://localhost:6006
npm test               # unit and accessibility tests (jsdom)
npm run test:storybook # every story in real Chromium, light and dark
npm run test:coverage  # with coverage thresholds
npm run lint
npm run typecheck
npm run build          # library output in /dist
npm run check:package  # publint + Are The Types Wrong
npm run test:smoke     # install the packed library into a fresh React app and build it
```

### Updating tokens

1. Edit tokens in Figma with Tokens Studio, or directly in [`/tokens`](./tokens).
2. Run `npm run tokens` to regenerate the CSS variables and the TypeScript token list.

### Workflow

- Branch from `main`, open a pull request, and wait for CI to pass. `main` is protected.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org) and are checked by commitlint.
- Run `npm run changeset` to describe changes to the published package. Merging the release pull request publishes to npm and updates the [changelog](./CHANGELOG.md).

## Author

Made with care by **Rayssa Roberta** · [LinkedIn](https://www.linkedin.com/in/rayssa-r-14936622a) · [Portfolio](https://portfoliorayssarrsilva.site)

Feedback, issues and pull requests are very welcome.

## License

[MIT](./LICENSE)

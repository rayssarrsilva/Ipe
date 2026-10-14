<div align="center">

# 🌼 Ipê Design System

**Limpo, orgânico e brasileiro de raiz.**

[![CI](https://github.com/rayssarrsilva/ipe/actions/workflows/ci.yml/badge.svg)](https://github.com/rayssarrsilva/ipe/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-no%20ar-1F5A3A?logo=storybook&logoColor=white)](https://rayssarrsilva.github.io/ipe/)
[![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-F7C531)](./LICENSE)

[English](./README.md) · **Português**

[Storybook](https://rayssarrsilva.github.io/ipe/) · [Figma](https://www.figma.com/design/o3irY2VOsGjlLt3fiAPTU0) · [Reportar um bug](https://github.com/rayssarrsilva/ipe/issues/new/choose)

</div>

---

## Por que "Ipê"?

O ipê é uma árvore brasileira que floresce em amarelo forte justamente nos meses mais secos do ano. Este design system parte dessa ideia: uma base calma e firme que ainda assim tem cor.

Fundos creme, texto marrom-café e destaques fortes e cremosos em amarelo-maracujá, verde-mata, urucum e anil.

## Destaques

- **Design tokens como fonte única de verdade.** Os tokens ficam em [`/tokens`](./tokens), sincronizam com o Figma pelo Tokens Studio e são compilados pelo Style Dictionary em variáveis CSS. Os nomes das variáveis CSS são os mesmos definidos em cada variável do Figma.
- **Temas claro e escuro** guiados por tokens semânticos, seguindo `prefers-color-scheme` ou o atributo `data-theme`.
- **Acessível por padrão.** Toda combinação de cor é verificada pela WCAG 2.2, incluindo a regra de 3:1 para bordas de campos. Os componentes são testados com teclado e axe-core.
- **Documentação bilíngue.** O Storybook troca todas as histórias entre inglês e português, claro e escuro, pela barra de ferramentas.
- **Funciona com ou sem Tailwind.** Entrega CSS puro e um preset opcional de tema para o Tailwind CSS v4.
- **Leve.** O Button tem cerca de 1,4 kB de JavaScript.

## Instalação

```bash
npm install @rayssarrsilva/ipe
```

```tsx
import '@rayssarrsilva/ipe/styles.css';
import { Button } from '@rayssarrsilva/ipe';

export function App() {
  return <Button onClick={() => alert('🌱')}>Plantar uma semente</Button>;
}
```

Carregue as fontes uma vez no seu app (as duas são gratuitas no Google Fonts):

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..700,0..100&family=Instrument+Sans:wght@400..700&display=swap"
/>
```

### Temas

```html
<html data-theme="dark"></html>
```

Sem o atributo, o Ipê segue a preferência do sistema operacional.

### Tailwind CSS v4

```css
@import 'tailwindcss';
@import '@rayssarrsilva/ipe/tokens.css';
@import '@rayssarrsilva/ipe/tailwind.css';
```

Depois use os tokens como utilitários: `bg-action-primary`, `text-text-secondary`, `rounded-pill`, `shadow-md`.

### Tokens em JavaScript

```ts
import { lightTokens } from '@rayssarrsilva/ipe/tokens';
```

## Componentes

| Componente                               | Status        |
| ---------------------------------------- | ------------- |
| Button                                   | ✅            |
| Input, Textarea, Checkbox, Switch, Badge | 🌱 Próximos   |
| Dialog, Toast, Tabs, Dropdown, Tooltip   | 🌱 Planejados |

## Stack

React 19 · TypeScript · Vite (modo biblioteca) · primitivos do Radix UI · CSS Modules · Style Dictionary + Tokens Studio · Storybook 10 · Vitest + Testing Library + axe-core · ESLint + Prettier · Husky + commitlint (Conventional Commits) · Changesets · GitHub Actions

## Desenvolvimento

Requer Node.js 22 (veja `.nvmrc`).

```bash
npm install
npm run dev            # Storybook em http://localhost:6006
npm test               # testes unitários e de acessibilidade
npm run test:coverage  # com limites mínimos de cobertura
npm run lint
npm run typecheck
npm run build          # saída da biblioteca em /dist
```

### Atualizando os tokens

1. Edite os tokens no Figma com o Tokens Studio, ou direto em [`/tokens`](./tokens).
2. Rode `npm run tokens` para gerar de novo as variáveis CSS e a lista de tokens em TypeScript.

### Fluxo de trabalho

- Crie uma branch a partir da `main`, abra um pull request e espere o CI passar. A `main` é protegida.
- As mensagens de commit seguem o [Conventional Commits](https://www.conventionalcommits.org/pt-br) e são verificadas pelo commitlint.
- Rode `npm run changeset` para descrever mudanças no pacote publicado. Ao aceitar o pull request de release, o pacote é publicado no npm e o [changelog](./CHANGELOG.md) é atualizado.

## Autora

Feito com carinho por **Rayssa Roberta** · [LinkedIn](https://www.linkedin.com/in/rayssa-r-14936622a) · [Portfólio](https://portfoliorayssarrsilva.site)

Feedback, issues e pull requests são muito bem-vindos.

## Licença

[MIT](./LICENSE)

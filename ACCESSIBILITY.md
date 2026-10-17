# Accessibility · Acessibilidade

**English** · [Português](#português)

Ipê targets **WCAG 2.2 level AA**. This page describes what is checked automatically, what is checked by hand, and the known exceptions.

## Automated checks

| Check                                                                                                                                                               | Tool                                              | When                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------- |
| Every story rendered in **real Chromium**, in the **light and dark** themes, with its interaction test (`play`) and an **axe-core** audit, including color contrast | Storybook + Vitest browser mode + Playwright      | Every pull request (CI job _Storybook tests in Chromium_)     |
| Keyboard behavior, ARIA roles, names and descriptions of every component                                                                                            | Vitest + Testing Library + axe-core (jsdom)       | Every pull request (CI job _Lint, typecheck, test and build_) |
| Contrast of every semantic color pair                                                                                                                               | Documented in the token descriptions and in Figma | When tokens change                                            |

A violation fails the build. You can confirm it works: make `text/secondary` unreadable in `tokens/dark.json` and run `npm run test:storybook`. Only the dark-theme project fails.

## Manual checks

- [x] Keyboard only: every component is reachable with Tab and operable with Enter, Space, arrow keys and Escape (also covered by the interaction tests).
- [x] `prefers-reduced-motion`: all transitions and animations are removed or slowed.
- [x] Windows High Contrast (`forced-colors: active`): every component checked. Switch, Tabs and Checkbox now draw their state with system colors (fixed in 1.0.1).
- [x] Reflow at 320 CSS px (WCAG 1.4.10): components and the sign-up pattern fit without horizontal scroll (pattern fixed in 1.0.1).
- [x] Target size (WCAG 2.5.8): every interactive element is at least 24 × 24 CSS px (Checkbox fixed in 1.0.1, checked in CI).
- [ ] Screen readers: NVDA + Firefox, then VoiceOver + Safari, following [the manual script](./qa/MANUAL-CHECKS.md).
- [ ] 200% and 400% browser zoom (WCAG 1.4.4 and 1.4.10), in the same script.

The full test plan, test cases and bug reports are in [`/qa`](./qa).

## Known exceptions

| Rule                | Where                               | Why it is accepted                                                                                                                                                                                                                                                                                            |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-hidden-focus` | Dialog and Dropdown Menu while open | While a modal layer is open, Radix hides the rest of the page with `aria-hidden` and traps focus inside the layer. The hidden trigger can never receive focus (verified by pressing Tab repeatedly), so the rule is disabled only for the open-state stories, with the reason written next to it in the code. |

## Reporting a problem

Open an issue with the **Bug report** template and include the assistive technology and browser you used.

---

## Português

O Ipê tem como meta a **WCAG 2.2 nível AA**. Esta página descreve o que é verificado automaticamente, o que é verificado à mão e as exceções conhecidas.

### Verificações automáticas

- Toda história é renderizada num **Chromium real**, nos temas **claro e escuro**, com seu teste de interação (`play`) e uma auditoria **axe-core**, incluindo contraste de cores. Roda em todo pull request.
- Comportamento de teclado, papéis ARIA, nomes e descrições de cada componente são testados com Vitest, Testing Library e axe-core.
- Uma violação reprova o build. Para conferir: deixe o `text/secondary` ilegível em `tokens/dark.json` e rode `npm run test:storybook`. Só o projeto do tema escuro falha.

### Verificações manuais

- [x] Só teclado: todo componente é alcançável com Tab e operável com Enter, Espaço, setas e Esc.
- [x] `prefers-reduced-motion`: transições e animações são removidas ou desaceleradas.
- [x] Alto contraste do Windows (`forced-colors: active`): todos os componentes verificados. Switch, Tabs e Checkbox agora mostram o estado com cores do sistema (corrigido na 1.0.1).
- [x] Reflow em 320px (WCAG 1.4.10): componentes e o formulário de exemplo cabem sem rolagem lateral (corrigido na 1.0.1).
- [x] Tamanho de alvo (WCAG 2.5.8): todo elemento interativo tem pelo menos 24 × 24px (Checkbox corrigido na 1.0.1 e verificado no CI).
- [ ] Leitores de tela: NVDA + Firefox, depois VoiceOver + Safari, seguindo [o roteiro manual](./qa/MANUAL-CHECKS.md).
- [ ] Zoom de 200% e 400% (WCAG 1.4.4 e 1.4.10), no mesmo roteiro.

Plano de testes, casos de teste e relatórios de bug completos estão em [`/qa`](./qa).

### Exceções conhecidas

`aria-hidden-focus` no Dialog e no Dropdown Menu abertos: o Radix esconde o resto da página com `aria-hidden` e prende o foco dentro da camada aberta, então o gatilho escondido nunca recebe foco (verificado apertando Tab várias vezes). A regra é desligada só nas histórias com a camada aberta, com o motivo escrito no código.

### Reportar um problema

Abra uma issue com o modelo **Bug report**, informando a tecnologia assistiva e o navegador usados.

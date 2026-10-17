# Quality assurance · Garantia de qualidade

**English** · [Português](#português)

How Ipê 1.0 was tested after release, what broke, and how each fix is kept from coming back.

| Document                               | What it holds                                                          |
| -------------------------------------- | ---------------------------------------------------------------------- |
| [TEST-PLAN.md](./TEST-PLAN.md)         | Scope, approach, environments, entry and exit criteria, risks, results |
| [TEST-CASES.md](./TEST-CASES.md)       | 24 test cases with expected results and which ones run in CI           |
| [BUG-REPORTS.md](./BUG-REPORTS.md)     | 6 bugs with severity, WCAG reference, root cause, fix and evidence     |
| [MANUAL-CHECKS.md](./MANUAL-CHECKS.md) | Screen reader (NVDA), zoom and real High Contrast script               |
| [evidence/](./evidence)                | Before and after screenshots                                           |

**Cycle in one line:** test → find → report → fix → add a regression check → release 1.0.1 through CI.

---

## Português

Como o Ipê 1.0 foi testado depois do lançamento, o que quebrou e como cada correção fica protegida contra regressão.

- **[Plano de testes](./TEST-PLAN.md):** escopo, abordagem, ambientes, critérios de entrada e saída, riscos e resultados.
- **[Casos de teste](./TEST-CASES.md):** 24 casos, com resultado esperado e quais rodam no CI.
- **[Relatórios de bug](./BUG-REPORTS.md):** 6 bugs com severidade, critério WCAG, causa, correção e evidência (antes e depois).
- **[Verificações manuais](./MANUAL-CHECKS.md):** roteiro com leitor de tela (NVDA), zoom e alto contraste no Windows.

Os documentos de teste estão em inglês, o idioma mais usado em times de QA. Resumo dos achados: o Switch sumia no alto contraste do Windows, a aba selecionada ficava igual às outras, o contador do Textarea era lido como "9/280" sem contexto, o formulário de exemplo rolava para o lado em telas de 320px e o Checkbox tinha 22px, abaixo do alvo mínimo de 24px. Todos corrigidos na versão 1.0.1.

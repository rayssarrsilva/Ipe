# Test plan · Ipê Design System 1.0

| Field         | Value                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| Product       | `@rayssarrsilva/ipe` 1.0.0 (npm) and its Storybook                                                    |
| Author        | Rayssa Roberta                                                                                        |
| Test cycle    | October 2026, after the 1.0.0 release                                                                 |
| Standard      | WCAG 2.2 level AA, WAI-ARIA Authoring Practices                                                       |
| Related files | [Test cases](./TEST-CASES.md) · [Bug reports](./BUG-REPORTS.md) · [Manual checks](./MANUAL-CHECKS.md) |

## 1. Goal

Find what the automated suite cannot see before teams depend on 1.0. The pipeline already checks every story in real Chromium, in light and dark, with interaction tests and axe-core. This cycle focuses on the conditions that are **not** in that pipeline: Windows High Contrast, narrow screens and zoom, touch target size, and what a screen reader actually says.

## 2. Scope

**In scope**

- The 11 components: Button, Input, Textarea, Checkbox, Switch, Badge, Dialog, Toast, Tabs, Dropdown Menu, Tooltip.
- The _Maker sign-up_ pattern, because teams copy patterns as they are.
- The published package: install, types and build in a fresh app.

**Out of scope**

- Visual regression across browsers (planned with Playwright screenshots in a later cycle).
- Performance and bundle size budgets.
- The Figma library (reviewed separately against the code).

## 3. Approach

| Level           | Technique                                                               | Tool                                          |
| --------------- | ----------------------------------------------------------------------- | --------------------------------------------- |
| Component       | Unit and accessibility tests, keyboard interaction                      | Vitest, Testing Library, user-event, axe-core |
| Story / browser | Every story in Chromium, light and dark, with `play` tests and axe-core | Storybook 10, Vitest browser mode, Playwright |
| Package         | Exports and types under Node ESM rules, install in a fresh React app    | publint, Are The Types Wrong, smoke test      |
| Exploratory     | Charters below, run against the built Storybook                         | Playwright scripts, DevTools emulation        |
| Manual AT       | Screen reader and zoom script                                           | NVDA + Firefox, browser zoom                  |

### Exploratory charters

1. **Forced colors.** Explore every component with Windows High Contrast emulated (`forced-colors: active`) to discover controls whose state depends only on background color.
2. **Reflow.** Explore the components and the pattern at 320 CSS px wide (equal to 1280 px at 400% zoom) to discover horizontal scrolling.
3. **Target size.** Measure every interactive element to discover targets below 24 × 24 CSS px.
4. **Announcements.** Read the accessible name and description of every form control to discover output that makes no sense when heard instead of seen.

## 4. Environments

| Environment  | Detail                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------- |
| Browser      | Chromium (Playwright 1.64), Firefox for the screen reader run                            |
| OS emulation | `forced-colors: active` + `prefers-color-scheme: dark`, `prefers-reduced-motion: reduce` |
| Viewports    | 320 × 640, 700 × 300, 900 × 700, 1280 × 800                                              |
| Themes       | Light and dark                                                                           |
| Languages    | English and Portuguese (Storybook toolbar)                                               |

## 5. Entry and exit criteria

**Entry:** 1.0.0 published, CI green on `main`, Storybook deployed.

**Exit:**

- No open Critical or High bugs.
- Every Medium bug fixed or documented as a known issue with a workaround.
- Every fixed bug has a regression check (automated where the tooling allows it, otherwise a manual test case).
- CI green and the fix released as a patch version through the release pipeline.

## 6. Severity and priority

| Severity | Meaning                                                                               |
| -------- | ------------------------------------------------------------------------------------- |
| Critical | A user cannot complete a task and there is no workaround                              |
| High     | A component is unusable for a group of users (for example, a control that disappears) |
| Medium   | Information is lost or harder to get, but a workaround exists                         |
| Low      | Cosmetic, documentation only, or a best-practice improvement                          |

Priority follows impact on real users first and effort second.

## 7. Risks

| Risk                                            | Mitigation                                                                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Emulated forced colors differ from real Windows | Fixes use CSS system colors, which Windows maps for any theme. Confirm on Windows in the manual run |
| Screen readers differ from each other           | Manual script runs NVDA first; VoiceOver is listed as a follow-up                                   |
| Radix UI updates change markup                  | Interaction and axe tests in CI catch role and name changes                                         |

## 8. Results summary

| Metric                | Value                       |
| --------------------- | --------------------------- |
| Test cases run        | 24                          |
| Passed on first run   | 18                          |
| Bugs found            | 6 (1 High, 3 Medium, 2 Low) |
| Bugs fixed in 1.0.1   | 6                           |
| New regression checks | 3 automated, 3 manual       |

See [BUG-REPORTS.md](./BUG-REPORTS.md) for each bug with evidence.

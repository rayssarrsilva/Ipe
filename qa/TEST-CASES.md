# Test cases · Ipê Design System 1.0

Run against the Storybook built from the 1.0.0 release. **Auto** means the case also runs in CI on every pull request.

Status after the first run: ✅ passed · ❌ failed (bug linked) · 🔁 failed in 1.0.0, passes after the fix.

## Keyboard and ARIA

| ID    | Component     | Steps                                           | Expected result                                                            | Auto | Status |
| ----- | ------------- | ----------------------------------------------- | -------------------------------------------------------------------------- | ---- | ------ |
| TC-01 | Button        | Tab to the button, press Enter and Space        | Click handler runs once per key; focus ring visible                        | Yes  | ✅     |
| TC-02 | Button        | Set `loading`                                   | `aria-busy="true"`, button keeps its name, click does nothing              | Yes  | ✅     |
| TC-03 | Input         | Submit with an invalid email                    | `aria-invalid="true"`; the error text is part of the description           | Yes  | ✅     |
| TC-04 | Checkbox      | Tab to it, press Space                          | Toggles; `aria-checked` updates; "select all" shows `mixed`                | Yes  | ✅     |
| TC-05 | Switch        | Tab to it, press Space                          | `role="switch"`, `aria-checked` toggles                                    | Yes  | ✅     |
| TC-06 | Tabs          | Focus a tab, press ArrowRight and ArrowLeft     | Focus and selection move and skip disabled tabs                            | Yes  | ✅     |
| TC-07 | Dialog        | Open it, press Tab many times, then Escape      | Focus stays inside; Escape closes and returns focus to the trigger         | Yes  | ✅     |
| TC-08 | Dropdown Menu | Open with Enter, move with arrows, press Escape | Focus moves through items and skips disabled ones; Escape closes           | Yes  | ✅     |
| TC-09 | Toast         | Trigger a toast                                 | Announced through a live region (assertive for danger); has a close button | Yes  | ✅     |
| TC-10 | Tooltip       | Focus the trigger, then press Escape            | Tooltip shows on focus, hides on Escape; trigger is described by it        | Yes  | ✅     |

## Visual accessibility

| ID    | Component | Steps                                                      | Expected result                                       | Auto | Status                                     |
| ----- | --------- | ---------------------------------------------------------- | ----------------------------------------------------- | ---- | ------------------------------------------ |
| TC-11 | All       | Run axe-core on every story, light and dark                | No violations, color contrast included                | Yes  | ✅                                         |
| TC-12 | All       | Emulate `prefers-reduced-motion: reduce`                   | No transitions or entry animations                    | No   | ✅                                         |
| TC-13 | Button    | Emulate `forced-colors: active`                            | Every variant has a visible border and text           | No   | ✅                                         |
| TC-14 | Switch    | Emulate `forced-colors: active`, look at on, off, disabled | Track, thumb and on/off state are visible             | No   | 🔁 [IPE-QA-01](./BUG-REPORTS.md#ipe-qa-01) |
| TC-15 | Tabs      | Emulate `forced-colors: active`, move focus away from tabs | The selected tab is visibly different from the others | No   | 🔁 [IPE-QA-02](./BUG-REPORTS.md#ipe-qa-02) |
| TC-16 | Checkbox  | Emulate `forced-colors: active`                            | Box border and check mark are visible                 | No   | ✅                                         |

## Reflow, zoom and target size

| ID    | Component           | Steps                                  | Expected result                            | Auto      | Status                                     |
| ----- | ------------------- | -------------------------------------- | ------------------------------------------ | --------- | ------------------------------------------ |
| TC-17 | Dialog, Tabs, Toast | Open at 320 × 640                      | No horizontal scroll (`scrollWidth` = 320) | No        | ✅                                         |
| TC-18 | Maker sign-up       | Open at 320 × 640                      | No horizontal scroll                       | No        | 🔁 [IPE-QA-04](./BUG-REPORTS.md#ipe-qa-04) |
| TC-19 | Button stories      | Open _Sizes_ and _States_ at 320 × 640 | No horizontal scroll                       | No        | 🔁 [IPE-QA-06](./BUG-REPORTS.md#ipe-qa-06) |
| TC-20 | Checkbox            | Measure the box                        | At least 24 × 24 CSS px (WCAG 2.5.8)       | Yes (new) | 🔁 [IPE-QA-05](./BUG-REPORTS.md#ipe-qa-05) |
| TC-21 | All interactive     | Measure every interactive element      | At least 24 × 24 CSS px                    | No        | ✅ (after the fix)                         |

## Screen reader output

| ID    | Component | Steps                                   | Expected result                                               | Auto      | Status                                     |
| ----- | --------- | --------------------------------------- | ------------------------------------------------------------- | --------- | ------------------------------------------ |
| TC-22 | Textarea  | Type 9 characters, read the description | Hears the hint and "9 of 280 characters" (or the translation) | Yes (new) | 🔁 [IPE-QA-03](./BUG-REPORTS.md#ipe-qa-03) |
| TC-23 | Input     | Read a required field with a hint       | Name, "required", then the hint                               | Yes       | ✅                                         |

## Package

| ID    | Area | Steps                                                                   | Expected result                                        | Auto | Status |
| ----- | ---- | ----------------------------------------------------------------------- | ------------------------------------------------------ | ---- | ------ |
| TC-24 | npm  | `npm pack`, install into a fresh Vite + React app, type-check and build | Types resolve under Bundler and NodeNext; build passes | Yes  | ✅     |

Manual screen reader and zoom cases are in [MANUAL-CHECKS.md](./MANUAL-CHECKS.md).

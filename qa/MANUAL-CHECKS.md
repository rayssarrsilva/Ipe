# Manual checks · screen reader and zoom

Automated tools catch around a third of accessibility problems. This script covers what only a person can judge. Fill in the **Result** column and attach notes to a GitHub issue when something fails.

**Setup:** Windows + [NVDA](https://www.nvaccess.org/download/) (free) + Firefox, Storybook at <https://rayssarrsilva.github.io/Ipe/>. Open each story in its own tab with the _Open canvas in new tab_ button so the Storybook interface does not get in the way.

NVDA basics: `Ctrl` stops speech · `Tab` next control · `NVDA + Space` switches between browse and focus mode · `NVDA + Ctrl + R` reads the speech viewer (Tools → Speech viewer helps you copy what was said).

## Screen reader (NVDA + Firefox)

| ID    | Story                    | Do this                                    | You should hear (roughly)                                            | Result |
| ----- | ------------------------ | ------------------------------------------ | -------------------------------------------------------------------- | ------ |
| SR-01 | Button / Variants        | Tab to the first button                    | "Plant a seed, button"                                               |        |
| SR-02 | Button / States          | Tab to the loading button                  | "…button, busy" (or "unavailable")                                   |        |
| SR-03 | Input / States           | Tab into the email field with an error     | Label, "required", "invalid entry", then the hint and the error text |        |
| SR-04 | Textarea / Playground    | Type a few letters, then Tab away and back | Label, hint, then "N of 280 characters"                              |        |
| SR-05 | Checkbox / Indeterminate | Tab to "select all", press Space           | "checkbox, half checked", then "checked"                             |        |
| SR-06 | Switch / States          | Tab to "Reduce motion", press Space        | "Reduce motion, switch, on", then "off"                              |        |
| SR-07 | Tabs / Default           | Tab to the tabs, press Right Arrow         | "Care, tab, selected, 2 of 3"                                        |        |
| SR-08 | Dialog / With form       | Open the dialog                            | The dialog title and description; Tab never leaves the dialog        |        |
| SR-09 | Dropdown Menu / Default  | Open with Enter, press Down Arrow          | "menu", then each item; the danger item is announced like the others |        |
| SR-10 | Toast / Default          | Trigger a toast and keep still             | The toast text is read without moving focus                          |        |
| SR-11 | Tooltip / Default        | Tab to the trigger                         | The trigger name, then the tooltip text as its description           |        |
| SR-12 | Patterns / Maker sign-up | Press Send with empty fields               | Each invalid field announces its error when focused                  |        |

Switch the Storybook toolbar to **Português** and repeat SR-04 and SR-06. You should hear "N de 280 caracteres" and the Portuguese labels.

## Zoom and reflow

| ID    | Check                                                        | Expected                                                          | Result |
| ----- | ------------------------------------------------------------ | ----------------------------------------------------------------- | ------ |
| ZM-01 | Browser zoom 200% on _Patterns / Maker sign-up_ (WCAG 1.4.4) | All text readable, nothing cut off or overlapping                 |        |
| ZM-02 | Browser zoom 400% on a 1280px window (WCAG 1.4.10)           | No horizontal scroll, the form stacks in one column               |        |
| ZM-03 | 400% on _Dialog / With form_                                 | Dialog fits the screen and scrolls inside; close button reachable |        |
| ZM-04 | 400% on _Toast / Default_                                    | The toast stays on screen and its close button is reachable       |        |
| ZM-05 | Text spacing (WCAG 1.4.12): apply a text-spacing bookmarklet | No text is cut off                                                |        |

## Windows High Contrast (real Windows, not emulation)

| ID    | Check                                                    | Expected                              | Result |
| ----- | -------------------------------------------------------- | ------------------------------------- | ------ |
| HC-01 | Settings → Accessibility → Contrast themes → _Night sky_ | Switch track, thumb and state visible |        |
| HC-02 | Same theme, Tabs story                                   | Selected tab has a visible indicator  |        |
| HC-03 | _Desert_ (light) theme, Checkbox and Switch              | Both visible, checked state clear     |        |

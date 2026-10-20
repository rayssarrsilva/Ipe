---
'@rayssarrsilva/ipe': major
---

Neutral base palette: pure white and pure black backgrounds, with the strong Brazilian colors (ipê yellow, forest green, urucum, indigo) kept as the brand accents.

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

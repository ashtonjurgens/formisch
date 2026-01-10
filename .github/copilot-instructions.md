# Copilot Instructions

Formisch is a schema-based, headless form library with a framework-agnostic core supporting multiple frameworks (Preact, Qwik, React, Solid, Svelte, Vue).

## Planning Mode

When in planning mode and something is unclear, ask questions **one at a time** (like a quiz). Wait for each answer before asking the next question. Only after all questions are answered and you have no remaining uncertainties, present the final plan.

## Monorepo Layout

| Directory           | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `packages/core/`    | Framework-agnostic form logic                       |
| `packages/methods/` | Form manipulation methods (focus, reset, validate…) |
| `frameworks/`       | Framework-specific wrappers (solid, qwik, react…)   |
| `playgrounds/`      | Testing environments per framework                  |
| `website/`          | formisch.dev (Qwik + Vite)                          |

## Essential Commands

```bash
pnpm install                    # Install dependencies
pnpm -C packages/core test      # Run core tests
pnpm -C packages/core lint      # ESLint + tsc
pnpm -C packages/core build     # Build core package
pnpm -C website dev             # Start docs site
```

## Code Conventions

- **ESM with `.ts` extensions** in imports (enforced by ESLint)
- **`interface` over `type`** for object shapes
- **JSDoc required** on exported functions (first overload only for overload sets)
- **`// @__NO_SIDE_EFFECTS__`** before pure factory functions for tree-shaking

## Library Architecture

Framework-agnostic core with framework-specific reactivity injected at build time:

```
packages/core/src/
├── array/     → Array field utilities
├── field/     → Field management
├── form/      → Form state management
├── framework/ → Framework reactivity (injected at build)
├── types/     → TypeScript definitions
└── values.ts  → Value utilities

packages/methods/src/
├── focus/     → Focus management
├── validate/  → Validation triggers
├── reset/     → Form/field reset
└── ...        → Other form methods

frameworks/{framework}/src/
├── primitives/ → createForm, useField, useFieldArray
├── components/ → Form, Field, FieldArray
└── types/      → Framework-specific types
```

Each method has its own folder: `name.ts`, `index.ts`.

## Detailed Guides

**Before performing any task listed below, OPEN and READ the corresponding guide file.**

| Task                          | Guide (read before starting)                                                      |
| ----------------------------- | --------------------------------------------------------------------------------- |
| Navigate repo, find files     | [prompts/repository-structure.md](../prompts/repository-structure.md)             |
| Write JSDoc / inline comments | [prompts/document-source-code.md](../prompts/document-source-code.md)             |
| Write unit tests              | [prompts/write-unit-tests.md](../prompts/write-unit-tests.md)                     |
| Review PRs and source changes | [prompts/review-source-code-changes.md](../prompts/review-source-code-changes.md) |
| Add new API page to website   | [prompts/add-new-api-to-website.md](../prompts/add-new-api-to-website.md)         |
| Update existing API docs      | [prompts/update-api-on-website.md](../prompts/update-api-on-website.md)           |
| Add guide/tutorial to website | [prompts/add-new-guide-to-website.md](../prompts/add-new-guide-to-website.md)     |

**Source code is the single source of truth.** All documentation must match the source in `packages/` and `frameworks/`.

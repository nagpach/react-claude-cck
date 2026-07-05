# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`).

- `pnpm dev` — start the Vite dev server (binds `0.0.0.0`)
- `pnpm build` — type-check (`tsc`) then produce a production build
- `pnpm preview` — serve the built `dist/`

There is no lint or test setup. `pnpm build` (via `tsc --noEmit`) is the only automated check — run it to catch type errors before finishing a change.

## Stack

Vite 8 + React 19 + TypeScript (strict) + Tailwind CSS **v4** + shadcn/ui primitives (Radix). Routing via `react-router-dom` v7.

- Import alias `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).
- Tailwind v4 is CSS-first: `src/index.css` starts with `@import "tailwindcss"` and `@config "../tailwind.config.ts"`. The `tailwind.config.ts` still exists to declare the `chrome-*` palette (the builder UI's own chrome) and font families.
- shadcn config is `components.json`; generated primitives live in `src/components/ui/`.

## Architecture

The app is a **calculator design builder**: a controls sidebar mutates a design model, and a live preview re-renders from it. The whole thing is a single-page app with a couple of static article routes (`/`, `/developer`, `/blog/react-router-migration`).

### The design model is the single source of truth

`src/config/design.ts` defines everything: the option vocabularies (`FONT_NAMES`, `SHAPE_NAMES`, `SHADOWS`, `PRESSES`, etc. as `as const` arrays), the `CalculatorDesign` interface, and `DEFAULTS`. Almost every other file is typed against these. **To add or change a design property you must touch several files in lockstep** — this is the main cross-cutting concern:

1. `config/design.ts` — add the field to `CalculatorDesign` + `DEFAULTS` (and to `NumberKey`/`ColorKey`/`ToggleKey` unions if applicable).
2. `config/controls.ts` — add a descriptor so the controls panel renders a UI for it (sliders/colors are declarative).
3. `components/CalculatorPreview.tsx` — map the field to a `--css-var` (or a `data-*` attribute).
4. `src/index.css` — consume that variable/attribute under `@layer components`.
5. `config/presets.ts` and `lib/random.ts` — set the field where relevant so presets and randomize stay coherent.

### State flow

`useDesign` (`hooks/useDesign.ts`) owns the design state, exposes the mutators (`updateField`, `applyPreset`, `chooseShape`, `reset`, `randomize`), and persists every change to `localStorage` (`lib/storage.ts`, key `cck_state`). It is wrapped by `ThemeProvider` (`theme/ThemeProvider.tsx`) and consumed anywhere via `useTheme()` — components never prop-drill the design. Note `updateField` clears `_preset` to `null` (a manual edit means "no longer a named preset").

### Preview rendering is CSS-variable driven

`CalculatorPreview` translates the design object into a bag of CSS custom properties (`CalculatorVars`) plus `data-shadow` / `data-press` / `data-circle` attributes on `.calculator-shell`. All the actual visual styling (button shapes, shadow variants, press animations) lives in `src/index.css` under `@layer components` and reads those variables/attributes. Keep visual logic in CSS, not inline styles.

### Calculator engine is pure and separate from design

`lib/calculator.ts` is a stateless reducer: `applyCalculatorAction(memory, key, separators) -> memory`. `useCalculator` (`hooks/useCalculator.ts`) holds the `CalcMemory` state and feeds both on-screen button presses **and** physical keyboard input through that same function (keyboard handling, including Backspace, lives in the hook). The keypad layout is data in `config/keys.ts`. This engine is independent of the design/theme system.

### Config-as-data

`src/config/` holds declarative descriptors that drive the UI: `controls.ts` (slider/color field specs), `keys.ts` (keypad + operator glyphs), `presets.ts` (curated `Partial<CalculatorDesign>` starting points), `design.ts` (vocab + defaults). Prefer editing these over hardcoding in components.

## Notes

- `Calculator Construction Kit tailwind.html` is the original standalone prototype the React app was built from; it is not part of the build.
- Article routes (`DeveloperArticle`, `RouterMigrationArticle`) are `lazy()`-loaded and are static content, unrelated to the builder logic.

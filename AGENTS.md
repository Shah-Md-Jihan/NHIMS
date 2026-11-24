<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repo state

Fresh create-next-app scaffold (Next.js 16.4.6 App Router, React 19.3, TypeScript strict, Tailwind v4). Only `src/app/layout.tsx`, `src/app/page.tsx`, and an empty `src/app/(authentication)/sign-in/page.tsx` exist. `README.md` is still the default template (it says `app/page.tsx`; the real path is `src/app/page.tsx`).

## Commands

- `npm run dev` — dev server on :3000; Turbopack is the default (do not pass `--turbopack`).
- `npm run build` — production build; this is also the only real typecheck (there is no `test` or `typecheck` script).
- `npm run lint` — bare `eslint` (ESLint 9 flat config, lints the whole repo). Single file: `npx eslint src/app/page.tsx`; autofix: `npm run lint -- --fix`.
- `npx next typegen` — regenerate route types when adding/moving routes and TS tooling complains about missing `PageProps`/`RouteContext` types.

## Architecture notes

- Import alias `@/*` → `src/*` (`tsconfig.json`).
- Route groups do not affect URLs: `src/app/(authentication)/sign-in/page.tsx` serves `/sign-in`.
- `LayoutProps<"/">` / `PageProps<"/...">` are generated global types; never import them. They only exist after `next dev`/`next build`/`next typegen`.
- Route metadata conventions live in `src/app` (e.g. `favicon.ico`), not `public/`.

## Config quirks (important)

`next.config.ts` opts into three non-default behaviors:

- **Cache Components** (`cacheComponents` + `partialPrefetching`): data fetching is dynamic by default; anything using `cookies()`, `headers()`, or uncached I/O must sit under a `<Suspense>` boundary or the build fails. Cache explicitly with `"use cache"` (+ `cacheLife`/`cacheTag`). Node runtime only — do **not** add `export const runtime`.
- **React Compiler** (`reactCompiler`): memoization is automatic; don't add `useMemo`/`useCallback`/`React.memo` by default.
- **Tailwind v4 via Turbopack loader** (`@tailwindcss/turbopack` rule in `next.config.ts`): there is no `postcss.config.*`. Don't add `@tailwindcss/postcss` or a PostCSS config; theme tokens belong in `src/app/globals.css` under `@theme inline`.

`next dev` writes to `.next/dev`, `next build` to `.next`, so build and dev can run concurrently.

## Conventions

- No test framework, formatter, or CI is configured — don't invent `npm test`/Prettier commands.
- `.gitignore` ignores `.env*`; no env vars are required yet.
- `next-env.d.ts`, `.next/`, and `node_modules/` are generated/ignored; don't edit or commit them.

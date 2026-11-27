<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

NHIMS hospital-management client: Next.js 16.4.6 App Router, React 19.3, TypeScript strict, Tailwind v4 + daisyUI 5, better-auth on MongoDB. The default `README.md` is stale (it still points at `app/page.tsx`; code lives in `src/app`).

## Commands

- `npm run dev` — dev server on :3000; Turbopack is the default (do not pass `--turbopack`).
- `npm run build` — production build and the only full typecheck; there is no `test`, `typecheck`, formatter, or CI.
- `npm run lint` — bare `eslint` over the whole repo. Single file: `npx eslint <path>`; autofix: `npm run lint -- --fix`.
- `npx tsc --noEmit` — quick type pass, but it reads generated `.next/dev/types` and can exhaust the default Node heap; run `node --max-old-space-size=4096 node_modules/typescript/bin/tsc --noEmit`, and `npx next typegen` after adding/moving routes if `PageProps`/`RouteContext` types are missing.
- `next dev` writes `.next/dev`, `next build` writes `.next`, so both can run concurrently.

## Auth (better-auth + MongoDB)

- Server config: `src/lib/auth.ts`. Email+password enabled, `mongodbAdapter` with database name hardcoded to `"user"`.
- `role` is an additional user field limited to `admin | patient | doctor`, with `input: false` (clients cannot set it) and default `patient`. Promoting users must happen server-side/in DB.
- All auth endpoints are served by the catch-all `src/app/api/auth/[...all]/route.ts` via `toNextJsHandler`. Don't add separate auth API routes.
- `src/lib/auth-client.ts` exports `authClient` plus `signIn`/`signUp`/`signOut`/`useSession` from that same configured client (baseURL + `inferAdditionalFields`), so `session.user.role` is typed as `admin | doctor | patient`. Don't create a second `createAuthClient()` — that silently drops the additional-field types.
- `.env` is gitignored and required for auth. Keys actually consumed: `MONGODB_URI`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_IMGBB_API_KEY`, plus `BETTER_AUTH_SECRET` (read by better-auth itself). `MONGODB_USER`/`MONGODB_PASSWORD` are present but unused. `MONGODB_URI` is read at module scope, so a missing value breaks the auth route/build.
- Sign-up uploads the avatar straight from the browser to imgBB using `NEXT_PUBLIC_IMGBB_API_KEY`, then sends the returned URL as `image` to `signUp.email`. There is no server-side upload route.

## Routes and UI

- Route groups don't affect URLs: `src/app/(authentication)/sign-in` → `/sign-in`, `sign-up` → `/sign-up`, and `src/app/(Dashboard)/dashboard/{admin,doctor,patient}` → `/dashboard/...`. Both groups share the root layout.
- `src/app/layout.tsx` renders `Header`, `Footer`, and `ToastContainer` on every route except `/dashboard`. Use `toast` from `react-toastify` for notifications.
- Auth form primitives live in `src/app/(authentication)/_components`; validation in `src/app/(authentication)/_lib/validation.ts` (client-side only: password ≥8 chars with a letter and digit, names allow Latin/Bangla, photo ≤2 MB of JPEG/PNG/WebP). Reuse these instead of duplicating rules.
- Dashboard shell: `src/app/(Dashboard)/dashboard/layout.tsx` renders the client `src/app/Components/Sidebar.tsx` (role-based links, desktop collapse persisted in `localStorage`, mobile off-canvas drawer) next to the content area. `Header` returns nothing on `/dashboard` and `Footer` is wrapped in `HideOnDashboard`, so dashboard pages must not assume site chrome.
- Sidebar links point at `/dashboard/{role}/...` subroutes that don't exist yet (only the three overview pages are built), so those links currently 404 by design.
- Dashboard pages are role stubs; the sidebar reads `session.user.role` and maps it to per-role links.
- Styling: theme tokens and base typography hierarchy are in `src/app/globals.css` (`@theme inline`, `@layer base`, `@plugin "daisyui"`). Accent color is `teal-700` / `#1aa38b`. Icons are hand-written inline SVGs — no icon package.

## Config quirks (important)

`next.config.ts` opts into three non-default behaviors:

- **Cache Components** (`cacheComponents` + `partialPrefetching`): data fetching is dynamic by default; anything using `cookies()`, `headers()`, or uncached I/O must sit under a `<Suspense>` boundary or the build fails. Cache explicitly with `"use cache"` (+ `cacheLife`/`cacheTag`). Node runtime only — do **not** add `export const runtime`.
- **React Compiler** (`reactCompiler`): memoization is automatic; don't add `useMemo`/`useCallback`/`React.memo` by default.
- **Tailwind v4 via Turbopack loader** (`@tailwindcss/turbopack` rule in `next.config.ts`): there is no `postcss.config.*`. Don't add `@tailwindcss/postcss` or a PostCSS config.

Other gotchas:

- `LayoutProps<"/">` / `PageProps<"/...">` are generated global types; never import them.
- Every `layout.tsx` must export a default component.
- `Footer` computes its year inside a `"use cache"` function with `cacheLife("days")`; Cache Components rejects `new Date()` during prerender, so don't move that back into the component body.
- Moving/renaming routes can leave stale references in `.next/dev/types`, making `build`/`tsc` report missing modules for the old paths; delete `.next/dev` (generated) and rebuild.
- `.gitignore` ignores `.env*`, `next-env.d.ts`, `*.tsbuildinfo`, `.next/`, and `node_modules/`; never edit or commit those.

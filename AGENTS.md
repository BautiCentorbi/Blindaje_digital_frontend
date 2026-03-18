# AGENTS.md

## Purpose

This file defines the default working rules for any agent modifying this repository.
Apply these rules for every request involving writing, checking, changing, modifying,
adding, or removing code.

## Project Snapshot

- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4.
- Package manager: npm (`package-lock.json` is present).
- Alias: `@/*` maps to the repository root.
- Main areas:
  - `app/`: routes, layouts, top-level page composition.
  - `components/`: reusable composed UI, currently grouped by domain such as `auth` and `layout`.
  - `features/`: feature-specific UI and flows.
  - `entities/`: domain entities and related building blocks.
  - `lib/`: shared logic, auth helpers, mocks, navigation config.
  - `shared/`: cross-cutting UI, hooks, layout helpers, constants, utilities.
  - `public/`: static assets.

## Operating Rules

1. Do not restructure the repository unless the request explicitly requires it.
2. Prefer minimal, targeted changes over broad rewrites.
3. Preserve existing behavior unless the request is to change behavior.
4. Keep TypeScript strictness intact. Do not silence errors with `any` unless justified.
5. Reuse existing modules before adding new ones.
6. Preserve user-facing Spanish copy and route naming patterns unless asked to revise them.
7. Do not add dependencies unless there is a clear need that cannot be met with the current stack.
8. Do not remove mocks, auth flows, or navigation entries without checking all consumers first.
9. Avoid breaking mobile layouts when updating UI.
10. Keep imports using the `@/` alias when referencing internal modules.

## File Placement

- Add a new route or route-level layout in `app/`.
- Add domain-specific screens, cards, modals, and flows in `features/<feature-name>/`.
- Add reusable domain UI shared across routes in `components/`.
- Add entity-specific types or UI in `entities/<entity-name>/`.
- Add shared utilities, hooks, constants, or generic UI in `shared/` or `lib/`, based on current patterns.
- Add mock datasets in `lib/mocks/` and keep naming consistent with existing mock files.
- Add repository-local skills in `.agents/skills/<skill-name>/SKILL.md`.
- Maintain the root skill catalog in `SKILLS.md`.

## Implementation Conventions

- Match existing naming style:
  - Components: PascalCase exports, kebab-case filenames.
  - Utility files: lowercase or kebab-case names consistent with nearby files.
- Prefer server/client component boundaries that align with Next.js App Router requirements.
- Only add `"use client"` when required by hooks, browser APIs, or client-side interactivity.
- Keep page files thin when possible by delegating feature UI to `features/` or `components/`.
- Prefer composition over duplicating UI blocks.
- Use Tailwind utility classes and existing CSS variables before introducing new global CSS.
- If updating global styles in `app/globals.css`, keep the change small and verify it does not regress the whole app.

## Frontend and UI Rules

- Treat UI work as product work, not just markup changes. Preserve clarity, hierarchy, and task flow.
- Maintain consistency with the existing visual language unless the request is explicitly for redesign.
- Prefer intentional layouts over generic card grids or boilerplate dashboard patterns.
- Keep typography, spacing, border radius, and color usage consistent with nearby screens.
- Reuse existing UI primitives from `components/` and `shared/ui/` before creating new ones.
- Avoid adding one-off inline styles unless there is no practical Tailwind alternative.
- Do not introduce visual effects that reduce readability or obscure important actions.
- Keep interactive states explicit: default, hover, focus, active, disabled, loading, and empty states.
- Ensure clickable elements remain visually identifiable and large enough for touch interaction.
- Preserve responsive behavior on mobile and desktop; do not optimize only for one breakpoint.
- When changing layouts, verify overflow, wrapping, and spacing in narrow viewports.
- Prefer semantic HTML for forms, lists, dialogs, navigation, and headings.
- Keep accessibility intact:
  - maintain label/input associations
  - preserve keyboard access
  - do not remove visible focus indication
  - use alt text or decorative handling for images appropriately
- For modal or drawer work, verify open, close, escape, overlay, and scroll behavior.
- For navigation changes, verify active state, route transitions, and protected-route behavior.
- For dashboard or data-heavy views, preserve scanability and avoid overcrowding panels.
- If animation is added, keep it purposeful and restrained. It must not block interaction or reduce perceived performance.
- Before adding new colors, spacing tokens, or font rules, check whether the same need is already covered by existing variables or classes.

## Component and Design System Rules

- Prefer extending an existing component before creating a near-duplicate.
- New reusable components should have a clear ownership boundary:
  - `shared/ui/` for generic primitives
  - `components/` for reusable app-specific composed blocks
  - `features/` for feature-local components that should not become global by default
- Do not move a feature-local component into shared space unless at least two real consumers justify it.
- Keep component APIs small and explicit. Prefer a few well-named props over broad configuration objects.
- Avoid prop names that mirror implementation details rather than behavior.
- Prefer controlled data flow. Pass data and callbacks intentionally instead of leaking internal state upward.
- Keep presentational components separate from data-loading or orchestration logic when the split is meaningful.
- Avoid deep prop drilling if a nearby composition or context pattern already exists in the codebase.
- Reuse existing spacing, container, card, badge, modal, and toolbar patterns before inventing new ones.
- When adding variants, follow a constrained pattern:
  - keep variant names semantic
  - avoid one-off variants for a single screen
  - do not overload a component with unrelated visual modes
- Preserve visual rhythm:
  - align padding and gap values with neighboring components
  - keep heading and body text scales consistent
  - keep border and shadow treatment coherent across similar surfaces
- Prefer stable composition patterns:
  - `Header`
  - `Toolbar`
  - `List`
  - `Card`
  - `Modal`
  - `Panel`
  only when they match existing usage nearby; do not force them artificially.
- Keep form components predictable:
  - labels visible
  - validation messages near inputs
  - destructive actions visually distinct
  - submit and cancel actions placed consistently
- Do not embed mock literals directly inside reusable UI primitives.
- If a component becomes difficult to scan in one file, split it into focused subcomponents in the same feature directory before moving it elsewhere.
- Prefer accessible defaults in reusable components so feature code does not have to re-implement keyboard or aria behavior repeatedly.
- Before adding a new primitive, check whether a styling pattern can be achieved by composing existing primitives instead.

## Data, Auth, and Navigation

- Check `lib/auth/` before changing login, protected routes, session state, or role handling.
- Check `lib/navigation.ts` before adding, removing, or renaming platform sections.
- If a feature uses mock data, update the relevant file in `lib/mocks/` instead of hardcoding data inside components.
- Keep sample data coherent across related screens when changing entity fields.

## Skill Management Rules

- Treat `.agents/skills/` as the source directory for repository-local skills.
- Treat `SKILLS.md` in the repository root as the human-readable index of local skills.
- When creating a new skill, update all affected control files in the same task:
  - create or update `.agents/skills/<skill-name>/SKILL.md`
  - update `SKILLS.md`
  - update `AGENTS.md` if the new skill adds a standing workflow, guardrail, or repository rule
- When updating an existing skill, also update `SKILLS.md` if the skill purpose, trigger conditions, or scope changed.
- Do not leave skill creation half-finished; a new skill is not complete until its index entry and any required root guidance are in sync.
- Keep `SKILLS.md` concise. It should summarize skills, not duplicate their full bodies.
- If a new skill changes how future requests should be handled, record that rule in `AGENTS.md`.

## Change Workflow

For every request:

1. Inspect the relevant files and nearby patterns before editing.
2. Identify the smallest safe change that satisfies the request.
3. Edit only the files needed for that change.
4. Verify imports, routes, and affected consumers.
5. Run validation when the environment allows it.
6. Summarize what changed, note any assumptions, and call out anything not validated.

For Next.js feature work:

1. inspect the target route under `app/` and the nearest related feature folder
2. keep route entrypoints thin and move substantial UI into `features/` or `components/`
3. update `lib/mocks/`, `lib/navigation.ts`, or `lib/auth/` when the feature change affects data, navigation, or access behavior
4. verify route-group placement such as `app/(platform)/...` before adding new pages

For review requests:

1. prioritize findings over summaries
2. report bugs, regressions, and missing validation before style concerns
3. check route, auth, navigation, mock-data, responsive, and accessibility impact in addition to the changed lines
4. state explicitly when no findings were found and note any residual testing gap

For design-system work:

1. decide first whether the change belongs in `shared/ui/`, `components/`, or stays feature-local
2. prefer extending or consolidating existing reusable UI before creating a new primitive
3. keep component APIs explicit and variant counts controlled
4. update consumers only as far as needed to improve consistency and avoid duplicate abstractions

For skill-related requests:

1. Inspect `.agents/skills/`, `SKILLS.md`, and `AGENTS.md` before editing.
2. Create or update the target skill under `.agents/skills/<skill-name>/SKILL.md`.
3. Update `SKILLS.md` so the repository index reflects the current skill set.
4. Update `AGENTS.md` when the new skill introduces a standing repository rule or workflow expectation.
5. Verify the skill path, frontmatter, and index entry are aligned.

## Validation Checklist

Run the most relevant commands after changes when possible:

```bash
npm run lint
npm run build
```

Use `npm run build` for route, type, or integration-sensitive changes.
If a command cannot be run, state that clearly in the final report.

For frontend-heavy changes, also verify:

1. mobile layout does not overflow horizontally
2. key actions remain visible without layout breakage
3. text contrast and focus states remain usable
4. loading, empty, and error states are still coherent if affected by the change

## Guardrails

- Do not perform destructive cleanup outside the requested scope.
- Do not revert unrelated user changes.
- Do not mass-format the repository unless requested.
- Do not rename public routes, exported symbols, or shared files without checking all references.
- Do not introduce placeholder code that is not wired into the app unless the request is explicitly for scaffolding.

## Preferred Response Content

When reporting work, include:

1. What changed.
2. Which files were touched.
3. What was validated.
4. Any remaining risk, assumption, or follow-up item.

---
name: nextjs-feature-builder
description: Build or extend Next.js App Router features in this repository. Use this skill when the user asks to add or modify routes, pages, layouts, feature views, dashboard sections, entity screens, modals, toolbars, or feature flows that should fit the existing `app/`, `features/`, `components/`, `lib/`, and `shared/` structure.
---

# Next.js Feature Builder

Build repository-native features for this Next.js application.

Work with the existing structure instead of inventing a new architecture.

## Repository Structure

Use the current placement rules:

- `app/` for routes, route groups, page entrypoints, and layouts
- `features/` for feature-specific screens, flows, and substantial UI
- `components/` for reusable app-specific composed blocks
- `shared/` for cross-cutting primitives, hooks, constants, and utilities
- `lib/` for auth, mocks, navigation, and app-level support logic
- `entities/` for domain-specific building blocks when they belong to an entity boundary

Keep page files thin. Compose substantial UI in `features/` or `components/`.

## When Building a Feature

First determine which kind of work the request implies:

1. route or page entrypoint
2. feature screen or dashboard section
3. reusable component
4. modal, drawer, filter, or toolbar
5. data shape or mock-data update
6. auth-aware flow
7. navigation update

Map the request to the smallest set of files needed.

## Route and Layout Rules

- Add new route entrypoints in `app/`.
- Follow existing route-group patterns such as `app/(platform)/...` when the feature belongs inside the authenticated platform area.
- Keep `page.tsx` focused on composition.
- Add or change route-level layout files only when the route genuinely needs layout behavior different from its parent.
- Check route naming consistency with existing Spanish URL structure before adding a new segment.

## Feature Composition Rules

- Put substantial screen logic in `features/<feature-name>/`.
- Prefer one main view component per feature flow when that improves readability.
- Split large feature views into focused subcomponents such as cards, panels, lists, toolbars, and modals.
- Reuse nearby patterns before creating a new abstraction.
- Keep feature-local UI in the feature folder unless it has multiple real consumers.

## Data and State Rules

- If the feature uses mock data, update `lib/mocks/` instead of embedding mock objects in view files.
- Keep entity shapes coherent across consumers when adding or changing fields.
- Check `lib/auth/` before changing auth-sensitive behavior.
- Check `lib/navigation.ts` before changing sections, labels, or platform navigation.
- Avoid introducing global state unless the existing local or contextual pattern is clearly insufficient.

## App Router Rules

- Add `"use client"` only when hooks, browser APIs, or client interactivity require it.
- Prefer server-safe files by default.
- Keep imports using the `@/` alias for internal modules.
- Avoid moving logic into route files that would be clearer inside feature modules.

## UI and UX Rules

- Follow the repository's frontend standards for hierarchy, responsiveness, and accessibility.
- Preserve Spanish product copy unless the request is to change it.
- Keep mobile behavior intact when adding feature UI.
- Verify loading, empty, and error-adjacent states if the change affects them.

## Feature Workflow

1. Inspect the existing route, feature folder, and neighboring patterns.
2. Identify the route entrypoint, feature view, supporting components, and data files affected.
3. Implement the smallest coherent feature change.
4. Verify imports, route paths, and consumer references.
5. Update mocks, navigation, or auth helpers when the feature requires it.
6. Run validation when possible.

## Validation

After feature work, verify:

1. routes still resolve correctly
2. imports use valid internal paths
3. page entrypoints remain thin and coherent
4. mock data and UI consumers remain aligned
5. responsive behavior remains usable if UI changed

Run when possible:

```bash
npm run lint
npm run build
```

Use `npm run build` for route, type, layout, or integration-sensitive feature changes.

## Output Expectation

When finishing feature work, report:

1. what was added or changed
2. which route or feature areas were touched
3. whether mocks, navigation, or auth were also updated
4. what was validated
5. any remaining assumption or integration risk

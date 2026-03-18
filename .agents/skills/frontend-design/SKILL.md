---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces for this repository. Use this skill when the user asks to build or redesign pages, components, dashboards, flows, layouts, landing sections, or visual UI improvements in the Next.js app, especially when the request involves styling, responsive behavior, interaction quality, or stronger design direction.
---

# Frontend Design

Build real frontend code with strong visual intent. Do not produce generic, interchangeable UI.

Work within this repository's stack and structure:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- internal paths with `@/`

Default path placement:

- `app/` for routes and page composition
- `features/` for feature-specific screens and flows
- `components/` for reusable app-specific composed UI
- `shared/ui/` for generic reusable primitives when they truly need to be shared

## Design Goal

Choose a clear visual direction before editing code.
Make the interface feel intentional, specific, and production-ready.

Aim for:

- strong hierarchy
- memorable visual identity
- coherent spacing and typography
- responsive behavior on mobile and desktop
- usable interactions and accessible structure

## Design Thinking

Before coding:

1. Identify the screen purpose and the primary user task.
2. Decide what should draw attention first.
3. Choose an aesthetic direction that fits the product context.
4. Reuse existing patterns where they already work.
5. Introduce new visual treatment only where it improves clarity or impact.

Possible directions include:

- editorial
- operational
- premium
- brutalist
- minimal
- industrial
- soft and calm
- dense and tactical

Commit to one direction instead of mixing several weak ones.

## Visual Rules

- Avoid default-looking UI.
- Avoid generic purple gradients, safe template layouts, and overused default font stacks.
- Prefer expressive typography that still reads well in application UI.
- Use color deliberately:
  - establish a dominant surface/background logic
  - use accent colors for emphasis, status, and actions
  - keep contrast readable
- Create depth with spacing, layering, borders, shadows, textures, or controlled gradients when appropriate.
- Use asymmetry, scale changes, or strong grouping when it improves hierarchy.
- Keep card, panel, and toolbar treatments consistent across the same screen.

## Motion Rules

- Use motion only when it improves orientation, feedback, or polish.
- Prefer restrained, high-value animation over constant movement.
- Keep animations fast enough that the interface still feels responsive.
- Avoid decorative motion that delays interaction.
- When available and appropriate, use the existing motion library already in the project.

## Implementation Rules

- Preserve existing app behavior unless the request is explicitly behavioral.
- Keep page files thin by moving substantial UI into `features/` or `components/`.
- Prefer composition over duplication.
- Reuse existing primitives and nearby patterns before creating new ones.
- Add `"use client"` only when required.
- Do not introduce new dependencies for routine UI work.
- Prefer Tailwind utilities and existing CSS variables before editing global CSS.
- If global CSS must change, keep the scope tight and verify side effects.

## Responsive Rules

- Design for both desktop and mobile.
- Check narrow widths first when changing dense layouts.
- Prevent horizontal overflow.
- Keep key actions visible and reachable on touch devices.
- Let content wrap cleanly before shrinking it into unreadability.
- Preserve comfortable spacing without wasting vertical space on mobile.

## Accessibility Rules

- Use semantic HTML where possible.
- Keep visible focus states.
- Ensure interactive elements are identifiable and keyboard reachable.
- Keep labels, headings, and action text clear.
- Use appropriate alt handling for images.
- Do not rely on color alone for critical status communication.

## Repository-Specific Rules

- Preserve existing Spanish product copy unless the request is to rewrite it.
- Check `lib/navigation.ts` before changing navigation structure or labels.
- Check `lib/auth/` before changing login or protected-flow UI.
- If a screen uses mocks, update the corresponding file in `lib/mocks/` instead of hardcoding content into reusable components.
- Match local file naming patterns: kebab-case files, PascalCase component exports.

## Frontend Workflow

For a frontend request:

1. Inspect the target screen and nearby related components.
2. Decide whether the task is:
   - polish
   - partial redesign
   - new screen
   - reusable component work
3. Choose the smallest set of files that can deliver a coherent result.
4. Implement the visual direction consistently across the touched files.
5. Verify responsive behavior, states, and imports.
6. Run validation when possible.

## Validation

After frontend changes, verify:

1. layout remains coherent on mobile and desktop
2. there is no obvious horizontal overflow
3. primary actions remain visible
4. hover, focus, disabled, loading, and empty states still make sense if affected
5. imports and routes still resolve

Run when possible:

```bash
npm run lint
npm run build
```

## Output Expectation

When finishing frontend work, report:

1. what changed visually and structurally
2. which files were touched
3. what was validated
4. any remaining responsive or UX risk

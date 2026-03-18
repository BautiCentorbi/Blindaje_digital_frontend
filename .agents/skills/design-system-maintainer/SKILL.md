---
name: design-system-maintainer
description: Maintain and evolve the reusable UI system in this repository. Use this skill when the user asks to create, refine, consolidate, or standardize shared components, component APIs, variants, spacing patterns, visual consistency, or ownership boundaries across `shared/ui/`, `components/`, and feature-level UI.
---

# Design System Maintainer

Maintain the reusable UI layer of this repository with discipline.

Prefer consistency, reuse, and clear ownership over ad hoc component growth.

## Goal

Keep the component system coherent as the application grows.

Focus on:

- component ownership
- API clarity
- reusable patterns
- variant discipline
- visual consistency
- accessible defaults

## Ownership Rules

Use the existing repository boundaries:

- `shared/ui/` for generic reusable primitives
- `components/` for reusable app-specific composed components
- `features/` for feature-local UI that should not be shared by default

Do not move components into shared space without real reuse pressure.
Do not keep near-duplicates in different folders when one reusable abstraction is sufficient.

## What to Maintain

Use this skill for work such as:

1. creating a reusable primitive
2. consolidating duplicate components
3. refining component props or variant shape
4. standardizing spacing, surface, badge, modal, or toolbar patterns
5. improving accessibility defaults in reusable UI
6. clarifying whether a component belongs in `shared/ui/`, `components/`, or a feature folder

## Component Rules

- Prefer extending an existing component before creating a new one.
- Keep props explicit and behavior-oriented.
- Avoid broad configuration objects when a few clear props are enough.
- Keep variant names semantic and limited.
- Avoid one-off variants that exist for a single screen unless they truly belong there.
- Prefer composition over inheritance-like prop complexity.
- If a component becomes hard to scan, split it into focused subcomponents before broadening its API further.

## Visual System Rules

- Reuse spacing, border, shadow, and typography treatments consistently.
- Keep similar surfaces visually related.
- Avoid uncontrolled proliferation of sizes, radii, and visual styles.
- Use the existing Tailwind and CSS-variable approach before introducing new global tokens.
- Preserve the repository's frontend quality standards: responsive, accessible, and non-generic.

## Accessibility Rules

- Preserve visible focus states.
- Prefer semantic structure in reusable components.
- Build keyboard-friendly defaults into primitives and shared composed components.
- Do not rely on color alone for critical state meaning.
- Keep touch targets and interaction states usable by default.

## Workflow

1. Inspect the existing component and its nearest alternatives.
2. Decide whether the change belongs in `shared/ui/`, `components/`, or a feature folder.
3. Minimize duplication and keep the abstraction boundary honest.
4. Update consumers only as far as needed to keep the system coherent.
5. Verify interactive, responsive, and accessibility behavior.
6. Run validation when possible.

## Validation

After design-system work, verify:

1. component ownership still makes sense
2. variants remain limited and understandable
3. consumers still match the updated component API
4. mobile and focus behavior remain usable
5. the change reduced duplication or improved consistency instead of adding ambiguity

Run when possible:

```bash
npm run lint
npm run build
```

## Output Expectation

When finishing design-system work, report:

1. what reusable UI concept was added or changed
2. which ownership layer was affected
3. whether consumers were updated
4. what consistency or duplication issue was addressed
5. what was validated

---
name: code-review
description: Review code changes in this repository for bugs, regressions, integration risks, and missing validation. Use this skill when the user asks for a review, PR review, change audit, risk assessment, or a check of whether modifications to routes, features, auth, mocks, navigation, or UI are safe and coherent.
---

# Code Review

Review changes with a defect-finding mindset.

Prioritize bugs, regressions, broken assumptions, and missing coverage over style commentary.

## Review Goal

Find the issues most likely to break behavior, routing, UX, data coherence, or maintainability in this repository.

Prefer concrete findings over broad opinions.

## Repository Focus Areas

Pay special attention to:

- App Router route behavior in `app/`
- feature composition in `features/`
- reusable UI behavior in `components/` and `shared/`
- auth-sensitive logic in `lib/auth/`
- navigation changes in `lib/navigation.ts`
- mock-data coherence in `lib/mocks/`
- entity shape consistency across feature consumers
- responsive and accessibility regressions in frontend work

## What to Check

For each reviewed change, inspect for:

1. broken imports or invalid paths
2. route regressions or wrong route-group placement
3. missing `"use client"` or unnecessary client components
4. page files doing too much instead of delegating to feature modules
5. mock-data shape mismatches across consuming components
6. auth, role, or protected-route regressions
7. navigation labels, hrefs, or active-state mismatches
8. UI states that were forgotten: loading, empty, error, disabled, focus, hover
9. responsive overflow or broken mobile layout
10. inaccessible interactions or missing semantic structure
11. silent type weakening, especially `any` or unsafe casts
12. dead code, partial wiring, or placeholder logic left behind

## Review Workflow

1. Identify the files changed and the feature or route area affected.
2. Read the surrounding files needed to understand the change in context.
3. Trace the impact on imports, routes, data shape, and user flows.
4. Look for the highest-severity issues first.
5. Check whether validation appears sufficient for the scope of the change.
6. Report findings in severity order.

## Reporting Rules

Lead with findings, not summary.

For each finding:

1. state the risk clearly
2. point to the relevant file and line when possible
3. explain why it is a problem
4. describe the user-visible or system-visible impact

If no findings are discovered, say so explicitly and note any residual risk or testing gap.

Keep summaries brief and secondary.

## Review Standards for This Repository

- Treat route and auth regressions as high severity.
- Treat broken data coherence between `lib/mocks/` and UI consumers as high severity when it can break rendering or flow logic.
- Treat missing mobile or accessibility states as meaningful product defects, not cosmetic trivia.
- Treat unused abstractions or mild stylistic inconsistency as low priority unless they create maintenance risk.
- Do not recommend broad refactors unless they are necessary to address a concrete defect.

## Validation Expectations

When available, check whether the change should have been validated with:

```bash
npm run lint
npm run build
```

Flag missing validation when the change affects routes, types, integration boundaries, or significant UI behavior.

## Output Expectation

When reviewing, report:

1. findings first, ordered by severity
2. file references for each finding
3. open questions or assumptions
4. a short change summary only after the findings

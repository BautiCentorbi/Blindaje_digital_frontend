---
name: change-delivery-standard
description: Standardize branch names, commit subjects, PR titles, and PR descriptions for this repository. Use when preparing upcoming changes, naming a branch, writing commits, or drafting a pull request that should follow the local BLINDAJE DIGITAL convention.
---

# Change Delivery Standard

Use this skill to keep branch, commit, and PR metadata consistent across future changes.

## Purpose

Match the local convention established by the latest repository change set:

- branch name example: `bd-20260317-visit-ops-and-skills`
- commit subject example: `feat(BD-20260317): improve visit operations and local agent skills`

Keep the same uppercase ticket/date token across commit and PR metadata, and the lowercase slug form in the branch name.

## Naming Convention

Derive one shared token per change set:

- uppercase token: `BD-YYYYMMDD`
- lowercase slug token: `bd-YYYYMMDD`

If the user does not provide a ticket identifier, use the current work date in `YYYYMMDD` format with the `BD-` prefix.

Write names with these formats:

- branch name: `bd-YYYYMMDD-short-scope`
- commit subject: `<type>(BD-YYYYMMDD): imperative summary`
- PR title: `<type>(BD-YYYYMMDD): imperative summary`

## Commit Rules

Use a conventional commit type that matches the real change:

- `feat`
- `fix`
- `refactor`
- `docs`
- `chore`
- `test`

Write the summary in imperative mood, lowercase unless a proper noun requires otherwise, and keep it concise.

Prefer one commit subject format for all upcoming work:

```text
feat(BD-20260317): improve visit operations and local agent skills
```

Do not add trailing periods.
Do not use vague summaries such as `update stuff` or `changes`.

## PR Rules

Use the same subject line as the final commit unless the user requests a different PR title strategy.

Keep the branch slug short and scannable:

- include the main feature or fix area
- join words with hyphens
- avoid filler terms like `update`, `work`, or `misc` unless they clarify scope

## PR Description Template

Write PR descriptions in concise sections:

```md
## Summary
- <high-level outcome>
- <second high-level outcome>

## Changes
- <main implementation area>
- <secondary implementation area>
- <supporting repo or tooling change>

## Validation
- `npm run lint`
- `npm run build`

## Notes
- <risk, assumption, or follow-up>
```

Rules:

- Keep bullets concrete and outcome-focused.
- Mention validation commands only if they were run.
- If validation was not run, state that explicitly under `Validation` or `Notes`.
- Keep the description aligned with the actual diff; do not include planned but unfinished work.

## Workflow

1. Inspect the current branch, latest commit style, and the scope of the requested change.
2. Choose one `BD-YYYYMMDD` token for the whole change set.
3. Build the branch slug from the main scope of work.
4. Use the same `<type>(BD-YYYYMMDD): ...` line for the final commit and PR title unless the user asks otherwise.
5. Draft the PR description with `Summary`, `Changes`, `Validation`, and `Notes`.
6. Before finishing, confirm the branch name, commit subject, PR title, and PR description all describe the same scope.

## Constraints

- Keep branch names lowercase.
- Keep the `BD-YYYYMMDD` token uppercase in commit and PR titles.
- Do not mix multiple unrelated scopes into one summary line.
- Do not invent ticket IDs outside the `BD-YYYYMMDD` convention unless the user provides one.
- Prefer consistency over novelty; upcoming changes should read like part of the same delivery system.

## Validation

Before using this skill in a real change:

1. confirm the branch name follows `bd-YYYYMMDD-short-scope`
2. confirm the commit subject follows `<type>(BD-YYYYMMDD): summary`
3. confirm the PR title matches the commit subject unless instructed otherwise
4. confirm the PR description uses the four required sections

---
name: skill-index
description: Create or update a concise index of repository-local skills stored under `.agents/skills/`. Use this skill when the user asks to list available skills, summarize what each skill does, maintain a local skill catalog, or add a discoverable overview so future petitions can trigger the right skill.
---

# Skill Index

Create and maintain a compact catalog of the skills available in this repository.

Treat the source of truth as:

```text
.agents/skills/<skill-name>/SKILL.md
```

Publish or update the root catalog in:

```text
SKILLS.md
```

## Purpose

Help Codex and the user discover which local skills exist, what each one does, and when each one should be used.

Prefer a short, scannable index over long documentation.

## What to Index

For each local skill, capture:

1. skill name
2. file path
3. short purpose
4. trigger conditions or typical request types

Base the summary on the `name` and `description` in each skill's frontmatter, then refine only if the body adds essential clarification.

## Output Shape

When creating or updating `SKILLS.md`, or answering a listing request, keep entries consistent.
Use a simple structure such as:

- `skill-name`: short purpose. Use when ...

If a dedicated file is requested, keep it compact and easy to update.

## Workflow

1. Inspect `.agents/skills/` for skill folders.
2. Read each `SKILL.md` frontmatter first.
3. Use the body only to clarify ambiguous purpose or overlap.
4. Summarize each skill in one tight entry.
5. Order skills predictably, preferably alphabetically unless another grouping is clearly better.
6. Update `SKILLS.md` in the repository root.
7. Note missing or malformed skills instead of guessing.

## Rules

- Do not invent skills that do not exist on disk unless the user explicitly asks to plan them.
- Do not duplicate the full body of each skill inside the index.
- Prefer concise trigger language over broad generic labels.
- Preserve the exact skill name from frontmatter.
- If two skills overlap, call out the distinction briefly.
- If a skill folder lacks `SKILL.md`, mark it as incomplete.

## Repository Convention

Assume skills live only under `.agents/skills/`.
Assume each skill has its own folder and a single `SKILL.md`.
Assume `SKILLS.md` in the repository root is the canonical catalog unless the repository explicitly changes that rule.
Update the existing catalog instead of creating competing index files.

## Validation

Before finishing:

1. confirm each indexed skill exists on disk
2. confirm each listed name matches the skill frontmatter
3. confirm each summary is short and specific
4. confirm the index does not duplicate large sections from the source skills
5. confirm `SKILLS.md` reflects the current set of local skills

## Output Expectation

When using this skill, report:

1. which skills were indexed
2. where the index was created or updated, if applicable
3. any malformed or missing skill files

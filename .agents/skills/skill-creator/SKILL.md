---
name: skill-creator
description: Create or update repository-local Codex skills stored under `.agents/skills/<skill-name>/SKILL.md`. Use this skill when the user asks to define a new skill, improve an existing skill, standardize SKILL.md format, write skill metadata, or build reusable instructions for future petitions.
---

# Skill Creator

Create skills for this repository using the local convention:

```text
.agents/
  skills/
    <skill-name>/
      SKILL.md
```

Write every skill for another Codex instance to use repeatedly. Keep it concise, explicit, and reusable.

## Core Principles

- Keep the skill lean. Only add information Codex would not reliably infer on its own.
- Write for repeated use, not for one specific request.
- Match the level of specificity to the task:
  - high freedom for broad, judgment-heavy tasks
  - tighter procedural guidance for fragile or error-prone tasks
- Prefer progressive disclosure. Keep the main `SKILL.md` concise and add extra files only when they genuinely improve reuse.

## Naming Rules

- Use lowercase letters, digits, and hyphens only.
- Keep the folder name and frontmatter `name` identical.
- Prefer short names that describe the action or specialization clearly.
- Avoid vague names like `helper`, `general`, or `misc`.

## Required Format

Every skill must contain exactly:

1. YAML frontmatter
2. Markdown instructions

Use this frontmatter shape:

```yaml
---
name: skill-name
description: Explain what the skill does and when it should be used.
---
```

Do not add extra frontmatter fields unless the repository later defines them as required.

## Skill Anatomy

A local skill may contain:

```text
.agents/skills/<skill-name>/
  SKILL.md
  scripts/
  references/
  assets/
```

- `SKILL.md` is required.
- `scripts/` are useful when a task would otherwise require rewriting the same code repeatedly.
- `references/` are useful for domain rules, schemas, or detailed documentation that should be loaded only when needed.
- `assets/` are useful for templates, icons, or boilerplate that the skill should reuse without embedding into the main instructions.

Do not create extra documentation files unless they materially help the skill perform better.

## Description Rules

Write the `description` as the trigger text for Codex.
Include:

- what the skill does
- the kinds of requests that should trigger it
- concrete contexts or examples when useful

The description must be specific enough that Codex can choose the skill correctly before reading the body.

## Body Rules

Write the body in imperative form.
Focus on procedural guidance that another agent can apply directly.
Prefer this structure when it fits:

1. Purpose
2. Folder or file conventions
3. Workflow
4. Rules and constraints
5. Validation

Avoid filler, philosophy, or duplicate explanations that Codex already knows.

If the skill supports multiple variants, frameworks, or subdomains:

- keep selection guidance in `SKILL.md`
- move detailed variant-specific material into `references/`
- avoid deeply nested reference chains

## Skill Creation Workflow

When asked to create a new skill:

1. Infer the narrowest useful skill scope from the request.
2. Identify concrete request patterns the skill should handle.
3. Choose a precise hyphen-case name.
4. Decide whether the skill needs only `SKILL.md` or also `scripts/`, `references/`, or `assets/`.
5. Create the folder under `.agents/skills/<skill-name>/`.
6. Create `SKILL.md` with valid frontmatter and concise operating instructions.
7. Add optional bundled resources only when they provide real reuse or reliability.
8. Update `SKILLS.md` in the repository root so the new skill is indexed.
9. Update `AGENTS.md` in the repository root if the new skill changes standing workflow, maintenance rules, or repository expectations.
10. Verify the final file path, name, frontmatter, and root index entry match.

## Authoring Rules

- Keep the skill practical and reusable across similar future petitions.
- Prefer repository-specific conventions over generic advice when known.
- Reference exact paths when the skill must operate in a specific location.
- Keep SKILL.md lean; do not create extra documentation files unless the skill genuinely needs them.
- Do not create placeholder sections such as `TBD`, `TODO`, or empty headings.
- Do not include user-facing marketing language.
- Use imperative wording.
- When a script is added, it should exist because it improves repeatability or reliability, not just because scripting is possible.
- When a reference file is added, mention in `SKILL.md` when to read it.
- When an asset is added, make sure the skill explains how it should be used.

## Validation

Before finishing:

1. confirm the folder name matches the frontmatter `name`
2. confirm the file path is `.agents/skills/<skill-name>/SKILL.md`
3. confirm the description states both what the skill does and when to use it
4. confirm the body provides actionable instructions instead of generic commentary
5. confirm `SKILLS.md` includes the skill with a concise summary
6. confirm `AGENTS.md` was updated if the skill introduced a standing repository rule
7. confirm optional `scripts/`, `references/`, or `assets/` exist only when justified
8. confirm the skill stays concise and does not duplicate large reference content

## Output Expectation

When creating or updating a skill, report:

1. the skill name
2. the created or updated path
3. the purpose of the skill
4. any assumptions that should shape future skills

# SKILLS.md

Repository-local skills live under `.agents/skills/`.
This file is the root index of the available local skills and should be updated whenever a skill is created, renamed, removed, or materially changed.

## Current Skills

- `change-delivery-standard`: Standardize branch names, commit subjects, PR titles, and PR descriptions. Use when upcoming work should follow the repository's `bd-YYYYMMDD...` branch slug and `<type>(BD-YYYYMMDD): ...` delivery format.
- `code-review`: Review repository changes for bugs, regressions, integration risks, and missing validation. Use when the request is for a review, risk check, PR audit, or verification of route, feature, auth, mock, navigation, or UI safety.
- `design-system-maintainer`: Maintain and evolve the reusable UI system in this repository. Use when the request involves shared components, component APIs, variants, visual consistency, ownership boundaries, or consolidation across `shared/ui/`, `components/`, and feature UI.
- `frontend-design`: Create distinctive, production-grade frontend interfaces for this Next.js repository. Use when the request involves pages, components, layouts, dashboards, styling, responsive behavior, interaction quality, or stronger visual direction.
- `nextjs-feature-builder`: Build or extend Next.js App Router features in this repository. Use when the request involves routes, pages, layouts, feature views, dashboard sections, entity screens, modals, toolbars, or feature flows that must fit the existing project structure.
- `skill-creator`: Create or update repository-local skills under `.agents/skills/<skill-name>/SKILL.md`. Use when a request asks to define a new skill, improve an existing skill, or standardize the local SKILL.md format.
- `skill-index`: Create or update the local skill catalog. Use when the request asks to list available skills, summarize what each skill does, or maintain the root skill index.

## Maintenance Rule

When a skill is created or updated:

1. update the target `.agents/skills/<skill-name>/SKILL.md`
2. update this `SKILLS.md` file
3. update `AGENTS.md` if the change introduces a standing repository workflow or rule

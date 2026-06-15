# Agent Instructions

## Design Context

This repository is Karan Chaudhary's personal portfolio and marketing website. Treat the default design register as `brand`, not `product`.

Read `PRODUCT.md` before strategic design work and `docs/design-system.md` before UI implementation. The brand direction is premium, technical, and creative. Dark theme is the default visual direction, but all UI must support both dark and light themes.

Use shared CSS variables from `src/styles/globals.css` for colors, typography, borders, glows, and surfaces. Do not introduce random hardcoded colors in components unless they are first promoted to design tokens. Keep navigation keyboard accessible, respect `prefers-reduced-motion`, use semantic HTML, and maintain WCAG AA contrast.

Future About, Work, Services, Contact, and Case Study pages should follow the same design system consistently.

## Context7

Use the `ctx7` CLI to fetch current documentation whenever asked about a library, framework, SDK, API, CLI tool, or cloud service. Resolve the library first with `npx ctx7@latest library <name> "<question>"`, then fetch docs with `npx ctx7@latest docs <libraryId> "<question>"`.

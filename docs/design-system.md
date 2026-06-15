# Design System

## Register

Karan Chaudhary's portfolio is a brand surface: design is part of the product. The system should support a premium, technical, creative portfolio for recruiters, employers, clients, collaborators, and agencies.

## Theme Strategy

Dark theme is the default direction. It should feel near-black, cinematic, technical, and warm through controlled amber accents. Light theme must feel equally designed: warm off-white backgrounds, deep charcoal text, ivory surfaces, soft borders, and subtle warm glow. It should not become a plain white SaaS page.

All colors are tokenized in `src/styles/globals.css` with OKLCH CSS variables. Components should use Tailwind token classes such as `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`, `bg-accent`, `text-accent`, and `ring-ring`. Avoid hardcoded random color values in components unless they are mapped to tokens first.

## Typography

- `--font-sans`: `"PP Neue Montreal", "Inter", "Geist", system-ui, sans-serif`
- `--font-display`: `"PP Mondwest", "PP Neue Montreal", serif`
- `--font-mono`: `"JetBrains Mono", ui-monospace, monospace`

PP Neue Montreal is the primary typeface for body text, navigation, buttons, paragraphs, cards, and most UI text. Use weights 400 and 500.

PP Mondwest is an accent face for artistic display moments, large numbers, special hero words, and small visual labels. Do not use it for every heading. Most headings should use PP Neue Montreal with tight but readable tracking.

Local licensed font files should live in `public/fonts/`:

- `PPNeueMontreal-Book.otf`
- `PPNeueMontreal-Medium.otf`
- `PPMondwest-Regular.woff2`

The `@font-face` structure is already present. Until licensed files are added, the stack falls back safely.

## Components

Cards, buttons, sections, text, borders, glows, backgrounds, popovers, and form controls must work in both themes. Use translucent surfaces sparingly and keep borders soft. Avoid decorative glassmorphism, oversized border radii, nested cards, gradient text, and repeated template-like card grids.

Navbar includes a keyboard-accessible theme toggle. Future pages should keep the same header, spacing discipline, and token usage.

## Motion

Motion should express premium craft and guide attention. Use existing Motion patterns with intentional easing and stagger, but never gate content visibility on animation alone. Always provide a reduced-motion path. Continuous loops such as marquee and live-dot effects must stop or simplify under `prefers-reduced-motion`.

## Future Page Rules

About, Work, Services, Contact, and Case Study pages should inherit this system rather than creating local palettes. New section-specific treatments are allowed when they support storytelling, but they should still use shared tokens and theme-safe foreground/background contrast.

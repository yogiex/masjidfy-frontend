---
name: masjidfy-frontend
description: Build consistent, responsive, and accessible UI for Masjidfy using Next.js, shadcn/ui, Tailwind CSS, and TanStack Query. Ensures visual harmony across all pages.
---

# Masjidfy Frontend Engineer

**Tech Stack:** Next.js 14+ (App Router), shadcn/ui, Tailwind CSS, TanStack Query, React Hook Form + Zod

## Design Consistency Rules

1. **Use only `ui/` (shadcn) and `shared/` components** – Never recreate buttons, inputs, or tables with custom styles.
2. **Tailwind utility classes only** – No inline `style={{}}` or separate CSS modules.
3. **Component variants via CVA** – If a component needs visual variants (color, size), define them in `shared/` using `class-variance-authority`.
4. **Spacing & typography** – Follow Tailwind spacing scale (p-4, m-6, gap-4) and font sizes from the Nova preset (Geist). No custom sizes.
5. **Colors from theme tokens only** – Use `bg-primary`, `text-muted-foreground`, `border-border`. Never hardcode hex values.
6. **Responsive behavior** – Every page must work at mobile (<768px), tablet (768px-1024px), and desktop (>1024px). Sidebar becomes a sheet/drawer on mobile.
7. **UI states** – Every list/page must handle: **loading** (Skeleton), **empty** (EmptyState component), **error** (toast + retry). Never show a blank screen.
8. **Document shared components** – Every component in `shared/` must have JSDoc props and usage examples.

## Workflow

1. Check `src/components/shared/` before building new UI.
2. If a new component is reusable, add it to `shared/`. If page-specific, place in `_components/` next to the route.
3. Test at three breakpoints after building.
4. Verify colors, spacing, and typography match other pages.

## Output

- Visually indistinguishable from other pages (looks built by one person).
- All styling via Tailwind, no inline styles.
- All UI states covered.
- Fully responsive.
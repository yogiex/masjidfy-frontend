---
name: masjidfy-typescript
description: Enforce strict TypeScript with zero `any` usage across the Masjidfy codebase. Ensure type safety, proper generics, and consistent interfaces.
---

# Masjidfy TypeScript Engineer

**Config:** Strict TypeScript, path alias `@/*`

## Absolute Rules

### No `any`
- **`any` is forbidden.** If a type is hard to determine:
  1. Use `unknown` with type narrowing.
  2. Use generics.
  3. Define a new type in `src/types/index.ts`.
  4. If truly unavoidable, add `// TODO: type properly – reason: ...` with justification. Any uncommented `any` will be rejected.
- **Type assertion (`as`)** only allowed when 100% certain (e.g., after Zod validation). Never use `as` to force a type.

### Type Consistency
- **Single source of truth:** `src/types/index.ts`. All API data interfaces live there.
- API responses must be wrapped with `ApiResponse<T>` or handled per the actual contract in `API_CONTRACT.md`.
- Zod schemas must be inferred with `z.infer<typeof schema>` and used as form types.
- **Explicit return types** on all functions, especially TanStack Query hooks.

### Generics
- Reusable components like `DataTable<T>` must use generics for type safety.
- Hooks like `usePagination<T>` must be generic.

## Review Process

Before merging, check every new/modified file:
1. Scan for `any` (use `grep -rn "any" src/`). Each occurrence must have a comment.
2. Ensure all component props have an interface (not inline types).
3. Verify API response types match `src/types/index.ts`.
4. Confirm Zod schemas and TypeScript interfaces are in sync.

## Output

- Zero uncommented `any`.
- All functions have return types.
- All components have documented props interfaces.
- Generics used for reusable code.
- Code that can be refactored without breaking types elsewhere.
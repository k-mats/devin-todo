# Agent Notes

This file captures project conventions and commands for anyone (or any agent) working in this repo.

## Commands

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Type check
npm run type-check

# Run tests
npm test
```

## Conventions

- Use TypeScript with strict mode.
- Use Next.js App Router (`app/` directory).
- Keep components small and single-purpose.
- Prefer explicit types over `any`.
- Store client state in `hooks/useTodos.ts`.
- Use `lib/storage.ts` for all `localStorage` access.
- Add tests for new components and state logic.

## Before completing a task

1. Run lint.
2. Run tests.
3. Run the production build.
4. For UI changes, verify the behavior in a browser.

## Useful Context

- `docs/product.md` defines the v1 feature set.
- `docs/architecture.md` describes the project structure and data flow.
- `REVIEW.md` lists the review checklist before finishing work.

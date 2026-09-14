# Review Checklist

Use this list before considering a change complete.

## Functionality

- [ ] Todos can be created.
- [ ] Todos can be marked completed and uncompleted.
- [ ] Todos can be edited inline via an Edit button.
- [ ] Todos can be deleted.
- [ ] Filter buttons show All, Active, and Completed correctly.
- [ ] Todos persist across page reloads.

## Code Quality

- [ ] TypeScript compiles without errors (`npm run type-check`).
- [ ] Tests pass (`npm test`).
- [ ] Components are simple and focused.
- [ ] No `any` types without justification.
- [ ] `localStorage` access is isolated in `lib/storage.ts`.

## UX

- [ ] Empty inputs are handled gracefully.
- [ ] Editing an empty todo deletes it.
- [ ] The UI is usable and reasonably styled with Tailwind.

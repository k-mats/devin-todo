# Architecture

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **Persistence:** `localStorage` (client-side only)

## Directory Structure

```
devin-todo/
├── app/
│   ├── page.tsx          # Main page composing the app
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Tailwind directives + base styles
├── components/
│   ├── TodoForm.tsx      # Input + add button
│   ├── TodoItem.tsx      # Single todo row with edit/delete
│   ├── TodoList.tsx      # Filtered list of todos
│   └── TodoFilter.tsx    # All / Active / Completed filter buttons
├── hooks/
│   └── useTodos.ts       # useState + useEffect state & localStorage
├── types/
│   └── todo.ts           # Todo type definitions
├── lib/
│   └── storage.ts        # localStorage read/write helpers
├── tests/
│   └── ...               # Component and hook tests
└── docs/
    ├── product.md
    └── architecture.md
```

## Data Flow

1. `page.tsx` renders `TodoForm`, `TodoFilter`, and `TodoList`.
2. `useTodos` manages the todo array and persists it to `localStorage`.
3. `TodoForm` calls `addTodo`.
4. `TodoItem` calls `toggleTodo`, `updateTodo`, and `deleteTodo`.
5. `TodoFilter` sets the active filter; `TodoList` derives the visible subset.

## State Shape

```ts
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
```

## localStorage Contract

- Key: `devin-todo:todos`
- Value: JSON-encoded array of `Todo` objects
- Reads happen once on mount; writes happen on every state update.

"use client";

import { TodoItem } from "@/components/TodoItem";
import type { Filter, Todo } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

function matches(todo: Todo, filter: Filter): boolean {
  if (filter === "active") return !todo.completed;
  if (filter === "completed") return todo.completed;
  return true;
}

export function TodoList({ todos, filter, onToggle, onUpdate, onDelete }: TodoListProps) {
  const visible = todos.filter((todo) => matches(todo, filter));

  if (visible.length === 0) {
    return <p className="py-4 text-sm text-gray-500">No todos to show.</p>;
  }

  return (
    <ul>
      {visible.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

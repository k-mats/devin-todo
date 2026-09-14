"use client";

import { useState } from "react";
import { TodoFilter } from "@/components/TodoFilter";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";
import type { Filter } from "@/types/todo";

export default function Home() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold">Devin Todo</h1>
      <TodoForm onAdd={addTodo} />
      <TodoFilter filter={filter} onChange={setFilter} />
      <TodoList
        todos={todos}
        filter={filter}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </main>
  );
}

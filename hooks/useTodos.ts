"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadTodos, saveTodos } from "@/lib/storage";
import type { Todo } from "@/types/todo";

function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export interface UseTodos {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  deleteTodo: (id: string) => void;
}

export function useTodos(): UseTodos {
  const [todos, setTodos] = useState<Todo[]>([]);
  const loaded = useRef(false);

  useEffect(() => {
    setTodos(loadTodos());
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((current) => [
      { id: createId(), text: trimmed, completed: false, createdAt: Date.now() },
      ...current,
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: string, text: string) => {
    const trimmed = text.trim();
    setTodos((current) =>
      trimmed
        ? current.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
        : current.filter((todo) => todo.id !== id),
    );
  }, []);

  return { todos, addTodo, toggleTodo, updateTodo, deleteTodo };
}

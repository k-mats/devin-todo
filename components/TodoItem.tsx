"use client";

import { useState } from "react";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function startEditing() {
    setDraft(todo.text);
    setIsEditing(true);
  }

  function save() {
    onUpdate(todo.id, draft);
    setIsEditing(false);
  }

  function cancel() {
    setDraft(todo.text);
    setIsEditing(false);
  }

  return (
    <li className="flex items-center gap-3 border-b border-gray-200 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Toggle ${todo.text}`}
        className="h-4 w-4"
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label={`Edit ${todo.text}`}
            className="flex-1 rounded border border-gray-300 px-2 py-1 outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={save}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={cancel}
            className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            className={`flex-1 ${todo.completed ? "text-gray-400 line-through" : "text-gray-900"}`}
          >
            {todo.text}
          </span>
          <button
            type="button"
            onClick={startEditing}
            className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

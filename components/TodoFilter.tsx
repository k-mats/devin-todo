"use client";

import type { Filter } from "@/types/todo";

interface TodoFilterProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function TodoFilter({ filter, onChange }: TodoFilterProps) {
  return (
    <div className="flex gap-2">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          aria-pressed={filter === value}
          className={`rounded border px-3 py-1 text-sm ${
            filter === value
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

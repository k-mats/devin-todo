import { beforeEach, describe, expect, test } from "vitest";
import { STORAGE_KEY, loadTodos, saveTodos } from "@/lib/storage";
import type { Todo } from "@/types/todo";

const todo: Todo = { id: "1", text: "Write tests", completed: false, createdAt: 1 };

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("returns an empty array when nothing is stored", () => {
    expect(loadTodos()).toEqual([]);
  });

  test("round-trips todos", () => {
    saveTodos([todo]);
    expect(loadTodos()).toEqual([todo]);
  });

  test("ignores malformed data", () => {
    window.localStorage.setItem(STORAGE_KEY, "not json");
    expect(loadTodos()).toEqual([]);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([todo, { id: 2 }]));
    expect(loadTodos()).toEqual([todo]);
  });
});

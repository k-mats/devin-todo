import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useTodos } from "@/hooks/useTodos";
import { STORAGE_KEY } from "@/lib/storage";

describe("useTodos", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("loads todos from localStorage on mount", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: "1", text: "Stored", completed: false, createdAt: 1 }]),
    );

    const { result } = renderHook(() => useTodos());

    expect(result.current.todos.map((todo) => todo.text)).toEqual(["Stored"]);
  });

  test("never overwrites stored todos with an empty list while hydrating", () => {
    const stored = [{ id: "1", text: "Stored", completed: false, createdAt: 1 }];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    const setItem = vi.spyOn(Storage.prototype, "setItem");

    for (let mount = 0; mount < 3; mount += 1) {
      const { result, unmount } = renderHook(() => useTodos());

      expect(result.current.todos.map((todo) => todo.text)).toEqual(["Stored"]);
      expect(setItem.mock.calls.map((call) => call[1])).not.toContain("[]");
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(stored));

      unmount();
    }

    setItem.mockRestore();
  });

  test("adds new todos at the top and ignores empty input", () => {
    const { result } = renderHook(() => useTodos());

    act(() => result.current.addTodo("first"));
    act(() => result.current.addTodo("second"));
    act(() => result.current.addTodo("   "));

    expect(result.current.todos.map((todo) => todo.text)).toEqual(["second", "first"]);
  });

  test("toggles, updates and deletes todos", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("task"));
    const id = result.current.todos[0].id;

    act(() => result.current.toggleTodo(id));
    expect(result.current.todos[0].completed).toBe(true);

    act(() => result.current.updateTodo(id, " renamed "));
    expect(result.current.todos[0].text).toBe("renamed");

    act(() => result.current.deleteTodo(id));
    expect(result.current.todos).toEqual([]);
  });

  test("updating with an empty value deletes the todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("task"));
    const id = result.current.todos[0].id;

    act(() => result.current.updateTodo(id, "  "));

    expect(result.current.todos).toEqual([]);
  });

  test("persists changes to localStorage", () => {
    const { result } = renderHook(() => useTodos());

    act(() => result.current.addTodo("persisted"));

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].text).toBe("persisted");
  });
});

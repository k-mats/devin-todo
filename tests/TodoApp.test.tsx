import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import Home from "@/app/page";

function addTodo(text: string) {
  fireEvent.change(screen.getByLabelText("New todo"), { target: { value: text } });
  fireEvent.click(screen.getByRole("button", { name: "Add" }));
}

function editTodo(currentText: string, nextText: string, action: "Save" | "Cancel") {
  fireEvent.click(screen.getByRole("button", { name: "Edit" }));
  fireEvent.change(screen.getByLabelText(`Edit ${currentText}`), {
    target: { value: nextText },
  });
  fireEvent.click(screen.getByRole("button", { name: action }));
}

describe("Todo app", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("creates todos at the top and ignores empty submissions", () => {
    render(<Home />);

    addTodo("first");
    addTodo("second");
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("second");
  });

  test("toggles completion", () => {
    render(<Home />);
    addTodo("task");

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("edits a todo inline and can cancel", () => {
    render(<Home />);
    addTodo("task");

    editTodo("task", "changed", "Cancel");
    expect(screen.getByText("task")).toBeInTheDocument();

    editTodo("task", "changed", "Save");
    expect(screen.getByText("changed")).toBeInTheDocument();
  });

  test("saving an empty edit deletes the todo", () => {
    render(<Home />);
    addTodo("task");

    editTodo("task", "  ", "Save");

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("deletes a todo", () => {
    render(<Home />);
    addTodo("task");

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("filters todos", () => {
    render(<Home />);
    addTodo("active task");
    addTodo("done task");

    fireEvent.click(screen.getByLabelText("Toggle done task"));

    fireEvent.click(screen.getByRole("button", { name: "Active" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("active task")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("done task")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("persists todos across remounts", () => {
    const first = render(<Home />);
    addTodo("persisted");
    first.unmount();

    render(<Home />);
    expect(screen.getByText("persisted")).toBeInTheDocument();
  });
});

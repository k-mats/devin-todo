# Product Requirements

## Goal

Build the smallest useful Todo app that lets a user manage a short list of tasks in the browser.

## User Features (v1)

1. **Create a todo**
   - A single text input and an Add button.
   - Empty submissions are ignored.
   - New todos appear at the top of the list.

2. **Mark completed**
   - Each todo has a checkbox.
   - Checking toggles the completed state.

3. **Edit a todo**
   - Each todo has an Edit button.
   - Clicking Edit replaces the text with an input and shows Save/Cancel controls.
   - Saving an empty value deletes the todo.

4. **Delete a todo**
   - Each todo has a Delete button.
   - Deleting removes it immediately without confirmation.

5. **Filter todos**
   - Buttons for All, Active, and Completed.
   - Only matching todos are shown.

6. **Persistence**
   - Todos are saved to `localStorage` on every change.
   - Todos are loaded from `localStorage` on initial render.

## Out of Scope (v1)

- Drag-and-drop reordering
- Due dates, categories, or priorities
- Dark mode / theming
- Backend or authentication
- End-to-end tests

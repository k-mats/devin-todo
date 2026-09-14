---
name: testing-todo-browser-persistence
description: Verify todo editing and localStorage hydration in the Devin Todo browser UI, including transient writes that final-state checks miss.
---

# Browser persistence testing

## Setup
- Run `npm install` if dependencies are missing, then `npm run dev` from the repository.
- Open `http://localhost:3000` in Chrome. The app is client-only and needs no backend or authentication.
- Use a dedicated browser profile/origin or preserve existing data before destructive tests.
- Maximize the browser before recording.

## Devin Secrets Needed
None.

## Primary flow
Create three todos using New todo and Add. Complete one using its checkbox,
edit another using Edit then Save, and delete the third using its row's Delete.
Capture the two-row state, then reload repeatedly and verify text, order,
completion, and the entire serialized `devin-todo:todos` value.
Regression-check Active, Completed, and All without changing stored data.

## Observe transient hydration writes
Do not rely only on the final DOM or final localStorage value: a mount-time
empty write can be overwritten by correct data before inspection.
Attach Chrome DevTools Protocol diagnostics before testing. Discover Chrome's
actual remote-debugging port from its process arguments rather than assuming
9222. Register `Page.addScriptToEvaluateOnNewDocument` to wrap
`Storage.prototype.setItem`, preserve native behavior, and record writes to
`devin-todo:todos` when `this === localStorage`. Keep an initial-storage snapshot.
Retain diagnostics outside the page across reloads.

For each reload with saved todos, require at least one captured write, no `[]`
write, and every captured value plus final storage equal the original baseline
(ids, timestamps, order, text, and completion). Mutate todos through the UI,
not instrumentation. Display diagnostic values in DevTools for visual evidence.
Record Runtime exceptions, console errors, and Log errors separately; distinguish
application failures from unrelated asset/network errors and report exclusions.

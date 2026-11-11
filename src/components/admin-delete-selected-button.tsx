"use client";

import { Trash2 } from "lucide-react";

/** Toggles every row checkbox in the same <form> on/off together. */
export function AdminSelectAllCheckbox() {
  return (
    <input
      type="checkbox"
      aria-label="Select all rows"
      onChange={(event) => {
        const form = event.currentTarget.form;
        const boxes = form?.querySelectorAll<HTMLInputElement>('input[name="id"]');
        boxes?.forEach((box) => {
          box.checked = event.currentTarget.checked;
        });
      }}
    />
  );
}

/**
 * Counts the checked "id" checkboxes in its own <form> at click time and
 * asks for a native confirm() before letting the submit go through — the
 * delete is otherwise a plain POST with no other safety net.
 */
export function AdminDeleteSelectedButton() {
  return (
    <button
      type="submit"
      className="admin-delete-button"
      onClick={(event) => {
        const form = event.currentTarget.form;
        const checked = form?.querySelectorAll<HTMLInputElement>('input[name="id"]:checked');
        const count = checked?.length ?? 0;

        if (count === 0) {
          event.preventDefault();
          window.alert("Select at least one row to delete.");
          return;
        }

        const confirmed = window.confirm(
          `Permanently delete ${count} lead${count === 1 ? "" : "s"}? This cannot be undone.`,
        );
        if (!confirmed) event.preventDefault();
      }}
    >
      <Trash2 size={14} aria-hidden="true" />
      Delete selected
    </button>
  );
}

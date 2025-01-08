import { useState } from "react";
import { Issue } from "../types/types";

interface EditModalProps {
  issue: Issue;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

export default function EditModal({ issue, onClose, onSave }: EditModalProps) {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(title.trim(), description.trim());
  }

  return (
    <>
      <div className="fixed w-5/6 max-w-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 border dark:border-none shadow-md dark:bg-slate-800 px-6 py-8 rounded flex flex-col gap-y-4">
        <h2 className="text-xl font-bold mb-4">Edit Issue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-title"
              className="block text-sm font-medium mb-1"
            >
              Title
            </label>

            <input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-700"
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>

            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-700"
              rows={3}
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

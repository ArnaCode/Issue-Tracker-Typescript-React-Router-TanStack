export function createModal(): HTMLDivElement {
  const modalEl = document.createElement("div");
  modalEl.className =
    "fixed w-5/6 max-w-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 border dark:border-none shadow-md dark:bg-slate-800 px-6 py-8 rounded flex flex-col gap-y-4";
  modalEl.innerHTML = `
      <h2 class="text-xl font-bold mb-4">Edit Issue</h2>
      <form class="space-y-4" id="edit-issue-form">
        <div>
          <label for="edit-title" class="block text-sm font-medium mb-1">Title</label>
          <input type="text" id="edit-title" name="edit-title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-700" required />
        </div>
        <div>
          <label for="edit-description" class="block text-sm font-medium mb-1">Description</label>
          <textarea id="edit-description" name="edit-description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-700" rows="3" required></textarea>
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" id="cancel-edit" class="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </form>

  `;
  return modalEl;
}

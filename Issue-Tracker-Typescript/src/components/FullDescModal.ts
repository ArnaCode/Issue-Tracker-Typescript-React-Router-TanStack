let viewModal: HTMLElement;

function createViewModal() {
  viewModal = document.createElement("section");
  viewModal.className =
    "fixed w-5/6 max-w-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 border dark:border-none shadow-md dark:bg-slate-800 px-6 py-8 rounded flex flex-col gap-y-4";

  viewModal.innerHTML = `
      <h2 id="view-modal-title" class="text-xl font-bold"></h2>
      <p id="view-modal-content" class="text-gray-800 dark:text-gray-200" ></p>
      <button id="view-close-btn" class="border px-4 py-2 rounded self-start">
        Close
      </button>
    `;

  document.body.appendChild(viewModal);

  const closeButton =
    viewModal.querySelector<HTMLButtonElement>("#view-close-btn")!;

  closeButton.addEventListener("click", () => {
    viewModal.classList.add("hidden");
  });
}

export function showFullDescription(title: string, description: string) {
  if (!viewModal) createViewModal();

  const titleElement =
    document.querySelector<HTMLHeadingElement>("#view-modal-title")!;
  const contentElement = document.querySelector<HTMLParagraphElement>(
    "#view-modal-content"
  )!;

  titleElement.textContent = title;
  contentElement.textContent = description;

  viewModal.classList.remove("hidden");
}

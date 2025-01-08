import { Issue } from "./types/types";
import { saveIssues, loadIssues } from "./utils/localStorage";
import { setupDarkModeToggle, allThemePreference } from "./components/DarkMode";
import { createModal } from "./components/CreateModal";

let issuesList = document.querySelector<HTMLElement>("#issues-list")!;

let modal: HTMLDivElement;
let editIssueId: string | null = null;

let issues: Issue[] = [];

function renderIssues(issuesList: HTMLElement): void {
  issues = loadIssues();

  let filteredIssues = issues.filter((issue) => issue.status === "open");

  filteredIssues.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  issuesList.innerHTML = "";

  for (const issue of filteredIssues) {
    const issueDiv = document.createElement("div");
    issueDiv.className =
      "grid 2xl:grid-rows-subgrid 2xl:row-span-5 gap-4 items-start p-4 border border-gray-300 dark:border-gray-700 rounded";

    const titleEl = document.createElement("h2");
    titleEl.textContent = issue.title;
    titleEl.className = "font-bold text-lg";

    const descEl = document.createElement("p");
    descEl.textContent = issue.description;

    const dateEl = document.createElement("p");
    dateEl.className = "text-sm text-gray-500 dark:text-gray-400";
    const createdDate = new Date(issue.createdAt);
    dateEl.textContent = `Created ${createdDate.toLocaleString()}`;

    const lastEditedContainer = document.createElement("div");
    lastEditedContainer.className = "flex justify-between";

    if (issue.wasEditedInOpenPage) {
      const updatedDate = new Date(issue.updatedAt);
      const lastEditedEl = document.createElement("p");
      lastEditedEl.className =
        "text-sm text-blue-500 dark:text-blue-400 col-span-3";
      lastEditedEl.textContent = `Last Edited ${updatedDate.toLocaleString()}`;
      lastEditedContainer.appendChild(lastEditedEl);
    }

    const actionsContainer = document.createElement("div");
    actionsContainer.className = "flex gap-2";

    const markClosedButton = document.createElement("button");
    markClosedButton.textContent = "Close Issue";
    markClosedButton.className =
      "px-3 py-1 bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 rounded";
    markClosedButton.addEventListener("click", () =>
      updateIssueStatus(issue.id, "closed", issuesList)
    );

    const deleteButton = document.createElement("button");
    deleteButton.className =
      "px-3 py-1 bg-purple-500 text-white rounded transition hover:bg-purple-700 transition-colors";

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteIssue(issue.id, issuesList);
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className =
      "px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700";

    editButton.addEventListener("click", () => showModal(issue, issuesList));

    actionsContainer.appendChild(markClosedButton);
    actionsContainer.appendChild(deleteButton);
    actionsContainer.appendChild(editButton);

    issueDiv.appendChild(lastEditedContainer);
    issueDiv.appendChild(titleEl);
    issueDiv.appendChild(descEl);
    issueDiv.appendChild(dateEl);
    issueDiv.appendChild(actionsContainer);

    issuesList.appendChild(issueDiv);
  }
}

function showModal(issue: Issue, issuesList: HTMLElement) {
  if (!modal) {
    modal = createModal();
    document.body.appendChild(modal);

    const cancelBtn = modal.querySelector<HTMLButtonElement>("#cancel-edit")!;
    const form = modal.querySelector<HTMLFormElement>("#edit-issue-form")!;

    if (cancelBtn && form) {
      cancelBtn.addEventListener("click", () => {
        closeModal();
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = form.querySelector<HTMLInputElement>("#edit-title")!;
        const descInput =
          form.querySelector<HTMLTextAreaElement>("#edit-description")!;

        const title = titleInput.value.trim();
        const description = descInput.value.trim();

        if (title && description) {
          editIssue(editIssueId!, title, description, issuesList);
          closeModal();
        }
      });
    }
  }

  const titleInput = modal.querySelector<HTMLInputElement>("#edit-title");
  const descInput =
    modal.querySelector<HTMLTextAreaElement>("#edit-description");

  if (titleInput && descInput) {
    titleInput.value = issue.title;
    descInput.value = issue.description;
  }

  editIssueId = issue.id;
  modal.classList.remove("hidden");
}

function closeModal() {
  if (modal) {
    modal.classList.add("hidden");
    editIssueId = null;
  }
}

function editIssue(
  id: string,
  newTitle: string,
  newDescription: string,
  issuesList: HTMLElement
): void {
  const now = new Date().toISOString();
  issues = issues.map((issue) => {
    if (issue.id === id) {
      return {
        ...issue,
        title: newTitle,
        description: newDescription,
        updatedAt: now,
        wasEditedInOpenPage: true,
      };
    }
    return issue;
  });
  saveIssues(issues);
  renderIssues(issuesList);
}

function updateIssueStatus(
  id: string,
  newStatus: "open" | "closed",
  issuesList: HTMLElement
): void {
  const now = new Date().toISOString();
  issues = issues.map((issue) =>
    issue.id === id ? { ...issue, status: newStatus, updatedAt: now } : issue
  );
  saveIssues(issues);
  renderIssues(issuesList);
}

function deleteIssue(id: string, issuesList: HTMLElement): void {
  issues = issues.filter((issue) => issue.id !== id);
  saveIssues(issues);
  renderIssues(issuesList);
}

allThemePreference();
setupDarkModeToggle();
renderIssues(issuesList);

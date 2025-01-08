import { Issue } from "./types/types";
import { saveIssues, loadIssues } from "./utils/localStorage";
import { setupDarkModeToggle, allThemePreference } from "./components/DarkMode";
import { showFullDescription } from "./components/FullDescModal";

let addIssueForm = document.querySelector<HTMLFormElement>("#add-issue-form")!;
let titleInput = document.querySelector<HTMLInputElement>("#title")!;
let descInput = document.querySelector<HTMLTextAreaElement>("#description")!;
let issuesList = document.querySelector<HTMLElement>("#issues-list")!;

addIssueForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  if (title && description) {
    addIssue(title, description);
    titleInput.value = "";
    descInput.value = "";
  }
});

let issues: Issue[] = [];

function addIssue(title: string, description: string): void {
  const now = new Date().toISOString();
  const newIssue: Issue = {
    id: crypto.randomUUID(),
    title,
    description,
    status: "open",
    createdAt: now,
    updatedAt: now,
  };
  issues.push(newIssue);
  saveIssues(issues);
  renderIssues();
}

function renderIssues(): void {
  if (!issuesList) return;

  issues = loadIssues();
  issues.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  issuesList.innerHTML = "";

  for (const issue of issues) {
    const issueDiv = document.createElement("div");
    issueDiv.className =
      "grid 2xl:grid-rows-subgrid 2xl:row-span-5 gap-4 items-start p-4 border border-gray-300 dark:border-gray-700 rounded";

    const titleEl = document.createElement("h2");
    titleEl.textContent = issue.title;
    titleEl.className = "font-bold text-lg";

    const dateEl = document.createElement("p");
    dateEl.className = "text-sm text-gray-500 dark:text-gray-400";
    const createdDate = new Date(issue.createdAt);
    dateEl.textContent = `Created ${createdDate.toLocaleString()}`;

    const statusAndEditedContainer = document.createElement("div");
    statusAndEditedContainer.className = "w-full grid grid-cols-4 items-center";

    if (issue.wasEditedInOpenPage) {
      const updatedDate = new Date(issue.updatedAt);
      const lastEditedEl = document.createElement("p");
      lastEditedEl.className =
        "text-sm text-blue-500 dark:text-blue-400 col-span-3";
      lastEditedEl.textContent = `Last Edited ${updatedDate.toLocaleString()}`;
      statusAndEditedContainer.append(lastEditedEl);
    }

    const statusBadge = document.createElement("p");
    statusBadge.className =
      "p-2 text-sm rounded text-center justify-self-end col-start-4" +
      " " +
      (issue.status === "open"
        ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
        : "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 ");

    statusBadge.textContent = issue.status === "open" ? "OPEN" : "CLOSED";
    statusAndEditedContainer.appendChild(statusBadge);

    let truncatedDesc = issue.description;
    const maxLen = 50;
    let needsViewButton = false;
    if (truncatedDesc.length > maxLen) {
      truncatedDesc = truncatedDesc.slice(0, maxLen) + "...";
      needsViewButton = true;
    }

    const descEl = document.createElement("p");
    descEl.textContent = truncatedDesc;

    const actionsContainer = document.createElement("div");
    actionsContainer.className = "flex gap-2";

    const deleteButton = document.createElement("button");
    deleteButton.className =
      "px-3 py-1 bg-purple-500 text-white rounded transition hover:bg-purple-700 transition-colors";

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteIssue(issue.id);
    });

    issueDiv.appendChild(statusAndEditedContainer);
    issueDiv.appendChild(titleEl);
    issueDiv.appendChild(descEl);
    issueDiv.appendChild(dateEl);
    issueDiv.appendChild(actionsContainer);
    actionsContainer.appendChild(deleteButton);

    if (needsViewButton) {
      const viewButton = document.createElement("button");
      viewButton.textContent = "View";
      viewButton.className =
        "px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700";
      viewButton.addEventListener("click", () =>
        showFullDescription(issue.title, issue.description)
      );
      actionsContainer.appendChild(viewButton);
    }

    issuesList.appendChild(issueDiv);
  }
}

function deleteIssue(id: string): void {
  issues = issues.filter((issue) => issue.id !== id);
  saveIssues(issues);
  renderIssues();
}

allThemePreference();
setupDarkModeToggle();
renderIssues();

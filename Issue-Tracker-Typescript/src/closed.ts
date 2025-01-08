import { Issue } from "./types/types";
import { saveIssues, loadIssues } from "./utils/localStorage";

import { setupDarkModeToggle, allThemePreference } from "./components/DarkMode";

let issuesList = document.querySelector<HTMLElement>("#issues-list")!;

let issues: Issue[] = [];

function renderIssues(issuesList: HTMLElement): void {
  issues = loadIssues();

  let filteredIssues = issues.filter((issue) => issue.status === "closed");

  issues.sort(
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

    const markOpenButton = document.createElement("button");
    markOpenButton.textContent = "Open Issue";
    markOpenButton.className =
      "px-3 py-1 bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200 rounded";
    markOpenButton.addEventListener("click", () =>
      updateIssueStatus(issue.id, "open", issuesList)
    );

    const deleteButton = document.createElement("button");
    deleteButton.className =
      "px-3 py-1 bg-purple-500 text-white rounded transition hover:bg-purple-700 transition-colors";

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteIssue(issue.id, issuesList);
    });

    actionsContainer.appendChild(markOpenButton);
    actionsContainer.appendChild(deleteButton);

    issueDiv.appendChild(lastEditedContainer);
    issueDiv.appendChild(titleEl);
    issueDiv.appendChild(descEl);
    issueDiv.appendChild(dateEl);
    issueDiv.appendChild(actionsContainer);

    issuesList.appendChild(issueDiv);
  }
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

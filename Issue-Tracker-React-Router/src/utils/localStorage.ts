import { Issue } from "../types/types";

function loadIssues(): Issue[] {
  const data = localStorage.getItem("issues");
  return data ? JSON.parse(data) : [];
}

function saveIssues(issues: Issue[]): void {
  localStorage.setItem("issues", JSON.stringify(issues));
}

export { loadIssues, saveIssues };

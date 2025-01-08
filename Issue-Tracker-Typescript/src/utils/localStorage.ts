import { Issue } from "../types/types";

function saveIssues(issues: Issue[]): void {
  localStorage.setItem("issues", JSON.stringify(issues));
}

function loadIssues(): Issue[] {
  const data = localStorage.getItem("issues");
  return data ? JSON.parse(data) : [];
}

export { saveIssues, loadIssues };

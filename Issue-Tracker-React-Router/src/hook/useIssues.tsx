import { useEffect, useState } from "react";
import { Issue } from "../types/types";
import { loadIssues, saveIssues } from "../utils/localStorage";

const sortedByUpdatedAt = (issues: Issue[]) =>
  issues.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

export default function useIssues(status?: "open" | "closed") {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const loadedIssues = loadIssues();
    setIssues(sortedByUpdatedAt(loadedIssues));
  }, []);

  const filteredIssues = status
    ? issues.filter((issue) => issue.status === status)
    : issues;

  function addIssue(title: string, description: string) {
    const now = new Date().toISOString();
    const newIssue: Issue = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "open",
      createdAt: now,
      updatedAt: now,
    };

    setIssues((prev) => {
      const updatedIssues = sortedByUpdatedAt([...prev, newIssue]);
      saveIssues(updatedIssues);
      return updatedIssues;
    });
  }

  function deleteIssue(id: string) {
    setIssues((prev) => {
      const updatedIssues = prev.filter((issue) => issue.id !== id);
      saveIssues(updatedIssues);
      return updatedIssues;
    });
  }

  function updateIssueStatus(id: string, newStatus: "open" | "closed") {
    const now = new Date().toISOString();

    setIssues((prev) => {
      const updatedIssues = prev.map((issue) =>
        issue.id === id
          ? { ...issue, status: newStatus, updatedAt: now }
          : issue
      );
      saveIssues(updatedIssues);
      return updatedIssues;
    });
  }

  function editIssue(
    id: string,
    newTitle: string,
    newDescription: string
  ): void {
    const now = new Date().toISOString();

    setIssues((prev) => {
      const updatedIssues = prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              title: newTitle,
              description: newDescription,
              wasEditedInOpenPage: true,
              updatedAt: now,
            }
          : issue
      );
      saveIssues(sortedByUpdatedAt(updatedIssues));
      return updatedIssues;
    });
  }

  return {
    issues: filteredIssues,
    addIssue,
    deleteIssue,
    updateIssueStatus,
    editIssue,
  };
}

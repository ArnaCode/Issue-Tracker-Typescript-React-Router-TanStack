import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import { Issue } from "../types/types";

interface IssueCardProps {
  issue: Issue;
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, status: "open" | "closed") => void;
  onEdit?: (id: string, title: string, description: string) => void;
}

export default function IssueCard({
  issue,
  onDelete,
  onStatusChange,
  onEdit,
}: IssueCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const router = useRouter();
  const isAllIssuesPage = router.state.location.pathname === "/";

  const truncatedDescription = (description: string, maxLength = 50) => {
    if (description.length <= maxLength) return description;

    return description.slice(0, maxLength) + "...";
  };

  return (
    <>
      <div className="grid 2xl:grid-rows-subgrid 2xl:row-span-5 gap-4 items-start p-4 border border-gray-300 dark:border-gray-700 rounded">
        <div className="grid grid-cols-4 items-center">
          {issue.wasEditedInOpenPage && (
            <p className="text-sm text-blue-500 dark:text-blue-400 col-span-3">
              Last Edited: {new Date(issue.updatedAt).toLocaleString()}
            </p>
          )}

          {isAllIssuesPage && (
            <p
              className={`p-2 text-sm rounded text-center justify-self-end col-start-4 ${
                issue.status === "open"
                  ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                  : "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
              }`}
            >
              {issue.status === "open" ? "OPEN" : "CLOSED"}
            </p>
          )}
        </div>

        <h2 className="font-bold text-lg">{issue.title}</h2>

        <p>
          {isAllIssuesPage
            ? truncatedDescription(issue.description)
            : issue.description}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created: {new Date(issue.createdAt).toLocaleString()}
        </p>

        <div className="flex gap-2 flex-wrap">
          {onStatusChange && (
            <button
              onClick={() =>
                onStatusChange(
                  issue.id,
                  issue.status === "open" ? "closed" : "open"
                )
              }
              className={`px-3 py-1 rounded ${
                issue.status === "open"
                  ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              {issue.status === "open" ? "Close Issue" : "Open Issue"}
            </button>
          )}

          <button
            onClick={() => onDelete(issue.id)}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Delete
          </button>

          {onEdit && (
            <button
              onClick={() => setShowEditModal(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}

          {isAllIssuesPage && issue.description.length > 50 && (
            <button
              onClick={() => setShowViewModal(true)}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              View
            </button>
          )}
        </div>
      </div>

      {showEditModal && onEdit && (
        <EditModal
          issue={issue}
          onClose={() => setShowEditModal(false)}
          onSave={(title, description) => {
            onEdit(issue.id, title, description);
            setShowEditModal(false);
          }}
        />
      )}

      {showViewModal && (
        <ViewModal
          title={issue.title}
          description={issue.description}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </>
  );
}

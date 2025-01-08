import { useState } from "react";
import IssueCard from "../components/IssueCard";
import useIssues from "../hook/useIssues";

export default function AllIssues() {
  const { issues, addIssue, deleteIssue } = useIssues();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function createIssue(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      addIssue(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Create a New Issue</h1>
      <form onSubmit={createIssue} className="space-y-4 mb-4 lg:max-w-xl">
        <div className="space-y-2">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-400 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-400 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
            rows={3}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Issue
        </button>
      </form>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onDelete={deleteIssue} />
        ))}
      </section>
    </>
  );
}

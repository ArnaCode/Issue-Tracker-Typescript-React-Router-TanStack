import IssueCard from "../components/IssueCard";
import useIssues from "../hook/useIssues";

export default function OpenIssues() {
  const { issues, updateIssueStatus, deleteIssue } = useIssues("closed");

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Closed Issues</h1>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onDelete={deleteIssue}
            onStatusChange={updateIssueStatus}
          />
        ))}
      </section>
    </>
  );
}

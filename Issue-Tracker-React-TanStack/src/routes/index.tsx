import { createFileRoute } from "@tanstack/react-router";
import AllIssues from "../pages/AllIssues";

export const Route = createFileRoute("/")({
  component: AllIssues,
  context: () => ({
    title: "All Issues - React TanStack Router",
  }),
});

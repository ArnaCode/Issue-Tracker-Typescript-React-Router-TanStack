import { createFileRoute } from "@tanstack/react-router";
import OpenIssues from "../pages/OpenIssues";

export const Route = createFileRoute("/open")({
  component: OpenIssues,
  context: () => ({
    title: "Open Issues - React TanStack Router",
  }),
});

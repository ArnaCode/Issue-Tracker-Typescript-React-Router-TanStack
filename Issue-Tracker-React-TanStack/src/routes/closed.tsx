import { createFileRoute } from "@tanstack/react-router";
import ClosedIssues from "../pages/ClosedIssues";

export const Route = createFileRoute("/closed")({
  component: ClosedIssues,
  context: () => ({
    title: "Closed Issues - React TanStack Router",
  }),
});

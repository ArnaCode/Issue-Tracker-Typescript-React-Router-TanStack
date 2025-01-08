import { useEffect } from "react";
import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { ThemeProvider } from "../context/ThemeContext";
import Navigation from "../components/Navigation";

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const { matches } = useRouterState();
  const activeMatch = matches[matches.length - 1];
  const { title = "React TanStack Router" } = activeMatch.context;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <ThemeProvider>
      <Navigation />
      <main className="flex flex-col gap-4 p-8 sm:p-12">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import Navigation from "../components/Navigation";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "All Issues - wReact Router",
      "/open": "Open Issues - wReact Router",
      "/closed": "Closed Issues - wReact Router",
    };

    document.title = titles[location.pathname] || "React Router";
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <Navigation />

      <main className="flex flex-col gap-4 p-8 sm:p-12">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

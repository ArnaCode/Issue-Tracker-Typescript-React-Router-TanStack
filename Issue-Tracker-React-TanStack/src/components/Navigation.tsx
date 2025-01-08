import { Link } from "@tanstack/react-router";
import { useTheme } from "../context/ThemeContext";

export default function Navigation() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="p-6 sm:p-10 border-b border-gray-300 dark:border-gray-700">
      <nav className="flex justify-between items-center">
        <ul className="flex flex-col sm:items-center gap-6 sm:flex-row">
          <li>
            <Link
              to="/"
              activeProps={() => ({
                className:
                  "text-blue-600 dark:text-blue-400 font-bold text-xl px-4 py-2 rounded dark:bg-slate-800 bg-slate-300",
              })}
              inactiveProps={() => ({
                className:
                  "text-gray-600 dark:text-gray-300 px-4 py-2 border border-slate-400 rounded",
              })}
            >
              All Issues
            </Link>
          </li>

          <li>
            <Link
              to="/open"
              activeProps={() => ({
                className:
                  "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200 font-bold text-xl px-4 py-2 rounded",
              })}
              inactiveProps={() => ({
                className:
                  "text-gray-600 dark:text-gray-300 px-4 py-2 border border-slate-400 rounded",
              })}
            >
              Open Issues
            </Link>
          </li>

          <li>
            <Link
              to="/closed"
              activeProps={() => ({
                className:
                  "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 font-bold text-xl px-4 py-2 rounded",
              })}
              inactiveProps={() => ({
                className:
                  "text-gray-600 dark:text-gray-300 px-4 py-2 border border-slate-400 rounded",
              })}
            >
              Closed Issues
            </Link>
          </li>
        </ul>

        <div onClick={toggleTheme} className="cursor-pointer">
          {isDark ? (
            <i className="fa-solid fa-sun text-2xl text-orange-300"></i>
          ) : (
            <i className="fa-solid fa-moon text-2xl text-gray-500"></i>
          )}
        </div>
      </nav>
    </header>
  );
}

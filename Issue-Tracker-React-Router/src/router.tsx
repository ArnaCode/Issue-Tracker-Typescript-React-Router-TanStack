import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AllIssues from "./pages/AllIssues";
import OpenIssues from "./pages/OpenIssues";
import ClosedIssues from "./pages/ClosedIssues";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <AllIssues /> },
      { path: "open", element: <OpenIssues /> },
      { path: "closed", element: <ClosedIssues /> },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import Header from "@/components/Header";
import Variables from "@/pages/Variables";
import VariableId from "@/pages/VariableId";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Header,
    ErrorBoundary,
    children: [
      {
        path: "/",
        Component: Home,
        ErrorBoundary,
      },
      {
        path: "/variables",
        Component: Variables,
        ErrorBoundary,
      },
      {
        path: "/variables/:variableID",
        Component: VariableId,
        ErrorBoundary,
      },
    ],
  },
]);

export default Router;

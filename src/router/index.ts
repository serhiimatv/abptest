import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import Variables from "../pages/Variables";
import DefiniteVariable from "../pages/DefiniteVariable";
import ErrorBoundary from "../components/ErrorBoundary";
import VinDecoder from "../pages/VinDecoder";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Header,
    children: [
      {
        path: "/",
        Component: VinDecoder,
      },
      {
        path: "/variables",
        Component: Variables,
        ErrorBoundary,
      },
      {
        path: "/variables/:variableID",
        Component: DefiniteVariable,
        ErrorBoundary,
      },
    ],
  },
]);

export default Router;

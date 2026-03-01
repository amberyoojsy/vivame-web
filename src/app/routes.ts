import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { ApplicationPage } from "./pages/application-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/apply",
    Component: ApplicationPage,
  },
]);

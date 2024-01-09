import { IRoute } from "@routes/route.interface";
import { lazy } from "react";
import RedirectShortLink from "../pages/redirect";
// import AnalysisShortLink from "../pages/analysis";
// import CreateShortLink from "../pages/create";

// const GroupQuestion = lazy(() => import("../pages/group-question"));
const ShortenHomePage = lazy(() => import("../pages"));
const CreateShortLink = lazy(() => import("../pages/create"));
const AnalysisShortLink = lazy(() => import("../pages/analysis"));
const shortenRoutes: IRoute[] = [
  {
    component: CreateShortLink,
    isPrivate: false,
    path:"/"
  },
  {
    component: RedirectShortLink,
    isPrivate: false,
    path:"/r/:code"
  },
  {
    component: AnalysisShortLink,
    isPrivate: false,
    path:"/analysis/:code"
  },
];
export default shortenRoutes;

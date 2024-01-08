import { IRoute } from "@routes/route.interface";
import { lazy } from "react";
import RedirectShortLink from "../pages/redirect";
// import CreateShortLink from "../pages/create";

// const GroupQuestion = lazy(() => import("../pages/group-question"));
const ShortenHomePage = lazy(() => import("../pages"));
const CreateShortLink = lazy(() => import("../pages/create"));

const shortenRoutes: IRoute[] = [
  {
    component: CreateShortLink,
    isPrivate: true,
    path:"/"
  },
  {
    component: RedirectShortLink,
    isPrivate: true,
    path:"/r/:code"
  },
];
export default shortenRoutes;

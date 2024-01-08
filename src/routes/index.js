import authRoute from "@modules/auth/routes";
import projectsRoutes from "@modules/projects/routes";
import shortensRoutes from "@modules/shortens/routes";
const routes = [
  ///////////////////////////////for cli insert
  ...authRoute,
  ...projectsRoutes,
  ...shortensRoutes,
];
export default routes;

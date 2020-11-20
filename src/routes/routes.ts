import { lazy } from "react";

const Login = lazy(() =>
  import("../components/Login").then(({ Login }) => ({ default: Login }))
);
const Home = lazy(() =>
  import("../components/Home").then(({ Home }) => ({ default: Home }))
);
const NotFound = lazy(
  () => import("../sharedComponents/ErrorComponents/NotFound")
);

const routes = [
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
    requestedRole: [""],
  },
  {
    path: ["/", "/home"],
    exact: true,
    name: "Home",
    component: Home,
    requestedRole: ["user", "admin"],
  },
  {
    path: "*",
    exact: false,
    name: "Not Found",
    component: NotFound,
    requestedRole: [""],
  },
];

export default routes;

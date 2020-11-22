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
const Dashboard = lazy(() =>
  import("../components/Dashboard").then(({ Dashboard }) => ({
    default: Dashboard,
  }))
);

const ItemForm = lazy(() =>
  import("../components/Dashboard/components/Item.form").then(
    ({ ItemForm }) => ({
      default: ItemForm,
    })
  )
);

const routes = [
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
    requestedRole: [],
  },
  {
    path: ["/", "/home"],
    exact: true,
    name: "Home",
    component: Home,
    requestedRole: ["user"],
  },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
    requestedRole: ["admin"],
  },
  {
    path: ["/dashboard/create", "/dashboard/:id/edit"],
    exact: true,
    name: "ItemForm",
    component: ItemForm,
    requestedRole: ["admin"],
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

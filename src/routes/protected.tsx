import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "../components";
import { Unauthorized } from "../sharedComponents/ErrorComponents";
import { Spinner } from "../sharedComponents/LoadingIndicator";

const MainLayout = React.lazy(() => import("../layout/MainLayout"));

type Props = {
  component: React.LazyExoticComponent<() => JSX.Element> | any;
  path: string | string[];
  exact: boolean;
  requestedRole: Array<string | null | undefined>;
  name: string;
};

const Protected = ({
  component: Component,
  path,
  exact,
  requestedRole,
  ...rest
}: Props) => {
  const isAuthed = !!localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toString();
  const convertRoles = role === "0" ? "admin" : "user";
  const authorized = requestedRole.includes(convertRoles) ? true : false;
  const AuthenticatedAndAuthorized = (props: any) => {
    return (
      <Suspense fallback={<Spinner />}>
        <MainLayout>
          <Component {...rest} {...props} />
        </MainLayout>
      </Suspense>
    );
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthed && authorized) {
          return <AuthenticatedAndAuthorized props={props} />;
        } else if (!isAuthed) {
          return (
            <>
              <Redirect to="/login" />;
              <Login />
            </>
          );
        } else if (!authorized) {
          return <Unauthorized />;
        }
      }}
    />
  );
};
export default Protected;

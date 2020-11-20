import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { Unauthorized } from "../sharedComponents/ErrorComponents";
import { Spinner } from "../sharedComponents/LoadingIndicator";

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
  const role = localStorage.getItem("role");
  const authorized = requestedRole.includes(role) ? true : false;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthed && authorized) {
          return (
            <Suspense fallback={<Spinner />}>
              <Component {...rest} {...props} />
            </Suspense>
          );
        } else if (!isAuthed) {
          return <Redirect to="/login" />;
        } else if (!authorized) {
          return <Unauthorized />;
        }
      }}
    />
  );
};
export default Protected;

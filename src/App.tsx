import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import { Protected, routes } from "./routes";
import ErrorBoundary from "./sharedComponents/ErrorBoundary";

const mainRoutes = routes.map((route, index) => {
  return (
    <Protected
      key={index}
      name={route.name}
      exact={route.exact}
      path={route.path}
      component={route.component}
      requestedRole={route.requestedRole}
    />
  );
});

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <ErrorBoundary>
            <Switch>{mainRoutes}</Switch>
          </ErrorBoundary>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;

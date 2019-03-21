import React from "react";
import { Router } from "@reach/router";

import Route from "../../utils/Route";
import Home from "./Home";
import SignIn from "./SignIn";
import Account from "./Account";
import PageNotFound from "./PageNotFound";

function Pages() {
  return (
    <Router>
      <Home path={new Route().build()} />
      <SignIn path={new Route().path(Route.SIGN_IN).build()} />
      <Account path={new Route().path(Route.ACCOUNT).build()} />
      <PageNotFound default />
    </Router>
  );
}

export default Pages;

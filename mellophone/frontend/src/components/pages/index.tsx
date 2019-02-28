import React from "react";
import { Router } from "@reach/router";

import Route from "../../utils/Route";
import PageWrapper from "../containers/PageWrapper";
import Home from "./Home";
import SignIn from "./SignIn";

class Pages extends React.Component {
  render() {
    return (
      <PageWrapper>
        <Router>
          <Home path={new Route().build()} />
          <SignIn path={new Route().path(Route.SIGN_IN).build()} />
        </Router>
      </PageWrapper>
    );
  }
}

export default Pages;

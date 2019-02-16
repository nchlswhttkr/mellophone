import React from "react";
import { Router } from "@reach/router";

import PageWrapper from "../containers/PageWrapper";
import Home from "./Home";

class Pages extends React.Component {
  render() {
    return (
      <PageWrapper>
        <Router>
          <Home path="/" />
        </Router>
      </PageWrapper>
    );
  }
}

export default Pages;

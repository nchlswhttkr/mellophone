import React from "react";
import { RouteComponentProps, Link } from "@reach/router";

import Route from "../../utils/Route";
import Main from "../sections/Main";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { sessionStore } from "../../stores";

function PageNotFound(_: RouteComponentProps) {
  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <h1>Page Not Found</h1>
        <p>
          You can return <Link to={new Route().build()}>to the home page</Link>{" "}
          if you've entered the wrong route, or consider{" "}
          <a
            href="https://github.com/nchlswhttkr/mellophone/issues/new"
            target="_blank">
            opening an issue
          </a>{" "}
          if you think a page should exist here.
        </p>
      </Main>
      <Footer />
    </>
  );
}

export default PageNotFound;

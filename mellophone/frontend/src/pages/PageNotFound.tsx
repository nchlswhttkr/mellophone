import React from "react";
import { RouteComponentProps, Link } from "@reach/router";

import Route from "../utils/Route";
import Main from "../elements/Main";

function PageNotFound(_: RouteComponentProps) {
  return (
    <Main>
      <h1>Page Not Found</h1>
      <p>
        You can return <Link to={new Route().build()}>to the home page</Link> if
        you've entered the wrong route, or consider{" "}
        <a
          href="https://github.com/nchlswhttkr/mellophone/issues/new"
          target="_blank"
          rel="noopener noreferrer">
          opening an issue
        </a>{" "}
        if you think a page should exist here.
      </p>
    </Main>
  );
}

export default PageNotFound;

import React from "react";
import { RouteComponentProps, Link } from "@reach/router";

import Route from "../utils/Route";
import Main from "../elements/Main";
import { StoresContext } from "../stores";

function PageNotFound(_: RouteComponentProps) {
  const { sessionStore } = React.useContext(StoresContext);
  if (!sessionStore) return null;

  return (
    <Main>
      <h1>Page Not Found</h1>
      <p>
        You can return <Link to={new Route().build()}>to the home page</Link> if
        you've entered the wrong route, or consider{" "}
        <a
          href="https://github.com/nchlswhttkr/mellophone/issues/new"
          target="_blank">
          opening an issue
        </a>{" "}
        if you think a page should exist here.
      </p>
    </Main>
  );
}

export default PageNotFound;

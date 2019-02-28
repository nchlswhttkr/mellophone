import React from "react";

import { Link } from "@reach/router";

import classes from "./Header.module.css";
import Route from "../../utils/Route";

interface Props {
  isAuthenticated: React.ReactNode;
}

function Header(props: Props) {
  return (
    <header className={classes.header}>
      <nav>
        <Link to={new Route().build()} className={classes.title}>
          <h2>Mellophone</h2>
        </Link>
        <strong>
          {props.isAuthenticated ? (
            <Link to={new Route().path(Route.ACCOUNT).build()}>Account</Link>
          ) : (
            <Link to={new Route().path(Route.SIGN_IN).build()}>Sign In</Link>
          )}
        </strong>
      </nav>
    </header>
  );
}

export default Header;

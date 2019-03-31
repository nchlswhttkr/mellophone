import React from "react";
import { observer } from "mobx-react";
import { Link } from "@reach/router";

import { ISessionStore } from "../../types";
import classes from "./Header.module.css";
import Route from "../../utils/Route";

interface Props {
  sessionStore: ISessionStore;
}

const Header = observer((props: Props) => {
  const { user } = props.sessionStore;
  return (
    <header className={classes.header}>
      <nav>
        <Link to={new Route().build()} className={classes.title}>
          <h2>Mellophone</h2>
        </Link>
        {user ? (
          <Link to={new Route().path(Route.ACCOUNT).build()}>
            <strong>Account</strong>
          </Link>
        ) : (
          <Link to={new Route().path(Route.SIGN_IN).build()}>
            <strong>Sign in</strong>
          </Link>
        )}
      </nav>
    </header>
  );
});

export default Header;

import React from "react";
import { Link } from "@reach/router";
import { observer } from "mobx-react-lite";

import classes from "./Header.module.css";
import Route from "../utils/Route";
import { ISessionStore } from "../stores/SessionStore";

interface Props {
  sessionStore: ISessionStore;
}

const Header = (props: Props) => (
  <header className={classes.header}>
    <nav>
      <Link to={new Route().build()} className={classes.title}>
        <h2>Mellophone</h2>
      </Link>
      {props.sessionStore.user ? (
        <Link
          to={new Route(Route.ACCOUNT).build()}
          aria-label="View my account">
          <strong>Account</strong>
        </Link>
      ) : (
        <Link
          to={new Route(Route.SIGN_IN).build()}
          aria-label="Sign in to Mellophone">
          <strong>Sign in</strong>
        </Link>
      )}
    </nav>
  </header>
);

export default observer(Header);

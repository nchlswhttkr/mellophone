import React from "react";
import { observer } from "mobx-react";
import { Link } from "@reach/router";

import classes from "./Header.module.css";
import Route from "../../utils/Route";
import IdentityStore from "../../stores/IdentityStore";

interface Props {
  identityStore: IdentityStore;
}

function Header(props: Props) {
  return (
    <header className={classes.header}>
      <nav>
        <Link to={new Route().build()} className={classes.title}>
          <h2>Mellophone</h2>
        </Link>
        <strong>
          {props.identityStore.user ? (
            <Link to={new Route().path(Route.ACCOUNT).build()}>Account</Link>
          ) : (
            <Link to={new Route().path(Route.SIGN_IN).build()}>Sign In</Link>
          )}
        </strong>
      </nav>
    </header>
  );
}

export default observer(Header);

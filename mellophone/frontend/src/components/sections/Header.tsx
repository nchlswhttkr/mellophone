import React from "react";
import { observer } from "mobx-react";
import { Link } from "@reach/router";

import classes from "./Header.module.css";
import Route from "../../utils/Route";
import { IIdentityStore } from "../../types";

interface Props {
  identityStore: IIdentityStore;
}

const Header = observer((props: Props) => {
  const { user } = props.identityStore;
  return (
    <header className={classes.header}>
      <nav>
        <Link to={new Route().build()} className={classes.title}>
          <h2>Mellophone</h2>
        </Link>
        <strong>
          {user ? (
            <Link to={new Route().path(Route.ACCOUNT).build()}>Account</Link>
          ) : (
            <Link to={new Route().path(Route.SIGN_IN).build()}>Sign In</Link>
          )}
        </strong>
      </nav>
    </header>
  );
});

export default Header;

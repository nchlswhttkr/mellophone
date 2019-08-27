import React from "react";
import { Link } from "@reach/router";

import classes from "./Header.module.css";
import Route from "../utils/Route";
import { IUser } from "../types";

interface Props {
  user: IUser | undefined;
}

function Header(props: Props) {
  return (
    <header className={classes.header}>
      <nav>
        <Link to={new Route().build()} className={classes.title}>
          <h2>Mellophone</h2>
        </Link>
        {props.user ? (
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
}

export default Header;
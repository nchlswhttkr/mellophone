import React from "react";
import { Link } from "@reach/router";

import classes from "./Header.module.css";
import { route } from "../utils/routing";
import { IUser } from "../types";

interface Props {
  user: IUser | undefined;
}

function Header(props: Props) {
  return (
    <header className={classes.header}>
      <nav>
        <Link to={route("/")} className={classes.title}>
          <h2>Mellophone</h2>
        </Link>
        {props.user ? (
          <Link to={route("/account")} aria-label="View my account">
            <strong>Account</strong>
          </Link>
        ) : (
          <Link to={route("/sign-in")} aria-label="Sign in to Mellophone">
            <strong>Sign in</strong>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;

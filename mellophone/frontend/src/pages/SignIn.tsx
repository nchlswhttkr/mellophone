import React from "react";
import { RouteComponentProps } from "@reach/router";

import { IUserToBeCreated } from "../types";
import Main from "../elements/Main";
import SignInForm from "../sections/SignInForm";
import SignUpForm from "../sections/SignUpForm";
import classes from "./SignIn.module.css";
import Button from "../elements/Button";
import Route from "../utils/Route";
import { StoresContext } from "../stores";

export default function SignIn(_: RouteComponentProps) {
  const [newAccount, setNewAccount] = React.useState<boolean>(false);

  const { sessionStore } = React.useContext(StoresContext);
  if (!sessionStore) return null;

  const signUp = async (user: IUserToBeCreated, password: string) => {
    await sessionStore.signUp(
      user.email,
      password,
      user.firstName,
      user.lastName
    );
    new Route().navigate();
  };

  const signIn = async (email: string, password: string) => {
    await sessionStore.signIn(email, password);
    new Route().navigate();
  };

  return (
    <Main className={classes.formContainer}>
      <h2 className={classes.title}>{newAccount ? "Sign up" : "Sign in"}</h2>

      {newAccount ? (
        <SignUpForm signUp={signUp} />
      ) : (
        <SignInForm signIn={signIn} />
      )}

      <hr className={classes.divider} />

      <Button onClick={() => setNewAccount(!newAccount)}>
        {newAccount ? "Sign in to an existing account" : "Create an account"}
      </Button>
    </Main>
  );
}

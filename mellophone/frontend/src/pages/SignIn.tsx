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
import { NetworkContext } from "../network";

export default function SignIn(_: RouteComponentProps) {
  const [newAccount, setNewAccount] = React.useState<boolean>(true);
  const { signIn, signUp } = React.useContext(NetworkContext);

  const { sessionStore } = React.useContext(StoresContext);

  const onSignUp = async (
    userToBeCreated: IUserToBeCreated,
    password: string
  ) => {
    const user = await signUp(
      userToBeCreated.email,
      password,
      userToBeCreated.firstName,
      userToBeCreated.lastName
    );
    sessionStore.user = user;
    new Route().navigate();
  };

  const onSignIn = async (email: string, password: string) => {
    const user = await signIn(email, password);
    sessionStore.user = user;
    new Route().navigate();
  };

  return (
    <Main className={classes.formContainer}>
      <h2 className={classes.title}>
        {newAccount ? "Sign up to Mellophone" : "Sign in to Mellophone"}
      </h2>

      {newAccount ? (
        <SignUpForm signUp={onSignUp} />
      ) : (
        <SignInForm signIn={onSignIn} />
      )}

      <hr className={classes.divider} />

      <Button onClick={() => setNewAccount(!newAccount)}>
        {newAccount ? "Sign in to an existing account" : "Create an account"}
      </Button>
    </Main>
  );
}

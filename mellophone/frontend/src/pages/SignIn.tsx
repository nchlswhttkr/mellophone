import React from "react";
import { RouteComponentProps } from "@reach/router";
import { observer } from "mobx-react-lite";

import Main from "../elements/Main";
import SignInForm from "../sections/SignInForm";
import SignUpForm from "../sections/SignUpForm";
import classes from "./SignIn.module.css";
import Button from "../elements/Button";
import Route from "../utils/Route";
import { StoresContext } from "../stores";
import { NetworkContext } from "../network";
import ErrorMessage from "../elements/ErrorMessage";

function SignIn(_: RouteComponentProps) {
  const [error, setError] = React.useState<Error>();
  const [newAccount, setNewAccount] = React.useState<boolean>(
    !localStorage.getItem("hasAccount")
  );
  const { signIn, signUp } = React.useContext(NetworkContext);
  const { sessionStore } = React.useContext(StoresContext);

  React.useEffect(() => setError(undefined), [newAccount]);

  const isAuthenticated = !!sessionStore.user.get();
  React.useEffect(() => {
    if (isAuthenticated) new Route().navigate();
  }, [isAuthenticated]);

  const onSignUp = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    return signUp(email, password, firstName, lastName)
      .then(user => {
        sessionStore.signIn(user);
        localStorage.setItem("hasAccount", "yes");
        new Route().navigate();
      })
      .catch(setError);
  };

  const onSignIn = (email: string, password: string) => {
    return signIn(email, password)
      .then(user => {
        sessionStore.signIn(user);
        localStorage.setItem("hasAccount", "yes");
        new Route().navigate();
      })
      .catch(setError);
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

      <ErrorMessage error={error} />

      <hr className={classes.divider} />

      <Button onClick={() => setNewAccount(!newAccount)}>
        {newAccount ? "Sign in to an existing account" : "Create an account"}
      </Button>
    </Main>
  );
}

export default observer(SignIn);

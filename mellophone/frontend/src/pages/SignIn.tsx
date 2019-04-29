import React from "react";
import { RouteComponentProps } from "@reach/router";

import { IUserToBeCreated } from "../types";
import { sessionStore } from "../stores";
import Header from "../elements/Header";
import Footer from "../elements/Footer";
import SignInForm from "../sections/SignInForm";
import SignUpForm from "../sections/SignUpForm";
import classes from "./SignIn.module.css";
import IdentityService from "../network/IdentityService";
import Button from "../elements/Button";
import Route from "../utils/Route";

export default function SignIn(_: RouteComponentProps) {
  const [newAccount, setNewAccount] = React.useState<boolean>(false);

  const signUp = async (user: IUserToBeCreated, password: string) => {
    await IdentityService.createUser(user, password);
    const identity = await IdentityService.getIdentity();
    sessionStore.setUser(identity);
    new Route().navigate();
  };

  const signIn = async (email: string, password: string) => {
    await IdentityService.authenticateUser(email, password);
    const identity = await IdentityService.getIdentity();
    sessionStore.setUser(identity);
    new Route().navigate();
  };

  return (
    <>
      <Header sessionStore={sessionStore} />
      <div className={classes.formContainer}>
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
      </div>
      <Footer />
    </>
  );
}

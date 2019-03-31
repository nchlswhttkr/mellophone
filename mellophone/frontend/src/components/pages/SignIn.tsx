import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import Section from "../elements/Section";
import SignInForm from "../sections/SignInForm";
import SignUpForm from "../sections/SignUpForm";
import classes from "./SignIn.module.css";
import IdentityService from "../../network/IdentityService";
import Button from "../elements/Button";
import Divider from "../elements/Divider";
import { IUserToBeCreated } from "../../types";
import Route from "../../utils/Route";

export default function SignIn(_: RouteComponentProps) {
  const [newAccount, setNewAccount] = React.useState<boolean>(false);

  const signUp = async (user: IUserToBeCreated, password: string) => {
    await IdentityService.createUser(user, password);
    const identity = await IdentityService.getIdentity();
    sessionStore.setUser(identity);
    new Route().buildAndNavigate();
  };

  const signIn = async (email: string, password: string) => {
    await IdentityService.authenticateUser(email, password);
    const identity = await IdentityService.getIdentity();
    sessionStore.setUser(identity);
    new Route().buildAndNavigate();
  };

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main className={classes.main}>
        <Section className={classes.account}>
          <h3 className={classes.center}>
            {newAccount ? "Sign up" : "Sign in"}
          </h3>

          {newAccount ? (
            <SignUpForm signUp={signUp} />
          ) : (
            <SignInForm signIn={signIn} />
          )}

          <Divider />

          <Button onClick={() => setNewAccount(!newAccount)} type="button">
            {newAccount
              ? "Sign in to an existing account"
              : "Create an account"}
          </Button>
        </Section>
      </Main>
      <Footer />
    </>
  );
}

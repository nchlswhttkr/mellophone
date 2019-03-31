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

function SignIn(_: RouteComponentProps) {
  const [newAccount, setNewAccount] = React.useState<boolean>(false);

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main className={classes.main}>
        <Section className={classes.account}>
          <h3 className={classes.center}>
            {newAccount ? "Sign up" : "Sign in"}
          </h3>

          {newAccount ? (
            <SignUpForm signUp={IdentityService.createUser} />
          ) : (
            <SignInForm signIn={IdentityService.authenticateUser} />
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

export default SignIn;

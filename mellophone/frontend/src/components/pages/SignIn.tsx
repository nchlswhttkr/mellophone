import React from "react";
import { RouteComponentProps } from "@reach/router";

import { identityStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import Section from "../elements/Section";
import SignInForm from "../sections/SignInForm";
import classes from "./SignIn.module.css";

function SignIn(_: RouteComponentProps) {
  return (
    <>
      <Header identityStore={identityStore} />
      <Main className={classes.main}>
        <Section>
          <SignInForm />
        </Section>
      </Main>
      <Footer />
    </>
  );
}

export default SignIn;

import React from "react";
import { RouteComponentProps } from "@reach/router";

import { identityStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import SignInForm from "../sections/SignInForm";

function SignIn(_: RouteComponentProps) {
  return (
    <>
      <Header identityStore={identityStore} />
      <Main>
        <SignInForm />
      </Main>
      <Footer />
    </>
  );
}

export default SignIn;

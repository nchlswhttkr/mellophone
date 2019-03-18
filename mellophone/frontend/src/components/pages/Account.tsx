import React from "react";
import { RouteComponentProps } from "@reach/router";

import { identityStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import AccountBlock from "../sections/AccountBlock";

function Account(_: RouteComponentProps) {
  return (
    <>
      <Header identityStore={identityStore} />
      <Main>
        <AccountBlock identityStore={identityStore} />
      </Main>
      <Footer />
    </>
  );
}

export default Account;

import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../stores";
import Header from "../elements/Header";
import Footer from "../elements/Footer";
import AccountBlock from "../sections/AccountBlock";
import IdentityService from "../network/IdentityService";
import Main from "../elements/Main";

export default function Account(_: RouteComponentProps) {
  const signOut = async () => {
    await IdentityService.clearIdentity();
    sessionStore.clearSession();
  };

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <AccountBlock sessionStore={sessionStore} signOut={signOut} />
      </Main>
      <Footer />
    </>
  );
}

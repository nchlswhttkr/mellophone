import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import AccountBlock from "../sections/AccountBlock";
import IdentityService from "../../network/IdentityService";

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

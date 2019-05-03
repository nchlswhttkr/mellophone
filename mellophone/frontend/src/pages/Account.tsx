import React from "react";
import { RouteComponentProps } from "@reach/router";
import Route from "../utils/Route";

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
    new Route().navigate();
  };

  return (
    <>
      <Header user={sessionStore.user} />
      <Main>
        <AccountBlock user={sessionStore.user} signOut={signOut} />
      </Main>
      <Footer />
    </>
  );
}

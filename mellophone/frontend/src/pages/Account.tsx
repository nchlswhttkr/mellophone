import React from "react";
import { RouteComponentProps } from "@reach/router";
import { observer } from "mobx-react-lite";

import Main from "../elements/Main";
import AccountBlock from "../sections/AccountBlock";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";
import Route from "../utils/Route";
import { NetworkContext } from "../network";

function Account(_: RouteComponentProps) {
  const { sessionStore } = React.useContext(StoresContext);
  const { signOut } = React.useContext(NetworkContext);

  const onSignOut = () =>
    signOut().then(() => {
      sessionStore.signOut();
      new Route().navigate();
    });

  return (
    <Main>
      <AccountBlock user={sessionStore.user} signOut={onSignOut} />
    </Main>
  );
}

export default requireAuthentication(observer(Account));

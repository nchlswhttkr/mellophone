import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Observer } from "mobx-react";

import AccountBlock from "../sections/AccountBlock";
import Main from "../elements/Main";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";
import Route from "../utils/Route";
import identityService from "../network/identityService";

function Account(_: RouteComponentProps) {
  const { sessionStore } = React.useContext(StoresContext);

  const signOut = async () => {
    identityService.signOut().then(() => {
      sessionStore.user = undefined;
      new Route().navigate();
    });
  };

  const { user } = sessionStore;
  return (
    <Observer>
      {() => (
        <Main>{user && <AccountBlock user={user} signOut={signOut} />}</Main>
      )}
    </Observer>
  );
}

export default requireAuthentication(Account);

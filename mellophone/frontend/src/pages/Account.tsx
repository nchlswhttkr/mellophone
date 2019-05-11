import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Observer } from "mobx-react";

import AccountBlock from "../sections/AccountBlock";
import Main from "../elements/Main";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";
import Route from "../utils/Route";

function Account(_: RouteComponentProps) {
  const { sessionStore } = React.useContext(StoresContext);
  if (!sessionStore) return null;

  const { user } = sessionStore;

  const signOut = async () => {
    await sessionStore.signOut();
    new Route().navigate();
  };

  return (
    <Observer>
      {() => (
        <Main>{user && <AccountBlock user={user} signOut={signOut} />}</Main>
      )}
    </Observer>
  );
}

export default requireAuthentication(Account);

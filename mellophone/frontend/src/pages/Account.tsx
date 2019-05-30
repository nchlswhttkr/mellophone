import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Observer } from "mobx-react";

import AccountBlock from "../sections/AccountBlock";
import Main from "../elements/Main";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";
import Route from "../utils/Route";
import { NetworkContext } from "../network";
import ErrorMessage from "../elements/ErrorMessage";

function Account(_: RouteComponentProps) {
  const [error, setError] = React.useState<Error>();
  const { sessionStore } = React.useContext(StoresContext);
  const { signOut } = React.useContext(NetworkContext);

  const onSignOut = async () => {
    signOut()
      .then(() => {
        sessionStore.user = undefined;
        new Route().navigate();
      })
      .catch(setError);
  };

  const { user } = sessionStore;
  return (
    <Observer>
      {() => (
        <Main>
          <ErrorMessage error={error} />
          {user && <AccountBlock user={user} signOut={onSignOut} />}
        </Main>
      )}
    </Observer>
  );
}

export default requireAuthentication(Account);

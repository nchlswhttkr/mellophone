import React from "react";
import { RouteComponentProps } from "@reach/router";
import { observer } from "mobx-react-lite";

import Main from "../elements/Main";
import AccountBlock from "../sections/AccountBlock";
import ErrorMessage from "../elements/ErrorMessage";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";
import Route from "../utils/Route";
import { NetworkContext } from "../network";

function Account(_: RouteComponentProps) {
  const [error, setError] = React.useState<Error>();
  const { sessionStore } = React.useContext(StoresContext);
  const { signOut } = React.useContext(NetworkContext);

  const onSignOut = () => {
    return signOut()
      .then(() => {
        sessionStore.user.set(undefined);
        new Route().navigate();
      })
      .catch(setError);
  };

  return (
    <Main>
      <ErrorMessage error={error} />
      <AccountBlock user={sessionStore.user} signOut={onSignOut} />
    </Main>
  );
}

export default requireAuthentication(observer(Account));

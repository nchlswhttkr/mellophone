import React from "react";
import { RouteComponentProps } from "@reach/router";
import Route from "../utils/Route";

import Header from "../elements/Header";
import Footer from "../elements/Footer";
import AccountBlock from "../sections/AccountBlock";
import Main from "../elements/Main";
import { IUser } from "../types";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";

interface Props extends RouteComponentProps {
  sessionUser: IUser;
}

function Account(props: Props) {
  const { sessionUser } = props;

  const { sessionStore } = React.useContext(StoresContext);

  if (!sessionStore) return null;

  const signOut = async () => {
    await sessionStore.signOut();
    new Route().navigate();
  };

  return (
    <>
      <Header user={sessionUser} />
      <Main>
        <AccountBlock user={sessionUser} signOut={signOut} />
      </Main>
      <Footer />
    </>
  );
}

export default requireAuthentication<Props>(Account);

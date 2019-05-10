import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Observer } from "mobx-react";

import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import TeamList from "../sections/TeamList";
import { StoresContext } from "../stores";
import { IUser } from "../types";
import requireAuthentication from "../utils/requireAuthentication";

interface Props extends RouteComponentProps {
  sessionUser: IUser;
}

function Home(props: Props) {
  const { teamStore } = React.useContext(StoresContext);
  if (!teamStore) return null;

  React.useEffect(() => {
    teamStore.loadTeamsOfSessionUser();
  }, []);

  return (
    <Observer>
      {() => {
        const { sessionUserTeams } = teamStore;
        return (
          <>
            <Header user={props.sessionUser} />
            <Main>
              {sessionUserTeams && <TeamList teams={sessionUserTeams} />}
            </Main>
            <Footer />
          </>
        );
      }}
    </Observer>
  );
}

export default requireAuthentication<Props>(Home);

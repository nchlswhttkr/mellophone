import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../stores";
import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import TeamList from "../sections/TeamList";
import TeamService from "../network/TeamService";

export default function Home(_: RouteComponentProps) {
  React.useEffect(() => {
    TeamService.fetchSessionUserTeams()
      .then(teams => sessionStore.upsertTeams(teams))
      .catch(
        error => process.env.NODE_ENV !== "production" && console.error(error)
      );
  }, []);

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <TeamList sessionStore={sessionStore} />
      </Main>
      <Footer />
    </>
  );
}

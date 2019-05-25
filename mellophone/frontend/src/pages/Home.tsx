import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Observer } from "mobx-react";

import Main from "../elements/Main";
import TeamList from "../sections/TeamList";
import { StoresContext } from "../stores";
import requireAuthentication from "../utils/requireAuthentication";
import teamService from "../network/teamService";

function Home(_: RouteComponentProps) {
  const { teamStore } = React.useContext(StoresContext);

  React.useEffect(() => {
    teamService.getTeamsOfSessionUser().then(teams =>
      teams.forEach(team => {
        teamStore.addTeam(team);
        teamStore.addToSessionUserTeams(team.id);
      })
    );
  }, [teamStore]);

  return (
    <Observer>
      {() => {
        const { sessionUserTeams } = teamStore;
        return (
          <Main>
            {sessionUserTeams && <TeamList teams={sessionUserTeams} />}
          </Main>
        );
      }}
    </Observer>
  );
}

export default requireAuthentication(Home, () => <h1>Mellophone</h1>);

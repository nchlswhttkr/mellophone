import React from "react";
import { RouteComponentProps } from "@reach/router";

import Main from "../elements/Main";
import CreateTeamForm from "../sections/CreateTeamForm";
import Route from "../utils/Route";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";
import { NetworkContext } from "../network";

function CreateTeam(_: RouteComponentProps) {
  const { teamStore } = React.useContext(StoresContext);
  const { postTeam } = React.useContext(NetworkContext);

  const createTeam = async (name: string, website: string) => {
    const team = await postTeam(name, website);
    teamStore.addTeam(team);
    teamStore.addToSessionUserTeams(team.id);
    new Route(Route.TEAMS, team.id).navigate();
  };

  return (
    <Main>
      <h1>Create a new team</h1>
      <CreateTeamForm createTeam={createTeam} />
    </Main>
  );
}

export default requireAuthentication(CreateTeam);

import React from "react";
import { RouteComponentProps } from "@reach/router";

import Main from "../elements/Main";
import CreateTeamForm from "../sections/CreateTeamForm";
import Route from "../utils/Route";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";
import teamService from "../network/teamService";

function CreateTeam(_: RouteComponentProps) {
  const { teamStore } = React.useContext(StoresContext);

  const createTeam = async (name: string, website: string) => {
    const team = await teamService.postTeam(name, website);
    teamStore.addTeam(team);
    new Route(Route.TEAMS, team.id).navigate();
  };

  return (
    <Main>
      <h2>Create a new team</h2>
      <CreateTeamForm createTeam={createTeam} />
    </Main>
  );
}

export default requireAuthentication(CreateTeam);

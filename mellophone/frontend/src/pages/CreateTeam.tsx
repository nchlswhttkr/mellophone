import React from "react";
import { RouteComponentProps } from "@reach/router";

import Main from "../elements/Main";
import CreateTeamForm from "../sections/CreateTeamForm";
import Route from "../utils/Route";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";

function CreateTeam(_: RouteComponentProps) {
  const { teamStore } = React.useContext(StoresContext);
  if (!teamStore) return null;

  const createTeam = async (name: string, website: string) => {
    const team = await teamStore.createTeam(name, website);
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

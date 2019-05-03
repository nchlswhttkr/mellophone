import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../stores";
import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import TeamService from "../network/TeamService";
import CreateTeamForm from "../sections/CreateTeamForm";
import Route from "../utils/Route";

export default function CreateTeam(_: RouteComponentProps) {
  const createTeam = async (name: string, website: string) => {
    const team = await TeamService.createTeam(name, website);
    sessionStore.upsertTeams([team]);
    new Route(Route.TEAMS, team.id).navigate();
  };

  return (
    <>
      <Header user={sessionStore.user} />
      <Main>
        <h2>Create a new team</h2>
        <CreateTeamForm createTeam={createTeam} />
      </Main>
      <Footer />
    </>
  );
}

import React from "react";
import { RouteComponentProps } from "@reach/router";

import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import CreateTeamForm from "../sections/CreateTeamForm";
import Route from "../utils/Route";
import { IUser } from "../types";
import requireAuthentication from "../utils/requireAuthentication";
import { StoresContext } from "../stores";

interface Props extends RouteComponentProps {
  sessionUser: IUser;
}

function CreateTeam(props: Props) {
  const { teamStore } = React.useContext(StoresContext);
  if (!teamStore) return null;

  const createTeam = async (name: string, website: string) => {
    const team = await teamStore.createTeam(name, website);
    new Route(Route.TEAMS, team.id).navigate();
  };

  return (
    <>
      <Header user={props.sessionUser} />
      <Main>
        <h2>Create a new team</h2>
        <CreateTeamForm createTeam={createTeam} />
      </Main>
      <Footer />
    </>
  );
}

export default requireAuthentication<Props>(CreateTeam);

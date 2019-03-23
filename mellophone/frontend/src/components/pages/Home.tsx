import React from "react";
import { RouteComponentProps } from "@reach/router";

import { identityStore, teamStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import TeamService from "../../network/TeamService";
import CreateTeamForm from "../sections/CreateTeamForm";

function Home(_: RouteComponentProps) {
  return (
    <>
      <Header identityStore={identityStore} />
      <Main>
        <h1>Hello World!</h1>
        <CreateTeamForm
          identityStore={identityStore}
          createTeam={TeamService.createTeam}
        />
      </Main>
      <Footer />
    </>
  );
}

export default Home;

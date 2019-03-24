import React from "react";
import { RouteComponentProps } from "@reach/router";

import classes from "./Home.module.css";
import { identityStore, teamStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import TeamService from "../../network/TeamService";
import CreateTeamForm from "../sections/CreateTeamForm";
import TeamList from "../sections/TeamList";
import Section from "../elements/Section";

function Home(_: RouteComponentProps) {
  const [showForm, setShowForm] = React.useState<boolean>(false);
  TeamService.getTeams();
  return (
    <>
      <Header identityStore={identityStore} />
      <Main>
        <Section className={classes.teams}>
          <TeamList
            identityStore={identityStore}
            teamStore={teamStore}
            createTeam={() => setShowForm(true)}
          />
          {showForm && (
            <CreateTeamForm
              identityStore={identityStore}
              createTeam={TeamService.createTeam}
            />
          )}
        </Section>
      </Main>
      <Footer />
    </>
  );
}

export default Home;

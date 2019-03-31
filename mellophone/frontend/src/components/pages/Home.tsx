import React from "react";
import { RouteComponentProps } from "@reach/router";

import classes from "./Home.module.css";
import { sessionStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import TeamService from "../../network/TeamService";
import CreateTeamForm from "../sections/CreateTeamForm";
import TeamList from "../sections/TeamList";
import Section from "../elements/Section";

function Home(_: RouteComponentProps) {
  const [showForm, setShowForm] = React.useState<boolean>(false);

  React.useEffect(() => {
    TeamService.fetchSessionUserTeams().catch(
      error => process.env.NODE_ENV !== "production" && console.error(error)
    );
  }, []);

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <Section className={classes.teams}>
          <TeamList
            sessionStore={sessionStore}
            createTeam={() => setShowForm(true)}
          />
          {showForm && (
            <CreateTeamForm
              sessionStore={sessionStore}
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

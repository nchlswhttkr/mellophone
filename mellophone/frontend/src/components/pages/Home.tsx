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

export default function Home(_: RouteComponentProps) {
  const [showForm, setShowForm] = React.useState<boolean>(false);

  React.useEffect(() => {
    TeamService.fetchSessionUserTeams()
      .then(teams => sessionStore.upsertTeams(teams))
      .catch(
        error => process.env.NODE_ENV !== "production" && console.error(error)
      );
  }, []);

  const createTeam = async (name: string, website: string) => {
    const team = await TeamService.createTeam(name, website);
    sessionStore.upsertTeams([team]);
    setShowForm(false);
  };

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
              createTeam={createTeam}
            />
          )}
        </Section>
      </Main>
      <Footer />
    </>
  );
}

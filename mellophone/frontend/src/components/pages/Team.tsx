import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import TeamService from "../../network/TeamService";
import TeamProfile from "../sections/TeamProfile";

interface Props {
  teamId: string;
}

function Team(props: RouteComponentProps<Props>) {
  const { teamId } = props;

  if (!teamId) return null;

  React.useEffect(() => {
    TeamService.fetchTeam(teamId).catch(
      error => process.env.NODE_ENV !== "production" && console.error(error)
    );
  }, []);

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <TeamProfile sessionStore={sessionStore} teamId={teamId} />
      </Main>
      <Footer />
    </>
  );
}
export default Team;

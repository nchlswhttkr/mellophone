import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../stores";
import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import TeamService from "../network/TeamService";
import TeamProfile from "../sections/TeamProfile";
import MeetingList from "../sections/MeetingList";
import MeetingService from "../network/MeetingService";
import { IMeeting } from "../types";
import Button from "../elements/Button";
import Route from "../utils/Route";

interface Props {
  teamId: string;
}

function Team(props: RouteComponentProps<Props>) {
  const [meetings, setMeetings] = React.useState<IMeeting[]>();

  const teamId = Number(props.teamId).valueOf();

  React.useEffect(() => {
    if (!Number.isNaN(teamId)) {
      TeamService.fetchTeam(teamId)
        .then(team => sessionStore.upsertTeams([team]))
        .catch(
          error => process.env.NODE_ENV !== "production" && console.error(error)
        );
      MeetingService.fetchMeetingsOfTeam(teamId)
        .then(setMeetings)
        .catch();
    }
  }, [teamId]);

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <TeamProfile sessionStore={sessionStore} teamId={teamId} />
        <Button
          onClick={() =>
            new Route(Route.TEAMS, teamId, Route.MEETINGS, Route.NEW).navigate()
          }>
          Create meeting
        </Button>
        <hr style={{ margin: "1rem 0" }} />
        <MeetingList meetings={meetings} />
      </Main>
      <Footer />
    </>
  );
}
export default Team;

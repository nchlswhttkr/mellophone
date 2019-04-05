import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import TeamService from "../../network/TeamService";
import TeamProfile from "../sections/TeamProfile";
import MeetingList from "../sections/MeetingList";
import MeetingService from "../../network/MeetingService";
import { IMeeting } from "../../types";
import Button from "../elements/Button";
import Route from "../../utils/Route";

interface Props {
  teamId: string;
}

function Team(props: RouteComponentProps<Props>) {
  const teamId = new Number(props.teamId).valueOf();
  const [meetings, setMeetings] = React.useState<IMeeting[] | undefined>(
    undefined
  );

  if (Number.isNaN(teamId)) return null;

  React.useEffect(() => {
    TeamService.fetchTeam(teamId)
      .then(team => sessionStore.upsertTeams([team]))
      .catch(
        error => process.env.NODE_ENV !== "production" && console.error(error)
      );
    MeetingService.fetchMeetingsOfTeam(teamId)
      .then(meetings => setMeetings(meetings))
      .catch();
  }, []);

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <TeamProfile sessionStore={sessionStore} teamId={teamId} />
        <MeetingList meetings={meetings} />
        <Button
          onClick={() =>
            new Route()
              .path(Route.TEAMS)
              .path(teamId.toString())
              .path(Route.MEETINGS)
              .path(Route.NEW)
              .buildAndNavigate()
          }>
          Create meeting
        </Button>
      </Main>
      <Footer />
    </>
  );
}
export default Team;

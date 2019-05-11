import React from "react";
import { RouteComponentProps } from "@reach/router";

import Main from "../elements/Main";
import TeamProfile from "../sections/TeamProfile";
import MeetingList from "../sections/MeetingList";
import MeetingService from "../network/MeetingService";
import { IMeeting, ITeam } from "../types";
import Button from "../elements/Button";
import Route from "../utils/Route";
import { StoresContext } from "../stores";
import requireAuthentication from "../utils/requireAuthentication";

function Team(props: RouteComponentProps<{ teamId: string }>) {
  const [team, setTeam] = React.useState<ITeam>();
  const [meetings, setMeetings] = React.useState<IMeeting[]>();

  const teamId = new Number(props.teamId).valueOf();
  if (Number.isNaN(teamId)) return null;

  const { sessionStore, teamStore } = React.useContext(StoresContext);
  if (!sessionStore || !teamStore) return null;

  React.useEffect(() => {
    teamStore.retrieveTeamWithId(teamId).then(setTeam);
    MeetingService.getMeetingsOfTeam(teamId).then(setMeetings);
  }, []);

  return (
    <Main>
      <TeamProfile team={team} />
      <Button
        onClick={() =>
          new Route(Route.TEAMS, teamId, Route.MEETINGS, Route.NEW).navigate()
        }>
        Create meeting
      </Button>
      <hr style={{ margin: "1rem 0" }} />
      <MeetingList meetings={meetings} />
    </Main>
  );
}

export default requireAuthentication(Team);

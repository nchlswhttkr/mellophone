import React from "react";
import { RouteComponentProps } from "@reach/router";
import { observer } from "mobx-react-lite";

import Main from "../elements/Main";
import TeamProfile from "../sections/TeamProfile";
import MeetingList from "../sections/MeetingList";
import meetingService from "../network/meetingService";
import { IMeeting } from "../types";
import Button from "../elements/Button";
import Route from "../utils/Route";
import { StoresContext } from "../stores";
import { NetworkContext } from "../network";
import requireAuthentication from "../utils/requireAuthentication";

function Team(props: RouteComponentProps<{ teamId: string }>) {
  const [meetings, setMeetings] = React.useState<IMeeting[]>();
  const { teamStore } = React.useContext(StoresContext);
  const { getTeamById } = React.useContext(NetworkContext);

  const teamId = Number(props.teamId).valueOf();

  React.useEffect(() => {
    if (!Number.isNaN(teamId)) {
      getTeamById(teamId).then(team => {
        teamStore.addTeam(team);
        teamStore.addToSessionUserTeams(team.id);
      });
      meetingService.getMeetingsOfTeam(teamId).then(setMeetings);
    }
  }, [teamId, teamStore, getTeamById]);

  const team = teamStore.teams.get(teamId);
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

export default requireAuthentication(observer(Team));

import React from "react";
import { RouteComponentProps } from "@reach/router";

import Main from "../elements/Main";
import TeamProfile from "../sections/TeamProfile";
import MeetingList from "../sections/MeetingList";
import meetingService from "../network/meetingService";
import { IMeeting } from "../types";
import Button from "../elements/Button";
import Route from "../utils/Route";
import { StoresContext } from "../stores";
import requireAuthentication from "../utils/requireAuthentication";
import teamService from "../network/teamService";
import { Observer } from "mobx-react";

function Team(props: RouteComponentProps<{ teamId: string }>) {
  const [meetings, setMeetings] = React.useState<IMeeting[]>();
  const { teamStore } = React.useContext(StoresContext);

  const teamId = Number(props.teamId).valueOf();

  React.useEffect(() => {
    if (!Number.isNaN(teamId)) {
      teamService.getTeamById(teamId).then(team => {
        teamStore.addTeam(team);
        teamStore.addToSessionUserTeams(team.id);
      });
      meetingService.getMeetingsOfTeam(teamId).then(setMeetings);
    }
  }, [teamId, teamStore]);

  return (
    <Observer>
      {() => {
        const team = teamStore.teams.get(teamId);
        return (
          <Main>
            <TeamProfile team={team} />
            <Button
              onClick={() =>
                new Route(
                  Route.TEAMS,
                  teamId,
                  Route.MEETINGS,
                  Route.NEW
                ).navigate()
              }>
              Create meeting
            </Button>
            <hr style={{ margin: "1rem 0" }} />
            <MeetingList meetings={meetings} />
          </Main>
        );
      }}
    </Observer>
  );
}

export default requireAuthentication(Team);

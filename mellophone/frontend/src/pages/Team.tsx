import React, { useState, useContext, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { observer } from "mobx-react-lite";

import Main from "../elements/Main";
import TeamProfile from "../sections/TeamProfile";
import MeetingList from "../sections/MeetingList";
import { IMeeting } from "../types";
import Button from "../elements/Button";
import Route from "../utils/Route";
import { StoresContext } from "../stores";
import { NetworkContext } from "../network";
import requireAuthentication from "../utils/requireAuthentication";
import ErrorMessage from "../elements/ErrorMessage";

type Props = RouteComponentProps<{ teamId: string }>;

function Team(props: Props) {
  const [error, setError] = useState<Error>();
  const [meetings, setMeetings] = useState<IMeeting[]>();
  const { teamStore } = useContext(StoresContext);
  const { getTeamById, getMeetingsOfTeam } = useContext(NetworkContext);

  const teamId = Number(props.teamId);

  useEffect(() => {
    if (!Number.isNaN(teamId)) {
      getTeamById(teamId)
        .then(team => {
          teamStore.addTeam(team);
          teamStore.addToSessionUserTeams(team.id);
        })
        .catch(setError);
      getMeetingsOfTeam(teamId)
        .then(setMeetings)
        .catch(setError);
    }
  }, [teamId, teamStore, getTeamById, getMeetingsOfTeam]);

  const team = teamStore.teams.get(teamId);
  return (
    <Main>
      <ErrorMessage error={error} />
      {team && <TeamProfile team={team} />}
      <Button
        onClick={() =>
          new Route(Route.TEAMS, teamId, Route.MEETINGS, Route.NEW).navigate()
        }>
        Create meeting
      </Button>
      <hr style={{ margin: "1rem 0" }} />
      {meetings && <MeetingList meetings={meetings} />}
    </Main>
  );
}

export default requireAuthentication<Props>(observer(Team));

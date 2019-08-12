import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";

import Main from "../components/Main";
import TeamProfile from "../components/TeamProfile";
import MeetingList from "../components/MeetingList";
import { IMeeting } from "../types";
import Button from "../components/Button";
import Route from "../utils/Route";
import { NetworkContext } from "../network";
import requireAuthentication from "../utils/requireAuthentication";
import ErrorMessage from "../components/ErrorMessage";
import { ITeam } from "../types";
import { AppState } from "../ducks";

interface Props extends RouteComponentProps<{ teamId: string }> {
  teamsLoaded: boolean;
  userTeams: ITeam[];
}

function Team(props: Props) {
  const [team, setTeam] = React.useState<ITeam>();
  const [error, setError] = React.useState<Error>();
  const [meetings, setMeetings] = React.useState<IMeeting[]>();
  const { getTeamById, getMeetingsOfTeam } = React.useContext(NetworkContext);
  const { userTeams, teamsLoaded } = props;

  const teamId = Number(props.teamId);

  React.useEffect(() => {
    if (!Number.isNaN(teamId) && teamsLoaded) {
      const foundTeam = userTeams.find(team => team.id === teamId);
      if (!foundTeam) {
        getTeamById(teamId)
          .then(setTeam)
          .catch(setError);
      } else {
        setTeam(foundTeam);
      }
    }
  }, [teamId, getTeamById, userTeams, teamsLoaded]);

  React.useEffect(() => {
    if (!Number.isNaN(teamId)) {
      getMeetingsOfTeam(teamId)
        .then(setMeetings)
        .catch(setError);
    }
  }, [teamId, getMeetingsOfTeam]);

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

const mapStateToProps = (state: AppState) => ({
  teamsLoaded: state.teams.status === "fulfilled",
  teams: state.teams.teams,
  userTeams: state.teams.teams,
});

export default requireAuthentication<{ teamId: string }>(
  connect(mapStateToProps)(Team)
);

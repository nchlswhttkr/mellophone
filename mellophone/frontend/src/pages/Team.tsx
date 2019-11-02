import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";

import Main from "../components/Main";
import MeetingList from "../components/MeetingList";
import { IMeeting } from "../types";
import Button from "../components/Button";
import { navigate } from "../utils/routing";
import { useNetwork } from "../network";
import requireAuthentication from "../utils/requireAuthentication";
import ErrorMessage from "../components/ErrorMessage";
import { ITeam } from "../types";
import { AppState } from "../ducks";

interface Props extends RouteComponentProps<{ teamId: string }> {
  loadedTeams: ITeam[];
}

function Team(props: Props) {
  const [team, setTeam] = React.useState<ITeam>();
  const [meetings, setMeetings] = React.useState<IMeeting[]>();
  const [loadDataError, setLoadDataError] = React.useState<Error>();
  const { getTeamById, getMeetingsOfTeam } = useNetwork();
  const { loadedTeams } = props;

  const teamId = Number(props.teamId);

  // Set the team for the page, only fetch if not available locally
  React.useEffect(() => {
    if (team !== undefined) return;
    if (Number.isNaN(teamId)) return;

    const foundTeam = loadedTeams.find(team => team.id === teamId);
    if (foundTeam !== undefined) {
      setTeam(foundTeam);
    } else {
      getTeamById(teamId)
        .then(setTeam)
        .catch(setLoadDataError);
    }
  }, [teamId, getTeamById, loadedTeams, team]);

  // Load the meetings of this team
  React.useEffect(() => {
    if (!Number.isNaN(teamId)) {
      getMeetingsOfTeam(teamId)
        .then(setMeetings)
        .catch(setLoadDataError);
    }
  }, [teamId, getMeetingsOfTeam]);

  return (
    <Main>
      <ErrorMessage error={loadDataError} />
      {team && (
        <>
          <h2>{team.name}</h2>
          <p>{team.website}</p>
        </>
      )}
      <Button onClick={() => navigate(`/teams/${teamId}/meetings/new`)}>
        Create meeting
      </Button>
      <hr style={{ margin: "1rem 0" }} />
      {meetings && <MeetingList meetings={meetings} />}
    </Main>
  );
}

const mapStateToProps = (state: AppState) => ({
  loadedTeams: state.teams.teams,
});

export default connect(mapStateToProps)(requireAuthentication<Props>(Team));

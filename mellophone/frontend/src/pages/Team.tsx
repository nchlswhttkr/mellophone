import React from "react";
import { RouteComponentProps } from "@reach/router";

import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import TeamProfile from "../sections/TeamProfile";
import MeetingList from "../sections/MeetingList";
import MeetingService from "../network/MeetingService";
import { IMeeting, IUser, ITeam } from "../types";
import Button from "../elements/Button";
import Route from "../utils/Route";
import { StoresContext } from "../stores";
import requireAuthentication from "../utils/requireAuthentication";

interface Props extends RouteComponentProps<{ teamId: string }> {
  sessionUser: IUser;
}

function Team(props: Props) {
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
    <>
      <Header user={props.sessionUser} />
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
      <Footer />
    </>
  );
}

export default requireAuthentication<Props>(Team);

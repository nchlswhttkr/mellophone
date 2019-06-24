import React, { useContext } from "react";
import { RouteComponentProps } from "@reach/router";

import Main from "../elements/Main";
import Route from "../utils/Route";
import CreateMeetingForm from "../sections/CreateMeetingForm";
import requireAuthentication from "../utils/requireAuthentication";
import { NetworkContext } from "../network";

function CreateMeeting(props: RouteComponentProps<{ teamId: string }>) {
  const { createMeeting } = useContext(NetworkContext);
  const teamId = Number(props.teamId);

  const onCreateMeeting = async (name: string, venue?: string) => {
    const meetingId = (await createMeeting(teamId, name, venue)).id;
    new Route(Route.MEETINGS, meetingId).navigate();
  };

  return (
    <Main>
      <h1>Create a meeting</h1>
      <CreateMeetingForm createMeeting={onCreateMeeting} />
    </Main>
  );
}

export default requireAuthentication<RouteComponentProps<{ teamId: string }>>(
  CreateMeeting
);

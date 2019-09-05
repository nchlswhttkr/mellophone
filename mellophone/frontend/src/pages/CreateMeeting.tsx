import React from "react";
import { RouteComponentProps } from "@reach/router";

import Main from "../components/Main";
import Route from "../utils/Route";
import CreateMeetingForm from "../components/CreateMeetingForm";
import requireAuthentication from "../utils/requireAuthentication";
import { useNetwork } from "../network";

interface Props extends RouteComponentProps<{ teamId: string }> {}

function CreateMeeting(props: Props) {
  const { postMeeting } = useNetwork();
  const teamId = Number(props.teamId);

  const onCreateMeeting = async (name: string, venue: string) => {
    const meeting = await postMeeting(teamId, name, venue);
    new Route(Route.MEETINGS, meeting.id).navigate();
  };

  return (
    <Main>
      <h1>Create a meeting</h1>
      <CreateMeetingForm createMeeting={onCreateMeeting} />
    </Main>
  );
}

export default requireAuthentication<Props>(CreateMeeting);

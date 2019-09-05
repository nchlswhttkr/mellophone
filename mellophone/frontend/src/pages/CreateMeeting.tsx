import React from "react";
import { RouteComponentProps } from "@reach/router";

import Main from "../components/Main";
import { navigate } from "../utils/routing";
import CreateMeetingForm from "../components/CreateMeetingForm";
import requireAuthentication from "../utils/requireAuthentication";
import { useNetwork } from "../network";

interface Props extends RouteComponentProps<{ teamId: string }> {}

function CreateMeeting(props: Props) {
  const { postMeeting } = useNetwork();
  const teamId = Number(props.teamId);

  const onCreateMeeting = async (name: string, venue: string) => {
    const meeting = await postMeeting(teamId, name, venue);
    navigate(`/meetings/${meeting.id}`);
  };

  return (
    <Main>
      <h1>Create a meeting</h1>
      <CreateMeetingForm createMeeting={onCreateMeeting} />
    </Main>
  );
}

export default requireAuthentication<Props>(CreateMeeting);

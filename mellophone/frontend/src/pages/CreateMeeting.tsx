import React from "react";
import { RouteComponentProps } from "@reach/router";

import Main from "../elements/Main";
import Route from "../utils/Route";
import { IMeetingToBeCreated } from "../types";
import meetingService from "../network/meetingService";
import CreateMeetingForm from "../sections/CreateMeetingForm";
import requireAuthentication from "../utils/requireAuthentication";

function CreateMeeting(props: RouteComponentProps<{ teamId: string }>) {
  const teamId = Number(props.teamId).valueOf();

  if (Number.isNaN(teamId)) return null;

  const createMeeting = async (meeting: IMeetingToBeCreated) => {
    const meetingId = (await meetingService.createMeeting(meeting, teamId)).id;
    new Route(Route.MEETINGS, meetingId).navigate();
  };

  return (
    <Main>
      <h1>Create a meeting</h1>
      <CreateMeetingForm createMeeting={createMeeting} />
    </Main>
  );
}

export default requireAuthentication(CreateMeeting);

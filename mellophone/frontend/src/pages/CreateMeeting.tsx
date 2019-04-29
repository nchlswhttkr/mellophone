import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../stores";
import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import Route from "../utils/Route";
import { IMeetingToBeCreated } from "../types";
import MeetingService from "../network/MeetingService";
import CreateMeetingForm from "../sections/CreateMeetingForm";

interface Props {
  teamId: number;
}

export default function CreateMeeting(props: RouteComponentProps<Props>) {
  const teamId = new Number(props.teamId).valueOf();

  if (Number.isNaN(teamId)) return null;

  const createMeeting = async (meeting: IMeetingToBeCreated) => {
    const meetingId = (await MeetingService.createMeeting(meeting, teamId)).id;
    new Route(Route.MEETINGS, meetingId).navigate();
  };

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <h2>Create meeting</h2>
        <CreateMeetingForm
          sessionStore={sessionStore}
          createMeeting={createMeeting}
        />
      </Main>
      <Footer />
    </>
  );
}

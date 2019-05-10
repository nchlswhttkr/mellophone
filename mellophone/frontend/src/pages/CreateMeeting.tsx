import React from "react";
import { RouteComponentProps } from "@reach/router";

import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import Route from "../utils/Route";
import { IMeetingToBeCreated, IUser } from "../types";
import MeetingService from "../network/MeetingService";
import CreateMeetingForm from "../sections/CreateMeetingForm";
import requireAuthentication from "../utils/requireAuthentication";

interface Props extends RouteComponentProps<{ teamId: string }> {
  sessionUser: IUser;
}

function CreateMeeting(props: Props) {
  const teamId = new Number(props.teamId).valueOf();

  if (Number.isNaN(teamId)) return null;

  const createMeeting = async (meeting: IMeetingToBeCreated) => {
    const meetingId = (await MeetingService.createMeeting(meeting, teamId)).id;
    new Route(Route.MEETINGS, meetingId).navigate();
  };

  return (
    <>
      <Header user={props.sessionUser} />
      <Main>
        <h2>Create meeting</h2>
        <CreateMeetingForm createMeeting={createMeeting} />
      </Main>
      <Footer />
    </>
  );
}

export default requireAuthentication<Props>(CreateMeeting);

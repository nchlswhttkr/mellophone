import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import Section from "../elements/Section";
import Button from "../elements/Button";
import Divider from "../elements/Divider";
import Route from "../../utils/Route";
import { IMeetingToBeCreated } from "../../types";
import MeetingService from "../../network/MeetingService";
import CreateMeetingForm from "../sections/CreateMeetingForm";

interface Props {
  teamId: number;
}

export default function SignIn(props: RouteComponentProps<Props>) {
  const teamId = new Number(props.teamId).valueOf();

  if (Number.isNaN(teamId)) return null;

  const createMeeting = async (meeting: IMeetingToBeCreated) => {
    const meetingId = (await MeetingService.createMeeting(meeting, teamId)).id;
    new Route()
      .path(Route.MEETINGS)
      .path(meetingId.toString())
      .buildAndNavigate();
  };

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <Section>
          <h3>Create meeting</h3>

          <CreateMeetingForm
            sessionStore={sessionStore}
            createMeeting={createMeeting}
          />
        </Section>
      </Main>
      <Footer />
    </>
  );
}

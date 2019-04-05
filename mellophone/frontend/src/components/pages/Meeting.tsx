import React from "react";
import { RouteComponentProps } from "@reach/router";

import { IMeeting } from "../../types";
import { sessionStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import MeetingDocument from "../sections/MeetingDocument";
import MeetingService from "../../network/MeetingService";

interface Props {
  meetingId: string;
}

export default function Meeting(props: RouteComponentProps<Props>) {
  const meetingId = new Number(props.meetingId).valueOf();
  const [meeting, setMeeting] = React.useState<IMeeting | undefined>(undefined);

  if (Number.isNaN(meetingId)) return null;

  React.useEffect(() => {
    MeetingService.fetchMeeting(meetingId)
      .then(meeting => setMeeting(meeting))
      .catch(
        error => process.env.NODE_ENV !== "production" && console.error(error)
      );
  }, []);

  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <MeetingDocument meeting={meeting} />
      </Main>
      <Footer />
    </>
  );
}

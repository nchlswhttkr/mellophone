import React from "react";
import { RouteComponentProps } from "@reach/router";

import { IMeeting } from "../types";
import { sessionStore } from "../stores";
import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import MeetingDocument from "../sections/MeetingDocument";
import MeetingService from "../network/MeetingService";

interface Props {
  meetingId: string;
}

export default function Meeting(props: RouteComponentProps<Props>) {
  const [meeting, setMeeting] = React.useState<IMeeting | undefined>(undefined);

  const meetingId = Number(props.meetingId).valueOf();

  React.useEffect(() => {
    if (!Number.isNaN(meetingId)) {
      MeetingService.fetchMeeting(meetingId)
        .then(meeting => setMeeting(meeting))
        .catch(
          error => process.env.NODE_ENV !== "production" && console.error(error)
        );
    }
  }, [meetingId]);

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

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
  const meetingId = new Number(props.meetingId).valueOf();
  if (Number.isNaN(meetingId)) return null;

  const [meeting, setMeeting] = React.useState<IMeeting | undefined>(undefined);

  React.useEffect(() => {
    MeetingService.fetchMeeting(meetingId)
      .then(meeting => setMeeting(meeting))
      .catch(
        error => process.env.NODE_ENV !== "production" && console.error(error)
      );
  }, []);

  return (
    <>
      <Header user={sessionStore.user} />
      <Main>
        <MeetingDocument meeting={meeting} />
      </Main>

      <Footer />
    </>
  );
}

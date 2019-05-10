import React from "react";
import { RouteComponentProps } from "@reach/router";

import { IMeeting, IUser } from "../types";
import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";
import MeetingDocument from "../sections/MeetingDocument";
import MeetingService from "../network/MeetingService";
import requireAuthentication from "../utils/requireAuthentication";

interface Props extends RouteComponentProps<{ meetingId: string }> {
  sessionUser: IUser;
}

function Meeting(props: Props) {
  const meetingId = new Number(props.meetingId).valueOf();
  if (Number.isNaN(meetingId)) return null;

  const [meeting, setMeeting] = React.useState<IMeeting>();

  React.useEffect(() => {
    MeetingService.getMeetingById(meetingId)
      .then(meeting => setMeeting(meeting))
      .catch(
        error => process.env.NODE_ENV !== "production" && console.error(error)
      );
  }, []);

  return (
    <>
      <Header user={props.sessionUser} />
      <Main>
        <MeetingDocument meeting={meeting} />
      </Main>

      <Footer />
    </>
  );
}

export default requireAuthentication<Props>(Meeting);

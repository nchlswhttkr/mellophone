import React from "react";
import { RouteComponentProps } from "@reach/router";

import { IMeeting } from "../types";
import Main from "../elements/Main";
import MeetingDocument from "../sections/MeetingDocument";
import MeetingService from "../network/MeetingService";
import requireAuthentication from "../utils/requireAuthentication";

function Meeting(props: RouteComponentProps<{ meetingId: string }>) {
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

  return <Main>{meeting && <MeetingDocument meeting={meeting} />}</Main>;
}

export default requireAuthentication(Meeting);

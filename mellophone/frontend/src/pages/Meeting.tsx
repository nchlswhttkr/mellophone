import React from "react";
import { RouteComponentProps } from "@reach/router";

import { IMeeting } from "../types";
import Main from "../elements/Main";
import MeetingDocument from "../sections/MeetingDocument";
import meetingService from "../network/meetingService";
import requireAuthentication from "../utils/requireAuthentication";

function Meeting(props: RouteComponentProps<{ meetingId: string }>) {
  const [meeting, setMeeting] = React.useState<IMeeting>();

  const meetingId = Number(props.meetingId).valueOf();

  React.useEffect(() => {
    if (!Number.isNaN(meetingId)) {
      meetingService.getMeetingById(meetingId)
        .then(meeting => setMeeting(meeting))
        .catch(
          error => process.env.NODE_ENV !== "production" && console.error(error)
        );
    }
  }, [meetingId]);

  return <Main>{meeting && <MeetingDocument meeting={meeting} />}</Main>;
}

export default requireAuthentication(Meeting);

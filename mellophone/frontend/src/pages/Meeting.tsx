import React from "react";
import { RouteComponentProps } from "@reach/router";

import { IMeeting } from "../types";
import Main from "../elements/Main";
import MeetingDocument from "../sections/MeetingDocument";
import requireAuthentication from "../utils/requireAuthentication";
import { NetworkContext } from "../network";
import ErrorMessage from "../elements/ErrorMessage";

type Props = RouteComponentProps<{ meetingId: string }>;

function Meeting(props: Props) {
  const [meeting, setMeeting] = React.useState<IMeeting>();
  const [error, setError] = React.useState<Error>();
  const { getMeetingById } = React.useContext(NetworkContext);

  const meetingId = Number(props.meetingId);

  React.useEffect(() => {
    if (!Number.isNaN(meetingId)) {
      getMeetingById(meetingId)
        .then(meeting => setMeeting(meeting))
        .catch(setError);
    }
  }, [meetingId, getMeetingById]);

  return (
    <Main>
      <ErrorMessage error={error} />
      {meeting && <MeetingDocument meeting={meeting} />}
    </Main>
  );
}

export default requireAuthentication<Props>(Meeting);

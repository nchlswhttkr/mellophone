import React from "react";
import { Link } from "@reach/router";

import { IMeeting } from "../types";
import { route } from "../utils/routing";

interface Props {
  meetings: IMeeting[];
}

function MeetingList(props: Props) {
  return (
    <>
      <h3>Meetings</h3>
      {props.meetings.map(meeting => (
        <div key={meeting.id}>
          <p>
            <Link to={route(`/meetings/${meeting.id}`)}>{meeting.name}</Link>
          </p>
          <p>{meeting.dateHeld.toString()}</p>
        </div>
      ))}
      {props.meetings.length === 0 && <p>There are no meetings to show</p>}
    </>
  );
}

export default MeetingList;

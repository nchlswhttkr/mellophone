import React from "react";
import { Link } from "@reach/router";

import { IMeeting } from "../types";
import Route from "../utils/Route";

interface Props {
  meetings?: IMeeting[];
}

export default function MeetingList(props: Props) {
  if (!props.meetings) return null;

  return (
    <>
      <h3>Meetings</h3>
      {props.meetings.map(meeting => (
        <div key={meeting.id}>
          <p>
            <Link to={new Route(Route.MEETINGS, meeting.id).build()}>
              {meeting.name}
            </Link>
          </p>
          <p>{meeting.dateHeld.toString()}</p>
        </div>
      ))}
      {props.meetings.length === 0 && <p>There are no meetings to show</p>}
    </>
  );
}

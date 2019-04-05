import React from "react";

import { IMeeting } from "../../types";
import { Link } from "@reach/router";
import Route from "../../utils/Route";

interface Props {
  meetings?: IMeeting[];
}

export default function MeetingList(props: Props) {
  if (!props.meetings) return null;
  return (
    <div>
      {props.meetings.map(meeting => (
        <div key={meeting.id}>
          <p>
            <Link
              to={new Route()
                .path(Route.MEETINGS)
                .path(meeting.id.toString())
                .build()}>
              {meeting.name}
            </Link>
          </p>
          <p>{meeting.dateHeld.toString()}</p>
        </div>
      ))}
    </div>
  );
}

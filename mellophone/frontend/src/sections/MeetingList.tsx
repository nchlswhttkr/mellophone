import React from "react";
import { Link } from "@reach/router";

import { IMeeting } from "../types";
import Route from "../utils/Route";
import { observer } from "mobx-react-lite";

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

export default observer(MeetingList);

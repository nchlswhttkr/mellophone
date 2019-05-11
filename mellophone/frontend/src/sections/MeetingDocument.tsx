import React from "react";
import { observer } from "mobx-react";

import { IMeeting } from "../types";
import { Link } from "@reach/router";
import Route from "../utils/Route";

interface Props {
  meeting: IMeeting;
}

function MeetingDocument(props: Props) {
  const { meeting } = props;

  return (
    <div>
      <h2>{meeting.name}</h2>
      <h3>
        Meeting held {meeting.dateHeld.toString()} by{" "}
        <Link to={new Route(Route.TEAMS, meeting.team.id).build()}>
          {meeting.team.name}
        </Link>
      </h3>
      <p>
        <em>Yesterday, all my problems seemed so far away...</em>
      </p>
    </div>
  );
}

export default observer(MeetingDocument);

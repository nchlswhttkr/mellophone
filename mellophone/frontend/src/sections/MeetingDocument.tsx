import React from "react";

import { IMeeting } from "../types";
import { Link } from "@reach/router";
import Route from "../utils/Route";

interface Props {
  meeting?: IMeeting;
}

export default function MeetingDocument(props: Props) {
  const { meeting } = props;
  if (!meeting) return null;

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

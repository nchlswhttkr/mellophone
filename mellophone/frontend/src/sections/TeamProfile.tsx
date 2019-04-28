import React from "react";
import { observer } from "mobx-react";

import { ISessionStore } from "../types";

interface Props {
  sessionStore: ISessionStore;
  teamId: number;
}

@observer
class TeamProfile extends React.Component<Props> {
  render() {
    const team = this.props.sessionStore.teams.get(this.props.teamId);

    if (!team) return null;

    return (
      <>
        <h2>{team.name}</h2>
        <p>{team.website}</p>
      </>
    );
  }
}

export default TeamProfile;

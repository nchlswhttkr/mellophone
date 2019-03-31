import React from "react";
import { observer } from "mobx-react";

import { ISessionStore } from "../../types";

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
        <p>{team.name}</p>
        <p>{team.website}</p>
      </>
    );
  }
}

export default TeamProfile;

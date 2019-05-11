import React from "react";
import { observer } from "mobx-react";

import { ITeam } from "../types";

interface Props {
  team: ITeam | undefined;
}

@observer
class TeamProfile extends React.Component<Props> {
  render() {
    const { team } = this.props;

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

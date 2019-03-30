import React from "react";
import { observer } from "mobx-react";

import { ITeamStore } from "../../types";

interface Props {
  teamStore: ITeamStore;
}

@observer
class TeamProfile extends React.Component<Props> {
  render() {
    const {
      teamStore: { currentTeam },
    } = this.props;

    if (!currentTeam) return null;

    return (
      <>
        <p>{currentTeam.name}</p>
        <p>{currentTeam.website}</p>
      </>
    );
  }
}

export default TeamProfile;

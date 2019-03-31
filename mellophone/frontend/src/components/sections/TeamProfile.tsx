import React from "react";
import { observer } from "mobx-react";

import { ISessionStore } from "../../types";
import classes from "./TeamProfile.module.css";

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
      <div className={classes.root}>
        <p>
          <strong>{team.name}</strong>
        </p>
        <p>{team.website}</p>
      </div>
    );
  }
}

export default TeamProfile;

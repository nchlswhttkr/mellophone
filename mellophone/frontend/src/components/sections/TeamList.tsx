import React from "react";
import { observer } from "mobx-react";

import classes from "./TeamList.module.css";
import { ITeamStore } from "../../types";
import { Link } from "@reach/router";
import Route from "../../utils/Route";
import Button from "../elements/Button";
import TeamService from "../../network/TeamService";

interface Props {
  teamStore: ITeamStore;
  createTeam: () => void;
}

@observer
class TeamList extends React.Component<Props> {
  render() {
    const {
      teamStore: { teams },
      createTeam,
    } = this.props;
    return (
      <div className={classes.container}>
        <h2>My teams</h2>

        {teams.map(team => (
          <div key={team.id} className={classes.team}>
            <h3 className={classes.title}>
              <Link
                to={new Route()
                  .path(Route.TEAMS)
                  .path(team.id)
                  .build()}>
                {team.name}
              </Link>
            </h3>
            <Button
              className={classes.button}
              onClick={() =>
                new Route()
                  .path(Route.TEAMS)
                  .path(team.id)
                  .path(Route.MEETINGS)
                  .path(Route.NEW)
                  .buildAndNavigate()
              }>
              Create meeting
            </Button>
          </div>
        ))}

        {teams.length === 0 && (
          <>
            <p>
              <em>You are not a member of any teams, why not create one?</em>
            </p>
            <Button className={classes.button} onClick={createTeam}>
              Create team
            </Button>
          </>
        )}
      </div>
    );
  }
}

export default TeamList;

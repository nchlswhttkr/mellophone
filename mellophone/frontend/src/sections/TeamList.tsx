import React from "react";
import { observer } from "mobx-react";
import { Link } from "@reach/router";

import { ITeam } from "../types";
import classes from "./TeamList.module.css";
import Route from "../utils/Route";
import Button from "../elements/Button";

interface Props {
  teams: ITeam[];
}

@observer
class TeamList extends React.Component<Props> {
  render() {
    const { teams } = this.props;

    return (
      <div className={classes.container}>
        <h2>My teams</h2>

        {Array.from(teams.values()).map(team => (
          <div key={team.id} className={classes.team}>
            <h3 className={classes.title}>
              <Link to={new Route(Route.TEAMS, team.id).build()}>
                {team.name}
              </Link>
            </h3>
            <Button
              className={classes.button}
              onClick={() =>
                new Route(
                  Route.TEAMS,
                  team.id,
                  Route.MEETINGS,
                  Route.NEW
                ).buildAndNavigate()
              }>
              Create meeting
            </Button>
          </div>
        ))}

        {teams.length === 0 && (
          <p>
            You are not a member of any teams, why not{" "}
            <Link
              to={new Route(Route.TEAMS, Route.NEW).build()}
              className={classes.link}>
              create a new team
            </Link>
            ?
          </p>
        )}
      </div>
    );
  }
}

export default TeamList;

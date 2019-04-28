import React from "react";
import { observer } from "mobx-react";
import { Link } from "@reach/router";

import { ISessionStore } from "../types";
import classes from "./TeamList.module.css";
import Route from "../utils/Route";
import Button from "../elements/Button";

interface Props {
  sessionStore: ISessionStore;
}

@observer
class TeamList extends React.Component<Props> {
  render() {
    const {
      sessionStore: { user, teams },
    } = this.props;

    if (!user && teams.size === 0) return null;

    return (
      <div className={classes.container}>
        <h2>My teams</h2>

        {Array.from(teams.values()).map(team => (
          <div key={team.id} className={classes.team}>
            <h3 className={classes.title}>
              <Link
                to={new Route()
                  .path(Route.TEAMS)
                  .path(team.id.toString())
                  .build()}>
                {team.name}
              </Link>
            </h3>
            <Button
              className={classes.button}
              onClick={() =>
                new Route()
                  .path(Route.TEAMS)
                  .path(team.id.toString())
                  .path(Route.MEETINGS)
                  .path(Route.NEW)
                  .buildAndNavigate()
              }>
              Create meeting
            </Button>
          </div>
        ))}

        {teams.size === 0 && (
          <p>
            You are not a member of any teams, why not{" "}
            <Link
              to={new Route()
                .path(Route.TEAMS)
                .path(Route.NEW)
                .build()}
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

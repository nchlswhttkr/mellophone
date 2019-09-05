import React from "react";
import { Link } from "@reach/router";

import { ITeam } from "../types";
import classes from "./TeamList.module.css";
import { route, navigate } from "../utils/routing";
import Button from "./Button";

interface Props {
  teams: ITeam[];
}

function TeamList({ teams }: Props) {
  return (
    <div className={classes.container}>
      <h1>My teams</h1>

      {teams.map(team => (
        <div key={team.id} className={classes.team}>
          <h3 className={classes.title}>
            <Link to={route(`/teams/${team.id}`)}>{team.name}</Link>
          </h3>
          <Button
            className={classes.button}
            onClick={() => navigate(`/teams/${team.id}/meetings/new`)}>
            Create meeting
          </Button>
        </div>
      ))}

      {teams.length === 0 && (
        <p>
          You are not a member of any teams, would you like to{" "}
          <Link to={route("/teams/new")} className={classes.link}>
            create a new team
          </Link>
          ?
        </p>
      )}
    </div>
  );
}

export default TeamList;

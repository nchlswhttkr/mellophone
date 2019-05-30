import React from "react";
import { observer } from "mobx-react-lite";

import { ITeam } from "../types";

interface Props {
  team: ITeam | undefined;
}

function TeamProfile({ team }: Props) {
  if (!team) return null;

  return (
    <>
      <h2>{team.name}</h2>
      <p>{team.website}</p>
    </>
  );
}

export default observer(TeamProfile);

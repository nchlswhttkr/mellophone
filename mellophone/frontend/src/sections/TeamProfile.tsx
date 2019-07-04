import React from "react";
import { observer } from "mobx-react-lite";

import { ITeam } from "../types";

interface Props {
  team: ITeam;
}

function TeamProfile({ team }: Props) {
  return (
    <>
      <h2>{team.name}</h2>
      <p>{team.website}</p>
    </>
  );
}

export default observer(TeamProfile);

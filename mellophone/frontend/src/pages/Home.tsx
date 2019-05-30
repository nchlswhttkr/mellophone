import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Observer } from "mobx-react";

import Main from "../elements/Main";
import TeamList from "../sections/TeamList";
import { StoresContext } from "../stores";
import requireAuthentication from "../utils/requireAuthentication";
import { NetworkContext } from "../network";

function Home(_: RouteComponentProps) {
  const [error, setError] = React.useState<Error>();
  const { teamStore } = React.useContext(StoresContext);
  const { getTeamsOfSessionUser } = React.useContext(NetworkContext);

  React.useEffect(() => {
    getTeamsOfSessionUser()
      .then(teams =>
        teams.forEach(team => {
          teamStore.addTeam(team);
          teamStore.addToSessionUserTeams(team.id);
        })
      )
      .catch(setError);
  }, [teamStore]);

  return (
    <Observer>
      {() => {
        const { sessionUserTeams } = teamStore;
        return (
          <Main>
            <p style={{ color: "red" }}>{error && error.message}</p>
            {!error && sessionUserTeams.length > 0 && (
              <TeamList teams={sessionUserTeams} />
            )}
          </Main>
        );
      }}
    </Observer>
  );
}

export default requireAuthentication(Home, () => (
  <h1>Welcome to Mellophone</h1>
));

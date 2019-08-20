import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";

import Main from "../components/Main";
import CreateTeamForm from "../components/CreateTeamForm";
import Route from "../utils/Route";
import requireAuthentication from "../utils/requireAuthentication";
import { useNetwork } from "../network";
import { AppState } from "../ducks";
import { appendTeam } from "../ducks/teams";
import { ITeam } from "../types";

interface Props extends RouteComponentProps {
  teamsLoaded: boolean;
  appendTeam(team: ITeam): void;
}

function CreateTeam(props: Props) {
  const { postTeam } = useNetwork();

  const createTeam = async (name: string, website: string) => {
    const team = await postTeam(name, website);
    props.appendTeam(team);
    new Route(Route.TEAMS, team.id).navigate();
  };

  return (
    <Main>
      <h1>Create a new team</h1>
      {props.teamsLoaded && <CreateTeamForm createTeam={createTeam} />}
    </Main>
  );
}

const mapStateToProps = (state: AppState) => ({
  teamsLoaded: state.teams.status === "fulfilled",
});

const mapDispatchToProps = {
  appendTeam,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(requireAuthentication<Props>(CreateTeam));

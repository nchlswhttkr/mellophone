import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";

import Main from "../components/Main";
import CreateTeamForm from "../components/CreateTeamForm";
import { navigate } from "../utils/routing";
import requireAuthentication from "../utils/requireAuthentication";
import { useNetwork } from "../network";
import { appendTeams } from "../ducks/teams";
import { ITeam } from "../types";

interface Props extends RouteComponentProps {
  appendTeams(teams: ITeam[]): void;
}

function CreateTeam(props: Props) {
  const { postTeam } = useNetwork();

  const createTeam = async (name: string, website: string) => {
    const team = await postTeam(name, website);
    props.appendTeams([team]);
    navigate(`/teams/${team.id}`);
  };

  return (
    <Main>
      <h1>Create a new team</h1>
      <CreateTeamForm createTeam={createTeam} />
    </Main>
  );
}

const mapDispatchToProps = {
  appendTeams,
};

export default connect(
  null,
  mapDispatchToProps
)(requireAuthentication<Props>(CreateTeam));

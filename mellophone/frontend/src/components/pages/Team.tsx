import React from "react";
import { RouteComponentProps } from "@reach/router";

import { identityStore, teamStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import TeamService from "../../network/TeamService";
import TeamProfile from "../sections/TeamProfile";

interface Props {
  teamId: string;
}

class Team extends React.Component<RouteComponentProps<Props>> {
  componentDidMount() {
    if (!this.props.teamId) return undefined;
    TeamService.getTeamAndSetAsCurrent(this.props.teamId).catch(
      error => process.env.NODE_ENV !== "production" && console.error(error)
    );
  }

  render() {
    return (
      <>
        <Header identityStore={identityStore} />
        <Main>
          <TeamProfile teamStore={teamStore} />
        </Main>
        <Footer />
      </>
    );
  }
}

export default Team;

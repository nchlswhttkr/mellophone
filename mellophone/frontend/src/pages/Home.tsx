import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { connect } from "react-redux";

import Main from "../components/Main";
import TeamList from "../components/TeamList";
import requireAuthentication from "../utils/requireAuthentication";
import { useNetwork } from "../network";
import { route } from "../utils/routing";
import classes from "./Home.module.css";
import { appendTeams } from "../ducks/teams";
import { ITeam } from "../types";
import { AppState } from "../ducks";
import ErrorMessage from "../components/ErrorMessage";

interface Props extends RouteComponentProps {
  appendTeams(teams: ITeam[]): void;
  teams: ITeam[];
}

function Home(props: Props) {
  const { appendTeams, teams } = props;
  const { getTeamsOfSessionUser } = useNetwork();
  const [teamsLoadingError, setTeamsLoadingError] = React.useState<Error>();

  React.useEffect(() => {
    getTeamsOfSessionUser()
      .then(appendTeams)
      .catch(setTeamsLoadingError);
  }, [appendTeams, getTeamsOfSessionUser]);

  return (
    <Main>
      <ErrorMessage error={teamsLoadingError} />
      <TeamList teams={teams} />
    </Main>
  );
}

function SplashPage() {
  return (
    <Main className={classes.splash}>
      <div className={classes.cards}>
        <div>Meetings</div>
        <div>Members</div>
        <div>Events</div>
      </div>
      <div className={classes.callout}>
        <h1>Mellophone is an app for teams</h1>
        <h2>Take meeting minutes and coordinate with your members today!</h2>
        <h2 style={{ color: "#cd2d79" }}>
          <Link to={route("/sign-in")}>Sign up!</Link>
        </h2>
      </div>
    </Main>
  );
}

const mapStateToProps = (state: AppState) => ({
  teams: state.teams.teams,
});

const mapDispatchToProps = {
  appendTeams,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(requireAuthentication<Props>(Home, SplashPage));

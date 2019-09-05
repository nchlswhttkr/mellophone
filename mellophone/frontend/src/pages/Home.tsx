import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { connect } from "react-redux";

import Main from "../components/Main";
import TeamList from "../components/TeamList";
import requireAuthentication from "../utils/requireAuthentication";
import { useNetwork } from "../network";
import { route } from "../utils/routing";
import classes from "./Home.module.css";
import "../animate.css";
import { loadTeamsThunk } from "../ducks/teams";
import { ITeam } from "../types";
import { AppState } from "../ducks";

interface Props extends RouteComponentProps {
  loadTeamsThunk(promise: Promise<ITeam[]>): void;
  teams: ITeam[];
  teamsLoaded: boolean;
}

function Home(props: Props) {
  const { loadTeamsThunk, teamsLoaded, teams } = props;
  const { getTeamsOfSessionUser } = useNetwork();

  React.useEffect(() => {
    if (!teamsLoaded) {
      loadTeamsThunk(getTeamsOfSessionUser());
    }
  }, [loadTeamsThunk, getTeamsOfSessionUser, teamsLoaded]);

  return <Main>{teamsLoaded && <TeamList teams={teams} />}</Main>;
}

function SplashPage() {
  return (
    <Main className={classes.splash}>
      <div className={classes.cards}>
        <div
          style={{
            marginTop: "-10vh",
            top: "8vh",
            left: "-12vw",
            transform: "rotate(20deg)",
            animation: "mergeCard1 1.4s ease 0.8s forwards",
          }}>
          Meetings
        </div>
        <div
          style={{
            top: "-8vh",
            left: "6vw",
            transform: "rotate(-10deg)",
            animation: "mergeCard2 1.1s ease 1.1s forwards",
          }}>
          Members
        </div>
        <div
          style={{
            marginBottom: "-10vh",
            top: "-12vh",
            left: "-4vw",
            transform: "rotate(40deg)",
            animation: "mergeCard3 1s ease 1.2s forwards",
          }}>
          Events
        </div>
      </div>
      <div style={{ flex: 4, minWidth: 300, padding: "8px 16px" }}>
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
  teamsLoaded: state.teams.status === "fulfilled",
  teams: state.teams.teams,
});

const mapDispatchToProps = {
  loadTeamsThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(requireAuthentication<Props>(Home, SplashPage));

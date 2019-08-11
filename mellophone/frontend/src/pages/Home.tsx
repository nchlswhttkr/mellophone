import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { observer } from "mobx-react-lite";

import Main from "../components/Main";
import TeamList from "../components/TeamList";
import { StoresContext } from "../stores";
import requireAuthentication from "../utils/requireAuthentication";
import { NetworkContext } from "../network";
import ErrorMessage from "../components/ErrorMessage";
import Route from "../utils/Route";
import classes from "./Home.module.css";
import "../animate.css";

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
  }, [teamStore, getTeamsOfSessionUser]);

  return (
    <Main>
      <ErrorMessage error={error} />
      {!error && <TeamList teams={teamStore.sessionUserTeams} />}
    </Main>
  );
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
          <Link to={new Route(Route.SIGN_IN).build()}>Sign up!</Link>
        </h2>
      </div>
    </Main>
  );
}

export default requireAuthentication(observer(Home), SplashPage);

import React from "react";
import { Router } from "@reach/router";

import { ApplicationStores, StoresContext } from "./stores";
import SessionStore from "./stores/SessionStore";
import TeamStore from "./stores/TeamStore";
import identityService from "./network/identityService";
import teamService from "./network/teamService";
import Route from "./utils/Route";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import Team from "./pages/Team";
import CreateMeeting from "./pages/CreateMeeting";
import Meeting from "./pages/Meeting";
import PageNotFound from "./pages/PageNotFound";
import CreateTeam from "./pages/CreateTeam";

interface State {
  status: "pending" | "errored" | "ready";
  stores: ApplicationStores;
}

export default class App extends React.Component<{}, State> {
  state: State = {
    status: "pending",
    stores: {
      sessionStore: new SessionStore(identityService),
      teamStore: new TeamStore(teamService),
    },
  };

  componentDidMount() {
    this.state.stores.sessionStore
      .loadSessionUser()
      .then(() => this.setState({ status: "ready" }))
      .catch(() => this.setState({ status: "errored" }));
  }

  render() {
    const { status, stores } = this.state;

    if (status === "pending") return null;

    if (status === "errored")
      return (
        <p style={{ color: "red" }}>
          Something went wrong when running Mellophone.
        </p>
      );

    return (
      <StoresContext.Provider value={stores}>
        <Router>
          <Home path={new Route().build()} />
          <SignIn path={new Route(Route.SIGN_IN).build()} />
          <Account path={new Route(Route.ACCOUNT).build()} />
          <CreateTeam path={new Route(Route.TEAMS, Route.NEW).build()} />
          <Team path={new Route(Route.TEAMS, ":teamId").build()} />
          <CreateMeeting
            path={new Route(
              Route.TEAMS,
              ":teamId",
              Route.MEETINGS,
              Route.NEW
            ).build()}
          />
          <Meeting path={new Route(Route.MEETINGS, ":meetingId").build()} />
          <PageNotFound default />
        </Router>
      </StoresContext.Provider>
    );
  }
}

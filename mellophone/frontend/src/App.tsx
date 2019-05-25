import React from "react";
import { Router } from "@reach/router";
import { autorun, configure } from "mobx";

import { StoresContext } from "./stores";
import SessionStore from "./stores/SessionStore";
import TeamStore from "./stores/TeamStore";
import identityService from "./network/identityService";
import Route from "./utils/Route";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import Team from "./pages/Team";
import CreateMeeting from "./pages/CreateMeeting";
import Meeting from "./pages/Meeting";
import PageNotFound from "./pages/PageNotFound";
import CreateTeam from "./pages/CreateTeam";
import Header from "./elements/Header";
import Footer from "./elements/Footer";

interface State {
  status: "pending" | "errored" | "ready";
}

// https://mobx.js.org/refguide/api.html#configure
configure({
  enforceActions: "observed",
});

export default class App extends React.Component<{}, State> {
  state: State = {
    status: "pending",
  };

  stores = {
    sessionStore: new SessionStore(),
    teamStore: new TeamStore(),
  };

  componentDidMount() {
    identityService
      .getSessionUser()
      .then(user => {
        this.stores.sessionStore.user = user;
        this.setState({ status: "ready" });
      })
      .catch(() => {
        this.setState({ status: "errored" });
      });
  }

  clearTeamsIfAnonymousDisposer = autorun(() => {
    if (!this.stores.sessionStore.user) {
      this.stores.teamStore.clearTeams();
    }
  });

  componentWillUnmount() {
    this.clearTeamsIfAnonymousDisposer();
  }

  render() {
    const { status } = this.state;

    if (status === "pending") return null;

    if (status === "errored")
      return (
        <p style={{ color: "red" }}>
          Something went wrong when loading Mellophone.
        </p>
      );

    return (
      <StoresContext.Provider value={this.stores}>
        <Header sessionStore={this.stores.sessionStore} />
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
        <Footer />
      </StoresContext.Provider>
    );
  }
}

import React from "react";
import { Router } from "@reach/router";
import { autorun } from "mobx";

import { NetworkContext } from "./network";
import { StoresContext } from "./stores";
import SessionStore from "./stores/SessionStore";
import TeamStore from "./stores/TeamStore";
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

export default function App() {
  const [status, setStatus] = React.useState<string>("pending");
  const [stores] = React.useState({
    sessionStore: new SessionStore(),
    teamStore: new TeamStore(),
  });
  const { getSessionUser } = React.useContext(NetworkContext);

  React.useEffect(() => {
    getSessionUser()
      .then(user => {
        user && stores.sessionStore.signIn(user);
        setStatus("ready");
      })
      .catch(() => setStatus("errored"));

    // If a user signs out, clear their teams
    return autorun(() => {
      if (!stores.sessionStore.user.get()) {
        stores.teamStore.clearSessionUserTeamIds();
      }
    });
  });

  if (status === "pending") return null;

  if (status === "errored")
    return (
      <p style={{ color: "red" }}>
        Something went wrong when loading Mellophone.
      </p>
    );

  return (
    <StoresContext.Provider value={stores}>
      <Header user={stores.sessionStore.user} />
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

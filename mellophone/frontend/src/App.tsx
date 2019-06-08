import React, { useState, useEffect, useContext } from "react";
import { Router } from "@reach/router";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import { NetworkContext } from "./network";
import { StoresContext } from "./stores";
import SessionStore from "./stores/SessionStore";
import TeamStore from "./stores/TeamStore";
import Route from "./utils/Route";
import Header from "./elements/Header";
import Main from "./elements/Main";
import Footer from "./elements/Footer";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import Team from "./pages/Team";
import CreateMeeting from "./pages/CreateMeeting";
import Meeting from "./pages/Meeting";
import PageNotFound from "./pages/PageNotFound";
import CreateTeam from "./pages/CreateTeam";

function App() {
  const [userPending, setUserPending] = useState(true);
  const [stores] = useState({
    sessionStore: new SessionStore(),
    teamStore: new TeamStore(),
  });
  const { getSessionUser } = useContext(NetworkContext);

  useEffect(() => {
    getSessionUser()
      .then(user => user && stores.sessionStore.signIn(user))
      .catch(console.error)
      .finally(() => setUserPending(false));
  }, [stores, getSessionUser]);

  useEffect(
    () =>
      // If a user signs out, clear their teams
      autorun(() => {
        if (!stores.sessionStore.user.get()) {
          stores.teamStore.clearSessionUserTeamIds();
        }
      }),
    [stores]
  );

  return (
    <StoresContext.Provider value={stores}>
      <Header user={stores.sessionStore.user} />
      {userPending ? (
        <Main />
      ) : (
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
      )}
      <Footer />
    </StoresContext.Provider>
  );
}

export default observer(App);

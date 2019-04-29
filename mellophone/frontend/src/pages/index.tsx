import React from "react";
import { Router } from "@reach/router";

import Route from "../utils/Route";
import Home from "./Home";
import SignIn from "./SignIn";
import Account from "./Account";
import Team from "./Team";
import CreateMeeting from "./CreateMeeting";
import Meeting from "./Meeting";
import PageNotFound from "./PageNotFound";
import CreateTeam from "./CreateTeam";

function Pages() {
  return (
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
  );
}

export default Pages;

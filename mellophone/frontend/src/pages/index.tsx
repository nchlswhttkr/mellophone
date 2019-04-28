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
      <SignIn path={new Route().path(Route.SIGN_IN).build()} />
      <Account path={new Route().path(Route.ACCOUNT).build()} />
      <CreateTeam
        path={new Route()
          .path(Route.TEAMS)
          .path(Route.NEW)
          .build()}
      />
      <Team
        path={new Route()
          .path(Route.TEAMS)
          .path(":teamId")
          .build()}
      />
      <CreateMeeting
        path={new Route()
          .path(Route.TEAMS)
          .path(":teamId")
          .path(Route.MEETINGS)
          .path(Route.NEW)
          .build()}
      />
      <Meeting
        path={new Route()
          .path(Route.MEETINGS)
          .path(":meetingId")
          .build()}
      />
      <PageNotFound default />
    </Router>
  );
}

export default Pages;

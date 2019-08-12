import React from "react";
import { Router } from "@reach/router";
import { connect } from "react-redux";

import { NetworkContext } from "./network";
import Route from "./utils/Route";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { AppState } from "./ducks";
import { setSessionUser } from "./ducks/session";
import { IUser } from "./types";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import Team from "./pages/Team";
import CreateMeeting from "./pages/CreateMeeting";
import Meeting from "./pages/Meeting";
import PageNotFound from "./pages/PageNotFound";
import CreateTeam from "./pages/CreateTeam";

interface Props {
  user: IUser | undefined;
  setSessionUser(user?: IUser): void;
}

function App(props: Props) {
  const [userPending, setUserPending] = React.useState(true);
  const { getSessionUser } = React.useContext(NetworkContext);

  React.useEffect(() => {
    getSessionUser()
      .then(props.setSessionUser)
      .catch(console.error)
      .finally(() => setUserPending(false));
  }, [getSessionUser, props.setSessionUser]);

  return (
    <>
      <Header user={props.user} />
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
    </>
  );
}

const mapStateToProps = (state: AppState) => ({ user: state.session.user });

const mapDispatchToProps = { setSessionUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

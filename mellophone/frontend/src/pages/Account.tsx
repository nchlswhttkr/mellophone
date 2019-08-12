import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";

import Main from "../components/Main";
import AccountBlock from "../components/AccountBlock";
import requireAuthentication from "../utils/requireAuthentication";
import Route from "../utils/Route";
import { NetworkContext } from "../network";
import { clearSession } from "../ducks/session";
import { IUser } from "../types";
import { AppState } from "../ducks";

interface Props {
  clearSession(): void;
  user?: IUser;
}

function Account(props: RouteComponentProps & Props) {
  const { signOut } = React.useContext(NetworkContext);

  const onSignOut = () =>
    signOut().then(() => {
      props.clearSession();
      new Route().navigate();
    });

  return (
    <Main>
      <AccountBlock user={props.user} signOut={onSignOut} />
    </Main>
  );
}

const mapStateToProps = (state: AppState) => ({ user: state.session.user });

const mapDispatchToProps = { clearSession };

export default requireAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);

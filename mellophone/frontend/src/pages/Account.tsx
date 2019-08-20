import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";

import Main from "../components/Main";
import AccountBlock from "../components/AccountBlock";
import requireAuthentication from "../utils/requireAuthentication";
import Route from "../utils/Route";
import { clearSession } from "../ducks/session";
import { IUser } from "../types";
import { AppState } from "../ducks";
import { useNetwork } from "../network";

interface Props extends RouteComponentProps {
  clearSession(): void;
  user?: IUser;
}

function Account(props: Props) {
  const { signOut } = useNetwork();

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(requireAuthentication<Props>(Account));

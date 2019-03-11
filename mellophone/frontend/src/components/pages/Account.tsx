import React from "react";
import { RouteComponentProps } from "@reach/router";

import AccountBlock from "../sections/AccountBlock";
import { identityStore } from "../../stores";
import IdentityService from "../../network/IdentityService";
import Route from "../../utils/Route";

class Account extends React.Component<RouteComponentProps> {
  onSignOut = async () => {
    await IdentityService.clearIdentity();
    new Route().buildAndNavigate();
  };

  render() {
    return (
      <>
        <AccountBlock identityStore={identityStore} signOut={this.onSignOut} />
      </>
    );
  }
}

export default Account;

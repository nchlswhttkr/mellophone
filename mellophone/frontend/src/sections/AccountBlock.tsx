import React from "react";
import { observer } from "mobx-react";

import { IUser } from "../types";
import classes from "./AccountBlock.module.css";
import Button from "../elements/Button";

interface Props {
  user?: IUser; // signed out users will be undefined
  signOut: () => Promise<void>;
}

/**
 * Show information about the session user, allowing them to sign out.
 */
@observer
class AccountBlock extends React.Component<Props> {
  render() {
    const { user, signOut } = this.props;

    // Don't render for anonymous users or while still uncertain
    if (!user) return null;

    return (
      <div className={classes.root}>
        <div aria-hidden="true" className={classes.avatarContainer}>
          <div className={classes.avatar}>
            <p>{user.firstName.charAt(0) + user.lastName.charAt(0)}</p>
          </div>
        </div>

        <div className={classes.textContainer}>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
          <p>User #{user.id} of Mellophone!</p>
          <Button className={classes.button} onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }
}

export default AccountBlock;

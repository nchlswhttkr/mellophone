import React from "react";
import { observer } from "mobx-react";

import { IIdentityStore } from "../../types";
import classes from "./AccountBlock.module.css";
import Button from "../elements/Button";

interface Props {
  identityStore: IIdentityStore;
  signOut: () => Promise<void>;
}

@observer
class AccountBlock extends React.Component<Props> {
  render() {
    const {
      identityStore: { rejected, user },
      signOut,
    } = this.props;

    // Don't render for anonymous users or while still uncertain
    if (rejected || !user) return null;

    return (
      <div className={classes.root}>
        <div className={classes.avatarContainer}>
          <div className={classes.avatar}>
            <strong>
              {user.firstName.charAt(0) + user.lastName.charAt(0)}
            </strong>
          </div>
        </div>
        <div className={classes.textContainer}>
          <p>
            <strong>
              {user.firstName} {user.lastName}
            </strong>
          </p>
          <p>{user.email}</p>
          <p>
            <em>User #{user.id} of Mellophone!</em>
          </p>

          <Button onClick={signOut}>Sign out</Button>
        </div>
      </div>
    );
  }
}

export default AccountBlock;

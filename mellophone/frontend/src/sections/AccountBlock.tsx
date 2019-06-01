import React from "react";
import { observer } from "mobx-react-lite";

import { IUser } from "../types";
import classes from "./AccountBlock.module.css";
import Button from "../elements/Button";
import ErrorMessage from "../elements/ErrorMessage";
import { IObservableValue } from "mobx";

interface Props {
  user: IObservableValue<IUser | undefined>;
  signOut: () => Promise<void>;
}

/**
 * Show information about the session user, allowing them to sign out.
 */
function AccountBlock(props: Props) {
  const [error, setError] = React.useState<Error>();
  const user = props.user.get();

  const onSignOut = () => {
    props.signOut().catch(setError);
  };

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
        <Button className={classes.button} onClick={onSignOut}>
          Sign out
        </Button>
        <ErrorMessage error={error} />
      </div>
    </div>
  );
}

export default observer(AccountBlock);

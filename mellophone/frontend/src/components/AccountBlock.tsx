import React from "react";

import { IUser } from "../types";
import classes from "./AccountBlock.module.css";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

interface Props {
  user: IUser | undefined;
  signOut: () => Promise<void>;
}

/**
 * Show information about the session user, allowing them to sign out.
 */
function AccountBlock(props: Props) {
  const [error, setError] = React.useState<Error>();
  const { user } = props;

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
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
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

export default AccountBlock;

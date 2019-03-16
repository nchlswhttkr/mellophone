import React from "react";
import { observer } from "mobx-react";

import Section from "../elements/Section";
import Button from "../elements/Button";
import { IIdentityStore } from "../../types";
import classes from "./AccountBlock.module.css";
import IdentityService from "../../network/IdentityService";

interface Props {
  identityStore: IIdentityStore;
  signOut: () => Promise<void>;
}

function AccountBlock(props: Props) {
  const { isResolved, user } = props.identityStore;

  // Don't render for anonymous users or while still uncertain
  if (isResolved || !user) return null;

  return (
    <Section className={classes.root}>
      <div className={classes.avatarContainer}>
        <div className={classes.avatar}>
          <strong>{user.firstName.charAt(0) + user.lastName.charAt(0)}</strong>
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
          <em>User {user.id} of Mellophone!</em>
        </p>
        <Button onClick={props.signOut}>Sign Out</Button>
      </div>
    </Section>
  );
}

export default observer(AccountBlock);

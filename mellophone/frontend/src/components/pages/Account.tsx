import React from "react";
import { RouteComponentProps } from "@reach/router";

import { sessionStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import AccountBlock from "../sections/AccountBlock";
import Section from "../elements/Section";
import classes from "./Account.module.css";
import IdentityService from "../../network/IdentityService";

function Account(_: RouteComponentProps) {
  return (
    <>
      <Header sessionStore={sessionStore} />
      <Main>
        <Section className={classes.section}>
          <AccountBlock
            sessionStore={sessionStore}
            signOut={IdentityService.clearIdentity}
          />
        </Section>
      </Main>
      <Footer />
    </>
  );
}

export default Account;

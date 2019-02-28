import React from "react";
import { RouteComponentProps } from "@reach/router";

import SignInForm from "../sections/SignInForm";

class Home extends React.Component<RouteComponentProps> {
  render() {
    return (
      <>
        <SignInForm />
      </>
    );
  }
}

export default Home;

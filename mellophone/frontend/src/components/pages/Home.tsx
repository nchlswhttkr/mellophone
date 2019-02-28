import React from "react";
import { RouteComponentProps } from "@reach/router";

import WhoAmI from "../sections/WhoAmI";

class Home extends React.Component<RouteComponentProps> {
  render() {
    return (
      <>
        <h1>Hello World!</h1>
        <WhoAmI />
      </>
    );
  }
}

export default Home;

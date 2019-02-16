import React from "react";
import { RouteComponentProps } from "@reach/router";

import Section from "../sections/Section";
import Button from "../elements/Button";

class Home extends React.Component<RouteComponentProps> {
  render() {
    return (
      <>
        <h1>Hello World!</h1>
        <Section>
          <Button onClick={() => alert("Hello Mellophone!")}>Click me!</Button>
        </Section>
      </>
    );
  }
}

export default Home;

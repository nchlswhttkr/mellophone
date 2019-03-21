import React from "react";
import { RouteComponentProps } from "@reach/router";

import { identityStore } from "../../stores";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";

function Home(_: RouteComponentProps) {
  return (
    <>
      <Header identityStore={identityStore} />
      <Main>
        <h1>Hello World!</h1>
      </Main>
      <Footer />
    </>
  );
}

export default Home;

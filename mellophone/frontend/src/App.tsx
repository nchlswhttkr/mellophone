import React from "react";

import Pages from "./components/pages";
import IdentityService from "./network/IdentityService";
import BaseRequest from "./utils/BaseRequest";

class App extends React.Component {
  async componentDidMount() {
    await BaseRequest.get("/");
    await IdentityService.getIdentity();
  }

  render() {
    return <Pages />;
  }
}

export default App;

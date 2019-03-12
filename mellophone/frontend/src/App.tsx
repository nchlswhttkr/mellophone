import React from "react";

import Pages from "./components/pages";
import IdentityService from "./network/IdentityService";

class App extends React.Component {
  componentDidMount() {
    IdentityService.getIdentity();
  }

  render() {
    return <Pages />;
  }
}

export default App;

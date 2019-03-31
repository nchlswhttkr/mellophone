import React from "react";

import Pages from "./components/pages";
import IdentityService from "./network/IdentityService";
import BaseRequest from "./utils/BaseRequest";
import { sessionStore } from "./stores";

type AppStatus = "pending" | "resolved" | "rejected";

function App() {
  const [status, setStatus] = React.useState<AppStatus>("pending");

  React.useEffect(() => {
    Promise.all([
      BaseRequest.get("/"),
      IdentityService.getIdentity().then(user => sessionStore.setUser(user)),
    ])
      .then(() => setStatus("resolved"))
      .catch(() => setStatus("rejected"));
  }, []);

  if (status === "rejected")
    return <p>Something went wrong while starting Mellophone</p>;

  if (status !== "pending") return <Pages />;

  return null;
}

export default App;

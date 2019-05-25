import React from "react";

import SessionStore, { ISessionStore } from "./SessionStore";
import TeamStore, { ITeamStore } from "./TeamStore";

export interface ApplicationStores {
  sessionStore: ISessionStore;
  teamStore: ITeamStore;
}

export const StoresContext = React.createContext<ApplicationStores>({
  sessionStore: new SessionStore(),
  teamStore: new TeamStore(),
});

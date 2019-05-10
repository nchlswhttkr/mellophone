import React from "react";

import { ISessionStore } from "./SessionStore";
import { ITeamStore } from "./TeamStore";

export interface ApplicationStores {
  sessionStore: ISessionStore;
  teamStore: ITeamStore;
}

export const StoresContext = React.createContext<Partial<ApplicationStores>>(
  {}
);

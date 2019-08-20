import React, { useContext } from "react";

import * as identityService from "./identityService";
import * as meetingService from "./meetingService";
import * as teamService from "./teamService";

export const NetworkLayer = {
  ...identityService,
  ...meetingService,
  ...teamService,
};

export const NetworkContext = React.createContext<typeof NetworkLayer>(
  NetworkLayer
);

// Convenience wrapper for accessing network-calling functions
export function useNetwork() {
  return useContext(NetworkContext);
}

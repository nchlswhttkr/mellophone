import React from "react";

import identityService, { IIdentityService } from "./identityService";
import meetingService, { IMeetingService } from "./meetingService";
import teamService, { ITeamService } from "./teamService";

export interface INetworkLayer
  extends IIdentityService,
    ITeamService,
    IMeetingService {}

export const NetworkLayer: INetworkLayer = {
  ...identityService,
  ...meetingService,
  ...teamService,
};

export const NetworkContext = React.createContext<INetworkLayer>(NetworkLayer);

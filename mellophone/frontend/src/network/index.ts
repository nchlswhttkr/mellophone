import React from "react";

import identityService, { IIdentityService } from "./identityService";
import meetingService, { IMeetingService } from "./meetingService";
import teamService, { ITeamService } from "./teamService";

interface INetworkLayer
  extends IIdentityService,
    ITeamService,
    IMeetingService {}

const NetworkLayer: INetworkLayer = {
  ...identityService,
  ...meetingService,
  ...teamService,
};

export const NetworkContext = React.createContext<INetworkLayer>(NetworkLayer);

import { combineReducers } from "redux";

import sessionReducer, { SessionState } from "./session";
import teamsReducer, { TeamsState } from "./teams";

export interface AppState {
  session: SessionState;
  teams: TeamsState;
}

export default combineReducers<AppState>({
  session: sessionReducer,
  teams: teamsReducer,
});

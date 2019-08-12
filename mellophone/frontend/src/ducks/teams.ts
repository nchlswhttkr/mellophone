import { Dispatch } from "redux";

import { ITeam } from "../types";
import { CLEAR_SESSION, ClearSessionAction } from "./session";

export const SET_TEAMS_PENDING = "mellophone/teams/SET_TEAMS_PENDING";
export const SET_TEAMS_FULFILLED = "mellophone/teams/SET_TEAMS_FULFILLED";
export const SET_TEAMS_REJECTED = "mellophone/teams/SET_TEAMS_REJECTED";
export const APPEND_TEAM = "mellophone/teams/APPEND_TEAM";

interface SetTeamsPendingAction {
  type: typeof SET_TEAMS_PENDING;
}

export function setTeamsPending(): SetTeamsPendingAction {
  return {
    type: SET_TEAMS_PENDING,
  };
}

interface SetTeamsFulfilledAction {
  type: typeof SET_TEAMS_FULFILLED;
  teams: ITeam[];
}

export function setTeamsFulfilled(teams: ITeam[]): SetTeamsFulfilledAction {
  return {
    type: SET_TEAMS_FULFILLED,
    teams,
  };
}

interface SetTeamsRejectedAction {
  type: typeof SET_TEAMS_REJECTED;
  error: Error;
}

export function setTeamsRejected(error: Error): SetTeamsRejectedAction {
  return {
    type: SET_TEAMS_REJECTED,
    error,
  };
}

/** Expects a promise that resolves to a set of teams, likely an API call */
export function loadTeamsThunk(teamsPromise: Promise<ITeam[]>) {
  return (dispatch: Dispatch) => {
    dispatch(setTeamsPending());
    teamsPromise
      .then(teams => dispatch(setTeamsFulfilled(teams)))
      .catch(error => dispatch(setTeamsRejected(error)));
  };
}

interface AppendTeamAction {
  type: typeof APPEND_TEAM;
  team: ITeam;
}

export function appendTeam(team: ITeam): AppendTeamAction {
  return { type: APPEND_TEAM, team };
}

type TeamsAction =
  | SetTeamsPendingAction
  | SetTeamsFulfilledAction
  | SetTeamsRejectedAction
  | AppendTeamAction
  | ClearSessionAction;

export interface TeamsState {
  teams: ITeam[];
  status: "pending" | "fulfilled" | "rejected";
  error: Error | undefined;
}

const DEFAULT_STATE: TeamsState = {
  teams: [],
  status: "pending",
  error: undefined,
};

export default function reducer(
  state: TeamsState = DEFAULT_STATE,
  action: TeamsAction
): TeamsState {
  switch (action.type) {
    case SET_TEAMS_PENDING:
      return { ...state, status: "pending" };
    case SET_TEAMS_FULFILLED:
      return { ...state, status: "fulfilled", teams: action.teams };
    case SET_TEAMS_REJECTED:
      return { ...state, status: "rejected", error: action.error };
    case APPEND_TEAM:
      return { ...state, teams: state.teams.concat([action.team]) };
    case CLEAR_SESSION:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

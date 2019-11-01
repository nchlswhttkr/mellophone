import { ITeam } from "../types";
import { CLEAR_SESSION, ClearSessionAction } from "./session";

export const APPEND_TEAMS = "mellophone/teams/APPEND_TEAMS";

interface AppendTeamsAction {
  type: typeof APPEND_TEAMS;
  teams: ITeam[];
}

export function appendTeams(teams: ITeam[]): AppendTeamsAction {
  return { type: APPEND_TEAMS, teams };
}

type TeamsAction = AppendTeamsAction | ClearSessionAction;

export interface TeamsState {
  teams: ITeam[];
}

const DEFAULT_STATE: TeamsState = {
  teams: [],
};

export default function reducer(
  state: TeamsState = DEFAULT_STATE,
  action: TeamsAction
): TeamsState {
  switch (action.type) {
    case APPEND_TEAMS:
      // Avoid appending duplicate teams by checking IDs, and uses some less
      // pretty logic to avoid mutating the current team array
      let nextTeams = Array.from(state.teams);
      for (const team of action.teams) {
        if (!nextTeams.find(nextTeam => nextTeam.id === team.id)) {
          nextTeams.push(team);
        }
      }
      return { ...state, teams: nextTeams };

    case CLEAR_SESSION:
      return DEFAULT_STATE;

    default:
      return state;
  }
}

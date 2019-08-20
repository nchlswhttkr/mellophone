import { IUser } from "../types";

export const SET_SESSION_USER = "mellophone/session/SET_SESSION_USER";
export const CLEAR_SESSION = "mellophone/session/CLEAR_SESSION";

export interface SetSessionUserAction {
  type: typeof SET_SESSION_USER;
  user?: IUser;
}

export function setSessionUser(user: IUser): SetSessionUserAction {
  return {
    type: SET_SESSION_USER,
    user,
  };
}

export interface ClearSessionAction {
  type: typeof CLEAR_SESSION;
}

export function clearSession(): ClearSessionAction {
  return { type: CLEAR_SESSION };
}

type SessionActions = SetSessionUserAction | ClearSessionAction;

export interface SessionState {
  user?: IUser;
}

export default function reducer(
  state: SessionState = {},
  action: SessionActions
): SessionState {
  switch (action.type) {
    case SET_SESSION_USER:
      return { ...state, user: action.user };
    case CLEAR_SESSION:
      return {};
    default:
      return state;
  }
}

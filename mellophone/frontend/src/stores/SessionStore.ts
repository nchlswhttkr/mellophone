import { observable, action, computed } from "mobx";
import { IUser } from "../types";

export interface ISessionStore {
  user: IUser | undefined;
  setUser: (user?: IUser) => void;
}

/**
 * All information related to the currently authenticated user is held here.
 * This can mean their user profile or the teams they are a part of.
 *
 * You can know whether a user is authenticated by null-checking.
 */
export default class SessionStore implements ISessionStore {
  @observable _user = observable.box<IUser | undefined>();

  @computed get user() {
    return this._user.get();
  }

  @action setUser(user?: IUser) {
    this._user.set(user);
  }
}

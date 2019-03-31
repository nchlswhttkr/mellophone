import { observable, computed, action } from "mobx";
import { IUser, ISessionStore, ITeam } from "../types";

/**
 * All information related to the currently authenticated user is held here.
 * This can mean their user profile or the teams they are a part of.
 *
 * You can know whether a user is authenticated by null-checking.
 */
export default class SessionStore implements ISessionStore {
  @observable private _user: IUser | undefined = undefined;
  @observable private _teams = new Map<number, ITeam>();

  @computed get user() {
    return this._user;
  }

  @computed get teams() {
    return this._teams;
  }

  @action setUser(user?: IUser) {
    this._user = user;
  }

  @action upsertTeams(teams: ITeam[]) {
    for (let team of teams) {
      this.teams.set(team.id, team);
    }
  }

  @action clearSession() {
    this._user = undefined;
    this._teams.clear();
  }
}

import { observable, runInAction } from "mobx";
import { IUser } from "../types";
import { IIdentityService } from "../network/identityService";

export interface ISessionStore {
  user: IUser | undefined;
  signIn(username: string, password: string): Promise<void>;
  signUp(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void>;
  signOut(): Promise<void>;
  loadSessionUser(): Promise<void>;
}

/**
 * All information related to the currently authenticated user is held here.
 * This can mean their user profile or the teams they are a part of.
 *
 * You can know whether a user is authenticated by null-checking.
 */
export default class SessionStore implements ISessionStore {
  private identityService: IIdentityService;
  @observable user: IUser | undefined = undefined;

  constructor(identityService: IIdentityService) {
    this.identityService = identityService;
  }

  async signIn(username: string, password: string) {
    const user = await this.identityService.signIn(username, password);
    runInAction(() => (this.user = user));
  }

  async signUp(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const user = await this.identityService.signUp(
      username,
      password,
      firstName,
      lastName
    );
    runInAction(() => (this.user = user));
  }

  async signOut() {
    if (!this.user) return; // no need to wait on a network request
    await this.identityService.signOut();
    runInAction(() => (this.user = undefined));
  }

  async loadSessionUser() {
    if (this.user) return;
    const user = await this.identityService.getSessionUser();
    runInAction(() => (this.user = user));
  }
}

import { observable, IObservableValue, action } from "mobx";

import { IUser } from "../types";

export interface ISessionStore {
  user: IObservableValue<IUser | undefined>;
  signIn(user: IUser): void;
  signOut(): void;
}

/**
 * All information related to the currently authenticated user is held here.
 * This can mean their user profile or the teams they are a part of.
 *
 * You can know whether a user is authenticated by null-checking.
 */
export default class SessionStore implements ISessionStore {
  readonly user = observable.box<IUser | undefined>();

  @action signIn(user: IUser): void {
    this.user.set(user);
  }

  @action signOut(): void {
    this.user.set(undefined);
  }
}

import { observable, computed, action } from "mobx";
import { IUser, IIdentityStore } from "../types";

/**
 * All information related to the currently authenticated user is held here.
 *
 * It might be possible remove the _state attribute, but keeping it ensures we
 * are can try and be explicit about what is readable.
 *
 * It's similar to fromPromise() from mobx-utils, but this way we can add
 * a variable like isAuthenticated() to simplify logic elsewhere.
 *
 * For anonymous users, their identity will be anonymous. Null-checking on
 * this.user is insufficient to know whether an identity check resolved.
 */
export default class IdentityStore implements IIdentityStore {
  @observable private _state: "pending" | "resolved" | "rejected" = "resolved";
  @observable user: IUser | undefined = undefined;

  @computed get pending() {
    return this._state === "pending";
  }

  @computed get resolved() {
    return this._state === "resolved";
  }

  @computed get rejected() {
    return this._state === "rejected";
  }

  @action setPending() {
    this._state = "pending";
    this.user = undefined;
  }

  @action setResolved(user?: IUser) {
    this._state = "resolved";
    this.user = user;
  }

  @action setRejected(error?: Error) {
    this._state = "rejected";
  }
}

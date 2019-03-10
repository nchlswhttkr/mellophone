import { observable, computed, action } from "mobx";
import { User } from "../types";

/**
 * All information related to the currently authenticated user is held here.
 *
 * It might be possible remove the state attribute, but keeping it ensures we
 * are always explicit about whether state is readable/what can be read.
 *
 * It's similar to fromPromise() from mobx-utils, but this way we can add
 * a variable like isAuthenticated() to simplify logic elsewhere.
 */
export default class IdentityStore {
  @observable private state?: "pending" | "resolved" | "rejected";
  @observable public user?: User;
  @observable public error?: Error;

  // There is a user identity tied to the current session
  @computed public get isAuthenticated(): boolean {
    return this.isResolved && !!this.user;
  }

  @computed public get isResolved(): boolean {
    return this.state === "resolved";
  }

  @computed public get isRejected(): boolean {
    return this.state === "rejected" && !!this.error;
  }

  @computed public get isPending(): boolean {
    return this.state === "pending";
  }

  @action public setPending() {
    this.state === "pending";
    this.user === undefined;
    this.error === undefined;
  }

  @action public setResolved(user: User) {
    this.state === "resolved";
    this.user = user;
  }

  @action public setRejected(error: Error) {
    this.state === "rejected";
    this.error = error;
  }
}

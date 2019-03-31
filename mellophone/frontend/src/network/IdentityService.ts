import BaseRequest from "../utils/BaseRequest";
import { IUser, IUserToBeCreated } from "../types";
import { sessionStore } from "../stores";
import Route from "../utils/Route";

export default class IdentityService {
  static async authenticateUser(
    email: string,
    password: string
  ): Promise<void> {
    if (!email || !password) {
      throw new Error("An email and password is needed to sign in.");
    }
    await BaseRequest.post<{ user: IUser }>(
      "/identity/sign-in",
      {},
      { Authorization: "Basic " + btoa(`${email}:${password}`) }
    );
  }

  static async createUser(
    user: IUserToBeCreated,
    password: string
  ): Promise<void> {
    const { email, firstName, lastName } = user;
    if (!email || !password || !firstName || !lastName) {
      throw new Error("New accounts must have a name, email and password.");
    }
    await BaseRequest.post<{ user: IUser }>(
      "/identity/sign-up",
      { firstName, lastName },
      { Authorization: "Basic " + btoa(`${email}:${password}`) }
    );
  }

  static async getIdentity(): Promise<IUser | undefined> {
    const response = await BaseRequest.get<{ user?: IUser }>(
      "/identity/whoami"
    );
    return response.user;
  }

  static async clearIdentity(): Promise<void> {
    await BaseRequest.post("/identity/sign-out", {});
    sessionStore.clearSession();
    new Route().buildAndNavigate();
  }
}

import BaseRequest from "../utils/BaseRequest";
import { IUser } from "../types";
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
    const response = await BaseRequest.post<{ user: IUser }>(
      "/identity/sign-in",
      {},
      {
        Authorization: "Basic " + btoa(`${email}:${password}`),
      }
    );
  }

  static async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    if (!email || !password || !firstName || !lastName) {
      throw new Error("New accounts must have a name, email and password.");
    }
    const response = await BaseRequest.post<{ user: IUser }>(
      "/identity/sign-up",
      {
        firstName,
        lastName,
      },
      {
        Authorization: "Basic " + btoa(`${email}:${password}`),
      }
    );
    sessionStore.setUser(response.user);
  }

  static async getIdentity(): Promise<void> {
    const response = await BaseRequest.get<{ user?: IUser }>(
      "/identity/whoami"
    );
    sessionStore.setUser(response.user);
  }

  static async clearIdentity(): Promise<void> {
    await BaseRequest.post("/identity/sign-out", {});
    sessionStore.clearSession();
    new Route().buildAndNavigate();
  }
}

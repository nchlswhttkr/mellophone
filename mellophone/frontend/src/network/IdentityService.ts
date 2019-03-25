import BaseRequest from "../utils/BaseRequest";
import { IUser } from "../types";
import { identityStore } from "../stores";
import Route from "../utils/Route";
import TeamService from "./TeamService";

export default class IdentityService {
  static async authenticateUser(
    email: string,
    password: string
  ): Promise<void> {
    identityStore.setPending();
    try {
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
      identityStore.setResolved(response.user);
    } catch (error) {
      identityStore.setRejected(error);
      throw error;
    }
  }

  static async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    identityStore.setPending();
    try {
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
      identityStore.setResolved(response.user);
    } catch (error) {
      identityStore.setRejected(error);
      throw error;
    }
  }

  static async getIdentity(): Promise<void> {
    identityStore.setPending();
    try {
      const response = await BaseRequest.get<{ user?: IUser }>(
        "/identity/whoami"
      );
      identityStore.setResolved(response.user);
    } catch (error) {
      identityStore.setRejected(error);
      throw error;
    }
  }

  static async clearIdentity(): Promise<void> {
    identityStore.setPending();
    try {
      await BaseRequest.post("/identity/sign-out", {});
      identityStore.setResolved();
      TeamService.clearTeams();
      new Route().buildAndNavigate();
    } catch (error) {
      identityStore.setRejected(error);
      throw error;
    }
  }
}

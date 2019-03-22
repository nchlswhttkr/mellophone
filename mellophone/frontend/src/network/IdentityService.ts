import BaseRequest from "../utils/BaseRequest";
import { IUser } from "../types";
import { identityStore } from "../stores";
import Route from "../utils/Route";

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
      const response = await BaseRequest.post<{ user: IUser }>("/sign-in", {
        email,
        password,
      });
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
      const response = await BaseRequest.post<{ user: IUser }>("/sign-up", {
        email,
        password,
        firstName,
        lastName,
      });
      identityStore.setResolved(response.user);
    } catch (error) {
      identityStore.setRejected(error);
      throw error;
    }
  }

  static async getIdentity(): Promise<void> {
    identityStore.setPending();
    try {
      const response = await BaseRequest.get<{ user?: IUser }>("/whoami");
      identityStore.setResolved(response.user);
    } catch (error) {
      identityStore.setRejected(error);
      throw error;
    }
  }

  static async clearIdentity(): Promise<void> {
    identityStore.setPending();
    try {
      await BaseRequest.post("/sign-out", {});
      identityStore.setResolved();
      new Route().buildAndNavigate();
    } catch (error) {
      identityStore.setRejected(error);
      throw error;
    }
  }
}

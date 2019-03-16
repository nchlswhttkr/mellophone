import BaseRequest from "./BaseRequest";
import { IUser } from "../types";
import { identityStore } from "../stores";

export default class IdentityService {
  static async authenticateUser(
    email: string,
    password: string
  ): Promise<void> {
    if (!email || !password) {
      throw new Error(
        "You must supply an email and password when creating signing in."
      );
    }

    const response = await BaseRequest.post<{ user: IUser }>("/sign-in", {
      email,
      password,
    });
    identityStore.setResolved(response.user);
  }

  static async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    if (!email || !password || !firstName || !lastName) {
      throw new Error(
        "You must supply a first name, last name, email and password when creating an account."
      );
    }

    const response = await BaseRequest.post<{ user: IUser }>("/sign-up", {
      email,
      password,
      firstName,
      lastName,
    });
    identityStore.setResolved(response.user);
  }

  static async getIdentity(): Promise<void> {
    identityStore.setPending();
    try {
      const response = await BaseRequest.get<{ user?: IUser }>("/whoami");
      identityStore.setResolved(response.user);
    } catch (error) {
      identityStore.setRejected(error);
    }
  }

  static async clearIdentity(): Promise<void> {
    identityStore.setPending();
    try {
      await BaseRequest.get("/sign-out");
      identityStore.setResolved();
    } catch (error) {
      identityStore.setRejected(error);
    }
  }
}

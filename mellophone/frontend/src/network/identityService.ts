import BaseRequest from "../utils/BaseRequest";
import { IUser } from "../types";

export interface IIdentityService {
  signIn(email: string, password: string): Promise<IUser>;
  signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<IUser>;
  signOut(): Promise<void>;
  getSessionUser(): Promise<IUser | undefined>;
}

const identityService: IIdentityService = {
  async signIn(email: string, password: string): Promise<IUser> {
    if (!email || !password) {
      throw new Error("An email and password is needed to sign in.");
    }
    const response = await BaseRequest.post<{ user: IUser }>(
      "/identity/sign-in",
      {},
      { Authorization: "Basic " + btoa(`${email}:${password}`) }
    );
    return response.user;
  },

  async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<IUser> {
    if (!email || !password || !firstName || !lastName) {
      throw new Error("New accounts must have a name, email and password.");
    }
    const response = await BaseRequest.post<{ user: IUser }>(
      "/identity/sign-up",
      { firstName, lastName },
      { Authorization: "Basic " + btoa(`${email}:${password}`) }
    );
    return response.user;
  },

  async getSessionUser(): Promise<IUser | undefined> {
    const response = await BaseRequest.get<{ user?: IUser }>(
      "/identity/whoami"
    );
    return response.user;
  },

  async signOut(): Promise<void> {
    await BaseRequest.post("/identity/sign-out", {});
  },
};

export default identityService;

import request from "./request";
import { IUser } from "../types";

export async function signIn(email: string, password: string): Promise<IUser> {
  if (!email || !password) {
    throw new Error("An email and password is needed to sign in.");
  }
  const response = await request.post(
    "/identity/sign-in",
    {},
    {
      headers: { Authorization: "Basic " + btoa(`${email}:${password}`) },
    }
  );
  const body = (await response.json()) as { user: IUser };
  return body.user;
}

export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<IUser> {
  if (!email || !password || !firstName || !lastName) {
    throw new Error("New accounts must have a name, email and password.");
  }
  const response = await request.post(
    "/identity/sign-up",
    { firstName, lastName },
    { headers: { Authorization: "Basic " + btoa(`${email}:${password}`) } }
  );
  const body = (await response.json()) as { user: IUser };
  return body.user;
}

export async function getSessionUser(): Promise<IUser | undefined> {
  const response = await request.get("/identity/whoami");
  const body = (await response.json()) as { user?: IUser };
  return body.user;
}

export async function signOut(): Promise<void> {
  await request.post("/identity/sign-out", {});
}

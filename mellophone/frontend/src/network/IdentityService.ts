import BaseRequest from "./BaseRequest";

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

    await BaseRequest.post("/sign-in", { email, password });
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

    await BaseRequest.post("/sign-up", {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
  }

  static async getUsername(): Promise<string> {
    const response = await BaseRequest.get<{ value: string }>("/whoami");
    return response.value;
  }
}

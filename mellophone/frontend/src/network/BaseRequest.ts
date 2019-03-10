const ROOT = "http://localhost:8000/api";

export default class BaseRequest {
  static async get<T>(route: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(ROOT + route, {
      ...options,
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    return await response.json();
  }

  static async post<T>(
    route: string,
    payload: object,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(ROOT + route, {
      ...options,
      body: JSON.stringify(payload),
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }
}

import CookieReader from "./CookieReader";

const ROOT = "/api"; // see src/setupProxy.js

export default class BaseRequest {
  static async get<ExpectedResponse>(
    route: string,
    headers: object = {}
  ): Promise<ExpectedResponse> {
    const response = await fetch(ROOT + route, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-CSRFToken": CookieReader.getCsrfToken() || "",
        ...headers,
      },
    });
    if (response.status >= 400) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  }

  static async post<ExpectedResponse>(
    route: string,
    payload: object,
    headers: object = {}
  ): Promise<ExpectedResponse> {
    const response = await fetch(ROOT + route, {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": CookieReader.getCsrfToken() || "",
        ...headers,
      },
    });
    if (response.status >= 400) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  }
}

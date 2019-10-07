import CookieReader from "../utils/CookieReader";

const ROOT = "/api"; // see src/setupProxy.js

export default class request {
  /**
   * A wrapper for making GET requests, adding common/expected headers for the
   * backend. It rejects for "bad" requests in the 400+ range.
   */
  static get(route: string, init: RequestInit = {}) {
    const config: RequestInit = {
      ...init,
      method: "GET",
      headers: withCommonHeaders(init.headers),
    };
    return fetch(ROOT + route, config).then(throwIfBadResponse);
  }

  /**
   * A wrapper for making POST requests, adding common/expected headers for the
   * backend. It rejects for "bad" requests in the 400+ range.
   */
  static post(route: string, body?: object, init: RequestInit = {}) {
    const config: RequestInit = {
      ...init,
      method: "POST",
      headers: withCommonHeaders(init.headers),
      body: JSON.stringify(body),
    };
    return fetch(ROOT + route, config).then(throwIfBadResponse);
  }
}

// Applies common headers
function withCommonHeaders(headers?: object) {
  return Object.assign({}, headers, {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRFToken": CookieReader.getCsrfToken(),
  });
}

// Reject if a response is "bad" (4XX/5XX), show an error message if one exists
async function throwIfBadResponse(response: Response) {
  if (response.status < 400) return response; // All good!

  // Error messages from the backend may exist on the body of the response
  const body = await response.json();
  if (body && body.error) {
    throw new Error(body.error);
  }
  throw new Error("Request failed"); // Catch-all if no error message exists
}

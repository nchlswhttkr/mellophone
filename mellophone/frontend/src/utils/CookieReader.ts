// Refer to https://tools.ietf.org/html/rfc6265.html#section-4.1 for grammar

export default class CookieReader {
  /**
   * Attempts to obtain the value of the 'csrftoken' cookie (expected from
   * Django), and falls back to an empty string when one is not found.
   */
  static getCsrfToken(): string {
    const match = document.cookie.match(
      /csrftoken="?([\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*)"?/
    );
    return match ? match[1] : "";
  }
}

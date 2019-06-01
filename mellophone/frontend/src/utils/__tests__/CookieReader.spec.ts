import CookieReader from "../CookieReader";

it("Returns an empty string when no CSRF token exists", async () => {
  // Expire the existing cookie
  window.document.cookie = `csrftoken=expired;expires=${new Date().toUTCString()}`;
  await new Promise(resolve => setTimeout(resolve, 100));
  expect(window.document.cookie.includes("csrftoken=expired")).toBe(false);

  const cookie = CookieReader.getCsrfToken();

  expect(cookie).toBe("");
});

it("Returns the CSRF token if it exists", () => {
  const token = "abc123";
  window.document.cookie = `csrftoken=${token}`;

  const cookie = CookieReader.getCsrfToken();

  expect(cookie).toBe(token);
});

import SessionStore from "../SessionStore";
import mock from "../../utils/mock";

it("Holds an anonymous user by default", () => {
  const store = new SessionStore();

  expect(store.user.get()).toEqual(undefined);
});

it("Clears the session user", () => {
  const store = new SessionStore();

  store.signIn(mock.user());
  expect(store.user.get()).not.toBe(undefined);

  store.signOut();
  expect(store.user.get()).toBe(undefined);
});

it("Updates the session user when one is provided", () => {
  const store = new SessionStore();
  const user = mock.user();

  store.signIn(user);
  expect(store.user.get()).toEqual(user);
});

it("Exposes an observable for the current session user", () => {
  const user = mock.user();
  const store = new SessionStore();

  expect(store.user.get()).toBe(undefined);

  store.signIn(user);
  expect(store.user.get()).toEqual(user);

  store.signIn({ ...user, firstName: "A new first name" });
  expect(store.user.get()).not.toEqual(user);

  store.signOut();
  expect(store.user.get()).toBe(undefined);
});

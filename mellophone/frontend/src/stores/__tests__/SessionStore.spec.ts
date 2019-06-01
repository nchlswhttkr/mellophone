import { computed } from "mobx";

import SessionStore from "../SessionStore";
import mock from "../../utils/mock";

it("Holds an anonymous user by default", () => {
  const store = new SessionStore();

  expect(store.user).toEqual(undefined);
});

it("Clears the session user", () => {
  const store = new SessionStore();

  store.user = mock.user();
  expect(store.user).not.toBe(undefined);

  store.user = undefined;
  expect(store.user).toBe(undefined);
});

it("Updates the session user when one is provided", () => {
  const store = new SessionStore();
  const user = mock.user();

  store.user = user;
  expect(store.user).toEqual(user);
});

it("Exposes an observable for the current session user", () => {
  const user = mock.user();
  const store = new SessionStore();

  const observedStoreUser = computed(() => store.user);
  expect(observedStoreUser.get()).toBe(undefined);

  store.user = user;
  expect(observedStoreUser.get()).toEqual(user);

  store.user = { ...user, firstName: "A new first name" };
  expect(observedStoreUser.get()).not.toEqual(user);

  store.user = undefined;
  expect(observedStoreUser.get()).toBe(undefined);
});

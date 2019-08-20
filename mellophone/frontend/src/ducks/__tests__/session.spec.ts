import { createStore } from "redux";
import reducer, { setSessionUser, clearSession } from "../session";
import mock from "../../utils/mock";

it("Has no session user by default", () => {
  const store = createStore(reducer);

  expect(store.getState().user).toBe(undefined);
});

it("Sets the session user with an action", () => {
  const store = createStore(reducer);
  const user = mock.user();

  store.dispatch(setSessionUser(user));

  expect(store.getState().user).toEqual(user);
});

it("Clears the session user with an action", () => {
  const store = createStore(reducer);

  store.dispatch(setSessionUser(mock.user()));
  store.dispatch(clearSession());

  expect(store.getState().user).toEqual(undefined);
});

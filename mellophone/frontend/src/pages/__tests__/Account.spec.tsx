import React from "react";
import { wait, fireEvent, cleanup } from "react-testing-library";
import { observable } from "mobx";

import Account from "../Account";
import TestRenderer from "../../utils/TestRenderer";
import SessionStore from "../../stores/SessionStore";
import mock from "../../utils/mock";

beforeEach(cleanup);

it("Does not render when a user is not authenticated", () => {
  const { container } = new TestRenderer().render(<Account />);

  expect(container.childElementCount).toBe(0);
});

it("Displays information about the session user", () => {
  const sessionStore = new SessionStore();
  const user = mock.user();
  sessionStore.signIn(user);

  const { queryByText } = new TestRenderer()
    .withStores({ sessionStore })
    .render(<Account />);

  expect(queryByText(user.email)).not.toBe(null);
  expect(queryByText(`${user.firstName} ${user.lastName}`)).not.toBe(null);
});

it("Allows a user to sign out", async () => {
  const sessionStore = new SessionStore();
  const user = mock.user();
  sessionStore.signIn(user);
  const signOut = jest.fn(async () => undefined);
  const { getByText, container } = new TestRenderer()
    .withStores({ sessionStore })
    .withNetwork({ signOut })
    .render(<Account />);

  fireEvent.click(getByText("Sign out"));

  await wait(() => expect(container.childElementCount).toBe(0));
  expect(signOut).toBeCalledTimes(1);
});

it("Displays an error message when signing out fails", async () => {
  const message = "Something went wrong and you could not be signed out";
  const sessionStore = new SessionStore();
  const user = mock.user();
  sessionStore.signIn(user);
  const signOut = jest.fn(async () => {
    throw new Error(message);
  });
  const { getByText, queryByText } = new TestRenderer()
    .withStores({ sessionStore })
    .withNetwork({ signOut })
    .render(<Account />);

  fireEvent.click(getByText("Sign out"));

  await wait(() => expect(queryByText(message)).not.toBe(null));
  expect(signOut).toBeCalledTimes(1);
});
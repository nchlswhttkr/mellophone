import React from "react";
import { wait, fireEvent, cleanup } from "@testing-library/react";

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
  const user = mock.user();
  const { queryByText } = new TestRenderer()
    .asAuthenticatedUser(user)
    .render(<Account />);

  expect(queryByText(user.email)).not.toBe(null);
  expect(queryByText(`${user.firstName} ${user.lastName}`)).not.toBe(null);
});

it("Allows a user to sign out", async () => {
  const signOut = jest.fn(async () => undefined);
  const { getByText, container } = new TestRenderer()
    .asAuthenticatedUser()
    .withNetwork({ signOut })
    .render(<Account />);

  fireEvent.click(getByText("Sign out"));

  await wait(() => expect(container.childElementCount).toBe(0));
  expect(signOut).toBeCalledTimes(1);
});

it("Displays an error message when signing out fails", async () => {
  const message = "Something went wrong and you could not be signed out";
  const signOut = jest.fn(async () => {
    throw new Error(message);
  });
  const { getByText, queryByText } = new TestRenderer()
    .asAuthenticatedUser()
    .withNetwork({ signOut })
    .render(<Account />);

  fireEvent.click(getByText("Sign out"));

  await wait(() => expect(queryByText(message)).not.toBe(null));
  expect(signOut).toBeCalledTimes(1);
});

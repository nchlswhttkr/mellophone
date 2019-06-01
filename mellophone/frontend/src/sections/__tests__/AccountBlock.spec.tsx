import React from "react";
import { render, cleanup, fireEvent, wait } from "react-testing-library";

import AccountBlock from "../AccountBlock";
import mock from "../../utils/mock";

beforeEach(() => {
  cleanup();
});

it("Renders nothing when no user exists", () => {
  const { container } = render(<AccountBlock signOut={Promise.resolve} />);
  expect(container.childElementCount).toBe(0);
});

it("Shows a user's profile if they are authenticated", () => {
  const user = mock.user();
  const { queryByText } = render(
    <AccountBlock user={user} signOut={Promise.resolve} />
  );

  expect(queryByText(`${user.firstName} ${user.lastName}`)).not.toBe(null);
  expect(queryByText(user.email)).not.toBe(null);
  expect(queryByText(`User #${user.id} of Mellophone!`)).not.toBe(null);
});

it("Triggers signOut when a user clicks to sign out", () => {
  const user = mock.user();
  const signOut = jest.fn(async () => undefined);
  const { getByText } = render(<AccountBlock user={user} signOut={signOut} />);

  fireEvent.click(getByText("Sign out"));

  expect(signOut).toBeCalledTimes(1);
});

it("Shows an error when signing out fails", async () => {
  const message = "An error occured while signing out";
  const user = mock.user();
  const signOut = jest.fn(async () => {
    throw new Error(message);
  });
  const { getByText, queryByText } = render(
    <AccountBlock user={user} signOut={signOut} />
  );

  fireEvent.click(getByText("Sign out"));

  await wait(() => expect(queryByText(message)).not.toBe(null));
});

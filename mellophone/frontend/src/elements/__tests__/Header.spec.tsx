import React from "react";
import { observable } from "mobx";
import { cleanup, render, wait } from "react-testing-library";

import Header from "../Header";
import mock from "../../utils/mock";
import { IUser } from "../../types";

beforeEach(cleanup);

it("Directs unauthenticated users to sign in", () => {
  const user = observable.box(undefined);
  const { queryByText } = render(<Header user={user} />);

  expect(queryByText("Sign in")).not.toBe(null);
});

it("Directs authenticated users to their account", () => {
  const user = observable.box(mock.user());
  const { queryByText } = render(<Header user={user} />);

  expect(queryByText("Account")).not.toBe(null);
});

it("Reacts when a user signs in or signs out", async () => {
  const user = observable.box<IUser | undefined>(undefined);
  const { queryByText } = render(<Header user={user} />);

  await wait(() => expect(queryByText("Sign in")).not.toBe(null));

  user.set(mock.user());
  expect(queryByText("Account")).not.toBe(null);

  user.set(undefined);
  await wait(() => expect(queryByText("Sign in")).not.toBe(null));
});

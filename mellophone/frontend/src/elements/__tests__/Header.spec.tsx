import React from "react";
import { cleanup, render, wait } from "react-testing-library";

import Header from "../Header";
import { ISessionStore } from "../../stores/SessionStore";
import { observable } from "mobx";

describe("Elements - Header", () => {
  let sessionStore: ISessionStore;

  beforeEach(() => {
    cleanup();
    sessionStore = {
      user: {
        firstName: "John",
        lastName: "Doe",
        email: "john@email.com",
        id: 1,
      },
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      loadSessionUser: jest.fn(),
    };
  });

  it("Directs unauthenticated users to sign in", () => {
    sessionStore.user = undefined;
    const { queryByText } = render(<Header sessionStore={sessionStore} />);

    expect(queryByText("Sign in")).not.toBe(null);
  });

  it("Directs authenticated users to their account", () => {
    const { queryByText } = render(<Header sessionStore={sessionStore} />);

    expect(queryByText("Account")).not.toBe(null);
  });

  it("Rerenders when a user signs in or signs out", async () => {
    const store = observable(sessionStore);
    const { queryByText } = render(<Header sessionStore={store} />);

    expect(queryByText("Account")).not.toBe(null);

    store.user = undefined;

    await wait(() => expect(queryByText("Sign in")).not.toBe(null));
  });
});

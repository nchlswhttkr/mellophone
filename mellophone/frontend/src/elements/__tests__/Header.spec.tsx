import React from "react";
import { cleanup, render, wait } from "react-testing-library";

import Header from "../Header";
import SessionStore from "../../stores/SessionStore";

describe("Elements - Header", () => {
  const mockUser = {
    id: 1,
    firstName: "Nicholas",
    lastName: "Whittaker",
    email: "nicholas@email.com",
  };

  beforeEach(cleanup);

  it("Directs unauthenticated users to sign in", () => {
    const store = new SessionStore();
    const { queryByText } = render(<Header sessionStore={store} />);

    expect(queryByText("Sign in")).not.toBe(null);
  });

  it("Directs authenticated users to their account", () => {
    const store = new SessionStore();
    store.user = mockUser;
    const { queryByText } = render(<Header sessionStore={store} />);

    expect(queryByText("Account")).not.toBe(null);
  });

  it("Reacts when a user signs in or signs out", async () => {
    const store = new SessionStore();
    const { queryByText } = render(<Header sessionStore={store} />);

    await wait(() => expect(queryByText("Sign in")).not.toBe(null));

    store.user = mockUser;
    expect(queryByText("Account")).not.toBe(null);

    store.user = undefined;
    await wait(() => expect(queryByText("Sign in")).not.toBe(null));
  });
});

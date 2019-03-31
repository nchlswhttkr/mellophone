import React from "react";
import { render, cleanup, fireEvent, wait } from "react-testing-library";
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  History,
} from "@reach/router";

import SessionStore from "../../../stores/SessionStore";
import { ISessionStore } from "../../../types";
import AccountBlock from "../AccountBlock";

function renderWithHistory(children: React.ReactNode, history: History) {
  return render(
    <LocationProvider history={history}>{children}</LocationProvider>
  );
}

describe("Components - Sections - AccountBlock", () => {
  let history: History;
  let signOut = jest.fn();
  let sessionStore: ISessionStore;

  beforeEach(() => {
    cleanup();
    history = createHistory(createMemorySource("/account"));
    signOut.mockReset();
    sessionStore = new SessionStore();
  });

  it("Shows nothing if no user is authenticated", () => {
    sessionStore.setUser(undefined);
    const { container } = render(
      <AccountBlock sessionStore={sessionStore} signOut={signOut} />
    );

    expect(container.childElementCount).toBe(0);
  });

  it("Shows a user's profile if they are authenticated", () => {
    sessionStore.setUser({
      firstName: "John",
      lastName: "Doe",
      id: "16",
      email: "john@email.com",
    });
    const { queryByText } = render(
      <AccountBlock sessionStore={sessionStore} signOut={signOut} />
    );

    const name = queryByText("John Doe");
    const email = queryByText("john@email.com");
    const id = queryByText("User #16 of Mellophone!");

    expect(name).not.toBeNull();
    expect(email).not.toBeNull();
    expect(id).not.toBeNull();
  });

  it("Triggers signOut when a user clicks to sign out", async () => {
    history.navigate("/account");
    sessionStore.setUser({
      firstName: "John",
      lastName: "Doe",
      id: "16",
      email: "john@email.com",
    });
    const { getByText } = renderWithHistory(
      <AccountBlock sessionStore={sessionStore} signOut={signOut} />,
      history
    );

    fireEvent.click(getByText("Sign out"));

    expect(signOut).toBeCalledTimes(1);
    expect(window.location.pathname).toBe("/");
  });
});

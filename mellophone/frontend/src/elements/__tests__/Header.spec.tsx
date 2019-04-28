import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";

import SessionStore from "../../stores/SessionStore";
import { ISessionStore } from "../../types";
import Header from "../Header";
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  History,
} from "@reach/router";

function renderWithHistory(children: React.ReactNode, history: History) {
  return render(
    <LocationProvider history={history}>{children}</LocationProvider>
  );
}

describe("Components - Sections - Header", () => {
  let history: History;
  let sessionStore: ISessionStore;

  beforeEach(() => {
    history = createHistory(createMemorySource("/"));
    sessionStore = new SessionStore();
    cleanup();
  });

  it("Direct unauthenticated users to sign in", () => {
    sessionStore.setUser(undefined);
    const { getByText } = renderWithHistory(
      <Header sessionStore={sessionStore} />,
      history
    );

    fireEvent.click(getByText("Sign in"));

    expect(history.location.pathname).toBe("/sign-in");
  });

  it("Direct authenticated users to their account page", () => {
    sessionStore.setUser({
      firstName: "John",
      lastName: "Doe",
      email: "john@email.com",
      id: 1,
    });
    const { getByText } = renderWithHistory(
      <Header sessionStore={sessionStore} />,
      history
    );

    fireEvent.click(getByText("Account"));

    expect(history.location.pathname).toBe("/account");
  });
});

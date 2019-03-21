import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";

import IdentityStore from "../../../stores/IdentityStore";
import { IIdentityStore } from "../../../types";
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
  let identityStore: IIdentityStore;

  beforeEach(() => {
    history = createHistory(createMemorySource("/"));
    identityStore = new IdentityStore();
    cleanup();
  });

  it("Direct unauthenticated users to sign in", () => {
    identityStore.setResolved(undefined);
    const { getByText } = renderWithHistory(
      <Header identityStore={identityStore} />,
      history
    );

    fireEvent.click(getByText("Sign in"));

    expect(history.location.pathname).toBe("/sign-in");
  });

  it("Direct authenticated users to their account page", () => {
    identityStore.setResolved({
      firstName: "John",
      lastName: "Doe",
      email: "john@email.com",
      id: "1",
    });
    const { getByText } = renderWithHistory(
      <Header identityStore={identityStore} />,
      history
    );

    fireEvent.click(getByText("Account"));

    expect(history.location.pathname).toBe("/account");
  });
});

import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";

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

  beforeEach(() => {
    history = createHistory(createMemorySource("/"));
    cleanup();
  });

  it("Direct unauthenticated users to sign in", () => {
    const { getByText } = renderWithHistory(<Header />, history);

    fireEvent.click(getByText("Sign in"));

    expect(history.location.pathname).toBe("/sign-in");
  });

  it("Direct authenticated users to their account page", () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      email: "john@email.com",
      id: 1,
    };
    const { getByText } = renderWithHistory(<Header user={user} />, history);

    fireEvent.click(getByText("Account"));

    expect(history.location.pathname).toBe("/account");
  });
});

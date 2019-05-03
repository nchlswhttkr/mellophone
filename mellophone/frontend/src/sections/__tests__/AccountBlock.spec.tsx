import React from "react";
import { render, cleanup, fireEvent, wait } from "react-testing-library";
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  History,
} from "@reach/router";

import AccountBlock from "../AccountBlock";

function renderWithHistory(children: React.ReactNode, history: History) {
  return render(
    <LocationProvider history={history}>{children}</LocationProvider>
  );
}

describe("Components - Sections - AccountBlock", () => {
  let history: History;
  let signOut = jest.fn();

  beforeEach(() => {
    cleanup();
    history = createHistory(createMemorySource("/account"));
    signOut.mockReset();
  });

  it("Shows nothing if no user is authenticated", () => {
    const { container } = render(<AccountBlock signOut={signOut} />);

    expect(container.childElementCount).toBe(0);
  });

  it("Shows a user's profile if they are authenticated", () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      id: 16,
      email: "john@email.com",
    };
    const { queryByText } = render(
      <AccountBlock user={user} signOut={signOut} />
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
    const user = {
      firstName: "John",
      lastName: "Doe",
      id: 16,
      email: "john@email.com",
    };
    const { getByText } = renderWithHistory(
      <AccountBlock user={user} signOut={signOut} />,
      history
    );

    fireEvent.click(getByText("Sign out"));

    expect(signOut).toBeCalledTimes(1);
    expect(window.location.pathname).toBe("/");
  });
});

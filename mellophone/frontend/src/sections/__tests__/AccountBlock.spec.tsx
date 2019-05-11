import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import AccountBlock from "../AccountBlock";

describe("Sections - AccountBlock", () => {
  let signOut = jest.fn();

  beforeEach(() => {
    cleanup();
    signOut.mockReset();
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

    expect(name).not.toBe(null);
    expect(email).not.toBe(null);
    expect(id).not.toBe(null);
  });

  it("Triggers signOut when a user clicks to sign out", () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      id: 16,
      email: "john@email.com",
    };
    const { getByText } = render(
      <AccountBlock user={user} signOut={signOut} />
    );

    fireEvent.click(getByText("Sign out"));

    expect(signOut).toBeCalledTimes(1);
  });
});

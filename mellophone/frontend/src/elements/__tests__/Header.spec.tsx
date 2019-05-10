import React from "react";
import { cleanup, render } from "react-testing-library";

import Header from "../Header";

describe("Elements - Header", () => {
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john@email.com",
    id: 1,
  };

  beforeEach(() => {
    cleanup();
  });

  it("Directs unauthenticated users to sign in", () => {
    const { queryByText } = render(<Header />);

    expect(queryByText("Sign in")).not.toBe(null);
  });

  it("Directs authenticated users to their account", async () => {
    const { queryByText } = render(<Header user={mockUser} />);

    expect(queryByText("Account")).not.toBe(null);
  });
});

import React from "react";
import { render, cleanup } from "react-testing-library";

import IdentityStore from "../../../stores/IdentityStore";
import { IIdentityStore } from "../../../types";
import AccountBlock from "../AccountBlock";

describe("Components/Sections/AccountBlock", () => {
  let identityStore: IIdentityStore;

  beforeEach(() => {
    identityStore = new IdentityStore();
    cleanup();
  });

  it("Shows nothing if no user is authenticated", () => {
    identityStore.setResolved(undefined);
    const { container } = render(
      <AccountBlock identityStore={identityStore} />
    );

    expect(container.children).toHaveLength(0);
  });

  it("Shows a user's profile if they are authenticated", () => {
    identityStore.setResolved({
      firstName: "John",
      lastName: "Doe",
      id: "16",
      email: "john@email.com",
    });
    const { queryByText } = render(
      <AccountBlock identityStore={identityStore} />
    );

    const name = queryByText("John Doe");
    const email = queryByText("john@email.com");
    const id = queryByText("User #16 of Mellophone!");

    expect(name).not.toBeNull();
    expect(email).not.toBeNull();
    expect(id).not.toBeNull();
  });
});

import React from "react";
import { cleanup, wait, prettyDOM } from "react-testing-library";
import { ISessionStore } from "../../stores/SessionStore";
import requireAuthentication from "../requireAuthentication";
import { IUser } from "../../types";
import { observable } from "mobx";
import { renderWithStores } from "../../utils/testRenderers";
import { navigate } from "@reach/router";

describe("Utils - requireAuthentication", () => {
  let sessionStore: ISessionStore;
  function SessionUserEmail(props: { sessionUser: IUser }) {
    return <p>{props.sessionUser.email}</p>;
  }
  const mockUser: IUser = {
    id: 1,
    email: "nicholas@email.com",
    firstName: "John",
    lastName: "Doe",
  };

  beforeEach(() => {
    cleanup();
    sessionStore = observable({
      user: undefined,
      loadSessionUser: jest.fn(),
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    });
    navigate("/");
  });

  it("Redirects when the loaded user is anonymous", async () => {
    expect(window.location.pathname).not.toBe("/sign-in");

    const Component = requireAuthentication(SessionUserEmail);
    const { container } = renderWithStores(<Component />, { sessionStore });

    await wait(() => expect(window.location.pathname).toBe("/sign-in"));

    expect(container.childElementCount).toBe(0);
  });

  it("Renders the child component when an authenticated user is loaded", () => {
    expect(window.location.pathname).not.toBe("/sign-in");

    sessionStore.user = mockUser;
    const Component = requireAuthentication(SessionUserEmail);
    const { queryByText } = renderWithStores(<Component />, { sessionStore });

    expect(queryByText(mockUser.email)).not.toBe(null);
    expect(window.location.pathname).not.toBe("/sign-in");
  });

  it("Redirects when a user goes becomes anonymous after the initial mount", async () => {
    expect(window.location.pathname).not.toBe("/sign-in");

    sessionStore.user = mockUser;
    const Component = requireAuthentication(SessionUserEmail);
    const { container, queryByText } = renderWithStores(<Component />, {
      sessionStore,
    });

    expect(queryByText(mockUser.email)).not.toBe(null);

    // If the session user disappears, they should be redirected to sign in
    sessionStore.user = undefined;
    await wait(() => expect(window.location.pathname).toBe("/sign-in"));
    expect(container.childElementCount).toBe(0);
  });
});

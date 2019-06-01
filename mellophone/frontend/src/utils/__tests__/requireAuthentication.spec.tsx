import React from "react";
import { render, cleanup, wait } from "react-testing-library";

import SessionStore, { ISessionStore } from "../../stores/SessionStore";
import requireAuthentication from "../requireAuthentication";
import { IUser } from "../../types";
import TestRenderer from "../TestRenderer";
import { navigate } from "@reach/router";

let sessionStore: ISessionStore;
const ChildComponent = () => <h1>This is a child component</h1>;
const mockUser: IUser = {
  id: 1,
  email: "nicholas@email.com",
  firstName: "John",
  lastName: "Doe",
};

beforeEach(() => {
  cleanup();
  sessionStore = new SessionStore();
  navigate("/");
});

it("Redirects when the loaded user is anonymous", async () => {
  expect(window.location.pathname).not.toBe("/sign-in");

  const Component = requireAuthentication(ChildComponent);
  const { container } = new TestRenderer()
    .withStores({ sessionStore })
    .render(<Component />);

  await wait(() => expect(window.location.pathname).toBe("/sign-in"));

  expect(container.childElementCount).toBe(0);
});

it("Renders the child component when an authenticated user is loaded", () => {
  expect(window.location.pathname).not.toBe("/sign-in");

  sessionStore.user = mockUser;
  const Component = requireAuthentication(ChildComponent);
  const { queryByText } = new TestRenderer()
    .withStores({ sessionStore })
    .render(<Component />);

  expect(queryByText("This is a child component")).not.toBe(null);
  expect(window.location.pathname).not.toBe("/sign-in");
});

it("Redirects when a user goes becomes anonymous after the initial mount", async () => {
  expect(window.location.pathname).not.toBe("/sign-in");

  sessionStore.user = mockUser;
  const Component = requireAuthentication(ChildComponent);
  const { container, queryByText } = new TestRenderer()
    .withStores({ sessionStore })
    .render(<Component />);

  expect(queryByText("This is a child component")).not.toBe(null);

  // If the session user disappears, they should be redirected to sign in
  sessionStore.user = undefined;
  await wait(() => expect(window.location.pathname).toBe("/sign-in"));
  expect(container.childElementCount).toBe(0);
});

it("Renders a fallback if one is provided for anonymous users instead of redirecting", () => {
  expect(window.location.pathname).not.toBe("/sign-in");

  const FallbackComponent = () => <h1>This is a fallback component</h1>;
  const Component = requireAuthentication(ChildComponent, FallbackComponent);
  const { queryByText } = new TestRenderer()
    .withStores({ sessionStore })
    .render(<Component />);

  expect(queryByText("This is a fallback component")).not.toBe(null);
  expect(window.location.pathname).not.toBe("/sign-in");
});

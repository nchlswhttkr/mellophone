import React from "react";
import { cleanup, wait } from "@testing-library/react";

import requireAuthentication from "../requireAuthentication";
import TestRenderer from "../TestRenderer";
import { navigate } from "@reach/router";
import mock from "../mock";

const ChildComponent = () => <h1>This is a child component</h1>;

beforeEach(() => {
  cleanup();
  navigate("/");
});

it("Redirects when the loaded user is anonymous", async () => {
  const Component = requireAuthentication(ChildComponent);
  const { container } = new TestRenderer().render(<Component />);

  await wait(() => expect(window.location.pathname).toBe("/sign-in"));
  expect(container.childElementCount).toBe(0);
});

it("Renders the child component when an authenticated user is loaded", () => {
  const Component = requireAuthentication(ChildComponent);
  const { queryByText } = new TestRenderer()
    .asAuthenticatedUser()
    .render(<Component />);

  expect(queryByText("This is a child component")).not.toBe(null);
  expect(window.location.pathname).not.toBe("/sign-in");
});

it("Redirects when a user goes becomes anonymous after the initial mount", async () => {
  const Component = requireAuthentication(ChildComponent);
  const { container, queryByText } = new TestRenderer().render(<Component />);

  expect(queryByText("This is a child component")).not.toBe(null);

  // If the session user disappears, they should be redirected to sign in
  await wait(() => expect(window.location.pathname).toBe("/sign-in"));
  expect(container.childElementCount).toBe(0);
});

it("Renders a fallback if one is provided for anonymous users instead of redirecting", () => {
  const FallbackComponent = () => <h1>This is a fallback component</h1>;
  const Component = requireAuthentication(ChildComponent, FallbackComponent);
  const { queryByText } = new TestRenderer().render(<Component />);

  expect(queryByText("This is a fallback component")).not.toBe(null);
  expect(window.location.pathname).not.toBe("/sign-in");
});

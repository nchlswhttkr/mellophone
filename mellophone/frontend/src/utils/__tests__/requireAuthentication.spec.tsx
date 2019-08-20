import React from "react";
import { wait } from "@testing-library/react";

import requireAuthentication from "../requireAuthentication";
import TestRenderer from "../TestRenderer";
import { clearSession } from "../../ducks/session";

const ChildComponent = () => <h1>This is a child component</h1>;

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

it("Redirects when a user signs outs after the initial mount and stops rendering the child component", async () => {
  const Component = requireAuthentication(ChildComponent);
  const {
    queryByText,
    store,
  } = new TestRenderer().asAuthenticatedUser().render(<Component />);

  expect(queryByText("This is a child component")).not.toBe(null);

  store.dispatch(clearSession());

  // If the session user disappears, they should be redirected to sign in
  await wait(() => expect(window.location.pathname).toBe("/sign-in"));
  expect(queryByText("This is a child component")).toBe(null);
});

it("Renders a fallback if one is provided for anonymous users instead of redirecting", () => {
  const FallbackComponent = () => <h1>This is a fallback component</h1>;
  const Component = requireAuthentication(ChildComponent, FallbackComponent);
  const { queryByText } = new TestRenderer().render(<Component />);

  expect(queryByText("This is a fallback component")).not.toBe(null);
  expect(window.location.pathname).not.toBe("/sign-in");
});

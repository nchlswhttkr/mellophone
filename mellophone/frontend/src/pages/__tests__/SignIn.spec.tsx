import React from "react";
import { fireEvent, cleanup, wait } from "react-testing-library";

import SignIn from "../SignIn";
import mock from "../../utils/mock";
import TestRenderer from "../../utils/TestRenderer";
import SessionStore from "../../stores/SessionStore";
import { navigate } from "@reach/router";

beforeEach(() => {
  cleanup();
  navigate("/sign-in");
});

it("Can toggle back and forth between signing in and signing up", () => {
  const { getByText, queryByText } = new TestRenderer().render(<SignIn />);

  expect(queryByText("Sign up to Mellophone")).not.toBe(null);

  fireEvent.click(getByText("Sign in to an existing account"));
  expect(queryByText("Sign in to Mellophone")).not.toBe(null);

  fireEvent.click(getByText("Create an account"));
  expect(queryByText("Sign up to Mellophone")).not.toBe(null);
});

it("Allows users to sign up, redirecting them to the home page", async () => {
  const sessionStore = new SessionStore();
  const user = mock.user();
  const signUp = jest.fn(async () => user);
  const { getByLabelText, getByText } = new TestRenderer()
    .withNetwork({ signUp })
    .withStores({ sessionStore })
    .render(<SignIn />);

  fireEvent.input(getByLabelText("First name"), {
    target: { value: user.firstName },
  });
  fireEvent.input(getByLabelText("Last name"), {
    target: { value: user.lastName },
  });
  fireEvent.input(getByLabelText("Email"), {
    target: { value: user.email },
  });
  fireEvent.input(getByLabelText("Password"), {
    target: { value: "hunter2" },
  });
  fireEvent.click(getByText("Sign up"));

  await wait(() => expect(window.location.pathname).toBe("/"));
  expect(signUp).toBeCalledTimes(1);
  expect(signUp).toBeCalledWith(
    user.email,
    "hunter2",
    user.firstName,
    user.lastName
  );
  expect(sessionStore.user).toEqual(user);
});

it("Displays an error when signing up fails", async () => {
  const message = "You are not able to sign up";
  const signUp = jest.fn(async () => {
    throw new Error(message);
  });
  const { queryByText, getByText } = new TestRenderer()
    .withNetwork({ signUp })
    .render(<SignIn />);

  fireEvent.click(getByText("Sign up"));

  await wait(() => expect(queryByText(message)).not.toBe(null));
  expect(signUp).toBeCalledTimes(1);
});

it("Allows users to sign in, redirecting them to the home page", async () => {
  const sessionStore = new SessionStore();
  const user = mock.user();
  const signIn = jest.fn(async () => user);
  const { getByLabelText, getByText } = new TestRenderer()
    .withNetwork({ signIn })
    .withStores({ sessionStore })
    .render(<SignIn />);

  fireEvent.click(getByText("Sign in to an existing account"));
  fireEvent.input(getByLabelText("Email"), {
    target: { value: user.email },
  });
  fireEvent.input(getByLabelText("Password"), {
    target: { value: "hunter2" },
  });
  fireEvent.click(getByText("Sign in"));

  await wait(() => expect(window.location.pathname).toBe("/"));
  expect(signIn).toBeCalledTimes(1);
  expect(signIn).toBeCalledWith(user.email, "hunter2");
  expect(sessionStore.user).toEqual(user);
});

it("Displays an error when signing in fails", async () => {
  const message = "You are not able to sign in";
  const signIn = jest.fn(async () => {
    throw new Error(message);
  });
  const { queryByText, getByText } = new TestRenderer()
    .withNetwork({ signIn })
    .render(<SignIn />);

  fireEvent.click(getByText("Sign in to an existing account"));
  fireEvent.click(getByText("Sign in"));

  await wait(() => expect(queryByText(message)).not.toBe(null));
  expect(signIn).toBeCalledTimes(1);
});

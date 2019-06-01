import React from "react";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";

import SignInForm from "../SignInForm";

beforeEach(cleanup);

it("Signs in a user who enters a username and password", () => {
  const signIn = jest.fn(async () => undefined);
  const { getByLabelText, getByText } = render(<SignInForm signIn={signIn} />);

  fireEvent.input(getByLabelText("Email"), {
    target: { value: "username@email.com" },
  });
  fireEvent.input(getByLabelText("Password"), {
    target: { value: "hunter2" },
  });
  fireEvent.click(getByText("Sign in"));

  expect(signIn).toBeCalledTimes(1);
  expect(signIn).toBeCalledWith("username@email.com", "hunter2");
});

it("Displays the error message of signIn if it throws an error", async () => {
  const message = "Unable to sign in an unknown reason";
  const signIn = jest.fn(async () => {
    throw new Error(message);
  });
  const { getByLabelText, getByText, queryByText } = render(
    <SignInForm signIn={signIn} />
  );

  fireEvent.input(getByLabelText("Email"), {
    target: { value: "username@email.com" },
  });
  fireEvent.input(getByLabelText("Password"), {
    target: { value: "hunter2" },
  });
  fireEvent.click(getByText("Sign in"));

  await wait(() => expect(queryByText(message)).not.toBe(null));
  expect(signIn).toBeCalledTimes(1);
  expect(signIn).toBeCalledWith("username@email.com", "hunter2");
});

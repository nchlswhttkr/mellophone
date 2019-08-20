import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import SignUpForm from "../SignUpForm";

it("Signs up a user who enters a username and password", () => {
  const signUp = jest.fn(async () => undefined);
  const { getByLabelText, getByText } = render(<SignUpForm signUp={signUp} />);

  fireEvent.input(getByLabelText("Email"), {
    target: { value: "username@email.com" },
  });
  fireEvent.input(getByLabelText("Password"), {
    target: { value: "hunter2" },
  });
  fireEvent.input(getByLabelText("First name"), {
    target: { value: "Nicholas" },
  });
  fireEvent.input(getByLabelText("Last name"), {
    target: { value: "Whittaker" },
  });
  fireEvent.click(getByText("Sign up"));

  expect(signUp).toBeCalledTimes(1);
  expect(signUp).toBeCalledWith(
    "username@email.com",
    "hunter2",
    "Nicholas",
    "Whittaker"
  );
});

it("Displays the error message of signUp if it throws an error", async () => {
  const message = "Unable to sign up for an unknown reason";
  const signUp = jest.fn(async () => {
    throw new Error(message);
  });
  const { getByText, queryByText } = render(<SignUpForm signUp={signUp} />);

  fireEvent.click(getByText("Sign up"));

  await wait(() => expect(queryByText(message)).not.toBe(null));
  expect(signUp).toBeCalledTimes(1);
});

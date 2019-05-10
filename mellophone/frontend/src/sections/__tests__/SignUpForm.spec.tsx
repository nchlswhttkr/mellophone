import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import SignUpForm from "../SignUpForm";

describe("Sections - SignUpForm", () => {
  beforeEach(cleanup);

  it("Signs up a user who enters a username and password", () => {
    const signUp = jest.fn();
    const { getByLabelText, getByText } = render(
      <SignUpForm signUp={signUp} />
    );

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
      {
        email: "username@email.com",
        firstName: "Nicholas",
        lastName: "Whittaker",
      },
      "hunter2"
    );
  });

  it("Displays the error message of signUp if it throws an error", () => {
    const signUp = jest.fn(() => {
      throw new Error("Unable to sign up for an unknown reason");
    });
    const { getByLabelText, getByText, queryByText } = render(
      <SignUpForm signUp={signUp} />
    );

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
      {
        email: "username@email.com",
        firstName: "Nicholas",
        lastName: "Whittaker",
      },
      "hunter2"
    );
    expect(queryByText("Unable to sign up for an unknown reason")).not.toBe(
      null
    );
  });
});

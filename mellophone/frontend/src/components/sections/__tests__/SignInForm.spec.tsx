import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import SignInForm from "../SignInForm";

describe("Components -  Sections - SignInForm", () => {
  beforeEach(cleanup);

  it("Signs in a user who enters a username and password", () => {
    const signIn = jest.fn();
    const { getByLabelText, getByText } = render(
      <SignInForm signIn={signIn} />
    );

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

  it("Displays the error message of signIn if it throws an error", () => {
    const signIn = jest.fn(() => {
      throw new Error("Unable to sign in an unknown reason");
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

    expect(signIn).toBeCalledTimes(1);
    expect(signIn).toBeCalledWith("username@email.com", "hunter2");
    expect(queryByText("Unable to sign in an unknown reason")).not.toBeNull();
  });
});

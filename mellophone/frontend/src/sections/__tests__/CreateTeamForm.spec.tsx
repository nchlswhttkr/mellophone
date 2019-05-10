import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import CreateTeamForm from "../CreateTeamForm";

describe("Sections - CreateTeamForm", () => {
  let createTeam = jest.fn();

  beforeEach(() => {
    createTeam.mockReset();
    cleanup();
  });

  it("Creates a team when the form is submitted", () => {
    const { getByLabelText, getByText } = render(
      <CreateTeamForm createTeam={createTeam} />
    );

    fireEvent.input(getByLabelText("Team name"), {
      target: { value: "Western Brass" },
    });
    fireEvent.input(getByLabelText("Website"), {
      target: { value: "https://facebook.com/WesternBrass" },
    });
    fireEvent.click(getByText("Create team"));

    expect(createTeam).toBeCalledTimes(1);
    expect(createTeam).toBeCalledWith(
      "Western Brass",
      "https://facebook.com/WesternBrass"
    );
  });

  it("Displays the error message of createTeam if it throws an error", () => {
    createTeam = jest.fn(() => {
      throw new Error("Unable to create a team at this time.");
    });
    const { getByText, queryByText } = render(
      <CreateTeamForm createTeam={createTeam} />
    );

    fireEvent.click(getByText("Create team"));

    expect(createTeam).toBeCalledTimes(1);
    expect(queryByText("Unable to create a team at this time.")).not.toBe(null);
  });
});

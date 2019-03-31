import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import CreateTeamForm from "../CreateTeamForm";
import SessionStore from "../../../stores/SessionStore";
import { ISessionStore } from "../../../types";

describe("Components -  Sections - CreateTeamForm", () => {
  let createTeam = jest.fn();
  let sessionStore: ISessionStore = new SessionStore();

  beforeEach(() => {
    createTeam.mockReset();
    sessionStore.setUser({
      id: 1,
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    cleanup();
  });

  it("Does not render if a user is not authenticated", () => {
    sessionStore.setUser();
    const { container } = render(
      <CreateTeamForm sessionStore={sessionStore} createTeam={createTeam} />
    );

    expect(container.childElementCount).toBe(0);
  });

  it("Creates a team when the form is submitted", () => {
    const { getByLabelText, getByText } = render(
      <CreateTeamForm sessionStore={sessionStore} createTeam={createTeam} />
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
    const { getByLabelText, getByText, queryByText } = render(
      <CreateTeamForm sessionStore={sessionStore} createTeam={createTeam} />
    );

    fireEvent.click(getByText("Create team"));

    expect(createTeam).toBeCalledTimes(1);
    expect(queryByText("Unable to create a team at this time.")).not.toBeNull();
  });
});

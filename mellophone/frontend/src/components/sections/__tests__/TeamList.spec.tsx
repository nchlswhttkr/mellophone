import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import TeamList from "../TeamList";
import { ISessionStore } from "../../../types";
import SessionStore from "../../../stores/SessionStore";
import { navigate } from "@reach/router";

describe("Components - Sections - TeamList", () => {
  let createTeam = jest.fn();
  let sessionStore: ISessionStore;

  beforeEach(() => {
    cleanup();
    createTeam.mockReset();
    sessionStore = new SessionStore();
  });

  it("Does not render if a user is not authenticated", () => {
    sessionStore.setUser(undefined);
    const { container } = render(
      <TeamList createTeam={createTeam} sessionStore={sessionStore} />
    );

    expect(container.childElementCount).toBe(0);
  });

  it("Allows authenticated users to create a team if they are lonely", () => {
    sessionStore.setUser({
      id: "1",
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    const { getByText } = render(
      <TeamList createTeam={createTeam} sessionStore={sessionStore} />
    );

    fireEvent.click(getByText("Create team"));

    expect(createTeam).toBeCalledTimes(1);
  });

  it("Shows a list of teams for an authenticated user", () => {
    sessionStore.setUser({
      id: "1",
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    sessionStore.upsertTeams([
      {
        id: "1",
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
      {
        id: "2",
        name: "Glen Eira Band",
        website: "http://gleneiraband.com.au",
      },
    ]);
    const { queryByText } = render(
      <TeamList createTeam={createTeam} sessionStore={sessionStore} />
    );

    expect(queryByText("Western Brass")).not.toBeNull();
    expect(queryByText("Glen Eira Band")).not.toBeNull();
  });

  it("Directs a user to a team's profile when they select its name", () => {
    navigate("/");
    sessionStore.setUser({
      id: "1",
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    sessionStore.upsertTeams([
      {
        id: "33",
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
    ]);
    const { getByText } = render(
      <TeamList createTeam={createTeam} sessionStore={sessionStore} />
    );

    fireEvent.click(getByText("Western Brass"));

    expect(window.location.pathname).toBe("/teams/33");
  });

  it("Allows a user to create a new meeting for their team", () => {
    navigate("/");
    sessionStore.setUser({
      id: "1",
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    sessionStore.upsertTeams([
      {
        id: "33",
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
    ]);
    const { getByText } = render(
      <TeamList createTeam={createTeam} sessionStore={sessionStore} />
    );

    fireEvent.click(getByText("Create meeting"));

    expect(window.location.pathname).toBe("/teams/33/meetings/new");
  });
});

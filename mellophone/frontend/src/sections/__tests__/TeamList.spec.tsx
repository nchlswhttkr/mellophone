import React from "react";
import { render, cleanup, fireEvent, queryByText } from "react-testing-library";

import TeamList from "../TeamList";
import { ISessionStore } from "../../types";
import SessionStore from "../../stores/SessionStore";
import { navigate } from "@reach/router";

describe("Components - Sections - TeamList", () => {
  let sessionStore: ISessionStore;

  beforeEach(() => {
    cleanup();
    sessionStore = new SessionStore();
  });

  it("Does not render if a user is not authenticated", () => {
    sessionStore.setUser(undefined);
    const { container } = render(<TeamList sessionStore={sessionStore} />);

    expect(container.childElementCount).toBe(0);
  });

  it("Directs users to create a new team if they are in no teams", () => {
    sessionStore.setUser({
      id: 1,
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    const { getByText, queryByText } = render(
      <TeamList sessionStore={sessionStore} />
    );

    const prompt = queryByText("You are not a member of any teams", {
      exact: false,
    });
    fireEvent.click(getByText("create a new team"));

    expect(prompt).not.toBeNull();
    expect(window.location.pathname).toBe("/teams/new");
  });

  it("Shows a list of teams for an authenticated user", () => {
    sessionStore.setUser({
      id: 1,
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    sessionStore.upsertTeams([
      {
        id: 1,
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
      {
        id: 2,
        name: "Glen Eira Band",
        website: "http://gleneiraband.com.au",
      },
    ]);
    const { queryByText } = render(<TeamList sessionStore={sessionStore} />);

    expect(queryByText("Western Brass")).not.toBeNull();
    expect(queryByText("Glen Eira Band")).not.toBeNull();
  });

  it("Directs a user to a team's profile when they select its name", () => {
    navigate("/");
    sessionStore.setUser({
      id: 1,
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    sessionStore.upsertTeams([
      {
        id: 33,
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
    ]);
    const { getByText } = render(<TeamList sessionStore={sessionStore} />);

    fireEvent.click(getByText("Western Brass"));

    expect(window.location.pathname).toBe("/teams/33");
  });

  it("Allows a user to create a new meeting for their team", () => {
    navigate("/");
    sessionStore.setUser({
      id: 3,
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    sessionStore.upsertTeams([
      {
        id: 33,
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
    ]);
    const { getByText } = render(<TeamList sessionStore={sessionStore} />);

    fireEvent.click(getByText("Create meeting"));

    expect(window.location.pathname).toBe("/teams/33/meetings/new");
  });
});

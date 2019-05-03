import React from "react";
import { render, cleanup, fireEvent, queryByText } from "react-testing-library";

import TeamList from "../TeamList";
import { ITeam } from "../../types";
import SessionStore from "../../stores/SessionStore";
import { navigate } from "@reach/router";

describe("Components - Sections - TeamList", () => {
  beforeEach(cleanup);

  it("Directs users to create a new team if they are in no teams", () => {
    const { getByText, queryByText } = render(<TeamList teams={[]} />);

    const prompt = queryByText("You are not a member of any teams", {
      exact: false,
    });
    fireEvent.click(getByText("create a new team"));

    expect(prompt).not.toBeNull();
    expect(window.location.pathname).toBe("/teams/new");
  });

  it("Shows a list of teams for an authenticated user", () => {
    const teams = [
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
    ];
    const { queryByText } = render(<TeamList teams={teams} />);

    expect(queryByText("Western Brass")).not.toBeNull();
    expect(queryByText("Glen Eira Band")).not.toBeNull();
  });

  it("Directs a user to a team's profile when they select its name", () => {
    navigate("/");
    const teams = [
      {
        id: 33,
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
    ];
    const { getByText } = render(<TeamList teams={teams} />);

    fireEvent.click(getByText("Western Brass"));

    expect(window.location.pathname).toBe("/teams/33");
  });

  it("Allows a user to create a new meeting for their team", () => {
    navigate("/");
    const teams = [
      {
        id: 33,
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
    ];
    const { getByText } = render(<TeamList teams={teams} />);

    fireEvent.click(getByText("Create meeting"));

    expect(window.location.pathname).toBe("/teams/33/meetings/new");
  });
});

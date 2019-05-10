import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { navigate } from "@reach/router";

import TeamList from "../TeamList";

describe("Sections - TeamList", () => {
  beforeEach(() => {
    cleanup();
    navigate("/");
  });

  it("Directs users to create a new team if they are in no teams", () => {
    const { queryByText } = render(<TeamList teams={[]} />);

    expect(
      queryByText("You are not a member of any teams", { exact: false })
    ).not.toBe(null);
    expect(queryByText("create a new team")).not.toBe(null);
  });

  it("Shows a list of teams", () => {
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

    expect(queryByText("Western Brass")).not.toBe(null);
    expect(queryByText("Glen Eira Band")).not.toBe(null);
  });

  it("Directs a user to a team's profile when they select its name", () => {
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

    fireEvent.click(getByText("Create meeting"));

    expect(window.location.pathname).toBe("/teams/33/meetings/new");
  });
});

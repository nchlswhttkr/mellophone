import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import TeamList from "../TeamList";
import { IIdentityStore, ITeamStore } from "../../../types";
import IdentityStore from "../../../stores/IdentityStore";
import TeamStore from "../../../stores/TeamStore";
import { navigate } from "@reach/router";

describe("Components - Sections - TeamList", () => {
  let createTeam = jest.fn();
  let identityStore: IIdentityStore;
  let teamStore: ITeamStore;

  beforeEach(() => {
    cleanup();
    createTeam.mockReset();
    identityStore = new IdentityStore();
    teamStore = new TeamStore();
  });

  it("Does not render if a user is not authenticated", () => {
    const { container } = render(
      <TeamList
        createTeam={createTeam}
        identityStore={identityStore}
        teamStore={teamStore}
      />
    );

    expect(container.childElementCount).toBe(0);
  });

  it("Allows authenticated users to create a team if they are lonely", () => {
    identityStore.setResolved({
      id: "1",
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    const { getByText } = render(
      <TeamList
        createTeam={createTeam}
        identityStore={identityStore}
        teamStore={teamStore}
      />
    );

    fireEvent.click(getByText("Create team"));

    expect(createTeam).toBeCalledTimes(1);
  });

  it("Shows a list of teams for an authenticated user", () => {
    identityStore.setResolved({
      id: "1",
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    teamStore.setTeams([
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
      <TeamList
        createTeam={createTeam}
        identityStore={identityStore}
        teamStore={teamStore}
      />
    );

    expect(queryByText("Western Brass")).not.toBeNull();
    expect(queryByText("Glen Eira Band")).not.toBeNull();
  });

  it("Directs a user to a team's profile when they select its name", () => {
    navigate("/");
    identityStore.setResolved({
      id: "1",
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    teamStore.setTeams([
      {
        id: "33",
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
    ]);
    const { getByText } = render(
      <TeamList
        createTeam={createTeam}
        identityStore={identityStore}
        teamStore={teamStore}
      />
    );

    fireEvent.click(getByText("Western Brass"));

    expect(window.location.pathname).toBe("/teams/33");
  });

  it("Allows a user to create a new meeting for their team", () => {
    navigate("/");
    identityStore.setResolved({
      id: "1",
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    teamStore.setTeams([
      {
        id: "33",
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
    ]);
    const { getByText } = render(
      <TeamList
        createTeam={createTeam}
        identityStore={identityStore}
        teamStore={teamStore}
      />
    );

    fireEvent.click(getByText("Create meeting"));

    expect(window.location.pathname).toBe("/teams/33/meetings/new");
  });
});

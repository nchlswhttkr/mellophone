import React from "react";
import { render, fireEvent } from "@testing-library/react";

import TeamList from "../TeamList";
import mock from "../../utils/mock";

it("Directs users to create a new team if they are in no teams", () => {
  const { queryByText } = render(<TeamList teams={[]} />);

  expect(
    queryByText("You are not a member of any teams", { exact: false })
  ).not.toBe(null);
  expect(queryByText("create a new team")).not.toBe(null);
});

it("Shows a list of teams and links to their profile when a name is selected", () => {
  const teams = [mock.team(), mock.team()];
  const { queryByText, getByText } = render(<TeamList teams={teams} />);

  expect(queryByText(teams[0].name)).not.toBe(null);
  expect(queryByText(teams[1].name)).not.toBe(null);

  fireEvent.click(getByText(teams[0].name));

  expect(window.location.pathname).toBe(`/teams/${teams[0].id}`);
});

it("Directs a user to create a meeting for a team", () => {
  const team = mock.team();
  const { getByText } = render(<TeamList teams={[team]} />);

  fireEvent.click(getByText("Create meeting"));

  expect(window.location.pathname).toBe(`/teams/${team.id}/meetings/new`);
});

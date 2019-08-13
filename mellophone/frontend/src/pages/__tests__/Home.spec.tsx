import React from "react";
import { wait } from "@testing-library/react";

import Home from "../Home";
import TestRenderer from "../../utils/TestRenderer";
import mock from "../../utils/mock";

it("Renders a landing page when no user is authenticated", () => {
  const { queryByText } = new TestRenderer().render(<Home />);

  expect(queryByText("Mellophone is an app for teams")).not.toBe(null);
});

it("Renders a feed when a user is logged in", async () => {
  const teams = [mock.team(), mock.team()];
  const getTeamsOfSessionUser = jest.fn(async () => teams);

  const { queryByText } = new TestRenderer()
    .asAuthenticatedUser()
    .withNetwork({ getTeamsOfSessionUser })
    .render(<Home />);

  await wait(() => expect(queryByText(teams[0].name)).not.toBe(null));
  await wait(() => expect(queryByText(teams[1].name)).not.toBe(null));
  expect(getTeamsOfSessionUser).toBeCalledTimes(1);
});

it("Shows the feed immediately if some/all teams are loaded", () => {
  const teams = [mock.team(), mock.team()];
  const { queryByText } = new TestRenderer()
    .withStores({ teams: { teams, status: "fulfilled", error: undefined } })
    .asAuthenticatedUser()
    .render(<Home />);

  expect(queryByText(teams[0].name)).not.toBe(null);
  expect(queryByText(teams[1].name)).not.toBe(null);
});

it("Prompts a user to create a team if they are not a member of any teams", () => {
  const getTeamsOfSessionUser = jest.fn(async () => []);
  const { queryByText } = new TestRenderer()
    .asAuthenticatedUser()
    .withStores({ teams: { teams: [], status: "fulfilled", error: undefined } })
    .withNetwork({ getTeamsOfSessionUser })
    .render(<Home />);

  expect(
    queryByText("You are not a member of any teams", { exact: false })
  ).not.toBe(null);
  expect(queryByText("create a new team")).not.toBe(null);
});

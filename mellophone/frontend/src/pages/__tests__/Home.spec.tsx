import React from "react";
import { wait, cleanup } from "@testing-library/react";

import Home from "../Home";
import SessionStore from "../../stores/SessionStore";
import TeamStore from "../../stores/TeamStore";
import TestRenderer from "../../utils/TestRenderer";
import mock from "../../utils/mock";

beforeEach(cleanup);

it("Renders a landing page when no user is authenticated", () => {
  const sessionStore = new SessionStore();
  const { queryByText } = new TestRenderer()
    .withStores({ sessionStore })
    .render(<Home />);

  expect(queryByText("Mellophone is an app for teams")).not.toBe(null);
});

it("Renders a feed when a user is logged in", async () => {
  const sessionStore = new SessionStore();
  sessionStore.signIn(mock.user());
  const teams = [mock.team(), mock.team()];
  const getTeamsOfSessionUser = jest.fn(async () => teams);

  const { queryByText } = new TestRenderer()
    .withStores({ sessionStore })
    .withNetwork({ getTeamsOfSessionUser })
    .render(<Home />);

  await wait(() => expect(queryByText(teams[0].name)).not.toBe(null));
  await wait(() => expect(queryByText(teams[1].name)).not.toBe(null));
  expect(getTeamsOfSessionUser).toBeCalledTimes(1);
});

it("Displays an error message if the feed can not be loaded", async () => {
  const message = "Your teams could not be loaded";
  const sessionStore = new SessionStore();
  sessionStore.signIn(mock.user());
  const getTeamsOfSessionUser = jest.fn(async () => {
    throw new Error(message);
  });

  const { queryByText } = new TestRenderer()
    .withStores({ sessionStore })
    .withNetwork({ getTeamsOfSessionUser })
    .render(<Home />);

  await wait(() => expect(queryByText(message)).not.toBe(null));
  expect(getTeamsOfSessionUser).toBeCalledTimes(1);
});

it("Shows the feed immediately if some/all teams are loaded", () => {
  const sessionStore = new SessionStore();
  const teamStore = new TeamStore();
  sessionStore.signIn(mock.user());
  const teams = [mock.team(), mock.team()];
  teams.forEach(team => {
    teamStore.addTeam(team);
    teamStore.addToSessionUserTeams(team.id);
  });
  const getTeamsOfSessionUser = jest.fn(async () => []);

  const { queryByText } = new TestRenderer()
    .withStores({ sessionStore, teamStore })
    .withNetwork({ getTeamsOfSessionUser })
    .render(<Home />);

  expect(queryByText(teams[0].name)).not.toBe(null);
  expect(queryByText(teams[1].name)).not.toBe(null);
});

it("Updates the feed if additional teams are fetched for the session user", async () => {
  const sessionStore = new SessionStore();
  const teamStore = new TeamStore();
  sessionStore.signIn(mock.user());
  const initialTeams = [mock.team(), mock.team()];
  initialTeams.forEach(team => {
    teamStore.addTeam(team);
    teamStore.addToSessionUserTeams(team.id);
  });
  const newTeam = mock.team();
  const getTeamsOfSessionUser = jest.fn(async () => [newTeam]);

  const { queryByText } = new TestRenderer()
    .withStores({ sessionStore, teamStore })
    .withNetwork({ getTeamsOfSessionUser })
    .render(<Home />);

  expect(queryByText(initialTeams[0].name)).not.toBe(null);
  expect(queryByText(initialTeams[1].name)).not.toBe(null);

  // renders after the request fulfills
  await wait(() => expect(queryByText(newTeam.name)).not.toBe(null));
});

it("Promps a user to create a team if they are not a member of any teams", () => {
  const getTeamsOfSessionUser = jest.fn(async () => []);
  const sessionStore = new SessionStore();
  sessionStore.signIn(mock.user());
  const { queryByText } = new TestRenderer()
    .withStores({ sessionStore })
    .withNetwork({ getTeamsOfSessionUser })
    .render(<Home />);

  expect(
    queryByText("You are not a member of any teams", { exact: false })
  ).not.toBe(null);
  expect(queryByText("create a new team")).not.toBe(null);
});

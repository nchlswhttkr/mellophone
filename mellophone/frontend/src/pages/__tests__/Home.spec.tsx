import React from "react";
import { wait, cleanup } from "react-testing-library";

import Home from "../Home";
import SessionStore from "../../stores/SessionStore";
import TeamStore from "../../stores/TeamStore";
import TestRenderer from "../../utils/TestRenderer";
import mock from "../../utils/mock";

describe("Pages - Home", () => {
  beforeEach(cleanup);

  it("Renders a landing page when no user is authenticated", () => {
    const sessionStore = new SessionStore();
    const { queryByText } = new TestRenderer(<Home />)
      .withStores({ sessionStore })
      .render();

    expect(queryByText("Welcome to Mellophone")).not.toBe(null);
  });

  it("Renders a feed when a user is logged in", async () => {
    const sessionStore = new SessionStore();
    sessionStore.user = mock.user();
    const teams = [mock.team()];
    const getTeamsOfSessionUser = jest.fn(async () => teams);

    const { queryByText } = new TestRenderer(<Home />)
      .withStores({ sessionStore })
      .withNetwork({ getTeamsOfSessionUser })
      .render();

    await wait(() => expect(queryByText(teams[0].name)).not.toBe(null));
    expect(getTeamsOfSessionUser).toBeCalledTimes(1);
  });

  it("Displays an error message if the feed can not be loaded", async () => {
    const message = "Your teams could not be loaded";
    const sessionStore = new SessionStore();
    sessionStore.user = mock.user();
    const getTeamsOfSessionUser = jest.fn(async () => {
      throw new Error(message);
    });

    const { queryByText } = new TestRenderer(<Home />)
      .withStores({ sessionStore })
      .withNetwork({ getTeamsOfSessionUser })
      .render();

    await wait(() => expect(queryByText(message)).not.toBe(null));
    expect(getTeamsOfSessionUser).toBeCalledTimes(1);
  });

  it("Shows the feed immediately if some/all teams are loaded", () => {
    const sessionStore = new SessionStore();
    const teamStore = new TeamStore();
    sessionStore.user = mock.user();
    const teams = [mock.team(), mock.team()];
    teams.forEach(team => {
      teamStore.addTeam(team);
      teamStore.addToSessionUserTeams(team.id);
    });
    const getTeamsOfSessionUser = jest.fn(async () => []);

    const { queryByText } = new TestRenderer(<Home />)
      .withStores({ sessionStore, teamStore })
      .withNetwork({ getTeamsOfSessionUser })
      .render();

    expect(queryByText(teams[0].name)).not.toBe(null);
    expect(queryByText(teams[1].name)).not.toBe(null);
  });

  it("Updates the feed if additional teams are fetched for the session user", async () => {
    const sessionStore = new SessionStore();
    const teamStore = new TeamStore();
    sessionStore.user = mock.user();
    const initialTeams = [mock.team(), mock.team()];
    initialTeams.forEach(team => {
      teamStore.addTeam(team);
      teamStore.addToSessionUserTeams(team.id);
    });
    const newTeam = mock.team();
    const getTeamsOfSessionUser = jest.fn(async () => [newTeam]);

    const { queryByText } = new TestRenderer(<Home />)
      .withStores({ sessionStore, teamStore })
      .withNetwork({ getTeamsOfSessionUser })
      .render();

    expect(queryByText(initialTeams[0].name)).not.toBe(null);
    expect(queryByText(initialTeams[1].name)).not.toBe(null);

    // renders after the request fulfills
    await wait(() => expect(queryByText(newTeam.name)).not.toBe(null));
  });
});

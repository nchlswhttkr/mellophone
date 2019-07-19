import React from "react";
import { render, fireEvent, wait, cleanup } from "@testing-library/react";
import { navigate } from "@reach/router";

import CreateTeam from "../CreateTeam";
import TestRenderer from "../../utils/TestRenderer";
import mock from "../../utils/mock";
import SessionStore from "../../stores/SessionStore";
import TeamStore from "../../stores/TeamStore";

beforeEach(() => {
  cleanup();
  navigate("/");
});

it("Renders nothing when no user is authenticated", () => {
  const { container } = render(<CreateTeam />);
  expect(container.childElementCount).toBe(0);
});

it("Creates a team, stores it and redirects to their profile", async () => {
  const team = mock.team();
  const postTeam = jest.fn(async () => team);
  const teamStore = new TeamStore();
  const { getByLabelText, getByText } = new TestRenderer()
    .withNetwork({ postTeam })
    .withStores({ teamStore })
    .asAuthenticatedUser()
    .render(<CreateTeam />);

  fireEvent.input(getByLabelText("Team name"), {
    target: { value: team.name },
  });
  fireEvent.input(getByLabelText("Website"), {
    target: { value: team.website },
  });
  fireEvent.click(getByText("Create team"));

  await wait(() => expect(window.location.pathname).toBe(`/teams/${team.id}`));
  expect(postTeam).toBeCalledTimes(1);
  expect(postTeam).toBeCalledWith(team.name, team.website);
  expect(teamStore.teams.get(team.id)).not.toBe(undefined);
  expect(teamStore.sessionUserTeams).toContainEqual(team);
});

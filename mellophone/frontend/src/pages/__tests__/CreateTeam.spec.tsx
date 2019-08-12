import React from "react";
import { fireEvent, wait } from "@testing-library/react";

import CreateTeam from "../CreateTeam";
import TestRenderer from "../../utils/TestRenderer";
import mock from "../../utils/mock";

it("Renders nothing when no user is authenticated", () => {
  const { container } = new TestRenderer().render(<CreateTeam />);
  expect(container.childElementCount).toBe(0);
});

it("Creates a team, stores it and redirects to their profile", async () => {
  const team = mock.team();
  const postTeam = jest.fn(async () => team);
  const { getByLabelText, getByText, store } = new TestRenderer()
    .withNetwork({ postTeam })
    .withStores({ teams: { teams: [], status: "fulfilled", error: undefined } })
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
  expect(store.getState().teams.teams).toContainEqual(team);
});

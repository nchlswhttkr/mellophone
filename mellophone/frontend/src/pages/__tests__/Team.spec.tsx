import React from "react";
import { wait } from "@testing-library/react";

import Team from "../Team";
import TestRenderer from "../../utils/TestRenderer";
import SessionStore from "../../stores/SessionStore";
import mock from "../../utils/mock";

it("Renders nothing when no user is authenticated", () => {
  const { container } = new TestRenderer().render(<Team />);

  expect(container.childElementCount).toBe(0);
});

it("Renders the team with the specified ID and its meetings", async () => {
  const team = mock.team();
  const getTeamById = jest.fn(async () => team);
  const meeting = mock.meeting({ team });
  const getMeetingsOfTeam = jest.fn(async () => [meeting]);
  const { queryByText } = new TestRenderer()
    .withNetwork({ getTeamById, getMeetingsOfTeam })
    .asAuthenticatedUser()
    .render(<Team teamId={team.id.toString()} />);

  await wait(() => expect(queryByText(team.name)).not.toBe(null));
  expect(getTeamById).toBeCalledTimes(1);
  expect(getTeamById).toBeCalledWith(team.id);
  await wait(() => expect(queryByText(meeting.name)).not.toBe(null));
  expect(getMeetingsOfTeam).toBeCalledTimes(1);
  expect(getMeetingsOfTeam).toBeCalledWith(team.id);
});

it("Displays an error message when fetching some page content fails", async () => {
  const team = mock.team();
  const getTeamById = jest.fn(async () => team);
  const message = "Something went wrong while fetching the meetings";
  const getMeetingsOfTeam = jest.fn(async () => {
    throw new Error(message);
  });
  const { queryByText } = new TestRenderer()
    .withNetwork({ getTeamById, getMeetingsOfTeam })
    .asAuthenticatedUser()
    .render(<Team teamId={team.id.toString()} />);

  await wait(() => expect(queryByText(message)).not.toBe(null));
});

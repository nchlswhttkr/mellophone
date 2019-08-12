import React from "react";
import { fireEvent, wait, cleanup } from "@testing-library/react";
import { navigate } from "@reach/router";

import CreateMeeting from "../CreateMeeting";
import TestRenderer from "../../utils/TestRenderer";
import mock from "../../utils/mock";

beforeEach(() => {
  cleanup();
  navigate("/");
});

it("Does not render when a user is not authenticated", () => {
  const { container } = new TestRenderer().render(<CreateMeeting />);

  expect(container.childElementCount).toBe(0);
});

it("Allows teams to create a meeting", async () => {
  const meeting = mock.meeting();
  const teamId = 20;
  const createMeeting = jest.fn(async () => meeting);
  const { getByLabelText, getByText } = new TestRenderer()
    .withNetwork({ createMeeting })
    .asAuthenticatedUser()
    .render(<CreateMeeting teamId={teamId.toString()} />);

  fireEvent.input(getByLabelText("Meeting name"), {
    target: { value: meeting.name },
  });
  fireEvent.input(getByLabelText("Venue (optional)"), {
    target: { value: meeting.venue },
  });
  fireEvent.click(getByText("Create meeting"));

  await wait(() =>
    expect(window.location.pathname).toMatch(meeting.id.toString())
  );
  expect(createMeeting).toBeCalledTimes(1);
  expect(createMeeting).toBeCalledWith(teamId, meeting.name, meeting.venue);
});

it("Allows teams to create a meeting without specifying a venue", async () => {
  const meeting = mock.meeting();
  const teamId = 21;
  const createMeeting = jest.fn(async () => meeting);
  const { getByLabelText, getByText } = new TestRenderer()
    .withNetwork({ createMeeting })
    .asAuthenticatedUser()
    .render(<CreateMeeting teamId={teamId.toString()} />);

  fireEvent.input(getByLabelText("Meeting name"), {
    target: { value: meeting.name },
  });
  fireEvent.click(getByText("Create meeting"));

  await wait(() =>
    expect(window.location.pathname).toMatch(meeting.id.toString())
  );
  expect(createMeeting).toBeCalledTimes(1);
  expect(createMeeting).toBeCalledWith(teamId, meeting.name, "");
});

it("Shows a error message when creating a team fails", async () => {
  const createMeeting = jest.fn(async () => {
    throw new Error("This is an error message");
  });
  const { getByText, queryByText } = new TestRenderer()
    .asAuthenticatedUser()
    .withNetwork({ createMeeting })
    .render(<CreateMeeting teamId="1" />);

  fireEvent.click(getByText("Create meeting"));

  await wait(() =>
    expect(queryByText("This is an error message")).not.toBe(null)
  );
  expect(createMeeting).toBeCalledTimes(1);
});

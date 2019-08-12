import React from "react";
import { wait } from "@testing-library/react";

import Meeting from "../Meeting";
import TestRenderer from "../../utils/TestRenderer";
import mock from "../../utils/mock";

it("Does not render when a user is not authenticated", () => {
  const { container } = new TestRenderer().render(<Meeting />);

  expect(container.childElementCount).toBe(0);
});

it("Shows an error message when a meeting cannot be loaded", async () => {
  const getMeetingById = jest.fn(async () => {
    throw new Error("An error message goes here.");
  });
  const { queryByText } = new TestRenderer()
    .asAuthenticatedUser()
    .withNetwork({ getMeetingById })
    .render(<Meeting meetingId="1" />);

  await wait(() =>
    expect(queryByText("An error message goes here.")).not.toBe(null)
  );
  expect(getMeetingById).toBeCalledTimes(1);
});

it("Shows a meeting when it is loaded", async () => {
  const meeting = mock.meeting();
  const getMeetingById = jest.fn(async () => meeting);
  const { queryByText } = new TestRenderer()
    .asAuthenticatedUser()
    .withNetwork({ getMeetingById })
    .render(<Meeting meetingId={meeting.id.toString()} />);

  await wait(() => expect(queryByText(meeting.name)).not.toBe(null));
  expect(getMeetingById).toBeCalledTimes(1);
  expect(getMeetingById).toBeCalledWith(meeting.id);
});

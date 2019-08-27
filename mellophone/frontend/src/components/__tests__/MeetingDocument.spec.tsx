import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import MeetingDocument, { transformItemIntoElement } from "../MeetingDocument";
import mock from "../../utils/mock";

it("Matches a snapshot from converting an item into an element", () => {
  /**
   * Snapshot testing is useful here to make sure that we break up an item into
   * the expected format, such as <br/> replacing '\n'
   */
  const item = mock.item({
    description: "Line 1\nLine 2\nLine 3",
  });

  const element = transformItemIntoElement(item);

  expect(element).toMatchSnapshot();
});

it("Shows a meeting and its items, and allows new items to be created", () => {
  const meeting = mock.meeting();
  const items = [mock.item()];
  const createItemForMeeting = jest.fn(async () => undefined);

  const { getByLabelText, getByText, queryByText } = render(
    <MeetingDocument
      meeting={meeting}
      items={items}
      createItemForMeeting={createItemForMeeting}
    />
  );

  expect(queryByText(meeting.name)).not.toBe(null);
  // expect(queryByText(meeting.dateHeld)).not.toBe(null)
  expect(queryByText(items[0].name)).not.toBe(null);
  expect(queryByText(items[0].description)).not.toBe(null);

  const newItem = mock.item();

  fireEvent.input(getByLabelText("New meeting item name"), {
    target: { value: newItem.name },
  });
  fireEvent.input(getByLabelText("New meeting item description"), {
    target: { value: newItem.description },
  });
  fireEvent.click(getByText("Create new item"));

  expect(createItemForMeeting).toBeCalledTimes(1);
  expect(createItemForMeeting).toBeCalledWith(meeting.id, {
    name: newItem.name,
    description: newItem.description,
  });
});

it("Shows an error message when creating an item fails", async () => {
  const createItemForMeeting = jest.fn(async () => {
    throw new Error("An error occured");
  });
  const { queryByText, getByText } = render(
    <MeetingDocument
      meeting={mock.meeting()}
      items={[mock.item()]}
      createItemForMeeting={createItemForMeeting}
    />
  );

  fireEvent.click(getByText("Create new item"));

  await wait(() => expect(queryByText("An error occured")).not.toBe(null));
  expect(createItemForMeeting).toBeCalledTimes(1);
});

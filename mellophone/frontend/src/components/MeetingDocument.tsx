import React, { useState, useRef } from "react";

import { IMeeting, IItem } from "../types";
import { Link } from "@reach/router";
import { route } from "../utils/routing";
import Button from "./Button";
import Input from "./Input";
import ErrorMessage from "./ErrorMessage";
import TextArea from "./TextArea";

interface Props {
  meeting: IMeeting;
  items: IItem[];
  createItemForMeeting(meetingId: number, item: Partial<IItem>): Promise<void>;
}

export default function MeetingDocument(props: Props) {
  const [error, setError] = useState<Error>();
  const { meeting, items, createItemForMeeting } = props;

  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemDescriptionRef = useRef<HTMLTextAreaElement>(null);

  function onCreateMeetingItem() {
    const nameInput = itemNameRef.current;
    const descriptionInput = itemDescriptionRef.current;
    if (nameInput && descriptionInput) {
      setError(undefined);
      createItemForMeeting(meeting.id, {
        name: nameInput.value,
        description: descriptionInput.value,
      }).catch(setError);
    }
  }

  return (
    <div>
      <h1>{meeting.name}</h1>
      <h2>
        Meeting held {meeting.dateHeld.toString()} by{" "}
        <Link to={route(`/teams/${meeting.team.id}`)}>{meeting.team.name}</Link>
      </h2>
      <hr></hr>
      {items.map(transformItemIntoElement)}
      <form>
        <Input
          ref={itemNameRef}
          label="Item name"
          aria-label="New meeting item name"
        />
        <TextArea
          ref={itemDescriptionRef}
          label="Item description"
          aria-label="New meeting item description"
          rows={5}
        />
        <Button onClick={onCreateMeetingItem}>Create new item</Button>
        <ErrorMessage error={error} />
      </form>
    </div>
  );
}

// Easier to test this transformation if it is isolation from the component
export const transformItemIntoElement = (item: IItem) => {
  return (
    <div key={item.id}>
      <h3>{item.name}</h3>
      <p>
        {item.description.split("\n").map((line, i) => (
          // Avoids React warning about keys for reconciliation
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

import React, { useState, useRef } from "react";

import { IMeeting, IItem } from "../types";
import { Link } from "@reach/router";
import Route from "../utils/Route";
import Button from "./Button";
import Input from "./Input";
import ErrorMessage from "./ErrorMessage";
import TextArea from "./TextArea";

interface Props {
  meeting: IMeeting;
  items: IItem[];
  createItemForMeeting(meetingId: number, item: Partial<IItem>): Promise<void>;
}

function MeetingDocument(props: Props) {
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
        <Link to={new Route(Route.TEAMS, meeting.team.id).build()}>
          {meeting.team.name}
        </Link>
      </h2>
      <hr></hr>
      {items.map(item => (
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
      ))}
      <form>
        <Input ref={itemNameRef} label="Item name" />
        <TextArea ref={itemDescriptionRef} label="Item description" rows={5} />
        <Button onClick={onCreateMeetingItem}>Create item</Button>
        <ErrorMessage error={error} />
      </form>
    </div>
  );
}

export default MeetingDocument;

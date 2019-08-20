import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";

import { IMeeting, IItem } from "../types";
import Main from "../components/Main";
import MeetingDocument from "../components/MeetingDocument";
import requireAuthentication from "../utils/requireAuthentication";
import { useNetwork } from "../network";
import ErrorMessage from "../components/ErrorMessage";

interface Props extends RouteComponentProps<{ meetingId: string }> {}

function Meeting(props: Props) {
  const [meeting, setMeeting] = useState<IMeeting>();
  const [items, setItems] = useState<IItem[]>();
  const [error, setError] = useState<Error>();
  const { getMeetingById, getItemsOfMeeting, postItemInMeeting } = useNetwork();

  const meetingId = Number(props.meetingId);

  useEffect(() => {
    if (!Number.isNaN(meetingId)) {
      getMeetingById(meetingId)
        .then(setMeeting)
        .catch(setError);
    }
  }, [meetingId, getMeetingById]);

  useEffect(() => {
    getItemsOfMeeting(meetingId)
      .then(setItems)
      .catch(setError);
  }, [meetingId, getItemsOfMeeting]);

  async function onCreateItem(meetingId: number, item: Partial<IItem>) {
    if (!items) return; // redundant but necessary because of TS
    const createdItem = await postItemInMeeting(meetingId, item);
    setItems(items.concat([createdItem]));
  }

  return (
    <Main>
      <ErrorMessage error={error} />
      {meeting && items && (
        <MeetingDocument
          meeting={meeting}
          items={items}
          createItemForMeeting={onCreateItem}
        />
      )}
    </Main>
  );
}

export default requireAuthentication<Props>(Meeting);

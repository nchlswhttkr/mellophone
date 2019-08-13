import React from "react";
import { RouteComponentProps } from "@reach/router";

import { IMeeting, IItem } from "../types";
import Main from "../components/Main";
import MeetingDocument from "../components/MeetingDocument";
import requireAuthentication from "../utils/requireAuthentication";
import { NetworkContext } from "../network";
import ErrorMessage from "../components/ErrorMessage";

type Props = RouteComponentProps<{ meetingId: string }>;

function Meeting(props: Props) {
  const [meeting, setMeeting] = React.useState<IMeeting>();
  const [items, setItems] = React.useState<IItem[]>();
  const [error, setError] = React.useState<Error>();
  const {
    getMeetingById,
    getItemsOfMeeting,
    postItemInMeeting,
  } = React.useContext(NetworkContext);

  const meetingId = Number(props.meetingId);

  React.useEffect(() => {
    if (!Number.isNaN(meetingId)) {
      getMeetingById(meetingId)
        .then(setMeeting)
        .catch(setError);
      getItemsOfMeeting(meetingId)
        .then(setItems)
        .catch(setError);
    }
  }, [meetingId, getMeetingById, getItemsOfMeeting]);

  const onCreateItem = async (meetingId: number, item: Partial<IItem>) => {
    try {
      if (!meeting || !items) {
        throw new Error("Cannot create item while meeting has not loaded");
      }
      const createdItem = await postItemInMeeting(meetingId, item);
      setItems(items.concat([createdItem]));
    } catch (error) {
      setError(error);
    }
  };

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

export default requireAuthentication<{ meetingId: string }>(Meeting);

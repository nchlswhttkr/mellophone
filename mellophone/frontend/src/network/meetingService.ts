import { IMeeting, IItem } from "../types";
import request from "./request";

export async function postMeeting(
  teamId: number,
  name: string,
  venue: string
): Promise<IMeeting> {
  if (!name) {
    throw new Error("Meetings must have a name");
  }
  const response = await request.post(`/teams/${teamId}/meetings`, {
    name,
    venue,
  });
  const body = (await response.json()) as { meeting: IMeeting };
  return body.meeting;
}

export async function getMeetingById(meetingId: number): Promise<IMeeting> {
  const response = await request.get(`/meetings/${meetingId}`);
  const body = (await response.json()) as { meeting: IMeeting };
  return body.meeting;
}

export async function getMeetingsOfTeam(teamId: number): Promise<IMeeting[]> {
  const response = await request.get(`/teams/${teamId}/meetings`);
  const body = (await response.json()) as { meetings: IMeeting[] };
  return body.meetings;
}

export async function getItemsOfMeeting(meetingId: number) {
  const response = await request.get(`/meetings/${meetingId}/items`);
  const body = (await response.json()) as { items: IItem[] };
  return body.items;
}

export async function postItemInMeeting(
  meetingId: number,
  item: Partial<IItem>
) {
  if (!item.name) {
    throw new Error("Meeting items must have a name");
  }
  if (!item.description) {
    throw new Error("Meeting items must have a description");
  }

  const response = await request.post(`/meetings/${meetingId}/items`, item);
  const body = (await response.json()) as { item: IItem };
  return body.item;
}

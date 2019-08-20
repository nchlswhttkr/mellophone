import { IMeeting, IItem } from "../types";
import BaseRequest from "../utils/BaseRequest";

export async function postMeeting(
  teamId: number,
  name: string,
  venue?: string
): Promise<IMeeting> {
  if (!name) {
    throw new Error("Meetings must have a name");
  }
  const response = await BaseRequest.post<{ meeting: IMeeting }>(
    `/teams/${teamId}/meetings`,
    { name, venue }
  );
  return response.meeting;
}

export async function getMeetingById(meetingId: number): Promise<IMeeting> {
  const response = await BaseRequest.get<{ meeting: IMeeting }>(
    `/meetings/${meetingId}`
  );
  return response.meeting;
}

export async function getMeetingsOfTeam(teamId: number): Promise<IMeeting[]> {
  const response = await BaseRequest.get<{ meetings: IMeeting[] }>(
    `/teams/${teamId}/meetings`
  );
  return response.meetings;
}

export async function getItemsOfMeeting(meetingId: number) {
  const response = await BaseRequest.get<{ items: IItem[] }>(
    `/meetings/${meetingId}/items`
  );
  return response.items;
}

export async function postItemInMeeting(
  meetingId: number,
  item: Partial<IItem>
) {
  const response = await BaseRequest.post<{ item: IItem }>(
    `/meetings/${meetingId}/items`,
    item
  );
  return response.item;
}

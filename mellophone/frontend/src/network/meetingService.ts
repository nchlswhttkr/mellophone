import { IMeeting, IItem } from "../types";
import BaseRequest from "../utils/BaseRequest";

export interface IMeetingService {
  createMeeting(
    teamId: number,
    name: string,
    venue?: string
  ): Promise<IMeeting>;
  getMeetingById(meetingId: number): Promise<IMeeting>;
  getMeetingsOfTeam(teamId: number): Promise<IMeeting[]>;
  getItemsOfMeeting(meetingId: number): Promise<IItem[]>;
  postItemInMeeting(meetingId: number, item: Partial<IItem>): Promise<IItem>;
}

export default {
  async createMeeting(
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
  },

  async getMeetingById(meetingId: number): Promise<IMeeting> {
    const response = await BaseRequest.get<{ meeting: IMeeting }>(
      `/meetings/${meetingId}`
    );
    return response.meeting;
  },

  async getMeetingsOfTeam(teamId: number): Promise<IMeeting[]> {
    const response = await BaseRequest.get<{ meetings: IMeeting[] }>(
      `/teams/${teamId}/meetings`
    );
    return response.meetings;
  },

  async getItemsOfMeeting(meetingId: number) {
    const response = await BaseRequest.get<{ items: IItem[] }>(
      `/meetings/${meetingId}/items`
    );
    return response.items;
  },

  async postItemInMeeting(meetingId: number, item: Partial<IItem>) {
    const response = await BaseRequest.post<{ item: IItem }>(
      `/meetings/${meetingId}/items`,
      item
    );
    return response.item;
  },
} as IMeetingService;

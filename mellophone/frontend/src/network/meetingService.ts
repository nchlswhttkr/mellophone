import { IMeeting } from "../types";
import BaseRequest from "../utils/BaseRequest";

export interface IMeetingService {
  createMeeting(
    teamId: number,
    name: string,
    venue?: string
  ): Promise<IMeeting>;
  getMeetingById(meetingId: number): Promise<IMeeting>;
  getMeetingsOfTeam(teamId: number): Promise<IMeeting[]>;
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
} as IMeetingService;

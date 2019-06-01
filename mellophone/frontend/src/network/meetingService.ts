import { IMeeting, IMeetingToBeCreated } from "../types";
import BaseRequest from "../utils/BaseRequest";

export interface IMeetingService {
  createMeeting(
    meeting: IMeetingToBeCreated,
    teamId: number
  ): Promise<IMeeting>;
  getMeetingById(meetingId: number): Promise<IMeeting>;
  getMeetingsOfTeam(teamId: number): Promise<IMeeting[]>;
}

export default {
  async createMeeting(
    meeting: IMeetingToBeCreated,
    teamId: number
  ): Promise<IMeeting> {
    if (!meeting.name) {
      throw new Error("Meetings must have a name");
    }
    const response = await BaseRequest.post<{ meeting: IMeeting }>(
      `/teams/${teamId}/meetings`,
      meeting
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

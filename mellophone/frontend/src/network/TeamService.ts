import BaseRequest from "../utils/BaseRequest";
import { ITeam } from "../types";
import { sessionStore } from "../stores";

export default class TeamService {
  static async createTeam(name: string, website: string): Promise<void> {
    if (!name || !website) {
      throw new Error("Teams must have a name and website.");
    }
    const response = await BaseRequest.post<{ team: ITeam }>("/teams", {
      name,
      website,
    });
    sessionStore.upsertTeams([response.team]);
  }

  static async fetchSessionUserTeams(): Promise<void> {
    const response = await BaseRequest.get<{ teams: ITeam[] }>("/teams");
    sessionStore.upsertTeams(response.teams);
  }

  static async fetchTeam(id: number) {
    const response = await BaseRequest.get<{ team: ITeam }>(`/teams/${id}`);
    sessionStore.upsertTeams([response.team]);
  }
}

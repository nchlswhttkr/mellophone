import BaseRequest from "../utils/BaseRequest";
import { ITeam } from "../types";
import { sessionStore } from "../stores";

export default class TeamService {
  static async createTeam(name: string, website: string): Promise<ITeam> {
    if (!name || !website) {
      throw new Error("Teams must have a name and website.");
    }
    const response = await BaseRequest.post<{ team: ITeam }>("/teams", {
      name,
      website,
    });
    return response.team;
  }

  static async fetchSessionUserTeams(): Promise<ITeam[]> {
    const response = await BaseRequest.get<{ teams: ITeam[] }>("/teams");
    return response.teams;
  }

  static async fetchTeam(id: number): Promise<ITeam> {
    const response = await BaseRequest.get<{ team: ITeam }>(`/teams/${id}`);
    return response.team;
  }
}

import BaseRequest from "../utils/BaseRequest";
import { ITeam } from "../types";
import { teamStore } from "../stores";

export default class TeamService {
  static async createTeam(name: string, website: string): Promise<void> {
    try {
      if (!name || !website) {
        throw new Error("Teams must have a name and website.");
      }
      const response = await BaseRequest.post<{ team: ITeam }>("/teams", {
        name,
        website,
      });
      teamStore.addTeam(response.team);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.error(error);
      throw error;
    }
  }

  static async getTeams(): Promise<void> {
    teamStore.clearTeams();
    try {
      const response = await BaseRequest.get<{ teams: ITeam[] }>("/get-teams");
      teamStore.addTeams(response.teams);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.error(error);
      throw error;
    }
  }
}

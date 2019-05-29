import BaseRequest from "../utils/BaseRequest";
import { ITeam } from "../types";

export interface ITeamService {
  postTeam(name: string, website: string): Promise<ITeam>;
  getTeamsOfSessionUser(): Promise<ITeam[]>;
  getTeamById(id: number): Promise<ITeam>;
}

export default <ITeamService>{
  async postTeam(name: string, website: string) {
    if (!name || !website) {
      throw new Error("Teams must have a name and website.");
    }
    const response = await BaseRequest.post<{ team: ITeam }>("/teams", {
      name,
      website,
    });
    return response.team;
  },

  async getTeamsOfSessionUser() {
    const response = await BaseRequest.get<{ teams: ITeam[] }>("/teams");
    return response.teams;
  },

  async getTeamById(id: number): Promise<ITeam> {
    const response = await BaseRequest.get<{ team: ITeam }>(`/teams/${id}`);
    return response.team;
  },
};

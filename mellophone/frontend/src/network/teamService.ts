import BaseRequest from "../utils/BaseRequest";
import { ITeam } from "../types";

export async function postTeam(name: string, website: string) {
  if (!name || !website) {
    throw new Error("Teams must have a name and website");
  }
  const response = await BaseRequest.post<{ team: ITeam }>("/teams", {
    name,
    website,
  });
  return response.team;
}

export async function getTeamsOfSessionUser() {
  const response = await BaseRequest.get<{ teams: ITeam[] }>("/teams");
  return response.teams;
}

export async function getTeamById(id: number): Promise<ITeam> {
  const response = await BaseRequest.get<{ team: ITeam }>(`/teams/${id}`);
  return response.team;
}

import request from "./request";
import { ITeam } from "../types";

export async function postTeam(name: string, website: string) {
  if (!name || !website) {
    throw new Error("Teams must have a name and website");
  }
  const response = await request.post("/teams", {
    name,
    website,
  });
  const body = (await response.json()) as { team: ITeam };
  return body.team;
}

export async function getTeamsOfSessionUser() {
  const response = await request.get("/teams");

  const body = (await response.json()) as { teams: ITeam[] };
  return body.teams;
}

export async function getTeamById(id: number): Promise<ITeam> {
  const response = await request.get(`/teams/${id}`);
  const body = (await response.json()) as { team: ITeam };
  return body.team;
}

import { observable, action } from "mobx";
import { ITeam, ITeamStore } from "../types";

export default class TeamStore implements ITeamStore {
  @observable teams: ITeam[] = [];

  @action addTeam(team: ITeam) {
    this.teams.push(team);
  }

  @action setTeams(teams: ITeam[]) {
    this.teams = teams;
  }
}

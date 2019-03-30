import { observable, action, computed } from "mobx";
import { ITeam, ITeamStore } from "../types";

export default class TeamStore implements ITeamStore {
  @observable teams: ITeam[] = [];
  @observable currentTeam: ITeam | undefined = undefined;

  @action addTeam(team: ITeam) {
    this.teams.push(team);
  }

  @action setTeams(teams: ITeam[]) {
    this.teams = teams;
  }

  @action setCurrentTeam(id: string) {
    this.currentTeam = this.teams.find(team => team.id === id);
  }
}

import { observable, computed, action } from "mobx";
import { ITeam, ITeamStore } from "../types";
import { ADDRGETNETWORKPARAMS } from "dns";

export default class TeamStore implements ITeamStore {
  @observable teams: ITeam[] = [];
  @observable private currentTeamIndex: number | undefined;

  @computed get currentTeam() {
    if (!this.currentTeamIndex) return undefined;
    return this.teams[this.currentTeamIndex];
  }

  @action clearTeams() {
    this.currentTeamIndex = undefined;
    this.teams = [];
  }

  @action addTeam(team: ITeam) {
    this.teams.push(team);
  }

  @action addTeams(teams: ITeam[]) {
    this.teams.concat(teams);
  }

  @action setCurrentTeam(id: string) {
    this.currentTeamIndex = this.teams.findIndex(team => team.id === id);
  }
}

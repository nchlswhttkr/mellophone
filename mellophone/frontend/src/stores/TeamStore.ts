import { observable, computed, action } from "mobx";
import { ITeam } from "../types";

export interface ITeamStore {
  teams: Map<number, ITeam>;
  sessionUserTeams: ITeam[];
  addTeam(team: ITeam): void;
  addToSessionUserTeams(teamId: number): void;
  removeFromSessionUserTeams(removeId: number): void;
  clearSessionUserTeamIds(): void;
}
/**
 * A collection for the session user's teams. It allows teams to be cached to
 * help prevent wasted requests.
 */
export default class TeamStore implements ITeamStore {
  @observable teams: Map<number, ITeam> = new Map();
  @observable private sessionUserTeamIds: number[] = [];

  @computed get sessionUserTeams() {
    return this.sessionUserTeamIds.reduce<ITeam[]>((acc, id) => {
      const team = this.teams.get(id);
      if (!!team) acc.push(team);
      return acc;
    }, []);
  }

  @action addTeam(team: ITeam) {
    this.teams.set(team.id, team);
  }

  @action addToSessionUserTeams(teamId: number) {
    if (!this.sessionUserTeamIds.includes(teamId)) {
      this.sessionUserTeamIds.push(teamId);
    }
  }

  @action removeFromSessionUserTeams(removeId: number) {
    this.sessionUserTeamIds = this.sessionUserTeamIds.filter(
      id => id !== removeId
    );
  }

  @action clearSessionUserTeamIds() {
    this.sessionUserTeamIds = [];
  }
}

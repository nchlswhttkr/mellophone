import { observable, runInAction, computed, action } from "mobx";
import { ITeam } from "../types";
import { ITeamService } from "../network/teamService";

export interface ITeamStore {
  sessionUserTeams: ITeam[];
  createTeam(name: string, website: string): Promise<ITeam>;
  loadTeamsOfSessionUser(): Promise<void>;
  clearTeamsOfSessionUser(): void;
  retrieveTeamWithId(teamId: number): Promise<ITeam>;
}

/**
 * A collection for the session user's teams.
 */
export default class TeamStore implements ITeamStore {
  private teamService: ITeamService;
  @observable private teams: Map<number, ITeam> = new Map();

  constructor(teamService: ITeamService) {
    this.teamService = teamService;
  }

  @computed get sessionUserTeams() {
    return Array.from(this.teams.values());
  }

  async createTeam(name: string, website: string) {
    const team = observable(await this.teamService.postTeam(name, website));
    this.teams.set(team.id, team);
    return team;
  }

  async loadTeamsOfSessionUser() {
    if (this.teams.size !== 0) return;

    const teams = observable(await this.teamService.getTeamsOfSessionUser());
    teams.forEach(team => runInAction(() => this.teams.set(team.id, team)));
  }

  /**
   * Clears the cache, useful when a user signs out (hence they have no teams).
   */
  @action clearTeamsOfSessionUser() {
    this.teams.clear();
  }

  /**
   * If the session user is requesting a team of which they are a member, it
   * can be returned immediately under the guise of network request. If not, a
   * request for the requested team is made.
   */
  async retrieveTeamWithId(teamId: number) {
    const team = this.teams.get(teamId);
    if (team) {
      return team;
    } else {
      return this.teamService.getTeamById(teamId); // doesn't need to observable
    }
  }
}

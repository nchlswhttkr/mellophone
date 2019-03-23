export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ITeam {
  id: string;
  name: string;
  website: string;
}

// We only need to depend on something which resembles an IdentityStore
export interface IIdentityStore {
  readonly user: IUser | undefined;
  readonly pending: boolean;
  readonly resolved: boolean;
  readonly rejected: boolean;
  setPending: () => void;
  setResolved: (user?: IUser) => void;
  setRejected: (error?: Error) => void;
}

export interface ITeamStore {
  readonly teams: ITeam[];
  readonly currentTeam: ITeam | undefined;
  clearTeams: () => void;
  addTeam: (team: ITeam) => void;
  addTeams: (teams: ITeam[]) => void;
  setCurrentTeam: (id: string) => void;
}

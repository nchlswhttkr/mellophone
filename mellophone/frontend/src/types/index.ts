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
  addTeam: (team: ITeam) => void;
  setTeams: (teams: ITeam[]) => void;
}

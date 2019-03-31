export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserToBeCreated {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ITeam {
  id: number;
  name: string;
  website: string;
}

export interface ITeamToBeCreated {
  name: string;
  website: string;
}

export interface ISessionStore {
  readonly user: IUser | undefined;
  readonly teams: Map<number, ITeam>;
  setUser: (user?: IUser) => void;
  upsertTeams: (teams: ITeam[]) => void;
  clearSession: () => void;
}

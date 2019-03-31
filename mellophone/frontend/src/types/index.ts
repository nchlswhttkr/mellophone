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

export interface ISessionStore {
  readonly user: IUser | undefined;
  readonly teams: Map<string, ITeam>;
  setUser: (user?: IUser) => void;
  upsertTeams: (teams: ITeam[]) => void;
  clearSession: () => void;
}

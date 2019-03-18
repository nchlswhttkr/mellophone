export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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

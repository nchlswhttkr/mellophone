export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ITeam {
  id: number;
  name: string;
  website: string;
}

export interface IMeeting {
  id: number;
  name: string;
  venue: string; // may be an empty string
  dateHeld: Date;
  team: ITeam;
}

export interface IItem {
  id: number;
  name: string;
  description: string;
  // dateCreated
  // dateUpdated
}

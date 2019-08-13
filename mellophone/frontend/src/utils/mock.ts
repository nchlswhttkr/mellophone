import { IUser, ITeam, IMeeting, IItem } from "../types";

/**
 * Generates mock domain objects, attempting to populate fields with unique
 * values to avoid accidental collisions and false positives in tests.
 */
class Mock {
  private userCount = 0;
  private teamCount = 0;
  private meetingCount = 0;
  private itemCount = 0;

  user(user: Partial<IUser> = {}): IUser {
    this.userCount++;
    return {
      id: this.userCount,
      email: `user+${this.userCount}@email.com`,
      firstName: btoa(this.userCount.toString()),
      lastName: btoa(this.userCount.toString()),
      ...user,
    };
  }

  team(team: Partial<ITeam> = {}): ITeam {
    this.teamCount++;
    return {
      id: this.teamCount,
      name: `Team #${this.teamCount}`,
      website: btoa(this.teamCount.toString()),
      ...team,
    };
  }

  meeting(meeting: Partial<IMeeting> = {}): IMeeting {
    this.meetingCount++;
    return {
      id: this.meetingCount,
      name: "Meeting " + btoa(this.meetingCount.toString()),
      venue: "Meeting venue " + btoa(this.meetingCount.toString()),
      dateHeld: new Date(),
      team: this.team(),
      ...meeting,
    };
  }

  item(item: Partial<IItem> = {}): IItem {
    this.itemCount++;
    return {
      id: this.itemCount,
      name: "Item " + btoa(this.itemCount.toString()),
      description: "Description " + btoa(this.itemCount.toString()),
    };
  }
}

export default new Mock();

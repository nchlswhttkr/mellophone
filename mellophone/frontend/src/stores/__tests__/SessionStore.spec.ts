import SessionStore from "../SessionStore";
import { ISessionStore, IUser, ITeam } from "../../types";

describe("Stores - SessionStore", () => {
  it("Initialises to an anonymous user when called without arguments", () => {
    const sessionStore = new SessionStore();

    expect(sessionStore.user).toBe(undefined);
  });

  it("Initialises with no teams when called without arguments", () => {
    const sessionStore = new SessionStore();

    expect(sessionStore.teams.size).toBe(0);
  });

  it("Reflects when a new user is added", () => {
    const sessionStore = new SessionStore();
    const user: IUser = {
      id: 1,
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    };

    sessionStore.setUser(user);

    expect(sessionStore.user!.email).toBe(user.email);
  });

  it("Reflects when a batch of teams is upserted", () => {
    const sessionStore = new SessionStore();
    const teams: ITeam[] = [
      {
        id: 10,
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
    ];

    sessionStore.upsertTeams(teams);

    expect(sessionStore.teams.size).toBe(1);
    expect(sessionStore.teams.get(10)!.name).toBe("Western Brass");
  });

  it("Clears the teams and user when clearSession is called", () => {
    const sessionStore = new SessionStore();

    sessionStore.setUser({
      id: 1,
      firstName: "Nicholas",
      lastName: "Whittaker",
      email: "nicholas@email.com",
    });
    sessionStore.upsertTeams([
      {
        id: 10,
        name: "Western Brass",
        website: "https://facebook.com/WesternBrass",
      },
      {
        id: 3,
        name: "Glen Eira Band",
        website: "http://gleneiraband.com.au",
      },
    ]);
    sessionStore.clearSession();

    expect(sessionStore.user).toBe(undefined);
    expect(sessionStore.teams.size).toBe(0);
  });
});

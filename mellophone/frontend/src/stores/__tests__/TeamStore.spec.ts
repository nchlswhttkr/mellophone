import { ITeam } from "../../types";
import TeamStore from "../TeamStore";
import { computed } from "mobx";

describe("Stores - TeamStore", () => {
  const mockTeams: ITeam[] = [
    {
      id: 1,
      name: "Western Brass",
      website: "https://facebook.com/WesternBrass",
    },
    {
      id: 2,
      name: "Glen Eira Band",
      website: "http://gleneiraband.com.au",
    },
  ];

  it("Adds teams to the store", () => {
    const store = new TeamStore();

    mockTeams.forEach(team => store.addTeam(team));

    expect(store.teams.get(mockTeams[0].id)).toEqual(mockTeams[0]);
    expect(store.teams.get(mockTeams[1].id)).toEqual(mockTeams[1]);
  });

  it("Exposes teams from the store as observables", () => {
    const team = mockTeams[0];
    const modifiedTeam = { ...team, name: "A new team name" };
    const store = new TeamStore();

    store.addTeam(team);
    const observedTeam = computed(() => store.teams.get(team.id));
    expect(observedTeam.get()).toEqual(team);

    store.addTeam(modifiedTeam);
    expect(observedTeam.get()).toEqual(modifiedTeam);
  });

  it("Updates the session user's teams as they are added", () => {
    const store = new TeamStore();

    mockTeams.forEach(team => store.addTeam(team));
    expect(store.sessionUserTeams).toHaveLength(0);

    store.addToSessionUserTeams(mockTeams[0].id);
    expect(store.sessionUserTeams).toHaveLength(1);
    expect(store.sessionUserTeams[0]).toEqual(mockTeams[0]);
  });

  it("Removes teams from the session user's team if they are removed", () => {
    const store = new TeamStore();

    mockTeams.forEach(team => store.addTeam(team));
    store.addToSessionUserTeams(mockTeams[0].id);
    store.removeFromSessionUserTeams(mockTeams[0].id);

    expect(store.sessionUserTeams).toHaveLength(0);
  });

  it("Clears all teams", () => {
    const store = new TeamStore();

    mockTeams.forEach(team => store.addTeam(team));
    store.clearTeams();

    expect(store.teams.size).toBe(0);
  });

  it("Clears the session user's teams when teams are cleared", () => {
    const store = new TeamStore();

    mockTeams.forEach(team => store.addTeam(team));
    store.addToSessionUserTeams(mockTeams[0].id);

    expect(store.sessionUserTeams).toHaveLength(1);

    store.clearTeams();

    expect(store.sessionUserTeams).toHaveLength(0);
  });

  it("Exposes the session user's teams as observables", () => {
    const store = new TeamStore();
    const sessionUserTeams = computed(() => store.sessionUserTeams);

    mockTeams.forEach(team => store.addTeam(team));
    store.addToSessionUserTeams(mockTeams[0].id);

    expect(sessionUserTeams.get()).toHaveLength(1);

    let team = store.teams.get(mockTeams[0].id);
    team!.name = "A new team name";

    expect(sessionUserTeams.get()[0].name).toBe(team!.name);
  });
});

import { ITeam } from "../../types";
import TeamStore from "../TeamStore";
import { computed } from "mobx";
import mock from "../../utils/mock";

it("Adds teams to the store", () => {
  const teams = [mock.team(), mock.team()];
  const store = new TeamStore();

  teams.forEach(team => store.addTeam(team));

  expect(store.teams.get(teams[0].id)).toEqual(teams[0]);
  expect(store.teams.get(teams[1].id)).toEqual(teams[1]);
});

it("Exposes teams from the store as observables", () => {
  const team = mock.team();
  const modifiedTeam = { ...team, name: "A new team name" };
  const store = new TeamStore();

  store.addTeam(team);
  const observedTeam = computed(() => store.teams.get(team.id));
  expect(observedTeam.get()).toEqual(team);

  store.addTeam(modifiedTeam);
  expect(observedTeam.get()).toEqual(modifiedTeam);
});

it("Updates the session user's teams as they are added", () => {
  const teams = [mock.team(), mock.team()];
  const store = new TeamStore();

  teams.forEach(team => store.addTeam(team));
  expect(store.sessionUserTeams).toHaveLength(0);

  store.addToSessionUserTeams(teams[0].id);
  expect(store.sessionUserTeams).toHaveLength(1);
  expect(store.sessionUserTeams[0]).toEqual(teams[0]);
});

it("Removes teams from the session user's team if they are removed", () => {
  const teams = [mock.team()];
  const store = new TeamStore();

  teams.forEach(team => store.addTeam(team));
  store.addToSessionUserTeams(teams[0].id);
  store.removeFromSessionUserTeams(teams[0].id);

  expect(store.sessionUserTeams).toHaveLength(0);
});

it("Exposes the session user's teams as observables", () => {
  const team = mock.team();
  const store = new TeamStore();

  store.addTeam(team);
  store.addToSessionUserTeams(team.id);
  const observedTeam = store.sessionUserTeams[0];

  store.addTeam({ ...team, name: "A new team name" });

  expect(observedTeam.name).toBe(team.name);
});

it("Does not add a duplicate team to the session user", () => {
  const store = new TeamStore();
  const team = mock.team();

  store.addTeam(team);
  store.addToSessionUserTeams(team.id);
  store.addToSessionUserTeams(team.id);

  expect(store.sessionUserTeams).toHaveLength(1);
});

it("Clears the session user's teams", () => {
  const store = new TeamStore();
  const team = mock.team();

  store.addTeam(team);
  store.addToSessionUserTeams(team.id);
  store.clearSessionUserTeamIds();

  expect(store.sessionUserTeams).toHaveLength(0);
});

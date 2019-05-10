import { ITeamService } from "../../network/teamService";
import { ITeam } from "../../types";
import TeamStore from "../TeamStore";

describe("Stores - TeamStore", () => {
  let teamService: ITeamService;
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

  beforeEach(() => {
    teamService = {
      getTeamById: jest.fn(),
      getTeamsOfSessionUser: jest.fn(),
      postTeam: jest.fn(),
    };
  });

  it("Requests teams of the session user and represents them", async () => {
    teamService.getTeamsOfSessionUser = jest.fn(async () => mockTeams);
    const teamStore = new TeamStore(teamService);

    await teamStore.loadTeamsOfSessionUser();
    const storedTeams = teamStore.sessionUserTeams;

    expect(teamService.getTeamsOfSessionUser).toBeCalledTimes(1);
    expect(storedTeams).toEqual(mockTeams);

    const teamToModify = await teamStore.retrieveTeamWithId(storedTeams[0].id);
    teamToModify.name = "Moonee Valley Brass";
    teamToModify.website = "https://github.com";

    expect(storedTeams[0]).toEqual(teamToModify);
  });

  it("Stores the teams of a session users as observables", async () => {
    teamService.getTeamsOfSessionUser = jest.fn(async () => mockTeams);
    const teamStore = new TeamStore(teamService);

    await teamStore.loadTeamsOfSessionUser();
    const storedTeams = teamStore.sessionUserTeams;

    const teamToModify = await teamStore.retrieveTeamWithId(storedTeams[0].id);
    teamToModify.name = "Moonee Valley Brass";
    teamToModify.website = "https://github.com";

    expect(storedTeams[0]).toEqual(teamToModify);
  });

  it("Returns a cached team when it exists", async () => {
    teamService.getTeamsOfSessionUser = jest.fn(async () => mockTeams);
    const teamStore = new TeamStore(teamService);

    await teamStore.loadTeamsOfSessionUser();
    const cachedTeam = await teamStore.retrieveTeamWithId(mockTeams[0].id);

    expect(teamService.getTeamsOfSessionUser).toBeCalledTimes(1);
    expect(teamService.getTeamById).toBeCalledTimes(0);
    expect(cachedTeam).toEqual(mockTeams[0]);
  });

  it("Requests a team if it is not cached", async () => {
    teamService.getTeamById = jest.fn(async () => mockTeams[0]);
    const teamStore = new TeamStore(teamService);

    const team = await teamStore.retrieveTeamWithId(123);

    expect(teamService.getTeamById).toBeCalledTimes(1);
    expect(teamService.getTeamById).toBeCalledWith(123);
    expect(team).toEqual(mockTeams[0]);
  });

  it("Caches the team of a session user for subsequent requests", async () => {
    teamService.getTeamsOfSessionUser = jest.fn(async () => mockTeams);
    const teamStore = new TeamStore(teamService);

    await teamStore.loadTeamsOfSessionUser();
    await teamStore.loadTeamsOfSessionUser();

    expect(teamService.getTeamsOfSessionUser).toBeCalledTimes(1);
  });

  it("Clears the cache of a session user, forcing a new request", async () => {
    teamService.getTeamsOfSessionUser = jest.fn(async () => mockTeams);
    const teamStore = new TeamStore(teamService);

    await teamStore.loadTeamsOfSessionUser();
    teamStore.clearTeamsOfSessionUser();

    expect(teamStore.sessionUserTeams).toHaveLength(0);

    await teamStore.loadTeamsOfSessionUser();

    expect(teamService.getTeamsOfSessionUser).toBeCalledTimes(2);
  });
});

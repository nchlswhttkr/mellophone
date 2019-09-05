import { postTeam } from "../teamService";
import mock from "../../utils/mock";

it("Does not allow teams to be created with a name and a website", async () => {
  const team = mock.team();
  await expect(postTeam("", team.website)).rejects.toThrow(
    "Teams must have a name and website"
  );
  await expect(postTeam(team.name, "")).rejects.toThrow(
    "Teams must have a name and website"
  );
});

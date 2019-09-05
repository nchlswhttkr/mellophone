import { signUp } from "../identityService";
import mock from "../../utils/mock";

it("Does not allow users to sign up without an email, password and name", async () => {
  const user = mock.user();
  await expect(
    signUp("", "hunter2", user.firstName, user.lastName)
  ).rejects.toThrow("New accounts must have a name, email and password");
  await expect(
    signUp(user.email, "", user.firstName, user.lastName)
  ).rejects.toThrow("New accounts must have a name, email and password");
  await expect(
    signUp(user.email, "hunter2", "", user.lastName)
  ).rejects.toThrow("New accounts must have a name, email and password");
  await expect(
    signUp(user.email, "hunter2", user.firstName, "")
  ).rejects.toThrow("New accounts must have a name, email and password");
});

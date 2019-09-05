import { postMeeting, postItemInMeeting } from "../meetingService";

it("Does not allow meetings to be created without a name", async () => {
  await expect(postMeeting(1, "", "")).rejects.toThrow(
    "Meetings must have a name"
  );
});

it("Does not allow meetings items to be created without a name", async () => {
  await expect(postItemInMeeting(1, { name: "" })).rejects.toThrow(
    "Meeting items must have a name"
  );
});

it("Does not allow meetings items to be created without a description", async () => {
  await expect(
    postItemInMeeting(1, { name: "name", description: "" })
  ).rejects.toThrow("Meeting items must have a description");
});

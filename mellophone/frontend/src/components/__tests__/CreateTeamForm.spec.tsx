import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import CreateTeamForm from "../CreateTeamForm";

it("Creates a team when the form is submitted", () => {
  const createTeam = jest.fn(async () => undefined);
  const { getByLabelText, getByText } = render(
    <CreateTeamForm createTeam={createTeam} />
  );

  fireEvent.input(getByLabelText("Team name"), {
    target: { value: "Western Brass" },
  });
  fireEvent.input(getByLabelText("Website"), {
    target: { value: "https://facebook.com/WesternBrass" },
  });
  fireEvent.click(getByText("Create team"));

  expect(createTeam).toBeCalledTimes(1);
  expect(createTeam).toBeCalledWith(
    "Western Brass",
    "https://facebook.com/WesternBrass"
  );
});

it("Displays the error message of createTeam if it throws an error", async () => {
  const message = "Unable to create a team at this time.";
  const createTeam = jest.fn(async () => {
    throw new Error(message);
  });
  const { getByText, queryByText } = render(
    <CreateTeamForm createTeam={createTeam} />
  );

  fireEvent.click(getByText("Create team"));

  await wait(() => expect(queryByText(message)).not.toBe(null));
  expect(createTeam).toBeCalledTimes(1);
});

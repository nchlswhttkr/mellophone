import React from "react";
import { cleanup, render } from "@testing-library/react";

import Header from "../Header";
import mock from "../../utils/mock";

beforeEach(cleanup);

it("Directs unauthenticated users to sign in", () => {
  const user = undefined;
  const { queryByText } = render(<Header user={user} />);

  expect(queryByText("Sign in")).not.toBe(null);
});

it("Directs authenticated users to their account", () => {
  const user = mock.user();
  const { queryByText } = render(<Header user={user} />);

  expect(queryByText("Account")).not.toBe(null);
});

import React from "react";
import { render } from "@testing-library/react";

import ErrorMessage from "../ErrorMessage";

it("Renders nothing when no element is passed in", () => {
  expect(render(<ErrorMessage />).container.childElementCount).toBe(0);
});

it("Renders an error message when an error is provided", () => {
  const error = new Error("This is an error message");
  const { queryByText } = render(<ErrorMessage error={error} />);

  expect(queryByText(error.message)).not.toBe(null);
});

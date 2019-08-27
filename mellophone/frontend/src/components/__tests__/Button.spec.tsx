import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Button from "../Button";

it("Triggers onClick() when clicked", () => {
  const onClick = jest.fn();
  const { getByLabelText } = render(
    <Button onClick={onClick} aria-label="Can be found by aria-label">
      Click me!
    </Button>
  );

  const target = getByLabelText("Can be found by aria-label");
  fireEvent.click(target);

  expect(onClick).toHaveBeenCalledTimes(1);
});

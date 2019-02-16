import React from "react";
import { render, fireEvent } from "react-testing-library";

import Button from "../Button";

describe("Components/Elements/Button", () => {
  it("Triggers onClick once when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me!</Button>);

    const target = getByText("Click me!");
    fireEvent.click(target);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

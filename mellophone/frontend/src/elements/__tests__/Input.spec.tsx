import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";

import Input from "../Input";

describe("Components - Elements - Input", () => {
  beforeEach(cleanup);

  it("Can be read from using refs", () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByLabelText } = render(
      <Input ref={ref} label="Enter your search term" />
    );

    const target = getByLabelText("Enter your search term");
    fireEvent.input(target, { target: { value: "My search query" } });

    expect(ref.current && ref.current.value).toEqual("My search query");
  });

  it("Can be read from using a callback", () => {
    let value;
    const onInput = jest.fn((event: React.FormEvent<HTMLInputElement>) => {
      value = event.currentTarget.value;
    });
    const { getByLabelText } = render(
      <Input onInput={onInput} label="Enter your search term" />
    );

    const target = getByLabelText("Enter your search term");
    fireEvent.input(target, { target: { value: "My search query" } });

    expect(onInput).toHaveBeenCalledTimes(1);
    expect(value).toBe("My search query");
  });
});

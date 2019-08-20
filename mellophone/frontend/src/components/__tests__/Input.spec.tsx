import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Input from "../Input";

it("Can be read from using refs", () => {
  const ref = React.createRef<HTMLInputElement>();
  const { getByLabelText } = render(
    <Input ref={ref} label="Enter your search term" />
  );

  const target = getByLabelText("Enter your search term");
  fireEvent.input(target, { target: { value: "My search query" } });

  expect(ref.current).toBeTruthy();
  expect(ref.current!.value).toEqual("My search query");
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

  expect(onInput).toHaveBeenCalledTimes(1); // only one input event
  expect(value).toBe("My search query");
});

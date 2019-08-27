import React from "react";
import { render, fireEvent } from "@testing-library/react";

import TextArea from "../TextArea";

it("Can be read from using refs", () => {
  const ref = React.createRef<HTMLTextAreaElement>();
  const { getByLabelText } = render(
    <TextArea ref={ref} label="Enter your search term" rows={3} />
  );

  const target = getByLabelText("Enter your search term");
  fireEvent.input(target, { target: { value: "My search query" } });

  expect(ref.current).toBeTruthy();
  expect(ref.current!.value).toEqual("My search query");
});

it("Can be read from using a callback", () => {
  let value;
  const onInput = jest.fn((event: React.FormEvent<HTMLTextAreaElement>) => {
    value = event.currentTarget.value;
  });
  const { getByLabelText } = render(
    <TextArea onInput={onInput} label="Enter your search term" rows={3} />
  );

  const target = getByLabelText("Enter your search term");
  fireEvent.input(target, { target: { value: "My search query" } });

  expect(onInput).toHaveBeenCalledTimes(1);
  expect(value).toBe("My search query");
});

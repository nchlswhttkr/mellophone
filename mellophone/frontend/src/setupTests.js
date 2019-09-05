import { cleanup } from "@testing-library/react";
import { navigate } from "./utils/routing";

// Throw if network calls are made during tests
const realFetch = fetch;
beforeAll(() => {
  fetch = () => {
    console.warn("A network call was made while testing, it should be mocked");
    return Promise.reject(new Error());
  };
});
afterAll(() => {
  fetch = realFetch;
});

// Clean up after a test
afterEach(() => {
  cleanup();
  navigate("/");
  localStorage.clear();
});

import SessionStore from "../SessionStore";
import { computed } from "mobx";

describe("Stores - SessionStore", () => {
  const mockUser = {
    id: 1,
    firstName: "Nicholas",
    lastName: "Whittaker",
    email: "nicholas@email.com",
  };

  it("Holds an anonymous user by default", () => {
    const store = new SessionStore();

    expect(store.user).toEqual(undefined);
  });

  it("Clears the session user", () => {
    const store = new SessionStore();

    store.user = mockUser;
    expect(store.user).not.toBe(undefined);

    store.user = undefined;
    expect(store.user).toBe(undefined);
  });

  it("Updates the session user when one is provided", () => {
    const store = new SessionStore();

    store.user = mockUser;
    expect(store.user).toEqual(mockUser);
  });

  it("Exposes an observable for the current session user", () => {
    const store = new SessionStore();
    const modifiedUser = { ...mockUser, firstName: "Nick" };

    const user = computed(() => store.user);
    expect(user.get()).toBe(undefined);

    store.user = mockUser;
    expect(user.get()).toMatchObject(expect.objectContaining(mockUser));

    store.user = { ...mockUser, firstName: "Nick" };
    expect(user.get()).toMatchObject(expect.objectContaining(modifiedUser));

    store.user = undefined;
    expect(user.get()).toBe(undefined);
  });
});

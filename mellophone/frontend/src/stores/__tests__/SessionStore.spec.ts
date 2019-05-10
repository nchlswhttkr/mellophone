import SessionStore from "../SessionStore";
import { IUser } from "../../types";
import { IIdentityService } from "../../network/identityService";
import { computed } from "mobx";

describe("Stores - SessionStore", () => {
  let identityService: IIdentityService;
  const mockUser: IUser = {
    id: 1,
    firstName: "Nicholas",
    lastName: "Whittaker",
    email: "nicholas@email.com",
  };

  beforeEach(() => {
    // Fulfils IIdentityService, implement functionality where needed to test
    identityService = {
      signIn: jest.fn(async () => mockUser),
      signUp: jest.fn(async () => mockUser),
      signOut: jest.fn(async () => {}),
      getSessionUser: jest.fn(async () => mockUser), // logged in by default
    };
  });

  it("Loads an anonymous user when one is not signed in", async () => {
    identityService.getSessionUser = jest.fn(async () => undefined);
    const sessionStore = new SessionStore(identityService);

    const user = await sessionStore.loadSessionUser();

    expect(identityService.getSessionUser).toBeCalledTimes(1);
    expect(user).toBe(undefined);
  });

  it("Loads a user when one is signed in", async () => {
    const sessionStore = new SessionStore(identityService);

    await sessionStore.loadSessionUser();

    expect(identityService.getSessionUser).toBeCalledTimes(1);
    expect(sessionStore.user).not.toBe(undefined);
    expect(sessionStore.user!.email).toBe(mockUser.email);
  });

  it("Signs a user in", async () => {
    const sessionStore = new SessionStore(identityService);
    const username: string = "username@email.com";
    const password: string = "hunter2";

    await sessionStore.signIn(username, password);
    await sessionStore.loadSessionUser();

    expect(identityService.signIn).toBeCalledTimes(1);
    expect(identityService.signIn).toBeCalledWith(username, password);
    expect(sessionStore.user).not.toBe(undefined);
    expect(sessionStore.user!.email).toBe(mockUser.email);
  });

  it("Signs a new user up", async () => {
    const sessionStore = new SessionStore(identityService);
    const username = "username@email.com";
    const password = "hunter2";
    const firstName = "Nicholas";
    const lastName = "Whittaker";

    await sessionStore.signUp(username, password, firstName, lastName);
    await sessionStore.loadSessionUser();

    expect(identityService.signUp).toBeCalledTimes(1);
    expect(identityService.signUp).toBeCalledWith(
      username,
      password,
      firstName,
      lastName
    );
    expect(sessionStore.user).not.toBe(undefined);
    expect(sessionStore.user!.email).toBe(mockUser.email);
  });

  it("Signs a user out if one is signed in", async () => {
    const sessionStore = new SessionStore(identityService);

    await sessionStore.signIn("", ""); // load a user into the store
    expect(sessionStore).not.toBeUndefined();

    await sessionStore.signOut();

    expect(identityService.signOut).toBeCalledTimes(1);
    expect(sessionStore.user).toBe(undefined);
  });

  it("Exposes an observable that indicates whether a user is authenticated", async () => {
    const sessionStore = new SessionStore(identityService);

    // We could mock an effect and use autorun(), but that would be assumming
    // too much about why isAuthenticated is observable
    const observesIsAuthenticated = computed(() => !!sessionStore.user);

    // Initially no user is signed in
    expect(observesIsAuthenticated.get()).toBe(false);

    await sessionStore.loadSessionUser();
    expect(observesIsAuthenticated.get()).toBe(true);

    await sessionStore.signOut();
    expect(observesIsAuthenticated.get()).toBe(false);
  });
});

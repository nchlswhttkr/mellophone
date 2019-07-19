import React from "react";

import { ApplicationStores, StoresContext } from "../stores";
import SessionStore from "../stores/SessionStore";
import TeamStore from "../stores/TeamStore";
import { INetworkLayer, NetworkLayer, NetworkContext } from "../network";
import { render, RenderResult } from "@testing-library/react";
import { IUser } from "../types";
import mock from "./mock";

/**
 * When testing larger and more complex components, mocking dependencies like
 * network requests and data stores is usually necessary to assert behaviour in
 * a given scenario.
 *
 * TestRenderer provides this with builder syntax.
 */
export default class TestRenderer {
  stores: ApplicationStores;
  network: INetworkLayer;
  user?: IUser;

  constructor() {
    this.stores = {
      sessionStore: new SessionStore(),
      teamStore: new TeamStore(),
    };
    this.network = Object.assign({}, NetworkLayer);
  }

  withStores(stores: Partial<ApplicationStores>): TestRenderer {
    Object.assign(this.stores, stores);
    return this;
  }

  withNetwork(network: Partial<INetworkLayer>): TestRenderer {
    Object.assign(this.network, network);
    return this;
  }

  /**
   * Useful for avoiding the boilerplate of mocking an authenticated user.
   * @param user The user to sign in as, defaults to a simple mock user
   */
  asAuthenticatedUser(user: IUser = mock.user()): TestRenderer {
    this.user = user;
    return this;
  }

  render(component: React.ReactNode): RenderResult {
    if (this.user) this.stores.sessionStore.signIn(this.user);
    return render(
      <NetworkContext.Provider value={this.network}>
        <StoresContext.Provider value={this.stores}>
          {component}
        </StoresContext.Provider>
      </NetworkContext.Provider>
    );
  }
}

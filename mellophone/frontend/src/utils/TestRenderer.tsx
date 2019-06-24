import React from "react";
import { ApplicationStores, StoresContext } from "../stores";
import SessionStore from "../stores/SessionStore";
import TeamStore from "../stores/TeamStore";
import { INetworkLayer, NetworkLayer, NetworkContext } from "../network";
import { render, RenderResult } from "@testing-library/react";
import { IUser } from "../types";
import mock from "./mock";

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

  asAuthenticatedUser(user?: IUser) {
    this.stores.sessionStore.signIn(user || mock.user());
  }

  render(component: React.ReactNode): RenderResult {
    return render(
      <NetworkContext.Provider value={this.network}>
        <StoresContext.Provider value={this.stores}>
          {component}
        </StoresContext.Provider>
      </NetworkContext.Provider>
    );
  }
}

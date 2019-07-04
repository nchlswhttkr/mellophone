import React from "react";
import { ApplicationStores, StoresContext } from "../stores";
import SessionStore from "../stores/SessionStore";
import TeamStore from "../stores/TeamStore";
import { INetworkLayer, NetworkLayer, NetworkContext } from "../network";
import { render, RenderResult } from "@testing-library/react";

export default class TestRenderer {
  stores: ApplicationStores;
  network: INetworkLayer;

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
